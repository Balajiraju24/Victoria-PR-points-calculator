import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldAlert, AlertCircle, ExternalLink } from 'lucide-react';
import { VPT_CONFIG } from '@/lib/vpt-scoring';

export const metadata: Metadata = {
  title: 'Legal Disclaimer & Program Limitations | VicPoints',
  description:
    'Important legal notice, non-affiliation declaration, and program limitations regarding the VicPoints calculator.',
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
          <ShieldAlert className="w-3.5 h-3.5" />
          Important Legal Notice &amp; Scope of Information
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Disclaimer &amp; Limitations
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
          Please read this statement carefully before using the VicPoints calculator or relying on any estimated scores.
        </p>
      </div>

      {/* Prominent Statutory Warning Box */}
      <div className="p-8 rounded-3xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/80 text-amber-950 dark:text-amber-200 space-y-4 leading-relaxed">
        <h2 className="text-lg font-bold text-amber-900 dark:text-amber-300 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          Official Non-Affiliation Declaration
        </h2>
        <p className="text-sm sm:text-base">
          VicPoints is an independent informational tool. It is <strong>not</strong> affiliated with, endorsed by, or operated by the Victorian State Government, the Australian Commonwealth Government, or the Department of Home Affairs.
        </p>
        <p className="text-sm sm:text-base">
          The calculator provides a mathematical estimate based strictly on published scoring rules and user-provided inputs. It does <strong>not</strong> constitute immigration, legal, or registered migration-agent (MARA) advice.
        </p>
        <p className="text-sm sm:text-base">
          Official program requirements, occupation priority lists, and scoring rules may change at any time without notice. Users should verify their individual circumstances and all applicable criteria through official government sources before submitting an Expression of Interest (EOI), Registration of Interest (ROI), nomination application, or visa application.
        </p>
        <p className="text-sm sm:text-base font-semibold">
          Victoria does not publish a fixed VPT pass mark, and a calculated score cannot predict, establish, or guarantee an invitation to apply for state nomination.
        </p>
      </div>

      {/* Scope and Technical Limitations */}
      <div className="bg-white dark:bg-navy-900 p-8 rounded-3xl border border-slate-200 dark:border-navy-800 shadow-sm space-y-6 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Detailed Program Scope &amp; Boundaries
        </h2>

        <div className="space-y-4">
          <div>
            <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-1">
              1. Not a Measure of Visa Eligibility
            </h3>
            <p>
              Scoring points on the Victorian Points Test does not mean you are eligible for an Australian visa. You must satisfy separate federal criteria under the Migration Act 1958 and Migration Regulations 1994, including a valid positive skills assessment, minimum Competent English, reaching 65 federal points, and satisfying health and character standards.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-1">
              2. Annual Earnings Claims &amp; Evidence
            </h3>
            <p>
              Estimates generated in the salary scenario planner or earnings calculator are theoretical. When lodging an official ROI, claimed annual earnings must be genuine, evidenced by employment contracts, recent payslips, and PAYG payment summaries, and must strictly comply with Victoria&apos;s Annual Earnings Estimation Guide.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-1">
              3. Verification of Occupation &amp; Partner Claims
            </h3>
            <p>
              Points calculated for ANZSCO Skill Level 1 or partner skills depend on accurate official classification. If your occupation code or partner status does not satisfy Victorian priority guidelines at the time of assessment, claims may be reduced to 0 points by state assessment officers.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-1">
              4. Rules Version &amp; Audit Date
            </h3>
            <p>
              Scoring calculations reflect rules identified in Victoria&apos;s published matrix for the 2024–2025 skilled migration program year (Rules Version: {VPT_CONFIG.version}, verified {VPT_CONFIG.lastVerifiedDate}).
            </p>
          </div>
        </div>
      </div>

      {/* Official Government Links Callout */}
      <div className="p-6 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="font-bold text-slate-900 dark:text-white text-sm block">
            Seek Official &amp; Registered Migration Guidance
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Visit the official Live in Melbourne portal or consult an Australian registered migration agent (OMARA).
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/resources"
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-navy-800 border border-slate-300 dark:border-navy-700 text-slate-800 dark:text-white hover:bg-slate-100"
          >
            Official Resources Directory
          </Link>
          <a
            href="https://liveinmelbourne.vic.gov.au"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-700 text-white shadow-xs"
          >
            Live in Melbourne <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
