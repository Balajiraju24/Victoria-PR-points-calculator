import React from 'react';
import Link from 'next/link';
import {
  Calculator,
  BarChart3,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Info,
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="space-y-16 sm:space-y-24 py-8 sm:py-16">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 border border-brand-200 dark:border-brand-800">
            <ShieldCheck className="w-4 h-4 text-brand-600 dark:text-brand-400" />
            <span>Updated with Official 2024–2025 Victorian Criteria</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            Understand your Victorian migration points.
          </h1>

          <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            Estimate your Victorian Points Test score for skilled visa nomination. Explore how your age, English proficiency, experience, qualifications and eligible earnings contribute to your score.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/calculator"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-base bg-brand-600 hover:bg-brand-700 text-white shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500"
            >
              <Calculator className="w-5 h-5" />
              Calculate my score
            </Link>

            <Link
              href="/how-it-works"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-base bg-white dark:bg-navy-800 border border-slate-300 dark:border-navy-700 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-navy-700 transition-all"
            >
              Understand the scoring system
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="pt-3 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-center gap-2">
            <Info className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <span>Independent calculator. Not affiliated with the Victorian Government or the Australian Government.</span>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Card 1 */}
          <div className="p-8 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 shadow-sm hover:shadow-md transition-shadow space-y-4">
            <div className="w-12 h-12 rounded-xl bg-brand-50 dark:bg-brand-950 flex items-center justify-center text-brand-600 dark:text-brand-400">
              <Calculator className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Victorian Points Test
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Estimate your VPT score using the published Victorian scoring criteria for Subclasses 190 and 491.
            </p>
            <div className="pt-2">
              <Link
                href="/calculator"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
              >
                Start assessment <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-8 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 shadow-sm hover:shadow-md transition-shadow space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Score breakdown
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Understand how each factor contributes to your result across age, language, experience, education, occupation and partner skills.
            </p>
            <div className="pt-2">
              <Link
                href="/how-it-works"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
              >
                View scoring criteria <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-8 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 shadow-sm hover:shadow-md transition-shadow space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Salary scenario planner
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Explore how different eligible earnings levels affect your estimated score and compare potential salary milestones.
            </p>
            <div className="pt-2">
              <Link
                href="/calculator#salary-planner"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
              >
                Plan salary scenarios <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key Principles / How VPT Differs from Federal */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-100 dark:bg-navy-900/60 rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-navy-800 space-y-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              The Victorian Points Test vs Federal SkillSelect
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              Many applicants confuse federal points with Victorian points. Understanding the difference is vital for state nomination success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 space-y-3">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-base">
                <span className="w-6 h-6 rounded-full bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 flex items-center justify-center text-xs">
                  1
                </span>
                Victorian Points Test (VPT)
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Used exclusively by the Victorian State Government to rank Registrations of Interest (ROIs) submitted on the Live in Melbourne portal. Incorporates Victorian skilled earnings, single partner treatment, and specific occupation skill levels.
              </p>
              <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5 pt-1">
                <li className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-brand-600" />
                  Seven published scoring factors
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-brand-600" />
                  Max score: 950 points (no fixed pass mark)
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-brand-600" />
                  Determines invitations to apply for state nomination
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 space-y-3">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-base">
                <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 flex items-center justify-center text-xs">
                  2
                </span>
                Federal SkillSelect Points Test
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Managed by the Commonwealth Department of Home Affairs. You must meet the statutory 65-point federal pass mark in your Expression of Interest (EOI) before Victoria can nominate you.
              </p>
              <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5 pt-1">
                <li className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-blue-600" />
                  Federal statutory minimum: 65 points
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-blue-600" />
                  Awards 10 points for being single
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-blue-600" />
                  State nomination grants +5 (190) or +15 (491) federal points
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Direct CTA Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-8 sm:p-12 rounded-3xl bg-navy-900 text-white space-y-4">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Ready to calculate your score?
          </h2>
          <p className="text-sm sm:text-base text-navy-300 max-w-xl mx-auto">
            Get an instant, confidential breakdown of your Victorian state nomination points with zero data stored.
          </p>
          <div className="pt-2">
            <Link
              href="/calculator"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-base bg-brand-500 hover:bg-brand-600 text-white transition-all shadow-md"
            >
              Open Calculator Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
