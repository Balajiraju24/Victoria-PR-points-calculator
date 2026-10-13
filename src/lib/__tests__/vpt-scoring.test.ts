import { describe, it, expect } from 'vitest';
import {
  getAgePoints,
  getEnglishPoints,
  getExperiencePoints,
  getEducationPoints,
  getOccupationPoints,
  getPartnerPoints,
  getEarningsPoints,
  calculateVptTotal,
  generateSalaryScenarios,
  mapNumericYearsToCategory,
  VptCalculatorInputs,
} from '../vpt-scoring';

describe('VPT Scoring Engine - Age Factor', () => {
  it('correctly scores all published age years (18 to 44)', () => {
    const expectedAges: Record<number, number> = {
      18: 265,
      19: 282,
      20: 300,
      21: 300,
      25: 300,
      29: 300,
      30: 286,
      31: 270,
      32: 256,
      33: 240,
      34: 226,
      35: 210,
      36: 196,
      37: 180,
      38: 166,
      39: 150,
      40: 136,
      41: 106,
      42: 76,
      43: 46,
      44: 16,
    };

    for (const [ageStr, expectedPoints] of Object.entries(expectedAges)) {
      const age = Number(ageStr);
      const res = getAgePoints(age);
      expect(res.points).toBe(expectedPoints);
      expect(res.isAnswered).toBe(true);
      expect(res.isVerified).toBe(true);
    }
  });

  it('handles age boundaries (< 18 and >= 45) with eligibility warnings', () => {
    const under18 = getAgePoints(17);
    expect(under18.points).toBe(0);
    expect(under18.warnings?.length).toBeGreaterThan(0);

    const age45 = getAgePoints(45);
    expect(age45.points).toBe(0);
    expect(age45.warnings?.length).toBeGreaterThan(0);

    const age50 = getAgePoints(50);
    expect(age50.points).toBe(0);
    expect(age50.warnings?.length).toBeGreaterThan(0);
  });

  it('handles missing age gracefully', () => {
    const res = getAgePoints(undefined);
    expect(res.points).toBe(0);
    expect(res.isAnswered).toBe(false);
  });
});

describe('VPT Scoring Engine - English Factor', () => {
  it('awards 0 points for Competent English', () => {
    const res = getEnglishPoints('competent');
    expect(res.points).toBe(0);
    expect(res.isAnswered).toBe(true);
    expect(res.isVerified).toBe(true);
  });

  it('awards 100 points for Proficient English', () => {
    const res = getEnglishPoints('proficient');
    expect(res.points).toBe(100);
    expect(res.isAnswered).toBe(true);
  });

  it('awards 200 points for Superior English', () => {
    const res = getEnglishPoints('superior');
    expect(res.points).toBe(200);
    expect(res.isAnswered).toBe(true);
  });

  it('handles unanswered english', () => {
    const res = getEnglishPoints(null);
    expect(res.points).toBe(0);
    expect(res.isAnswered).toBe(false);
  });
});

describe('VPT Scoring Engine - Years of Experience Factor', () => {
  it('correctly scores all discrete experience categories', () => {
    expect(getExperiencePoints('0_years').points).toBe(0);
    expect(getExperiencePoints('1_year').points).toBe(20);
    expect(getExperiencePoints('1_to_3_years').points).toBe(40);
    expect(getExperiencePoints('3_to_5_years').points).toBe(60);
    expect(getExperiencePoints('6_to_8_years').points).toBe(80);
    expect(getExperiencePoints('more_than_8_years').points).toBe(100);
  });

  it('flags boundary ambiguity on overlapping brackets when mapping numeric years', () => {
    const mapped1 = mapNumericYearsToCategory(1);
    expect(mapped1.category).toBe('1_year');
    expect(mapped1.hasBoundaryAmbiguity).toBe(true);

    const mapped3 = mapNumericYearsToCategory(3);
    expect(mapped3.category).toBe('1_to_3_years');
    expect(mapped3.hasBoundaryAmbiguity).toBe(true);

    const mapped5Point5 = mapNumericYearsToCategory(5.5);
    expect(mapped5Point5.category).toBe('3_to_5_years');
    expect(mapped5Point5.hasBoundaryAmbiguity).toBe(true);

    const mapped7 = mapNumericYearsToCategory(7);
    expect(mapped7.category).toBe('6_to_8_years');
    expect(mapped7.hasBoundaryAmbiguity).toBe(false);

    const mapped10 = mapNumericYearsToCategory(10);
    expect(mapped10.category).toBe('more_than_8_years');
    expect(mapped10.hasBoundaryAmbiguity).toBe(false);
  });
});

describe('VPT Scoring Engine - Education Factor', () => {
  it('correctly scores education levels', () => {
    expect(getEducationPoints('other').points).toBe(25);
    expect(getEducationPoints('bachelor_honours').points).toBe(50);
    expect(getEducationPoints('masters').points).toBe(75);
    expect(getEducationPoints('phd').points).toBe(100);
  });

  it('handles missing education', () => {
    const res = getEducationPoints(undefined);
    expect(res.points).toBe(0);
    expect(res.isAnswered).toBe(false);
  });
});

describe('VPT Scoring Engine - Occupation Skill Level Factor', () => {
  it('awards 50 points for ANZSCO Skill Level 1', () => {
    const res = getOccupationPoints('level_1', 'Software Engineer', '261313');
    expect(res.points).toBe(50);
    expect(res.isAnswered).toBe(true);
    expect(res.isVerified).toBe(true);
    expect(res.selectedLabel).toContain('261313');
  });

  it('awards 0 points for Skill Level 2 and Skill Level 3', () => {
    expect(getOccupationPoints('level_2').points).toBe(0);
    expect(getOccupationPoints('level_3').points).toBe(0);
  });

  it('flags unverified occupation and labels as provisional', () => {
    const res = getOccupationPoints('unverified');
    expect(res.points).toBe(0);
    expect(res.isVerified).toBe(false);
    expect(res.warnings?.length).toBeGreaterThan(0);
  });
});

describe('VPT Scoring Engine - Partner Skills Factor', () => {
  it('awards 0 points for single applicant (with explanatory note on Federal vs VPT)', () => {
    const res = getPartnerPoints({ status: 'single' });
    expect(res.points).toBe(0);
    expect(res.isAnswered).toBe(true);
    expect(res.isVerified).toBe(true);
    expect(res.notes).toContain('Under federal SkillSelect');
  });

  it('awards 0 points for partnered applicant not claiming', () => {
    const res = getPartnerPoints({ status: 'partnered_no_claim' });
    expect(res.points).toBe(0);
    expect(res.isAnswered).toBe(true);
    expect(res.isVerified).toBe(true);
  });

  it('awards 50 points ONLY IF all 3 mandatory conditions are met', () => {
    const qualified = getPartnerPoints({
      status: 'partnered_claiming',
      claimsTenFederalPoints: true,
      includedInNomination: true,
      occupationInPriorityIndustry: true,
    });
    expect(qualified.points).toBe(50);
    expect(qualified.isVerified).toBe(true);
    expect(qualified.warnings).toBeUndefined();

    // If missing any condition, awards 0 and warns
    const missingFederal = getPartnerPoints({
      status: 'partnered_claiming',
      claimsTenFederalPoints: false,
      includedInNomination: true,
      occupationInPriorityIndustry: true,
    });
    expect(missingFederal.points).toBe(0);
    expect(missingFederal.isVerified).toBe(false);
    expect(missingFederal.warnings?.length).toBeGreaterThan(0);

    const missingPriority = getPartnerPoints({
      status: 'partnered_claiming',
      claimsTenFederalPoints: true,
      includedInNomination: true,
      occupationInPriorityIndustry: false,
    });
    expect(missingPriority.points).toBe(0);
    expect(missingPriority.isVerified).toBe(false);
  });
});

describe('VPT Scoring Engine - Victorian Skilled Earnings Factor', () => {
  it('awards 0 points if not working in skilled employment in Victoria', () => {
    const res = getEarningsPoints({ hasEligibleSkilledEmploymentInVic: false });
    expect(res.points).toBe(0);
    expect(res.isAnswered).toBe(true);
  });

  it('correctly scores all published salary bands and exact boundaries', () => {
    const testCases: [number, number][] = [
      [79999, 0],
      [80000, 8],
      [84999, 8],
      [85000, 16],
      [89999, 16],
      [90000, 24],
      [94999, 24],
      [95000, 32],
      [99999, 32],
      [100000, 39],
      [104999, 39],
      [105000, 47],
      [109999, 47],
      [110000, 55],
      [114999, 55],
      [115000, 63],
      [119999, 63],
      [120000, 71],
      [124999, 71],
      [125000, 79],
      [129999, 79],
      [130000, 87],
      [134999, 87],
      [135000, 95],
      [139999, 95],
      [140000, 103],
      [144999, 103],
      [145000, 111],
      [149999, 111],
      [150000, 118],
      [154999, 118],
      [155000, 126],
      [159999, 126],
      [160000, 134],
      [164999, 134],
      [165000, 142],
      [169999, 142],
      [170000, 150],
      [220000, 150],
    ];

    for (const [salary, expectedPoints] of testCases) {
      const res = getEarningsPoints({
        hasEligibleSkilledEmploymentInVic: true,
        annualEarningsAud: salary,
      });
      expect(res.points).toBe(expectedPoints);
    }
  });
});

describe('VPT Scoring Engine - Total Score Calculation & Invariants', () => {
  it('confirms total equals exact sum of all 7 individual factor scores', () => {
    const sampleInput: VptCalculatorInputs = {
      visaSubclass: '190',
      age: 28, // 300
      english: 'superior', // 200
      experienceCategory: '3_to_5_years', // 60
      education: 'masters', // 75
      occupationSkillLevel: 'level_1', // 50
      partner: {
        status: 'partnered_claiming',
        claimsTenFederalPoints: true,
        includedInNomination: true,
        occupationInPriorityIndustry: true,
      }, // 50
      earnings: {
        hasEligibleSkilledEmploymentInVic: true,
        annualEarningsAud: 110000, // 55
      },
    };

    const res = calculateVptTotal(sampleInput);

    const individualSum =
      res.factors.age.points +
      res.factors.english.points +
      res.factors.experience.points +
      res.factors.education.points +
      res.factors.occupation.points +
      res.factors.partner.points +
      res.factors.earnings.points;

    expect(res.totalPoints).toBe(individualSum);
    expect(res.totalPoints).toBe(300 + 200 + 60 + 75 + 50 + 50 + 55); // 790
    expect(res.isComplete).toBe(true);
    expect(res.isProvisional).toBe(false);
  });

  it('marks score as incomplete and provisional when required questions are unanswered', () => {
    const partialInput: VptCalculatorInputs = {
      age: 25,
      english: 'proficient',
    };

    const res = calculateVptTotal(partialInput);
    expect(res.isComplete).toBe(false);
    expect(res.isProvisional).toBe(true);
    expect(res.unansweredQuestions.length).toBeGreaterThan(0);
    expect(res.unansweredQuestions).toContain('Years of Experience');
    expect(res.unansweredQuestions).toContain('Educational Qualification');
  });

  it('marks score as provisional if an answered factor has unverified assumptions', () => {
    const inputWithUnverified: VptCalculatorInputs = {
      visaSubclass: '190',
      age: 30,
      english: 'competent',
      experienceCategory: '1_to_3_years',
      education: 'bachelor_honours',
      occupationSkillLevel: 'unverified', // Unverified
      partner: { status: 'single' },
      earnings: { hasEligibleSkilledEmploymentInVic: false },
    };

    const res = calculateVptTotal(inputWithUnverified);
    expect(res.isComplete).toBe(true);
    expect(res.isProvisional).toBe(true);
    expect(res.itemsNeedingVerification.length).toBeGreaterThan(0);
  });

  it('generates accurate salary scenarios comparing deltas', () => {
    const baseInput: VptCalculatorInputs = {
      age: 26, // 300
      english: 'proficient', // 100
      experienceCategory: '1_to_3_years', // 40
      education: 'bachelor_honours', // 50
      occupationSkillLevel: 'level_1', // 50
      partner: { status: 'single' }, // 0
      earnings: {
        hasEligibleSkilledEmploymentInVic: true,
        annualEarningsAud: 85000, // 16
      },
    };

    const scenarios = generateSalaryScenarios(baseInput, [80000, 85000, 100000, 130000, 170000]);
    expect(scenarios.length).toBe(5);

    // At $85,000, delta should be 0
    const scenario85k = scenarios.find((s) => s.hypotheticalSalary === 85000);
    expect(scenario85k?.points).toBe(16);
    expect(scenario85k?.pointsDelta).toBe(0);

    // At $100,000, points is 39, delta is 39 - 16 = 23
    const scenario100k = scenarios.find((s) => s.hypotheticalSalary === 100000);
    expect(scenario100k?.points).toBe(39);
    expect(scenario100k?.pointsDelta).toBe(23);

    // At $170,000, points is 150, delta is 150 - 16 = 134
    const scenario170k = scenarios.find((s) => s.hypotheticalSalary === 170000);
    expect(scenario170k?.points).toBe(150);
    expect(scenario170k?.pointsDelta).toBe(134);
    expect(scenario170k?.projectedTotalVpt).toBe(300 + 100 + 40 + 50 + 50 + 0 + 150);
  });
});
