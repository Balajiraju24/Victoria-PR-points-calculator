import React from 'react';
import type { Metadata } from 'next';
import { ExternalLink, Bookmark, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Official Government Resources | VicPoints',
  description:
    'Curated directory of official Victorian Government and Australian Department of Home Affairs skilled migration portals.',
};

export default function ResourcesPage() {
  const officialResources = [
    {
      title: 'Victorian Points Test (VPT) Official Scoring Table',
      authority: 'Live in Melbourne (Victorian Government)',
      url: 'https://liveinmelbourne.vic.gov.au/migrate/skilled-migration-visas/vpt',
      description:
        'The primary official publication detailing the 7 scoring factors, points allocations, age brackets, and partner requirements used to rank state nomination ROIs.',
      category: 'Victoria State Program',
    },
    {
      title: 'Victorian Points Test FAQs & Clarifications',
      authority: 'Live in Melbourne (Victorian Government)',
      url: 'https://liveinmelbourne.vic.gov.au/migrate/skilled-migration-visas/newfaqs',
      description:
        'Official answers covering program timing, ROI submission requirements, handling partner claims, and work experience criteria.',
      category: 'Victoria State Program',
    },
    {
      title: 'Annual Earnings Estimation Guide',
      authority: 'Live in Melbourne (Victorian Government)',
      url: 'https://liveinmelbourne.vic.gov.au/migrate/skilled-migration-visas/earnings-calculator',
      description:
        'Detailed rules on eligible remuneration, superannuation exclusion, bonus treatment, part-time calculations, and evidence required for earnings points claims.',
      category: 'Victoria State Program',
    },
    {
      title: 'Registration of Interest (ROI) for State Nomination',
      authority: 'Live in Melbourne (Victorian Government)',
      url: 'https://liveinmelbourne.vic.gov.au/migrate/skilled-migration-visas/registration-of-interest-for-victorian-state-visa-nomination',
      description:
        'Step-by-step guidance on how to submit, update, or withdraw an ROI through the official Live in Melbourne candidate portal.',
      category: 'Victoria State Program',
    },
    {
      title: 'Department of Home Affairs Points Calculator',
      authority: 'Australian Federal Government (Immigration)',
      url: 'https://immi.homeaffairs.gov.au/help-support/departmental-forms/online-forms/points-calculator',
      description:
        'The statutory federal points test calculator for Subclasses 189, 190, and 491. Used to verify the mandatory 65-point baseline in SkillSelect.',
      category: 'Commonwealth Department of Home Affairs',
    },
    {
      title: 'Skilled Nominated Visa (Subclass 190) Legislation',
      authority: 'Australian Federal Government (Immigration)',
      url: 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/skilled-nominated-190',
      description:
        'Federal visa criteria, permanent residency entitlements, processing times, fee schedules, and health/character criteria.',
      category: 'Commonwealth Department of Home Affairs',
    },
    {
      title: 'Skilled Work Regional (Subclass 491) Legislation',
      authority: 'Australian Federal Government (Immigration)',
      url: 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/skilled-work-regional-491',
      description:
        'Federal 5-year provisional visa requirements, designated regional area postcodes for Victoria, and the permanent residency pathway via Subclass 191.',
      category: 'Commonwealth Department of Home Affairs',
    },
    {
      title: 'ANZSCO Classification Structure (ABS)',
      authority: 'Australian Bureau of Statistics (ABS)',
      url: 'https://www.abs.gov.au/statistics/classifications/anzsco-australian-and-new-zealand-standard-classification-occupations',
      description:
        'Official database defining occupation skill levels (1, 2, or 3), typical duties, and prerequisite qualifications for all Australian occupations.',
      category: 'Classification Standard',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 border border-brand-200 dark:border-brand-800">
          <Bookmark className="w-3.5 h-3.5" />
          Authoritative Reference Directory
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Official Government Resources
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed max-w-3xl">
          VicPoints is strictly an independent calculation model. Always cross-reference your claims against authoritative publications maintained directly by the Victorian State Government and Australian Commonwealth Government.
        </p>
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {officialResources.map((res) => (
          <div
            key={res.title}
            className="p-6 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <span className="text-[11px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-100 dark:bg-navy-800 text-slate-700 dark:text-slate-300">
                {res.category}
              </span>
              <h2 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                {res.title}
              </h2>
              <div className="text-xs font-medium text-brand-600 dark:text-brand-400">
                {res.authority}
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed pt-1">
                {res.description}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-navy-800">
              <a
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline"
              >
                Visit Official Source Portal <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Verification audit note */}
      <div className="p-6 rounded-2xl bg-slate-50 dark:bg-navy-900/60 border border-slate-200 dark:border-navy-800 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
        <div className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          <strong className="text-slate-900 dark:text-white block mb-1">
            Audited Against Official Publications
          </strong>
          All scoring parameters in VicPoints are benchmarked against official updates published by Live in Melbourne for the 2024–2025 program year (Last verified: October 2024). Scoring changes published by the Victorian Government are routinely updated.
        </div>
      </div>
    </div>
  );
}
