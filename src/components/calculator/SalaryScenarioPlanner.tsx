'use client';

import React, { useState } from 'react';
import {
  TrendingUp,
  Sliders,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
} from 'lucide-react';
import {
  VptCalculatorInputs,
  calculateVptTotal,
  generateSalaryScenarios,
  lookupEarningsPoints,
} from '@/lib/vpt-scoring';

interface SalaryScenarioPlannerProps {
  currentInputs: VptCalculatorInputs;
}

export default function SalaryScenarioPlanner({ currentInputs }: SalaryScenarioPlannerProps) {
  const [sliderSalary, setSliderSalary] = useState<number>(
    currentInputs.earnings?.hasEligibleSkilledEmploymentInVic && currentInputs.earnings.annualEarningsAud
      ? Math.max(70000, Math.min(200000, currentInputs.earnings.annualEarningsAud))
      : 95000
  );

  const baseResult = calculateVptTotal(currentInputs);
  const currentEarningsPoints = baseResult.factors.earnings.points;
  const nonEarningsPoints =
    baseResult.factors.age.points +
    baseResult.factors.english.points +
    baseResult.factors.experience.points +
    baseResult.factors.education.points +
    baseResult.factors.occupation.points +
    baseResult.factors.partner.points;

  const comparisonTiers = [80000, 90000, 100000, 105000, 110000, 120000, 130000, 150000, 170000];
  const scenarios = generateSalaryScenarios(currentInputs, comparisonTiers);

  // Slider custom calculation
  const sliderLookup = lookupEarningsPoints(sliderSalary);
  const sliderDelta = sliderLookup.points - currentEarningsPoints;
  const sliderProjectedTotal = nonEarningsPoints + sliderLookup.points;

  return (
    <section id="salary-planner" className="mt-12 pt-8 border-t border-slate-200 dark:border-navy-800">
      <div className="bg-white dark:bg-navy-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-navy-800 shadow-sm space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300 border border-brand-200 dark:border-brand-800 mb-2">
              <TrendingUp className="w-3.5 h-3.5" />
              Scenario Analysis
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Eligible Earnings Scenario Planner
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Explore how hypothetical changes in your eligible skilled Victorian annual salary impact your overall VPT score.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-navy-800/80 p-3.5 rounded-xl border border-slate-200 dark:border-navy-700 text-right min-w-[180px]">
            <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">
              Current Claimed Earnings
            </span>
            <span className="text-lg font-bold text-slate-900 dark:text-white">
              {currentInputs.earnings?.hasEligibleSkilledEmploymentInVic && currentInputs.earnings.annualEarningsAud
                ? `$${currentInputs.earnings.annualEarningsAud.toLocaleString('en-AU')}`
                : '$0 AUD'}
            </span>
            <span className="text-xs text-brand-600 dark:text-brand-400 block font-semibold">
              {currentEarningsPoints} VPT Points
            </span>
          </div>
        </div>

        {/* Warning caveat */}
        <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 text-amber-900 dark:text-amber-200 text-xs leading-relaxed">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
          <div>
            <strong>Compliance Warning:</strong> This is a mathematical scenario planner only. A higher eligible salary increases ranking points but does not guarantee an invitation. You must <strong>never</strong> enter a hypothetical salary into an official Registration of Interest (ROI); all claimed earnings must be genuine, evidenced by payslips/contracts, and compliant with Victoria&apos;s Earnings Guide.
          </div>
        </div>

        {/* Interactive Custom Salary Slider */}
        <div className="p-5 rounded-xl bg-slate-50 dark:bg-navy-950/60 border border-slate-200 dark:border-navy-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 font-medium text-slate-800 dark:text-slate-200 text-sm">
              <Sliders className="w-4 h-4 text-brand-600 dark:text-brand-400" />
              <span>Interactive Salary Simulator</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Hypothetical Salary:</span>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center text-slate-400 text-sm">$</span>
                <input
                  type="number"
                  min="0"
                  max="300000"
                  step="1000"
                  value={sliderSalary}
                  onChange={(e) => setSliderSalary(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-32 pl-6 pr-2 py-1 text-sm font-bold rounded-lg border border-slate-300 dark:border-navy-700 bg-white dark:bg-navy-800 text-slate-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          <input
            type="range"
            min="60000"
            max="200000"
            step="1000"
            value={sliderSalary}
            onChange={(e) => setSliderSalary(parseInt(e.target.value))}
            aria-label="Hypothetical Annual Salary Slider"
            className="w-full h-2 bg-slate-200 dark:bg-navy-700 rounded-lg appearance-none cursor-pointer accent-brand-600"
          />

          <div className="flex justify-between text-[11px] text-slate-400">
            <span>$60,000 (0 pts)</span>
            <span>$100,000 (39 pts)</span>
            <span>$135,000 (95 pts)</span>
            <span>$170,000+ (150 pts max)</span>
          </div>

          {/* Dynamic Simulator Output Card */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-200 dark:border-navy-800">
            <div className="p-3 bg-white dark:bg-navy-900 rounded-lg border border-slate-200 dark:border-navy-700 text-center">
              <span className="text-xs text-slate-500 block">Earnings Points</span>
              <span className="text-xl font-bold text-slate-900 dark:text-white">
                {sliderLookup.points} <span className="text-xs text-slate-400 font-normal">/ 150</span>
              </span>
              <span className="text-[11px] text-slate-500 block mt-0.5 truncate">{sliderLookup.label}</span>
            </div>

            <div className="p-3 bg-white dark:bg-navy-900 rounded-lg border border-slate-200 dark:border-navy-700 text-center">
              <span className="text-xs text-slate-500 block">Point Difference</span>
              <div className="flex items-center justify-center gap-1 mt-0.5">
                {sliderDelta > 0 ? (
                  <span className="text-emerald-600 font-bold flex items-center text-xl">
                    <ArrowUpRight className="w-5 h-5" /> +{sliderDelta}
                  </span>
                ) : sliderDelta < 0 ? (
                  <span className="text-rose-600 font-bold flex items-center text-xl">
                    <ArrowDownRight className="w-5 h-5" /> {sliderDelta}
                  </span>
                ) : (
                  <span className="text-slate-600 dark:text-slate-400 font-bold flex items-center text-xl">
                    <Minus className="w-5 h-5" /> 0
                  </span>
                )}
              </div>
              <span className="text-[11px] text-slate-400 block">vs current answer</span>
            </div>

            <div className="p-3 bg-brand-50 dark:bg-brand-950/40 rounded-lg border border-brand-200 dark:border-brand-800 text-center">
              <span className="text-xs text-brand-700 dark:text-brand-300 font-medium block">
                Projected Total VPT
              </span>
              <span className="text-2xl font-black text-brand-700 dark:text-brand-300">
                {sliderProjectedTotal}
              </span>
              <span className="text-[11px] text-brand-600/80 dark:text-brand-400/80 block">
                All other factors held constant
              </span>
            </div>
          </div>
        </div>

        {/* Predefined Comparison Tiers Table */}
        <div>
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3">
            Quick Comparison Across Official Thresholds
          </h3>
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-navy-800">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 dark:bg-navy-800/60 text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-navy-800 font-semibold">
                <tr>
                  <th className="py-3 px-4">Hypothetical Salary</th>
                  <th className="py-3 px-4">Earnings Factor Points</th>
                  <th className="py-3 px-4">Points Delta</th>
                  <th className="py-3 px-4 text-right">Projected Total VPT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-navy-800/60">
                {scenarios.map((scen) => {
                  const isCurrent =
                    currentInputs.earnings?.hasEligibleSkilledEmploymentInVic &&
                    currentInputs.earnings.annualEarningsAud &&
                    Math.abs(scen.hypotheticalSalary - currentInputs.earnings.annualEarningsAud) < 2500;

                  return (
                    <tr
                      key={scen.hypotheticalSalary}
                      className={`hover:bg-slate-50/80 dark:hover:bg-navy-800/40 transition-colors ${
                        isCurrent ? 'bg-brand-50/50 dark:bg-brand-950/20' : ''
                      }`}
                    >
                      <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">
                        ${scen.hypotheticalSalary.toLocaleString('en-AU')} AUD
                        {isCurrent && (
                          <span className="ml-2 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-brand-100 text-brand-800 dark:bg-brand-900 dark:text-brand-200">
                            Current
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-slate-700 dark:text-slate-300">
                        {scen.points} pts
                      </td>
                      <td className="py-3 px-4">
                        {scen.pointsDelta > 0 ? (
                          <span className="inline-flex items-center text-emerald-600 font-medium">
                            <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> +{scen.pointsDelta} pts
                          </span>
                        ) : scen.pointsDelta < 0 ? (
                          <span className="inline-flex items-center text-rose-600 font-medium">
                            <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" /> {scen.pointsDelta} pts
                          </span>
                        ) : (
                          <span className="text-slate-400">Baseline</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right font-bold text-slate-900 dark:text-white">
                        {scen.projectedTotalVpt} pts
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
