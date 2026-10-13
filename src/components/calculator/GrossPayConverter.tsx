'use client';

import React, { useState } from 'react';
import { Calculator, Check, ArrowRight } from 'lucide-react';

interface GrossPayConverterProps {
  onApplySalary: (annualAmount: number) => void;
}

export default function GrossPayConverter({ onApplySalary }: GrossPayConverterProps) {
  const [frequency, setFrequency] = useState<'hourly' | 'weekly' | 'fortnightly' | 'monthly'>('fortnightly');
  const [payRate, setPayRate] = useState<number | ''>(3500);
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(38);
  const [applied, setApplied] = useState(false);

  const calculateAnnual = (): number => {
    if (payRate === '' || isNaN(Number(payRate)) || Number(payRate) <= 0) return 0;
    const rate = Number(payRate);

    switch (frequency) {
      case 'hourly':
        return Math.round(rate * hoursPerWeek * 52);
      case 'weekly':
        return Math.round(rate * 52);
      case 'fortnightly':
        return Math.round(rate * 26);
      case 'monthly':
        return Math.round(rate * 12);
      default:
        return 0;
    }
  };

  const annualEstimated = calculateAnnual();

  const handleApply = () => {
    if (annualEstimated > 0) {
      onApplySalary(annualEstimated);
      setApplied(true);
      setTimeout(() => setApplied(false), 2500);
    }
  };

  return (
    <div className="p-4 rounded-xl bg-slate-50 dark:bg-navy-900/60 border border-slate-200 dark:border-navy-800 text-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 font-medium text-slate-800 dark:text-slate-200">
          <Calculator className="w-4 h-4 text-brand-600 dark:text-brand-400" />
          <span>Gross Pay Frequency Helper</span>
        </div>
        <span className="text-xs text-slate-500 dark:text-slate-400">
          Independent calculation tool
        </span>
      </div>

      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
        Convert your regular wage to estimated gross annual AUD before entering. Does not account for variable bonuses or superannuation unless eligible under Victoria&apos;s guidelines.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {(['hourly', 'weekly', 'fortnightly', 'monthly'] as const).map((freq) => (
          <button
            key={freq}
            type="button"
            onClick={() => setFrequency(freq)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all border ${
              frequency === freq
                ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                : 'bg-white dark:bg-navy-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-navy-700 hover:bg-slate-100 dark:hover:bg-navy-700'
            }`}
          >
            {freq}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
            {frequency === 'hourly'
              ? 'Hourly Rate (AUD)'
              : frequency === 'weekly'
              ? 'Gross Weekly Pay (AUD)'
              : frequency === 'fortnightly'
              ? 'Gross Fortnightly Pay (AUD)'
              : 'Gross Monthly Pay (AUD)'}
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              $
            </span>
            <input
              type="number"
              min="0"
              step="any"
              value={payRate}
              onChange={(e) => setPayRate(e.target.value === '' ? '' : Math.max(0, parseFloat(e.target.value)))}
              className="w-full pl-7 pr-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-navy-700 bg-white dark:bg-navy-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
              placeholder="e.g. 3500"
            />
          </div>
        </div>

        {frequency === 'hourly' && (
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              Hours Per Week
            </label>
            <input
              type="number"
              min="1"
              max="60"
              value={hoursPerWeek}
              onChange={(e) => setHoursPerWeek(Math.max(1, parseInt(e.target.value) || 38))}
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-navy-700 bg-white dark:bg-navy-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-200 dark:border-navy-800">
        <div>
          <span className="text-xs text-slate-500 dark:text-slate-400 block">Annualized Equivalent</span>
          <span className="text-base font-bold text-slate-900 dark:text-white">
            ${annualEstimated.toLocaleString('en-AU')} <span className="text-xs font-normal text-slate-500">AUD/yr</span>
          </span>
        </div>

        <button
          type="button"
          onClick={handleApply}
          disabled={annualEstimated <= 0}
          className={`flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            applied
              ? 'bg-emerald-600 text-white'
              : 'bg-brand-600 hover:bg-brand-700 text-white disabled:opacity-50 disabled:cursor-not-allowed shadow-sm'
          }`}
        >
          {applied ? (
            <>
              <Check className="w-3.5 h-3.5" /> Applied to Form
            </>
          ) : (
            <>
              Apply to Earnings Field <ArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
