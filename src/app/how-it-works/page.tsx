import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, ArrowRight, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'How the Victorian Points Test Works | VicPoints',
  description:
    'Comprehensive guide to the 7 scoring factors of Victoria’s Points Test (VPT) for Subclasses 190 and 491.',
};

export default function HowItWorksPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 border border-brand-200 dark:border-brand-800">
            <BookOpen className="w-3.5 h-3.5" />
            Technical Guide &amp; Scoring Methodology
          </div>
          <a
            href="https://liveinmelbourne.vic.gov.au/migrate/skilled-migration-visas/vpt"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
          >
            Official Live in Melbourne VPT Matrix <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          How the Victorian Points Test (VPT) Works
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed max-w-3xl">
          Victoria assesses and ranks Registrations of Interest (ROIs) for Skilled Nominated (Subclass 190) and Skilled Work Regional (Subclass 491) visas using a merit-based matrix comprising seven weighted factors.
        </p>
      </div>

      {/* Critical concept box */}
      <div className="p-6 rounded-2xl bg-slate-100 dark:bg-navy-900 border border-slate-200 dark:border-navy-800 space-y-3">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          Why Victoria Uses the VPT Instead of Standard Federal Points
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          The federal Department of Home Affairs uses SkillSelect to evaluate general eligibility (minimum 65 points). However, because thousands of eligible candidates submit Registrations of Interest for Victoria each year, Victoria introduced the Victorian Points Test (VPT) to rank ROIs based on Victoria&apos;s specific economic needs, local skilled employment earnings, priority occupations, and partner contributions.
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          <strong>There is no fixed pass mark.</strong> A candidate with 600 VPT points in an in-demand healthcare occupation may be invited before a candidate with 750 points in an occupation where Victoria has already filled its program allocation.
        </p>
      </div>

      {/* The 7 Factors Deep-Dive */}
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-navy-800 pb-3">
          The Seven Official Scoring Factors
        </h2>

        {/* 1. Age */}
        <div className="bg-white dark:bg-navy-900 rounded-2xl p-6 border border-slate-200 dark:border-navy-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold">
                1
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Factor 1: Age (Up to 300 points)
              </h3>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-navy-800 text-slate-700 dark:text-slate-300">
              Max 300 pts
            </span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Victoria heavily weights prime working ages. Applicants aged 20 through 29 receive the maximum allocation of 300 points. Points taper systematically from age 30 down to age 44. Applicants aged 45 or older at the time of nomination invitation are not eligible under Australian skilled visa requirements.
          </p>
          <div className="overflow-x-auto rounded-xl border border-slate-100 dark:border-navy-800">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 dark:bg-navy-800 text-slate-700 dark:text-slate-300 font-semibold">
                <tr>
                  <th className="py-2.5 px-3">Age Bracket</th>
                  <th className="py-2.5 px-3">Points</th>
                  <th className="py-2.5 px-3">Age Bracket</th>
                  <th className="py-2.5 px-3">Points</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-navy-800 text-slate-600 dark:text-slate-400">
                <tr>
                  <td className="py-2 px-3 font-medium">Age 18</td>
                  <td className="py-2 px-3 font-bold text-slate-900 dark:text-white">265</td>
                  <td className="py-2 px-3 font-medium">Age 35</td>
                  <td className="py-2 px-3 font-bold text-slate-900 dark:text-white">210</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-medium">Age 19</td>
                  <td className="py-2 px-3 font-bold text-slate-900 dark:text-white">282</td>
                  <td className="py-2 px-3 font-medium">Age 38</td>
                  <td className="py-2 px-3 font-bold text-slate-900 dark:text-white">166</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-medium text-brand-600 dark:text-brand-400">Age 20–29 (Peak)</td>
                  <td className="py-2 px-3 font-bold text-brand-600 dark:text-brand-400">300</td>
                  <td className="py-2 px-3 font-medium">Age 40</td>
                  <td className="py-2 px-3 font-bold text-slate-900 dark:text-white">136</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-medium">Age 30</td>
                  <td className="py-2 px-3 font-bold text-slate-900 dark:text-white">286</td>
                  <td className="py-2 px-3 font-medium">Age 42</td>
                  <td className="py-2 px-3 font-bold text-slate-900 dark:text-white">76</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-medium">Age 32</td>
                  <td className="py-2 px-3 font-bold text-slate-900 dark:text-white">256</td>
                  <td className="py-2 px-3 font-medium">Age 44</td>
                  <td className="py-2 px-3 font-bold text-slate-900 dark:text-white">16</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 2. English */}
        <div className="bg-white dark:bg-navy-900 rounded-2xl p-6 border border-slate-200 dark:border-navy-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold">
                2
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Factor 2: English Language Proficiency (Up to 200 points)
              </h3>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-navy-800 text-slate-700 dark:text-slate-300">
              Max 200 pts
            </span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            English language ability is one of the highest-impact factors under the VPT:
          </p>
          <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-2">
            <li>
              <strong>Competent English (0 points):</strong> IELTS 6.0 / PTE 50 in all components. Satisfies the legal baseline for skilled visas, but yields no ranking points.
            </li>
            <li>
              <strong>Proficient English (100 points):</strong> IELTS 7.0 / PTE 65 in all components. Awards 100 points and is frequently recommended for high-demand occupations.
            </li>
            <li>
              <strong>Superior English (200 points):</strong> IELTS 8.0 / PTE 79 in all components. Awards the full 200 points.
            </li>
          </ul>
        </div>

        {/* 3. Experience */}
        <div className="bg-white dark:bg-navy-900 rounded-2xl p-6 border border-slate-200 dark:border-navy-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold">
                3
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Factor 3: Years of Experience in Nominated Occupation (Up to 100 points)
              </h3>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-navy-800 text-slate-700 dark:text-slate-300">
              Max 100 pts
            </span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Must be skilled experience in your nominated (or closely related) ANZSCO occupation. Published categories:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-navy-800 border border-slate-200 dark:border-navy-700">
              <span className="font-semibold block">0 years</span>
              <span className="text-slate-500 font-bold">0 points</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-navy-800 border border-slate-200 dark:border-navy-700">
              <span className="font-semibold block">1 year</span>
              <span className="text-slate-500 font-bold">20 points</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-navy-800 border border-slate-200 dark:border-navy-700">
              <span className="font-semibold block">1–3 years</span>
              <span className="text-slate-500 font-bold">40 points</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-navy-800 border border-slate-200 dark:border-navy-700">
              <span className="font-semibold block">3–5 years</span>
              <span className="text-slate-500 font-bold">60 points</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-navy-800 border border-slate-200 dark:border-navy-700">
              <span className="font-semibold block">6–8 years</span>
              <span className="text-slate-500 font-bold">80 points</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-navy-800 border border-slate-200 dark:border-navy-700">
              <span className="font-semibold block">More than 8 years</span>
              <span className="text-brand-600 dark:text-brand-400 font-bold">100 points</span>
            </div>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 italic">
            *Boundary clarification: Because Victoria publishes overlapping category labels (e.g. &apos;1 year&apos; and &apos;1-3 years&apos;), check your exact dropdown selection when submitting an ROI on Live in Melbourne.
          </p>
        </div>

        {/* 4. Education */}
        <div className="bg-white dark:bg-navy-900 rounded-2xl p-6 border border-slate-200 dark:border-navy-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold">
                4
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Factor 4: Educational Qualifications (Up to 100 points)
              </h3>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-navy-800 text-slate-700 dark:text-slate-300">
              Max 100 pts
            </span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Points are awarded for your highest verified educational qualification:
          </p>
          <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-2">
            <li><strong>Other Qualification (Diploma / Trade Certificate / Cert IV):</strong> 25 points</li>
            <li><strong>Bachelor&apos;s Degree or Honours:</strong> 50 points</li>
            <li><strong>Master&apos;s Degree (Coursework or Research):</strong> 75 points</li>
            <li><strong>Doctoral Degree (PhD):</strong> 100 points</li>
          </ul>
        </div>

        {/* 5. Occupation Skill Level */}
        <div className="bg-white dark:bg-navy-900 rounded-2xl p-6 border border-slate-200 dark:border-navy-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold">
                5
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Factor 5: Occupation ANZSCO Skill Level (Up to 50 points)
              </h3>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-navy-800 text-slate-700 dark:text-slate-300">
              Max 50 pts
            </span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Occupations classified as <strong>ANZSCO Skill Level 1</strong> (requiring a bachelor degree or higher qualification) receive <strong>50 points</strong>. Occupations at Skill Level 2 (Diploma/Associate Degree) or Skill Level 3 (Trade Certificate III/IV) receive <strong>0 points</strong> under the VPT table.
          </p>
        </div>

        {/* 6. Partner Skills */}
        <div className="bg-white dark:bg-navy-900 rounded-2xl p-6 border border-slate-200 dark:border-navy-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold">
                6
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Factor 6: Partner Skills (Up to 50 points)
              </h3>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-navy-800 text-slate-700 dark:text-slate-300">
              Max 50 pts
            </span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Under the Victorian Points Test, single applicants receive <strong>0 points</strong> (unlike federal SkillSelect which gives 10 federal points for being single). To earn <strong>50 VPT partner points</strong>, your partner must meet all three strict requirements:
          </p>
          <ol className="list-decimal list-inside text-sm text-slate-600 dark:text-slate-400 space-y-1.5 pl-2">
            <li>You claim 10 partner skill points in your federal SkillSelect EOI.</li>
            <li>Your partner is included as an applicant on your Victorian nomination application.</li>
            <li>Your partner&apos;s nominated occupation is on Victoria&apos;s current priority industry list.</li>
          </ol>
        </div>

        {/* 7. Victorian Skilled Earnings */}
        <div className="bg-white dark:bg-navy-900 rounded-2xl p-6 border border-slate-200 dark:border-navy-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold">
                7
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Factor 7: Annual Earnings in Victoria (Up to 150 points)
              </h3>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-navy-800 text-slate-700 dark:text-slate-300">
              Max 150 pts
            </span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Candidates currently employed in eligible skilled roles within Victoria can claim between 8 and 150 points. Earnings below $80,000 AUD yield 0 points. Salaries $170,000 AUD and above achieve the maximum 150 points.
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Official salary bands scale every $5,000 from $80k to $170k. All claimed earnings must comply with Victoria&apos;s official Annual Earnings Estimation Guide.
          </p>
        </div>
      </div>

      {/* Action CTA */}
      <div className="text-center pt-8">
        <Link
          href="/calculator"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-base bg-brand-600 hover:bg-brand-700 text-white shadow-md transition-all"
        >
          Calculate Your Victorian Score Now <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
