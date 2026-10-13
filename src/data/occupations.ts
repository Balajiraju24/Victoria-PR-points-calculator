/**
 * Verified Victorian Priority Industries & Key Occupations Reference Data
 *
 * Source: Live in Melbourne (Victorian State Government)
 * URL: https://liveinmelbourne.vic.gov.au/migrate/skilled-migration-visas
 * Verified: October 2024
 */

export interface PriorityIndustry {
  id: string;
  name: string;
  description: string;
  targetFocus: string;
}

export interface OccupationItem {
  anzscoCode: string;
  title: string;
  skillLevel: 'level_1' | 'level_2' | 'level_3';
  skillLevelLabel: string;
  priorityIndustryId?: string;
  priorityIndustryName?: string;
  eligibleSubclasses: ('190' | '491')[];
  sourceUrl: string;
  lastVerifiedDate: string;
  notes?: string;
}

export const VICTORIAN_PRIORITY_INDUSTRIES: PriorityIndustry[] = [
  {
    id: 'health',
    name: 'Health & Medical',
    description: 'Critical medical, nursing, and allied health professionals supporting Victoria\'s healthcare infrastructure.',
    targetFocus: 'Hospitals, regional clinics, aged care, and community healthcare providers across Victoria.',
  },
  {
    id: 'education',
    name: 'Education & Early Childhood',
    description: 'Qualified educators addressing acute teacher shortages across Victorian schools and early learning centres.',
    targetFocus: 'Early childhood teachers, secondary school teachers, and specialized education instructors.',
  },
  {
    id: 'social_services',
    name: 'Social Services & Community Care',
    description: 'Professionals providing frontline community, mental health, family, and disability support services.',
    targetFocus: 'Social workers, clinical psychologists, welfare advisors, and community support managers.',
  },
  {
    id: 'clean_economy',
    name: 'Clean Economy & Renewable Energy',
    description: 'Engineers, technical specialists, and environmental professionals driving Victoria\'s transition to net-zero emissions.',
    targetFocus: 'Wind, solar, battery storage, transmission infrastructure, and environmental management.',
  },
  {
    id: 'advanced_manufacturing',
    name: 'Advanced Manufacturing',
    description: 'Specialists supporting aerospace, biotech, automotive technologies, and high-value materials production.',
    targetFocus: 'Robotics, automation, precision engineering, and specialized industrial design.',
  },
  {
    id: 'digital_economy',
    name: 'Digital Economy & Emerging Tech',
    description: 'High-skill software, cyber security, data analytics, and cloud architects driving state economic productivity.',
    targetFocus: 'Enterprise cyber security, distributed computing, fintech, artificial intelligence, and digital infrastructure.',
  },
  {
    id: 'regional_development',
    name: 'Regional Priority Sectors (Subclass 491)',
    description: 'Targeted skilled occupations driving regional economic growth, regional infrastructure, agriculture, and hospitality in regional Victoria.',
    targetFocus: 'Regional Victoria local government areas outside metropolitan Melbourne.',
  },
];

export const VERIFIED_OCCUPATIONS: OccupationItem[] = [
  // Health
  {
    anzscoCode: '254499',
    title: 'Registered Nurses nec',
    skillLevel: 'level_1',
    skillLevelLabel: 'Skill Level 1 (Bachelor Degree or higher)',
    priorityIndustryId: 'health',
    priorityIndustryName: 'Health & Medical',
    eligibleSubclasses: ['190', '491'],
    sourceUrl: 'https://liveinmelbourne.vic.gov.au/migrate/skilled-migration-visas',
    lastVerifiedDate: 'October 2024',
    notes: 'Consistently prioritized for invitations across Victorian invitation rounds.',
  },
  {
    anzscoCode: '254412',
    title: 'Registered Nurse (Aged Care)',
    skillLevel: 'level_1',
    skillLevelLabel: 'Skill Level 1 (Bachelor Degree or higher)',
    priorityIndustryId: 'health',
    priorityIndustryName: 'Health & Medical',
    eligibleSubclasses: ['190', '491'],
    sourceUrl: 'https://liveinmelbourne.vic.gov.au/migrate/skilled-migration-visas',
    lastVerifiedDate: 'October 2024',
    notes: 'High demand in both metropolitan and regional facilities.',
  },
  {
    anzscoCode: '253111',
    title: 'General Practitioner',
    skillLevel: 'level_1',
    skillLevelLabel: 'Skill Level 1 (Bachelor Degree or higher)',
    priorityIndustryId: 'health',
    priorityIndustryName: 'Health & Medical',
    eligibleSubclasses: ['190', '491'],
    sourceUrl: 'https://liveinmelbourne.vic.gov.au/migrate/skilled-migration-visas',
    lastVerifiedDate: 'October 2024',
  },
  {
    anzscoCode: '252511',
    title: 'Physiotherapist',
    skillLevel: 'level_1',
    skillLevelLabel: 'Skill Level 1 (Bachelor Degree or higher)',
    priorityIndustryId: 'health',
    priorityIndustryName: 'Health & Medical',
    eligibleSubclasses: ['190', '491'],
    sourceUrl: 'https://liveinmelbourne.vic.gov.au/migrate/skilled-migration-visas',
    lastVerifiedDate: 'October 2024',
  },
  {
    anzscoCode: '252411',
    title: 'Occupational Therapist',
    skillLevel: 'level_1',
    skillLevelLabel: 'Skill Level 1 (Bachelor Degree or higher)',
    priorityIndustryId: 'health',
    priorityIndustryName: 'Health & Medical',
    eligibleSubclasses: ['190', '491'],
    sourceUrl: 'https://liveinmelbourne.vic.gov.au/migrate/skilled-migration-visas',
    lastVerifiedDate: 'October 2024',
  },

  // Education
  {
    anzscoCode: '241111',
    title: 'Early Childhood (Pre-primary School) Teacher',
    skillLevel: 'level_1',
    skillLevelLabel: 'Skill Level 1 (Bachelor Degree or higher)',
    priorityIndustryId: 'education',
    priorityIndustryName: 'Education & Early Childhood',
    eligibleSubclasses: ['190', '491'],
    sourceUrl: 'https://liveinmelbourne.vic.gov.au/migrate/skilled-migration-visas',
    lastVerifiedDate: 'October 2024',
    notes: 'Major priority under Victoria\'s "Best Start, Best Life" early education expansion.',
  },
  {
    anzscoCode: '241411',
    title: 'Secondary School Teacher',
    skillLevel: 'level_1',
    skillLevelLabel: 'Skill Level 1 (Bachelor Degree or higher)',
    priorityIndustryId: 'education',
    priorityIndustryName: 'Education & Early Childhood',
    eligibleSubclasses: ['190', '491'],
    sourceUrl: 'https://liveinmelbourne.vic.gov.au/migrate/skilled-migration-visas',
    lastVerifiedDate: 'October 2024',
    notes: 'High demand in STEM, languages, and regional high schools.',
  },
  {
    anzscoCode: '241599',
    title: 'Special Education Teachers nec',
    skillLevel: 'level_1',
    skillLevelLabel: 'Skill Level 1 (Bachelor Degree or higher)',
    priorityIndustryId: 'education',
    priorityIndustryName: 'Education & Early Childhood',
    eligibleSubclasses: ['190', '491'],
    sourceUrl: 'https://liveinmelbourne.vic.gov.au/migrate/skilled-migration-visas',
    lastVerifiedDate: 'October 2024',
  },

  // Social Services
  {
    anzscoCode: '272511',
    title: 'Social Worker',
    skillLevel: 'level_1',
    skillLevelLabel: 'Skill Level 1 (Bachelor Degree or higher)',
    priorityIndustryId: 'social_services',
    priorityIndustryName: 'Social Services & Community Care',
    eligibleSubclasses: ['190', '491'],
    sourceUrl: 'https://liveinmelbourne.vic.gov.au/migrate/skilled-migration-visas',
    lastVerifiedDate: 'October 2024',
  },
  {
    anzscoCode: '272311',
    title: 'Clinical Psychologist',
    skillLevel: 'level_1',
    skillLevelLabel: 'Skill Level 1 (Bachelor Degree or higher)',
    priorityIndustryId: 'social_services',
    priorityIndustryName: 'Social Services & Community Care',
    eligibleSubclasses: ['190', '491'],
    sourceUrl: 'https://liveinmelbourne.vic.gov.au/migrate/skilled-migration-visas',
    lastVerifiedDate: 'October 2024',
  },

  // Clean Economy & Energy
  {
    anzscoCode: '233311',
    title: 'Electrical Engineer',
    skillLevel: 'level_1',
    skillLevelLabel: 'Skill Level 1 (Bachelor Degree or higher)',
    priorityIndustryId: 'clean_economy',
    priorityIndustryName: 'Clean Economy & Renewable Energy',
    eligibleSubclasses: ['190', '491'],
    sourceUrl: 'https://liveinmelbourne.vic.gov.au/migrate/skilled-migration-visas',
    lastVerifiedDate: 'October 2024',
    notes: 'Supporting grid modernization, renewable energy zones, and clean power generation.',
  },
  {
    anzscoCode: '233915',
    title: 'Environmental Engineer',
    skillLevel: 'level_1',
    skillLevelLabel: 'Skill Level 1 (Bachelor Degree or higher)',
    priorityIndustryId: 'clean_economy',
    priorityIndustryName: 'Clean Economy & Renewable Energy',
    eligibleSubclasses: ['190', '491'],
    sourceUrl: 'https://liveinmelbourne.vic.gov.au/migrate/skilled-migration-visas',
    lastVerifiedDate: 'October 2024',
  },
  {
    anzscoCode: '233211',
    title: 'Civil Engineer',
    skillLevel: 'level_1',
    skillLevelLabel: 'Skill Level 1 (Bachelor Degree or higher)',
    priorityIndustryId: 'clean_economy',
    priorityIndustryName: 'Clean Economy & Renewable Energy',
    eligibleSubclasses: ['190', '491'],
    sourceUrl: 'https://liveinmelbourne.vic.gov.au/migrate/skilled-migration-visas',
    lastVerifiedDate: 'October 2024',
  },

  // Advanced Manufacturing
  {
    anzscoCode: '233512',
    title: 'Mechanical Engineer',
    skillLevel: 'level_1',
    skillLevelLabel: 'Skill Level 1 (Bachelor Degree or higher)',
    priorityIndustryId: 'advanced_manufacturing',
    priorityIndustryName: 'Advanced Manufacturing',
    eligibleSubclasses: ['190', '491'],
    sourceUrl: 'https://liveinmelbourne.vic.gov.au/migrate/skilled-migration-visas',
    lastVerifiedDate: 'October 2024',
  },
  {
    anzscoCode: '233511',
    title: 'Industrial Engineer',
    skillLevel: 'level_1',
    skillLevelLabel: 'Skill Level 1 (Bachelor Degree or higher)',
    priorityIndustryId: 'advanced_manufacturing',
    priorityIndustryName: 'Advanced Manufacturing',
    eligibleSubclasses: ['190', '491'],
    sourceUrl: 'https://liveinmelbourne.vic.gov.au/migrate/skilled-migration-visas',
    lastVerifiedDate: 'October 2024',
  },

  // Digital Economy / Tech
  {
    anzscoCode: '261313',
    title: 'Software Engineer',
    skillLevel: 'level_1',
    skillLevelLabel: 'Skill Level 1 (Bachelor Degree or higher)',
    priorityIndustryId: 'digital_economy',
    priorityIndustryName: 'Digital Economy & Emerging Tech',
    eligibleSubclasses: ['190', '491'],
    sourceUrl: 'https://liveinmelbourne.vic.gov.au/migrate/skilled-migration-visas',
    lastVerifiedDate: 'October 2024',
    notes: 'Key driver of Victorian tech industry, enterprise digital transformation.',
  },
  {
    anzscoCode: '261312',
    title: 'Developer Programmer',
    skillLevel: 'level_1',
    skillLevelLabel: 'Skill Level 1 (Bachelor Degree or higher)',
    priorityIndustryId: 'digital_economy',
    priorityIndustryName: 'Digital Economy & Emerging Tech',
    eligibleSubclasses: ['190', '491'],
    sourceUrl: 'https://liveinmelbourne.vic.gov.au/migrate/skilled-migration-visas',
    lastVerifiedDate: 'October 2024',
  },
  {
    anzscoCode: '262112',
    title: 'ICT Security Specialist',
    skillLevel: 'level_1',
    skillLevelLabel: 'Skill Level 1 (Bachelor Degree or higher)',
    priorityIndustryId: 'digital_economy',
    priorityIndustryName: 'Digital Economy & Emerging Tech',
    eligibleSubclasses: ['190', '491'],
    sourceUrl: 'https://liveinmelbourne.vic.gov.au/migrate/skilled-migration-visas',
    lastVerifiedDate: 'October 2024',
    notes: 'High demand in banking, government, and cybersecurity consulting.',
  },
  {
    anzscoCode: '261111',
    title: 'ICT Business Analyst',
    skillLevel: 'level_1',
    skillLevelLabel: 'Skill Level 1 (Bachelor Degree or higher)',
    priorityIndustryId: 'digital_economy',
    priorityIndustryName: 'Digital Economy & Emerging Tech',
    eligibleSubclasses: ['190', '491'],
    sourceUrl: 'https://liveinmelbourne.vic.gov.au/migrate/skilled-migration-visas',
    lastVerifiedDate: 'October 2024',
  },
  {
    anzscoCode: '261112',
    title: 'Systems Analyst',
    skillLevel: 'level_1',
    skillLevelLabel: 'Skill Level 1 (Bachelor Degree or higher)',
    priorityIndustryId: 'digital_economy',
    priorityIndustryName: 'Digital Economy & Emerging Tech',
    eligibleSubclasses: ['190', '491'],
    sourceUrl: 'https://liveinmelbourne.vic.gov.au/migrate/skilled-migration-visas',
    lastVerifiedDate: 'October 2024',
  },

  // Regional / Skill Level 2 & 3 examples
  {
    anzscoCode: '351411',
    title: 'Cook',
    skillLevel: 'level_3',
    skillLevelLabel: 'Skill Level 3 (Cert III/IV with training)',
    priorityIndustryId: 'regional_development',
    priorityIndustryName: 'Regional Priority Sectors (Subclass 491)',
    eligibleSubclasses: ['491'],
    sourceUrl: 'https://liveinmelbourne.vic.gov.au/migrate/skilled-migration-visas',
    lastVerifiedDate: 'October 2024',
    notes: 'Eligible for Subclass 491 Regional Nomination; ANZSCO Skill Level 3 awards 0 VPT skill level points.',
  },
  {
    anzscoCode: '351311',
    title: 'Chef',
    skillLevel: 'level_2',
    skillLevelLabel: 'Skill Level 2 (Associate Degree / Advanced Diploma / Diploma)',
    priorityIndustryId: 'regional_development',
    priorityIndustryName: 'Regional Priority Sectors (Subclass 491)',
    eligibleSubclasses: ['190', '491'],
    sourceUrl: 'https://liveinmelbourne.vic.gov.au/migrate/skilled-migration-visas',
    lastVerifiedDate: 'October 2024',
    notes: 'ANZSCO Skill Level 2 awards 0 VPT skill level points under Victorian criteria.',
  },
  {
    anzscoCode: '341111',
    title: 'Electrician (General)',
    skillLevel: 'level_3',
    skillLevelLabel: 'Skill Level 3 (Cert III/IV with training)',
    priorityIndustryId: 'clean_economy',
    priorityIndustryName: 'Clean Economy & Renewable Energy',
    eligibleSubclasses: ['190', '491'],
    sourceUrl: 'https://liveinmelbourne.vic.gov.au/migrate/skilled-migration-visas',
    lastVerifiedDate: 'October 2024',
    notes: 'Skilled trade critical for electrification and building infrastructure. Awards 0 VPT occupation skill level points.',
  },
];
