import React from 'react';
import type { Metadata } from 'next';
import { ShieldCheck, Lock, EyeOff, ServerOff, DatabaseZap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | VicPoints',
  description:
    'Our strict zero-data-collection policy. All Victorian Points Test calculations are executed 100% locally in your browser.',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
          <ShieldCheck className="w-3.5 h-3.5" />
          Strict Zero Data Collection Architecture
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
          At VicPoints, we believe migration calculations should be confidential, private, and secure. We do not collect, store, or transmit your immigration answers.
        </p>
      </div>

      {/* Core Privacy Guarantees */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 flex items-center justify-center">
            <ServerOff className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            100% Client-Side Computation
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            All VPT calculations run directly within your browser&apos;s JavaScript engine. Your answers never leave your device.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 flex items-center justify-center">
            <EyeOff className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            No Personal Identifiers
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            We never request, collect, or process passport numbers, full names, dates of birth, visa grant numbers, or home addresses.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 flex items-center justify-center">
            <DatabaseZap className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            No Databases or Accounts
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            There are no user accounts, passwords, login sessions, or backend databases connected to this application.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 flex items-center justify-center">
            <Lock className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            No Third-Party AI API Calls
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Calculations are performed by deterministic, audited mathematical functions. We do not send your data to external AI models or analytics aggregators.
          </p>
        </div>
      </div>

      {/* Detailed Policy Text */}
      <div className="bg-white dark:bg-navy-900 p-8 rounded-3xl border border-slate-200 dark:border-navy-800 shadow-sm space-y-6 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Data Handling Principles
        </h2>

        <div className="space-y-4">
          <div>
            <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-1">
              1. Local State Management
            </h3>
            <p>
              Your calculator entries reside entirely in memory within React components while you use the page. If you close your browser tab or click &quot;Start Again&quot;, your inputs are immediately reset and discarded.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-1">
              2. Theme Preference Storage
            </h3>
            <p>
              The only information saved in browser local storage is your color theme preference (<code className="text-xs bg-slate-100 dark:bg-navy-800 px-1 py-0.5 rounded">light</code> or <code className="text-xs bg-slate-100 dark:bg-navy-800 px-1 py-0.5 rounded">dark</code>), allowing the website to remember your visual settings upon return.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-1">
              3. Share Links Security
            </h3>
            <p>
              When you copy or share your score, the summary text is copied to your local operating system clipboard or shared via the native Web Share API. Form answers are never serialized into tracking URLs or stored on remote servers.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-1">
              4. External Outbound Links
            </h3>
            <p>
              Links to official government portals (such as Live in Melbourne and the Department of Home Affairs) are opened securely with <code className="text-xs bg-slate-100 dark:bg-navy-800 px-1 py-0.5 rounded">rel=&quot;noopener noreferrer&quot;</code> to protect your browsing session.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
