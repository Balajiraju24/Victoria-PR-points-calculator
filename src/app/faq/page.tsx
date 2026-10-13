'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { HelpCircle, ChevronDown, ArrowRight } from 'lucide-react';

interface FaqItem {
  q: string;
  a: React.ReactNode;
}

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const faqs: FaqItem[] = [
    {
      q: 'What is the Victorian Points Test (VPT)?',
      a: (
        <p>
          The Victorian Points Test (VPT) is a state-specific ranking model used by the Victorian State Government to evaluate and rank Registrations of Interest (ROIs) submitted by skilled migrants. It assesses seven weighted factors (Age, English, Experience, Education, Occupation Skill Level, Partner Skills, and Victorian Skilled Earnings) up to a theoretical maximum of 950 points.
        </p>
      ),
    },
    {
      q: 'Is the VPT the same as the federal SkillSelect points test?',
      a: (
        <p>
          No, they are completely separate systems. The federal SkillSelect points test is administered by the Australian Commonwealth Department of Home Affairs and requires a statutory minimum of 65 points to lodge an Expression of Interest (EOI). The VPT is used exclusively by the State of Victoria to determine which ROIs within their pool receive invitations to apply for Victorian state nomination.
        </p>
      ),
    },
    {
      q: 'Is there a minimum VPT score or pass mark?',
      a: (
        <p>
          No. The Victorian Government does not publish a fixed VPT pass mark or cutoff score. ROIs are ranked comparatively within occupation groups and economic priority sectors based on available nomination allocations for each invitation round.
        </p>
      ),
    },
    {
      q: 'Does a higher salary increase my VPT score?',
      a: (
        <p>
          Yes, if you are currently working in an eligible skilled occupation in Victoria. Points start at 8 points for an eligible annual salary of $80,000 AUD and scale incrementally every $5,000 up to 150 points for salaries of $170,000 AUD or higher. Earnings below $80,000 AUD receive 0 points. Offshore applicants or those not currently working in skilled employment in Victoria receive 0 earnings points.
        </p>
      ),
    },
    {
      q: 'How are years of experience counted?',
      a: (
        <p>
          Victoria counts skilled experience completed in your nominated or closely related occupation following qualification. Points are awarded in discrete published brackets: 0 years (0 pts), 1 year (20 pts), 1–3 years (40 pts), 3–5 years (60 pts), 6–8 years (80 pts), and more than 8 years (100 pts).
        </p>
      ),
    },
    {
      q: 'How do partner skills affect the VPT score?',
      a: (
        <p>
          Unlike federal SkillSelect (which grants 10 points for single applicants), the Victorian Points Test awards 0 points for single applicants. Victoria awards 50 VPT partner points only if your partner satisfies three strict requirements: you claim 10 partner points in federal SkillSelect, your partner is included on the Victorian nomination application, and your partner&apos;s nominated occupation is on Victoria&apos;s priority industry list.
        </p>
      ),
    },
    {
      q: 'What does occupation skill level mean under the VPT?',
      a: (
        <p>
          Occupations categorized as ANZSCO Skill Level 1 (commensurate with a Bachelor degree or higher qualification) receive 50 points under the VPT. Occupations classified as Skill Level 2 (Diplomas) or Skill Level 3 (Trade Certificates) receive 0 VPT points.
        </p>
      ),
    },
    {
      q: 'Does being in a priority occupation guarantee an invitation?',
      a: (
        <p>
          No. While candidates in priority sectors (Health, Education, Social Services, Clean Economy, Advanced Manufacturing, Digital Economy) are prioritized, invitations depend on total VPT ranking, program place availability, and Victorian economic targets.
        </p>
      ),
    },
    {
      q: 'Can I use this calculator for both Subclass 190 and Subclass 491?',
      a: (
        <p>
          Yes. The underlying 7-factor scoring formula is identical for both subclasses. However, Subclass 491 requires you to live and work in designated regional Victoria, whereas Subclass 190 allows living anywhere across the state.
        </p>
      ),
    },
    {
      q: 'Is VicPoints an official government website?',
      a: (
        <p>
          No. VicPoints is an independent informational research tool built to assist prospective applicants. It is not affiliated with, operated by, or endorsed by the Victorian Government or the Australian Department of Home Affairs.
        </p>
      ),
    },
    {
      q: 'How often is the scoring system updated?',
      a: (
        <p>
          The VicPoints engine reflects the official rules published by the Victorian Government for the 2024–2025 program year (Version 2024.1-VPT, verified October 2024). We actively monitor Live in Melbourne announcements and update criteria whenever official tables change.
        </p>
      ),
    },
    {
      q: 'Can I use this calculator to submit a Registration of Interest (ROI)?',
      a: (
        <p>
          No. This calculator provides estimates for planning purposes only. To submit an official Registration of Interest, you must create an account on the official Victorian Government portal at{' '}
          <a
            href="https://liveinmelbourne.vic.gov.au"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-600 dark:text-brand-400 underline font-medium"
          >
            liveinmelbourne.vic.gov.au
          </a>{' '}
          and have an active SkillSelect EOI number.
        </p>
      ),
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 border border-brand-200 dark:border-brand-800">
          <HelpCircle className="w-3.5 h-3.5" />
          Answers &amp; Technical Insights
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
          Clear, authoritative answers to common questions regarding Victoria&apos;s Points Test scoring matrix, salary rules, partner claims, and nomination invitations.
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={faq.q}
              className="bg-white dark:bg-navy-900 rounded-2xl border border-slate-200 dark:border-navy-800 overflow-hidden shadow-2xs transition-all"
            >
              <button
                type="button"
                onClick={() => toggle(index)}
                aria-expanded={isOpen}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              >
                <span className="font-bold text-slate-900 dark:text-white text-base sm:text-lg">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-brand-600' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 sm:px-6 pb-6 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-navy-800/80 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Callout */}
      <div className="p-8 rounded-3xl bg-slate-100 dark:bg-navy-900 border border-slate-200 dark:border-navy-800 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Still have questions about your score?
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
          Try adjusting your personal parameters in our live calculator or explore our detailed breakdown of official criteria.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/calculator"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-brand-600 hover:bg-brand-700 text-white shadow-sm"
          >
            Launch Calculator <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/resources"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-white dark:bg-navy-800 border border-slate-200 dark:border-navy-700 text-slate-800 dark:text-white hover:bg-slate-50"
          >
            View Official Resources
          </Link>
        </div>
      </div>
    </div>
  );
}
