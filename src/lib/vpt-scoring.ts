/**
 * Victorian Points Test (VPT) Official Scoring Engine
 *
 * Official Authority Sources:
 * - Victorian Points Test: https://liveinmelbourne.vic.gov.au/migrate/skilled-migration-visas/vpt
 * - Victorian Points Test FAQs: https://liveinmelbourne.vic.gov.au/migrate/skilled-migration-visas/newfaqs
 * - Victorian Earnings Calculator & Guide: https://liveinmelbourne.vic.gov.au/migrate/skilled-migration-visas/earnings-calculator
 * - Victorian Registration of Interest (ROI) Guide: https://liveinmelbourne.vic.gov.au/migrate/skilled-migration-visas/registration-of-interest-for-victorian-state-visa-nomination
 * - Australian Department of Home Affairs (SkillSelect Points): https://immi.homeaffairs.gov.au/help-support/departmental-forms/online-forms/points-calculator
 *
 * Program Year: 2024-2025 / 2025-2026
 * Rules Version: "2024.1-VPT"
 * Last Verified Date: "October 2024"
 */

export const VPT_CONFIG = {
  version: '2024.1-VPT',
  lastVerifiedDate: 'October 2024',
  officialSourceUrl: 'https://liveinmelbourne.vic.gov.au/migrate/skilled-migration-visas/vpt',
  earningsGuideUrl: 'https://liveinmelbourne.vic.gov.au/migrate/skilled-migration-visas/earnings-calculator',
  federalPointsUrl: 'https://immi.homeaffairs.gov.au/help-support/departmental-forms/online-forms/points-calculator',
  maxTheoreticalScore: 950, // 300 (Age) + 200 (English) + 150 (Earnings) + 100 (Experience) + 100 (Education) + 50 (Occupation) + 50 (Partner)
} as const;

export type VisaSubclass = '190' | '491';

export type EnglishProficiency = 'competent' | 'proficient' | 'superior';

export type ExperienceCategory =
  | '0_years'
  | '1_year'
  | '1_to_3_years'
  | '3_to_5_years'
  | '6_to_8_years'
  | 'more_than_8_years';

export type EducationLevel = 'other' | 'bachelor_honours' | 'masters' | 'phd';

export type OccupationSkillLevel = 'level_1' | 'level_2' | 'level_3' | 'unverified';

export interface PartnerInputs {
  status: 'single' | 'partnered_no_claim' | 'partnered_claiming';
  // If claiming eligible partner skills, all 3 mandatory requirements must be checked
  claimsTenFederalPoints?: boolean;
  includedInNomination?: boolean;
  occupationInPriorityIndustry?: boolean;
}

export interface EarningsInput {
  hasEligibleSkilledEmploymentInVic: boolean;
  annualEarningsAud?: number;
}

export interface VptCalculatorInputs {
  visaSubclass?: VisaSubclass;
  age?: number;
  english?: EnglishProficiency;
  experienceCategory?: ExperienceCategory;
  experienceYearsNumeric?: number;
  education?: EducationLevel;
  occupationSkillLevel?: OccupationSkillLevel;
  occupationTitle?: string;
  anzscoCode?: string;
  partner?: PartnerInputs;
  earnings?: EarningsInput;
}

export interface FactorScoreResult {
  factorId: 'age' | 'english' | 'experience' | 'education' | 'occupation' | 'partner' | 'earnings';
  factorName: string;
  points: number;
  maxPossible: number;
  isAnswered: boolean;
  isVerified: boolean;
  selectedLabel: string;
  notes?: string;
  warnings?: string[];
  limitations?: string[];
}

export interface VptCalculationResult {
  totalPoints: number;
  isComplete: boolean;
  isProvisional: boolean;
  visaSubclass?: VisaSubclass;
  factors: {
    age: FactorScoreResult;
    english: FactorScoreResult;
    experience: FactorScoreResult;
    education: FactorScoreResult;
    occupation: FactorScoreResult;
    partner: FactorScoreResult;
    earnings: FactorScoreResult;
  };
  unansweredQuestions: string[];
  itemsNeedingVerification: string[];
  ruleVersion: string;
  lastVerifiedDate: string;
  calculatedAt: string;
}

/**
 * Official Age Points Table
 * Age 18: 265
 * Age 19: 282
 * Age 20-29: 300
 * Age 30: 286
 * Age 31: 270
 * Age 32: 256
 * Age 33: 240
 * Age 34: 226
 * Age 35: 210
 * Age 36: 196
 * Age 37: 180
 * Age 38: 166
 * Age 39: 150
 * Age 40: 136
 * Age 41: 106
 * Age 42: 76
 * Age 43: 46
 * Age 44: 16
 */
export const OFFICIAL_AGE_POINTS: Record<number, number> = {
  18: 265,
  19: 282,
  20: 300,
  21: 300,
  22: 300,
  23: 300,
  24: 300,
  25: 300,
  26: 300,
  27: 300,
  28: 300,
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

export function getAgePoints(age: number | null | undefined): FactorScoreResult {
  if (age === undefined || age === null || isNaN(age)) {
    return {
      factorId: 'age',
      factorName: 'Age',
      points: 0,
      maxPossible: 300,
      isAnswered: false,
      isVerified: false,
      selectedLabel: 'Unanswered',
    };
  }

  const roundedAge = Math.floor(age);

  if (roundedAge < 18) {
    return {
      factorId: 'age',
      factorName: 'Age',
      points: 0,
      maxPossible: 300,
      isAnswered: true,
      isVerified: true,
      selectedLabel: `Age ${roundedAge} (Under 18)`,
      warnings: ['Applicants must be at least 18 years of age at the time of nomination invitation.'],
    };
  }

  if (roundedAge >= 45) {
    return {
      factorId: 'age',
      factorName: 'Age',
      points: 0,
      maxPossible: 300,
      isAnswered: true,
      isVerified: true,
      selectedLabel: `Age ${roundedAge} (45 or older)`,
      warnings: [
        'Applicants must be under 45 years of age at the time of nomination invitation under Australian skilled visa requirements.',
      ],
    };
  }

  const points = OFFICIAL_AGE_POINTS[roundedAge];
  if (points !== undefined) {
    return {
      factorId: 'age',
      factorName: 'Age',
      points,
      maxPossible: 300,
      isAnswered: true,
      isVerified: true,
      selectedLabel: `${roundedAge} years old`,
      notes: roundedAge >= 20 && roundedAge <= 29 ? 'Maximum age points bracket (Ages 20–29).' : undefined,
    };
  }

  return {
    factorId: 'age',
    factorName: 'Age',
    points: 0,
    maxPossible: 300,
    isAnswered: true,
    isVerified: false,
    selectedLabel: `Age ${roundedAge} (Unpublished score)`,
    warnings: ['Age is outside standard published schedule. Needs verification.'],
  };
}

/**
 * Official English Proficiency Points:
 * - Competent: 0 points (minimum baseline required for skilled visa)
 * - Proficient: 100 points
 * - Superior: 200 points
 */
export function getEnglishPoints(english: EnglishProficiency | null | undefined): FactorScoreResult {
  if (!english) {
    return {
      factorId: 'english',
      factorName: 'English Language Proficiency',
      points: 0,
      maxPossible: 200,
      isAnswered: false,
      isVerified: false,
      selectedLabel: 'Unanswered',
    };
  }

  switch (english) {
    case 'competent':
      return {
        factorId: 'english',
        factorName: 'English Language Proficiency',
        points: 0,
        maxPossible: 200,
        isAnswered: true,
        isVerified: true,
        selectedLabel: 'Competent English (IELTS 6.0 / PTE 50)',
        notes: 'Meets the mandatory minimum threshold for skilled migration, but yields 0 VPT points.',
      };
    case 'proficient':
      return {
        factorId: 'english',
        factorName: 'English Language Proficiency',
        points: 100,
        maxPossible: 200,
        isAnswered: true,
        isVerified: true,
        selectedLabel: 'Proficient English (IELTS 7.0 / PTE 65)',
        notes: 'Contributes 100 points towards your VPT ranking.',
      };
    case 'superior':
      return {
        factorId: 'english',
        factorName: 'English Language Proficiency',
        points: 200,
        maxPossible: 200,
        isAnswered: true,
        isVerified: true,
        selectedLabel: 'Superior English (IELTS 8.0 / PTE 79)',
        notes: 'Maximum English points allocation (200 points).',
      };
    default:
      return {
        factorId: 'english',
        factorName: 'English Language Proficiency',
        points: 0,
        maxPossible: 200,
        isAnswered: false,
        isVerified: false,
        selectedLabel: 'Unknown',
      };
  }
}

/**
 * Official Years of Experience in Nominated Occupation:
 * - 0 years: 0 points
 * - 1 year: 20 points
 * - 1-3 years: 40 points
 * - 3-5 years: 60 points
 * - 6-8 years: 80 points
 * - More than 8 years: 100 points
 *
 * Boundary handling & Ambiguity Notes:
 * Published labels overlap at 1, 3, 5/6, and 8 years.
 * Candidates select discrete categories when submitting their ROI on the Live in Melbourne portal.
 */
export const EXPERIENCE_POINTS_MAP: Record<ExperienceCategory, { points: number; label: string; description: string }> = {
  '0_years': {
    points: 0,
    label: '0 years (Less than 1 year)',
    description: 'Under 12 months of post-qualification skilled experience.',
  },
  '1_year': {
    points: 20,
    label: '1 year',
    description: 'Exactly 1 year or under 1-3 years bracket.',
  },
  '1_to_3_years': {
    points: 40,
    label: '1–3 years',
    description: 'At least 1 year and up to 3 years.',
  },
  '3_to_5_years': {
    points: 60,
    label: '3–5 years',
    description: 'At least 3 years and up to 5 years.',
  },
  '6_to_8_years': {
    points: 80,
    label: '6–8 years',
    description: 'At least 6 years and up to 8 years.',
  },
  'more_than_8_years': {
    points: 100,
    label: 'More than 8 years',
    description: 'Over 8 years of skilled experience.',
  },
};

/**
 * Helper to map numeric years of experience to the official category.
 * Also highlights boundary overlaps for user transparency.
 */
export function mapNumericYearsToCategory(years: number): {
  category: ExperienceCategory;
  hasBoundaryAmbiguity: boolean;
  ambiguityExplanation?: string;
} {
  if (years < 1) {
    return { category: '0_years', hasBoundaryAmbiguity: false };
  }
  if (years === 1) {
    return {
      category: '1_year',
      hasBoundaryAmbiguity: true,
      ambiguityExplanation:
        'Victoria publishes both "1 year" (20 pts) and "1–3 years" (40 pts). If your ROI form permits selecting "1–3 years" with exactly 12 months experience, you may qualify for 40 pts. Conservative calculation applies 20 pts.',
    };
  }
  if (years > 1 && years < 3) {
    return { category: '1_to_3_years', hasBoundaryAmbiguity: false };
  }
  if (years === 3) {
    return {
      category: '1_to_3_years',
      hasBoundaryAmbiguity: true,
      ambiguityExplanation:
        'Victoria publishes both "1–3 years" (40 pts) and "3–5 years" (60 pts). In ROI dropdowns, check whether 3 completed years qualifies for the 3–5 bracket under your specific assessment.',
    };
  }
  if (years > 3 && years <= 5) {
    return { category: '3_to_5_years', hasBoundaryAmbiguity: false };
  }
  if (years > 5 && years < 6) {
    return {
      category: '3_to_5_years',
      hasBoundaryAmbiguity: true,
      ambiguityExplanation:
        'The published table skips from "3–5 years" to "6–8 years". Experience between 5.0 and 5.99 years conservatively maps to 60 points (3–5 years bracket).',
    };
  }
  if (years >= 6 && years <= 8) {
    return { category: '6_to_8_years', hasBoundaryAmbiguity: false };
  }
  return { category: 'more_than_8_years', hasBoundaryAmbiguity: false };
}

export function getExperiencePoints(
  category?: ExperienceCategory | null,
  numericYears?: number | null
): FactorScoreResult {
  if (!category && (numericYears === undefined || numericYears === null || isNaN(numericYears))) {
    return {
      factorId: 'experience',
      factorName: 'Years of Experience',
      points: 0,
      maxPossible: 100,
      isAnswered: false,
      isVerified: false,
      selectedLabel: 'Unanswered',
    };
  }

  let selectedCategory: ExperienceCategory;
  let ambiguityNote: string | undefined;

  if (category) {
    selectedCategory = category;
    if (category === '1_year') {
      ambiguityNote =
        'Note: Victoria publishes both "1 year" (20 pts) and "1–3 years" (40 pts). Confirm with your ROI options.';
    }
  } else {
    const mapped = mapNumericYearsToCategory(numericYears!);
    selectedCategory = mapped.category;
    ambiguityNote = mapped.ambiguityExplanation;
  }

  const config = EXPERIENCE_POINTS_MAP[selectedCategory];

  return {
    factorId: 'experience',
    factorName: 'Years of Experience',
    points: config.points,
    maxPossible: 100,
    isAnswered: true,
    isVerified: !ambiguityNote,
    selectedLabel: config.label,
    notes: 'Experience must be in the nominated or closely related skilled occupation.',
    limitations: ambiguityNote ? [ambiguityNote] : undefined,
  };
}

/**
 * Official Education Points:
 * - Other: 25 points
 * - Bachelor's degree or Honours: 50 points
 * - Master's degree: 75 points
 * - PhD: 100 points
 */
export const EDUCATION_POINTS_MAP: Record<EducationLevel, { points: number; label: string; description: string }> = {
  other: {
    points: 25,
    label: 'Other Qualification (Diploma / Trade Certificate / Cert IV)',
    description: 'Recognized Australian or overseas diploma or trade qualification.',
  },
  bachelor_honours: {
    points: 50,
    label: "Bachelor's Degree or Honours",
    description: 'Completed Bachelor degree or Bachelor with Honours.',
  },
  masters: {
    points: 75,
    label: "Master's Degree",
    description: 'Completed Master by coursework or Master by research.',
  },
  phd: {
    points: 100,
    label: 'Doctoral Degree (PhD)',
    description: 'Completed Doctorate degree.',
  },
};

export function getEducationPoints(education?: EducationLevel | null): FactorScoreResult {
  if (!education) {
    return {
      factorId: 'education',
      factorName: 'Educational Qualification',
      points: 0,
      maxPossible: 100,
      isAnswered: false,
      isVerified: false,
      selectedLabel: 'Unanswered',
    };
  }

  const item = EDUCATION_POINTS_MAP[education];
  if (!item) {
    return {
      factorId: 'education',
      factorName: 'Educational Qualification',
      points: 0,
      maxPossible: 100,
      isAnswered: false,
      isVerified: false,
      selectedLabel: 'Unknown',
    };
  }

  return {
    factorId: 'education',
    factorName: 'Educational Qualification',
    points: item.points,
    maxPossible: 100,
    isAnswered: true,
    isVerified: true,
    selectedLabel: item.label,
    notes: 'Victoria awards points for the highest relevant qualification completed.',
  };
}

/**
 * Official Occupation Skill Level Points:
 * - ANZSCO Skill Level 1: 50 points
 * - ANZSCO Skill Level 2: 0 points
 * - ANZSCO Skill Level 3: 0 points
 * - Unverified: 0 points (Needs verification)
 */
export function getOccupationPoints(
  skillLevel?: OccupationSkillLevel | null,
  occupationTitle?: string,
  anzscoCode?: string
): FactorScoreResult {
  if (!skillLevel) {
    return {
      factorId: 'occupation',
      factorName: 'Occupation Skill Level',
      points: 0,
      maxPossible: 50,
      isAnswered: false,
      isVerified: false,
      selectedLabel: 'Unanswered',
    };
  }

  const occupationDetails = occupationTitle
    ? anzscoCode
      ? ` (${occupationTitle} - ANZSCO ${anzscoCode})`
      : ` (${occupationTitle})`
    : anzscoCode
      ? ` (ANZSCO ${anzscoCode})`
      : '';

  switch (skillLevel) {
    case 'level_1':
      return {
        factorId: 'occupation',
        factorName: 'Occupation Skill Level',
        points: 50,
        maxPossible: 50,
        isAnswered: true,
        isVerified: true,
        selectedLabel: `ANZSCO Skill Level 1${occupationDetails}`,
        notes: 'Occupations commensurate with a Bachelor degree or higher qualification.',
      };
    case 'level_2':
      return {
        factorId: 'occupation',
        factorName: 'Occupation Skill Level',
        points: 0,
        maxPossible: 50,
        isAnswered: true,
        isVerified: true,
        selectedLabel: `ANZSCO Skill Level 2${occupationDetails}`,
        notes: 'Commensurate with Associate Degree, Advanced Diploma or Diploma. 0 VPT points under Victoria table.',
      };
    case 'level_3':
      return {
        factorId: 'occupation',
        factorName: 'Occupation Skill Level',
        points: 0,
        maxPossible: 50,
        isAnswered: true,
        isVerified: true,
        selectedLabel: `ANZSCO Skill Level 3${occupationDetails}`,
        notes: 'Commensurate with Certificate IV or III with on-the-job training. 0 VPT points under Victoria table.',
      };
    case 'unverified':
    default:
      return {
        factorId: 'occupation',
        factorName: 'Occupation Skill Level',
        points: 0,
        maxPossible: 50,
        isAnswered: true,
        isVerified: false,
        selectedLabel: `Needs Verification${occupationDetails}`,
        warnings: [
          'Occupation skill level has not been confirmed against official ANZSCO classification. Check ABS/Home Affairs occupation list.',
        ],
      };
  }
}

/**
 * Official Partner Skills Points:
 * - Single: 0 points (VPT differs from Federal points!)
 * - Partnered, not claiming: 0 points
 * - Partnered, claiming: 50 points ONLY IF ALL 3 mandatory conditions are met:
 *    1. Claims 10 points for Partner Skills in federal SkillSelect EOI.
 *    2. Partner included in state nomination application.
 *    3. Partner occupation is a Victorian Priority Industry occupation.
 */
export function getPartnerPoints(partner?: PartnerInputs | null): FactorScoreResult {
  if (!partner || !partner.status) {
    return {
      factorId: 'partner',
      factorName: 'Partner Skills',
      points: 0,
      maxPossible: 50,
      isAnswered: false,
      isVerified: false,
      selectedLabel: 'Unanswered',
    };
  }

  if (partner.status === 'single') {
    return {
      factorId: 'partner',
      factorName: 'Partner Skills',
      points: 0,
      maxPossible: 50,
      isAnswered: true,
      isVerified: true,
      selectedLabel: 'Single / No Partner',
      notes:
        'Under the Victorian Points Test, single applicants receive 0 points for this factor. (Note: Under federal SkillSelect, single applicants receive 10 points. VPT is separate).',
    };
  }

  if (partner.status === 'partnered_no_claim') {
    return {
      factorId: 'partner',
      factorName: 'Partner Skills',
      points: 0,
      maxPossible: 50,
      isAnswered: true,
      isVerified: true,
      selectedLabel: 'Partnered (Not claiming eligible partner skills)',
      notes: 'Partner does not meet all 3 Victorian priority requirements or is not claiming partner points.',
    };
  }

  // Claiming eligible partner skills: verify the 3 conditions
  const conditionsMet = Boolean(
    partner.claimsTenFederalPoints &&
      partner.includedInNomination &&
      partner.occupationInPriorityIndustry
  );

  const missingConditions: string[] = [];
  if (!partner.claimsTenFederalPoints) {
    missingConditions.push('Must claim 10 partner skill points in federal SkillSelect EOI (competent English + suitable skills assessment).');
  }
  if (!partner.includedInNomination) {
    missingConditions.push('Partner must be included as an applicant in the Victorian nomination application.');
  }
  if (!partner.occupationInPriorityIndustry) {
    missingConditions.push("Partner's nominated occupation must be in a current Victorian Priority Industry.");
  }

  if (conditionsMet) {
    return {
      factorId: 'partner',
      factorName: 'Partner Skills',
      points: 50,
      maxPossible: 50,
      isAnswered: true,
      isVerified: true,
      selectedLabel: 'Claiming Eligible Partner Skills (50 points)',
      notes: 'All 3 official requirements satisfied: 10 federal points claimed, included on visa, priority occupation.',
    };
  }

  return {
    factorId: 'partner',
    factorName: 'Partner Skills',
    points: 0,
    maxPossible: 50,
    isAnswered: true,
    isVerified: false,
    selectedLabel: 'Claiming Partner Skills (Requirements Unmet — 0 pts)',
    warnings: missingConditions,
    limitations: ['All 3 conditions are strictly mandatory for 50 VPT points.'],
  };
}

/**
 * Official Annual Earnings from Skilled Employment in Victoria:
 * - Onshore applicants currently working in eligible skilled employment in Victoria.
 *
 * Scoring bands:
 * Below $80,000: 0 points
 * $80,000–$84,999: 8 points
 * $85,000–$89,999: 16 points
 * $90,000–$94,999: 24 points
 * $95,000–$99,999: 32 points
 * $100,000–$104,999: 39 points
 * $105,000–$109,999: 47 points
 * $110,000–$114,999: 55 points
 * $115,000–$119,999: 63 points
 * $120,000–$124,999: 71 points
 * $125,000–$129,999: 79 points
 * $130,000–$134,999: 87 points
 * $135,000–$139,999: 95 points
 * $140,000–$144,999: 103 points
 * $145,000–$149,999: 111 points
 * $150,000–$154,999: 118 points
 * $155,000–$159,999: 126 points
 * $160,000–$164,999: 134 points
 * $165,000–$169,999: 142 points
 * $170,000 and above: 150 points
 */
export interface EarningsBand {
  min: number;
  max: number | null; // null means unbounded
  points: number;
  label: string;
}

export const OFFICIAL_EARNINGS_BANDS: EarningsBand[] = [
  { min: 0, max: 79999.99, points: 0, label: 'Under $80,000' },
  { min: 80000, max: 84999.99, points: 8, label: '$80,000 – $84,999' },
  { min: 85000, max: 89999.99, points: 16, label: '$85,000 – $89,999' },
  { min: 90000, max: 94999.99, points: 24, label: '$90,000 – $94,999' },
  { min: 95000, max: 99999.99, points: 32, label: '$95,000 – $99,999' },
  { min: 100000, max: 104999.99, points: 39, label: '$100,000 – $104,999' },
  { min: 105000, max: 109999.99, points: 47, label: '$105,000 – $109,999' },
  { min: 110000, max: 114999.99, points: 55, label: '$110,000 – $114,999' },
  { min: 115000, max: 119999.99, points: 63, label: '$115,000 – $119,999' },
  { min: 120000, max: 124999.99, points: 71, label: '$120,000 – $124,999' },
  { min: 125000, max: 129999.99, points: 79, label: '$125,000 – $129,999' },
  { min: 130000, max: 134999.99, points: 87, label: '$130,000 – $134,999' },
  { min: 135000, max: 139999.99, points: 95, label: '$135,000 – $139,999' },
  { min: 140000, max: 144999.99, points: 103, label: '$140,000 – $144,999' },
  { min: 145000, max: 149999.99, points: 111, label: '$145,000 – $149,999' },
  { min: 150000, max: 154999.99, points: 118, label: '$150,000 – $154,999' },
  { min: 155000, max: 159999.99, points: 126, label: '$155,000 – $159,999' },
  { min: 160000, max: 164999.99, points: 134, label: '$160,000 – $164,999' },
  { min: 165000, max: 169999.99, points: 142, label: '$165,000 – $169,999' },
  { min: 170000, max: null, points: 150, label: '$170,000 and above' },
];

export function lookupEarningsPoints(annualSalary: number): { points: number; label: string } {
  if (annualSalary < 80000) {
    return { points: 0, label: 'Under $80,000 (0 points)' };
  }
  for (const band of OFFICIAL_EARNINGS_BANDS) {
    if (band.min <= annualSalary && (band.max === null || annualSalary <= band.max)) {
      return { points: band.points, label: `${band.label} (${band.points} points)` };
    }
  }
  if (annualSalary >= 170000) {
    return { points: 150, label: '$170,000 and above (150 points)' };
  }
  return { points: 0, label: 'Unknown band' };
}

export function getEarningsPoints(earnings?: EarningsInput | null): FactorScoreResult {
  if (!earnings) {
    return {
      factorId: 'earnings',
      factorName: 'Victorian Skilled Earnings',
      points: 0,
      maxPossible: 150,
      isAnswered: false,
      isVerified: false,
      selectedLabel: 'Unanswered',
    };
  }

  if (!earnings.hasEligibleSkilledEmploymentInVic) {
    return {
      factorId: 'earnings',
      factorName: 'Victorian Skilled Earnings',
      points: 0,
      maxPossible: 150,
      isAnswered: true,
      isVerified: true,
      selectedLabel: 'Not employed in eligible skilled role in Victoria',
      notes:
        'Applicable to offshore candidates or onshore applicants not currently employed in Victoria. Yields 0 VPT earnings points.',
    };
  }

  if (earnings.annualEarningsAud === undefined || earnings.annualEarningsAud === null || isNaN(earnings.annualEarningsAud)) {
    return {
      factorId: 'earnings',
      factorName: 'Victorian Skilled Earnings',
      points: 0,
      maxPossible: 150,
      isAnswered: false,
      isVerified: false,
      selectedLabel: 'Employed in Victoria — Annual salary pending',
      warnings: ['Please enter your eligible annual earnings amount in AUD.'],
    };
  }

  const salary = Math.max(0, earnings.annualEarningsAud);
  const { points, label } = lookupEarningsPoints(salary);

  const formattedSalary = new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    maximumFractionDigits: 0,
  }).format(salary);

  return {
    factorId: 'earnings',
    factorName: 'Victorian Skilled Earnings',
    points,
    maxPossible: 150,
    isAnswered: true,
    isVerified: true,
    selectedLabel: `${formattedSalary} / year — ${label}`,
    notes:
      'Only eligible earnings from skilled employment in Victoria may be claimed. Refer to Victoria\'s official Earnings Calculator & Guide for compliance.',
  };
}

/**
 * Calculates the complete VPT score breakdown across all 7 factors.
 * Ensures strict separation, provisional status flags, and itemized verification lists.
 */
export function calculateVptTotal(inputs: VptCalculatorInputs): VptCalculationResult {
  const ageFactor = getAgePoints(inputs.age);
  const englishFactor = getEnglishPoints(inputs.english);
  const experienceFactor = getExperiencePoints(inputs.experienceCategory, inputs.experienceYearsNumeric);
  const educationFactor = getEducationPoints(inputs.education);
  const occupationFactor = getOccupationPoints(
    inputs.occupationSkillLevel,
    inputs.occupationTitle,
    inputs.anzscoCode
  );
  const partnerFactor = getPartnerPoints(inputs.partner);
  const earningsFactor = getEarningsPoints(inputs.earnings);

  const factorList = [
    ageFactor,
    englishFactor,
    experienceFactor,
    educationFactor,
    occupationFactor,
    partnerFactor,
    earningsFactor,
  ];

  // Exact integer sum: never hardcoded, no floating point inaccuracies
  const totalPoints = factorList.reduce((acc, f) => acc + f.points, 0);

  const unansweredQuestions: string[] = [];
  const itemsNeedingVerification: string[] = [];

  factorList.forEach((factor) => {
    if (!factor.isAnswered) {
      unansweredQuestions.push(factor.factorName);
    }
    if (factor.isAnswered && !factor.isVerified) {
      itemsNeedingVerification.push(factor.factorName);
    }
    if (factor.warnings && factor.warnings.length > 0) {
      factor.warnings.forEach((w) => itemsNeedingVerification.push(`${factor.factorName}: ${w}`));
    }
  });

  const isComplete = unansweredQuestions.length === 0;
  const isProvisional = !isComplete || itemsNeedingVerification.length > 0;

  return {
    totalPoints,
    isComplete,
    isProvisional,
    visaSubclass: inputs.visaSubclass,
    factors: {
      age: ageFactor,
      english: englishFactor,
      experience: experienceFactor,
      education: educationFactor,
      occupation: occupationFactor,
      partner: partnerFactor,
      earnings: earningsFactor,
    },
    unansweredQuestions,
    itemsNeedingVerification,
    ruleVersion: VPT_CONFIG.version,
    lastVerifiedDate: VPT_CONFIG.lastVerifiedDate,
    calculatedAt: new Date().toISOString(),
  };
}

/**
 * Salary scenario comparison helper:
 * Computes difference in points and overall VPT score if annual salary changes,
 * keeping all other inputs constant.
 */
export interface SalaryScenarioItem {
  hypotheticalSalary: number;
  points: number;
  pointsDelta: number;
  projectedTotalVpt: number;
  label: string;
}

export function generateSalaryScenarios(
  inputs: VptCalculatorInputs,
  scenarioSalaries: number[] = [80000, 90000, 100000, 105000, 110000, 120000, 130000, 140000, 150000, 160000, 170000]
): SalaryScenarioItem[] {
  const currentBase = calculateVptTotal(inputs);
  const currentEarningsPoints = currentBase.factors.earnings.points;

  // Total points contributed by non-earnings factors
  const otherFactorsTotal =
    currentBase.factors.age.points +
    currentBase.factors.english.points +
    currentBase.factors.experience.points +
    currentBase.factors.education.points +
    currentBase.factors.occupation.points +
    currentBase.factors.partner.points;

  return scenarioSalaries.map((salary) => {
    const { points, label } = lookupEarningsPoints(salary);
    const pointsDelta = points - currentEarningsPoints;
    const projectedTotalVpt = otherFactorsTotal + points;

    return {
      hypotheticalSalary: salary,
      points,
      pointsDelta,
      projectedTotalVpt,
      label,
    };
  });
}
