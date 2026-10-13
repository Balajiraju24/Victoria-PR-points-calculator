import React from 'react';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-navy-300 border-t border-navy-800 transition-colors mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 text-white font-bold text-xl tracking-tight">
              <span className="w-8 h-8 rounded-lg bg-brand-500 text-white flex items-center justify-center font-extrabold text-lg">
                V
              </span>
              <span>
                Vic<span className="text-brand-400">Points</span>
              </span>
            </Link>
            <p className="text-sm text-navy-400 leading-relaxed">
              An independent, transparent points calculator and planning tool for Victorian skilled visa nomination (Subclasses 190 &amp; 491).
            </p>
            <div className="flex items-center gap-2 text-xs text-brand-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Rules Version: 2024.1-VPT (Oct 2024)
            </div>
          </div>

          {/* Tools & Guides */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Calculator &amp; Insights</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/calculator" className="hover:text-white transition-colors">
                  VPT Calculator
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-white transition-colors">
                  How VPT Works
                </Link>
              </li>
              <li>
                <Link href="/occupation-guide" className="hover:text-white transition-colors">
                  Priority Occupations &amp; Skill Levels
                </Link>
              </li>
              <li>
                <Link href="/calculator#salary-planner" className="hover:text-white transition-colors">
                  Salary Scenario Planner
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>

          {/* Official Government Portals */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Official Sources</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="https://liveinmelbourne.vic.gov.au/migrate/skilled-migration-visas/vpt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-white transition-colors text-navy-300"
                >
                  Live in Melbourne — VPT Matrix
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </a>
              </li>
              <li>
                <a
                  href="https://liveinmelbourne.vic.gov.au/migrate/skilled-migration-visas/earnings-calculator"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-white transition-colors text-navy-300"
                >
                  Victoria Earnings Guide
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </a>
              </li>
              <li>
                <a
                  href="https://liveinmelbourne.vic.gov.au/migrate/skilled-migration-visas/registration-of-interest-for-victorian-state-visa-nomination"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-white transition-colors text-navy-300"
                >
                  Victorian ROI Guidelines
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </a>
              </li>
              <li>
                <a
                  href="https://immi.homeaffairs.gov.au/help-support/departmental-forms/online-forms/points-calculator"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-white transition-colors text-navy-300"
                >
                  Federal SkillSelect Calculator
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Non-Affiliation */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Legal &amp; Privacy</h3>
            <ul className="space-y-2.5 text-sm mb-4">
              <li>
                <Link href="/disclaimer" className="hover:text-white transition-colors">
                  Legal Disclaimer &amp; Limitations
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy (Zero Data Storage)
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-white transition-colors">
                  All Migration Resources
                </Link>
              </li>
            </ul>
            <div className="p-3 rounded-lg bg-navy-800/80 border border-navy-700/60 text-xs text-navy-400">
              <span className="font-semibold text-navy-300 block mb-1">Zero Tracking Guarantee</span>
              All score calculations run 100% locally in your web browser. No personal data or form answers are sent to any server.
            </div>
          </div>
        </div>

        {/* Bottom non-affiliation disclaimer */}
        <div className="mt-12 pt-8 border-t border-navy-800 text-xs text-navy-400 space-y-3">
          <p className="leading-relaxed">
            <strong className="text-navy-300">Non-Affiliation Notice:</strong> VicPoints is an independent informational and research tool. It is not affiliated with, endorsed by, or operated by the Victorian Government, the Australian Government, or the Department of Home Affairs. The estimates provided are based strictly on published scoring tables and do not constitute migration, legal, or professional advice. Victoria does not publish a fixed VPT pass mark, and an estimated score does not guarantee an invitation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div>
              &copy; {new Date().getFullYear()} VicPoints. Built for Australian skilled migration candidates.
            </div>
            <div className="flex items-center gap-4 text-xs">
              <Link href="/disclaimer" className="hover:underline">
                Disclaimer
              </Link>
              <span>•</span>
              <Link href="/privacy" className="hover:underline">
                Privacy
              </Link>
              <span>•</span>
              <Link href="/how-it-works" className="hover:underline">
                Methodology
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
