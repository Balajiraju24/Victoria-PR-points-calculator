'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Calendar,
  Award,
  Briefcase,
  GraduationCap,
  Users,
  DollarSign,
  AlertTriangle,
  CheckCircle2,
  Copy,
  Check,
  Share2,
  Printer,
  RotateCcw,
  ExternalLink,
  ChevronDown,
  Info,
  ShieldCheck,
  Compass,
} from 'lucide-react';
import {
  VptCalculatorInputs,
  VptCalculationResult,
  calculateVptTotal,
  EXPERIENCE_POINTS_MAP,
  EDUCATION_POINTS_MAP,
  VPT_CONFIG,
  VisaSubclass,
  EnglishProficiency,
  ExperienceCategory,
  EducationLevel,
  OccupationSkillLevel,
} from '@/lib/vpt-scoring';
import { VERIFIED_OCCUPATIONS } from '@/data/occupations';
import GrossPayConverter from './GrossPayConverter';
import SalaryScenarioPlanner from './SalaryScenarioPlanner';

export default function VptCalculator() {
  const [inputs, setInputs] = useState<VptCalculatorInputs>({
    visaSubclass: '190',
    age: 28,
    english: 'proficient',
    experienceCategory: '1_to_3_years',
    education: 'bachelor_honours',
    occupationSkillLevel: 'level_1',
    occupationTitle: 'Software Engineer',
    anzscoCode: '261313',
    partner: {
      status: 'single',
    },
    earnings: {
      hasEligibleSkilledEmploymentInVic: true,
      annualEarningsAud: 95000,
    },
  });

  const [experienceMode, setExperienceMode] = useState<'category' | 'numeric'>('category');
  const [numericExpYears, setNumericExpYears] = useState<number | ''>(2);
  const [showGrossConverter, setShowGrossConverter] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [shared, setShared] = useState<boolean>(false);

  const result: VptCalculationResult = calculateVptTotal(inputs);

  // Form field update handlers
  const handleVisaChange = (subclass: VisaSubclass) => {
    setInputs((prev) => ({ ...prev, visaSubclass: subclass }));
  };

  const handleAgeChange = (val: string) => {
    const ageNum = val === '' ? undefined : parseInt(val, 10);
    setInputs((prev) => ({ ...prev, age: ageNum }));
  };

  const handleEnglishChange = (level: EnglishProficiency) => {
    setInputs((prev) => ({ ...prev, english: level }));
  };

  const handleExperienceCategoryChange = (cat: ExperienceCategory) => {
    setInputs((prev) => ({ ...prev, experienceCategory: cat, experienceYearsNumeric: undefined }));
  };

  const handleExperienceNumericChange = (val: string) => {
    const num = val === '' ? undefined : parseFloat(val);
    setNumericExpYears(val === '' ? '' : Math.max(0, parseFloat(val)));
    setInputs((prev) => ({
      ...prev,
      experienceCategory: undefined,
      experienceYearsNumeric: num !== undefined && !isNaN(num) ? Math.max(0, num) : undefined,
    }));
  };

  const handleEducationChange = (lvl: EducationLevel) => {
    setInputs((prev) => ({ ...prev, education: lvl }));
  };

  const handleOccupationSkillChange = (lvl: OccupationSkillLevel) => {
    setInputs((prev) => ({ ...prev, occupationSkillLevel: lvl }));
  };

  const handleQuickOccupationSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const code = e.target.value;
    if (!code) return;
    const found = VERIFIED_OCCUPATIONS.find((o) => o.anzscoCode === code);
    if (found) {
      setInputs((prev) => ({
        ...prev,
        anzscoCode: found.anzscoCode,
        occupationTitle: found.title,
        occupationSkillLevel: found.skillLevel,
      }));
    }
  };

  const handlePartnerStatusChange = (status: 'single' | 'partnered_no_claim' | 'partnered_claiming') => {
    setInputs((prev) => ({
      ...prev,
      partner: {
        status,
        claimsTenFederalPoints: status === 'partnered_claiming' ? prev.partner?.claimsTenFederalPoints ?? true : false,
        includedInNomination: status === 'partnered_claiming' ? prev.partner?.includedInNomination ?? true : false,
        occupationInPriorityIndustry: status === 'partnered_claiming' ? prev.partner?.occupationInPriorityIndustry ?? true : false,
      },
    }));
  };

  const handlePartnerCheckbox = (key: 'claimsTenFederalPoints' | 'includedInNomination' | 'occupationInPriorityIndustry', checked: boolean) => {
    setInputs((prev) => ({
      ...prev,
      partner: {
        status: prev.partner?.status || 'partnered_claiming',
        ...prev.partner,
        [key]: checked,
      },
    }));
  };

  const handleVicEmployedToggle = (employed: boolean) => {
    setInputs((prev) => ({
      ...prev,
      earnings: {
        hasEligibleSkilledEmploymentInVic: employed,
        annualEarningsAud: employed ? prev.earnings?.annualEarningsAud ?? 90000 : 0,
      },
    }));
  };

  const handleAnnualSalaryChange = (val: string) => {
    const salary = val === '' ? undefined : parseFloat(val);
    setInputs((prev) => ({
      ...prev,
      earnings: {
        hasEligibleSkilledEmploymentInVic: true,
        annualEarningsAud: salary !== undefined && !isNaN(salary) ? Math.max(0, salary) : undefined,
      },
    }));
  };

  const handleReset = () => {
    setInputs({
      visaSubclass: '190',
      age: undefined,
      english: undefined,
      experienceCategory: undefined,
      education: undefined,
      occupationSkillLevel: undefined,
      partner: { status: 'single' },
      earnings: { hasEligibleSkilledEmploymentInVic: false, annualEarningsAud: 0 },
    });
    setNumericExpYears('');
  };

  // Copy score summary to clipboard
  const handleCopySummary = async () => {
    const summary = [
      `Victorian Points Test (VPT) Score Estimate: ${result.totalPoints} points`,
      `Visa Subclass: Subclass ${inputs.visaSubclass || '190'}`,
      `Status: ${result.isProvisional ? 'Provisional' : 'Verified Complete'}`,
      `----------------------------------------`,
      `• Age (${result.factors.age.selectedLabel}): ${result.factors.age.points} pts`,
      `• English Proficiency (${result.factors.english.selectedLabel}): ${result.factors.english.points} pts`,
      `• Years of Experience (${result.factors.experience.selectedLabel}): ${result.factors.experience.points} pts`,
      `• Education (${result.factors.education.selectedLabel}): ${result.factors.education.points} pts`,
      `• Occupation Skill Level (${result.factors.occupation.selectedLabel}): ${result.factors.occupation.points} pts`,
      `• Partner Skills (${result.factors.partner.selectedLabel}): ${result.factors.partner.points} pts`,
      `• Victorian Skilled Earnings (${result.factors.earnings.selectedLabel}): ${result.factors.earnings.points} pts`,
      `----------------------------------------`,
      `Calculated via VicPoints (https://vicpoints.com.au) on ${new Date().toLocaleDateString('en-AU')}.`,
      `Scoring Rules Version: ${result.ruleVersion} (${result.lastVerifiedDate}).`,
      `Notice: Victoria does not publish a fixed pass mark. Calculations are independent estimates.`,
    ].join('\n');

    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Fallback
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Estimated Victorian Points Test (VPT) Score',
          text: `I estimated my Victorian Points Test score at ${result.totalPoints} points for Subclass ${inputs.visaSubclass} on VicPoints.`,
          url: window.location.href,
        });
        setShared(true);
        setTimeout(() => setShared(false), 3000);
      } catch {
        handleCopySummary();
      }
    } else {
      handleCopySummary();
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Title & Introduction */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 border border-brand-200 dark:border-brand-800 mb-3">
          <ShieldCheck className="w-3.5 h-3.5" />
          Official Victoria Points Test (VPT) Rules 2024–2025
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Victorian Points Test (VPT) Calculator
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
          Estimate your state nomination ranking points under Victoria&apos;s published 7-factor VPT matrix. Adjust each parameter in real-time to plan your skilled migration strategy for Subclasses 190 and 491.
        </p>
      </div>

      {/* Responsive Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Sections (8 Cols on Desktop) */}
        <div className="lg:col-span-8 space-y-6">
          {/* SECTION A: VISA SUBCLASS */}
          <section className="bg-white dark:bg-navy-900 p-6 rounded-2xl border border-slate-200 dark:border-navy-800 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
                Section A
              </span>
              <span className="text-xs text-slate-400">Prerequisite</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              Visa Subclass Target
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
              Victoria nominates candidates for two skilled visa subclasses. The VPT scoring factors remain identical for both, but Subclass 491 requires living and working in regional Victoria.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleVisaChange('190')}
                className={`p-4 rounded-xl text-left border transition-all ${
                  inputs.visaSubclass === '190'
                    ? 'border-brand-600 bg-brand-50/70 dark:bg-brand-950/40 ring-1 ring-brand-600 text-slate-900 dark:text-white'
                    : 'border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-800/80 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-base">Subclass 190</span>
                  <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-brand-100 dark:bg-brand-900 text-brand-800 dark:text-brand-200">
                    Permanent
                  </span>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Skilled Nominated visa. Live and work anywhere in Victoria.
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleVisaChange('491')}
                className={`p-4 rounded-xl text-left border transition-all ${
                  inputs.visaSubclass === '491'
                    ? 'border-brand-600 bg-brand-50/70 dark:bg-brand-950/40 ring-1 ring-brand-600 text-slate-900 dark:text-white'
                    : 'border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-800/80 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-base">Subclass 491</span>
                  <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                    Provisional (5 Yrs)
                  </span>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Skilled Work Regional. Must live and work in designated regional Victoria.
                </div>
              </button>
            </div>

            <div className="mt-3 p-3 rounded-lg bg-slate-50 dark:bg-navy-800/50 text-xs text-slate-500 dark:text-slate-400 flex items-start gap-2">
              <Info className="w-4 h-4 text-brand-600 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Important Distinction:</strong> The VPT is Victoria&apos;s state-specific ranking system for Registrations of Interest (ROIs). It is completely distinct from the federal Department of Home Affairs 65-point SkillSelect pass mark.
              </span>
            </div>
          </section>

          {/* SECTION B: AGE */}
          <section className="bg-white dark:bg-navy-900 p-6 rounded-2xl border border-slate-200 dark:border-navy-800 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-brand-600" />
                <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
                  Section B
                </span>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300">
                Max 300 pts
              </span>
            </div>

            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
              Age at Time of Nomination Invitation
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
              Enter your current completed years of age. Under Australian skilled migration law, applicants must be under 45 at invitation. Ages 20 to 29 receive the maximum allocation of 300 points.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              <div>
                <label htmlFor="age-input" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Completed Years of Age
                </label>
                <div className="relative">
                  <input
                    id="age-input"
                    type="number"
                    min="15"
                    max="65"
                    value={inputs.age ?? ''}
                    onChange={(e) => handleAgeChange(e.target.value)}
                    placeholder="e.g. 28"
                    className="w-full px-4 py-2.5 text-base font-semibold rounded-xl border border-slate-300 dark:border-navy-700 bg-white dark:bg-navy-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-navy-800/60 border border-slate-200 dark:border-navy-700">
                <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">Age Factor Points</span>
                <span className="text-xl font-bold text-slate-900 dark:text-white">
                  {result.factors.age.points}{' '}
                  <span className="text-xs font-normal text-slate-400">/ 300 pts</span>
                </span>
                <span className="text-xs text-brand-600 dark:text-brand-400 block font-medium mt-0.5">
                  {result.factors.age.selectedLabel}
                </span>
              </div>
            </div>

            {/* Warnings or Boundary notices */}
            {result.factors.age.warnings && result.factors.age.warnings.length > 0 && (
              <div className="mt-3 p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs text-rose-800 dark:text-rose-200 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                <span>{result.factors.age.warnings.join(' ')}</span>
              </div>
            )}
          </section>

          {/* SECTION C: ENGLISH LANGUAGE */}
          <section className="bg-white dark:bg-navy-900 p-6 rounded-2xl border border-slate-200 dark:border-navy-800 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-brand-600" />
                <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
                  Section C
                </span>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300">
                Max 200 pts
              </span>
            </div>

            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
              English Language Proficiency
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
              Select your verified English test outcome (IELTS, PTE Academic, Cambridge, or TOEFL iBT). Competent is the mandatory legal baseline (0 pts). Proficient provides 100 pts, Superior provides 200 pts.
            </p>

            <div className="space-y-2.5">
              {[
                {
                  id: 'competent',
                  label: 'Competent English',
                  sub: 'IELTS 6.0 in all bands / PTE Academic 50 in all bands / Passport exemption',
                  points: 0,
                  note: 'Eligible baseline, but awards 0 VPT points.',
                },
                {
                  id: 'proficient',
                  label: 'Proficient English',
                  sub: 'IELTS 7.0 in each band / PTE Academic 65 in each band',
                  points: 100,
                  note: 'Highly competitive benchmark for Victorian invitation rounds.',
                },
                {
                  id: 'superior',
                  label: 'Superior English',
                  sub: 'IELTS 8.0 in each band / PTE Academic 79 in each band',
                  points: 200,
                  note: 'Maximum possible English allocation under VPT.',
                },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleEnglishChange(item.id as EnglishProficiency)}
                  className={`w-full p-4 rounded-xl text-left border flex flex-col sm:flex-row sm:items-center justify-between gap-2 transition-all ${
                    inputs.english === item.id
                      ? 'border-brand-600 bg-brand-50/70 dark:bg-brand-950/40 ring-1 ring-brand-600'
                      : 'border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-800/70 hover:border-slate-300'
                  }`}
                >
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white text-sm sm:text-base block">
                      {item.label}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 block mt-0.5">
                      {item.sub}
                    </span>
                  </div>
                  <div className="text-right sm:flex-shrink-0">
                    <span className="inline-block px-3 py-1 rounded-lg text-sm font-bold bg-white dark:bg-navy-900 text-slate-900 dark:text-white border border-slate-200 dark:border-navy-700 shadow-2xs">
                      {item.points} pts
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* SECTION D: YEARS OF EXPERIENCE */}
          <section className="bg-white dark:bg-navy-900 p-6 rounded-2xl border border-slate-200 dark:border-navy-800 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-brand-600" />
                <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
                  Section D
                </span>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300">
                Max 100 pts
              </span>
            </div>

            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
              Experience in Nominated Occupation
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
              Post-qualification skilled employment directly related to your nominated ANZSCO occupation. Victoria publishes discrete categories on its ROI submission portal.
            </p>

            {/* Selector mode toggle */}
            <div className="flex items-center gap-2 mb-4 text-xs">
              <span className="text-slate-500">Input Mode:</span>
              <button
                type="button"
                onClick={() => setExperienceMode('category')}
                className={`px-2.5 py-1 rounded font-medium transition-colors ${
                  experienceMode === 'category'
                    ? 'bg-brand-600 text-white'
                    : 'bg-slate-100 dark:bg-navy-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                Official Categories
              </button>
              <button
                type="button"
                onClick={() => setExperienceMode('numeric')}
                className={`px-2.5 py-1 rounded font-medium transition-colors ${
                  experienceMode === 'numeric'
                    ? 'bg-brand-600 text-white'
                    : 'bg-slate-100 dark:bg-navy-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                Enter Numeric Years
              </button>
            </div>

            {experienceMode === 'category' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {(Object.entries(EXPERIENCE_POINTS_MAP) as [ExperienceCategory, (typeof EXPERIENCE_POINTS_MAP)[ExperienceCategory]][]).map(
                  ([key, val]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => handleExperienceCategoryChange(key)}
                      className={`p-3.5 rounded-xl text-left border flex items-center justify-between transition-all ${
                        inputs.experienceCategory === key
                          ? 'border-brand-600 bg-brand-50/70 dark:bg-brand-950/40 ring-1 ring-brand-600'
                          : 'border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-800/70 hover:border-slate-300'
                      }`}
                    >
                      <div>
                        <span className="font-semibold text-slate-900 dark:text-white text-sm block">
                          {val.label}
                        </span>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                          {val.description}
                        </span>
                      </div>
                      <span className="text-sm font-bold text-slate-900 dark:text-white px-2 py-0.5 rounded bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-navy-700">
                        {val.points} pts
                      </span>
                    </button>
                  )
                )}
              </div>
            ) : (
              <div className="space-y-3">
                <div className="max-w-xs">
                  <label htmlFor="exp-numeric-input" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Years of Skilled Experience
                  </label>
                  <input
                    id="exp-numeric-input"
                    type="number"
                    min="0"
                    max="40"
                    step="0.5"
                    value={numericExpYears}
                    onChange={(e) => handleExperienceNumericChange(e.target.value)}
                    placeholder="e.g. 3.5"
                    className="w-full px-4 py-2 text-base font-semibold rounded-xl border border-slate-300 dark:border-navy-700 bg-white dark:bg-navy-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500"
                  />
                </div>
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-navy-800/60 text-xs text-slate-600 dark:text-slate-300">
                  Mapped Category: <strong>{result.factors.experience.selectedLabel}</strong> &bull; Points:{' '}
                  <strong>{result.factors.experience.points} pts</strong>
                </div>
              </div>
            )}

            {/* Boundary Ambiguity Notice */}
            {result.factors.experience.limitations && (
              <div className="mt-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 text-xs text-blue-900 dark:text-blue-200 flex items-start gap-2">
                <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <span>{result.factors.experience.limitations.join(' ')}</span>
              </div>
            )}
          </section>

          {/* SECTION E: EDUCATION */}
          <section className="bg-white dark:bg-navy-900 p-6 rounded-2xl border border-slate-200 dark:border-navy-800 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-brand-600" />
                <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
                  Section E
                </span>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300">
                Max 100 pts
              </span>
            </div>

            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
              Highest Educational Qualification
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
              Select your highest qualification successfully completed and verified in your skills assessment. Victoria awards points for one highest degree; no bonus points are given for multiple degrees.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {(Object.entries(EDUCATION_POINTS_MAP) as [EducationLevel, (typeof EDUCATION_POINTS_MAP)[EducationLevel]][]).map(
                ([key, item]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleEducationChange(key)}
                    className={`p-3.5 rounded-xl text-left border flex items-center justify-between transition-all ${
                      inputs.education === key
                        ? 'border-brand-600 bg-brand-50/70 dark:bg-brand-950/40 ring-1 ring-brand-600'
                        : 'border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-800/70 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <span className="font-semibold text-slate-900 dark:text-white text-sm block">
                        {item.label}
                      </span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                        {item.description}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-slate-900 dark:text-white px-2 py-0.5 rounded bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-navy-700">
                      {item.points} pts
                    </span>
                  </button>
                )
              )}
            </div>
          </section>

          {/* SECTION F: OCCUPATION SKILL LEVEL */}
          <section className="bg-white dark:bg-navy-900 p-6 rounded-2xl border border-slate-200 dark:border-navy-800 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-brand-600" />
                <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
                  Section F
                </span>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300">
                Max 50 pts
              </span>
            </div>

            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
              Occupation ANZSCO Skill Level
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
              Under the VPT, ANZSCO Skill Level 1 occupations (commensurate with a Bachelor degree or higher) receive 50 points. Skill Levels 2 and 3 receive 0 points.
            </p>

            {/* Quick search/dropdown helper */}
            <div className="mb-4 p-3 rounded-xl bg-slate-50 dark:bg-navy-800/60 border border-slate-200 dark:border-navy-700 space-y-2">
              <label htmlFor="quick-occupation-select" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Quick Select from Verified Victorian Occupations:
              </label>
              <select
                id="quick-occupation-select"
                onChange={handleQuickOccupationSelect}
                value={inputs.anzscoCode || ''}
                className="w-full text-xs sm:text-sm rounded-lg border border-slate-300 dark:border-navy-600 bg-white dark:bg-navy-800 text-slate-900 dark:text-white p-2 focus:ring-2 focus:ring-brand-500"
              >
                <option value="">-- Choose an occupation or select skill level below --</option>
                {VERIFIED_OCCUPATIONS.map((occ) => (
                  <option key={occ.anzscoCode} value={occ.anzscoCode}>
                    {occ.title} (ANZSCO {occ.anzscoCode}) — {occ.skillLevelLabel}
                  </option>
                ))}
              </select>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                Can&apos;t find your occupation? Check the{' '}
                <Link href="/occupation-guide" className="text-brand-600 dark:text-brand-400 underline font-medium">
                  Occupation Guide
                </Link>{' '}
                or manually choose your ANZSCO skill level below.
              </span>
            </div>

            {/* Skill Level Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {[
                {
                  id: 'level_1',
                  label: 'Skill Level 1',
                  desc: 'Bachelor degree or higher (e.g. Engineers, Nurses, Teachers, IT Specialists)',
                  points: 50,
                },
                {
                  id: 'level_2',
                  label: 'Skill Level 2',
                  desc: 'Associate Degree / Adv Diploma / Diploma (e.g. Chef, Technicians)',
                  points: 0,
                },
                {
                  id: 'level_3',
                  label: 'Skill Level 3',
                  desc: 'Cert IV or Cert III with 2+ years on-the-job training (Trades)',
                  points: 0,
                },
              ].map((lvl) => (
                <button
                  key={lvl.id}
                  type="button"
                  onClick={() => handleOccupationSkillChange(lvl.id as OccupationSkillLevel)}
                  className={`p-3.5 rounded-xl text-left border flex flex-col justify-between transition-all ${
                    inputs.occupationSkillLevel === lvl.id
                      ? 'border-brand-600 bg-brand-50/70 dark:bg-brand-950/40 ring-1 ring-brand-600'
                      : 'border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-800/70 hover:border-slate-300'
                  }`}
                >
                  <div className="mb-2">
                    <span className="font-semibold text-slate-900 dark:text-white text-sm block">
                      {lvl.label}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">
                      {lvl.desc}
                    </span>
                  </div>
                  <span className="self-start text-xs font-bold text-slate-900 dark:text-white px-2 py-0.5 rounded bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-navy-700">
                    {lvl.points} pts
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-2 text-right">
              <button
                type="button"
                onClick={() => handleOccupationSkillChange('unverified')}
                className={`text-xs text-slate-500 hover:text-slate-700 underline ${
                  inputs.occupationSkillLevel === 'unverified' ? 'font-bold text-amber-600' : ''
                }`}
              >
                Mark as &quot;Needs Verification&quot;
              </button>
            </div>
          </section>

          {/* SECTION G: PARTNER SKILLS */}
          <section className="bg-white dark:bg-navy-900 p-6 rounded-2xl border border-slate-200 dark:border-navy-800 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-brand-600" />
                <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
                  Section G
                </span>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300">
                Max 50 pts
              </span>
            </div>

            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
              Partner Skills &amp; Relationship Status
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
              Unlike federal SkillSelect (which grants 10 points for being single), Victoria awards 50 VPT points <strong>only</strong> if your partner satisfies three strict requirements. Single applicants receive 0 VPT points.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-4">
              <button
                type="button"
                onClick={() => handlePartnerStatusChange('single')}
                className={`p-3.5 rounded-xl text-left border transition-all ${
                  inputs.partner?.status === 'single'
                    ? 'border-brand-600 bg-brand-50/70 dark:bg-brand-950/40 ring-1 ring-brand-600'
                    : 'border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-800/70 hover:border-slate-300'
                }`}
              >
                <span className="font-semibold text-slate-900 dark:text-white text-sm block">Single</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">
                  No spouse or de facto partner.
                </span>
                <span className="inline-block mt-2 text-xs font-bold px-2 py-0.5 rounded bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-navy-700">
                  0 pts
                </span>
              </button>

              <button
                type="button"
                onClick={() => handlePartnerStatusChange('partnered_no_claim')}
                className={`p-3.5 rounded-xl text-left border transition-all ${
                  inputs.partner?.status === 'partnered_no_claim'
                    ? 'border-brand-600 bg-brand-50/70 dark:bg-brand-950/40 ring-1 ring-brand-600'
                    : 'border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-800/70 hover:border-slate-300'
                }`}
              >
                <span className="font-semibold text-slate-900 dark:text-white text-sm block">Partnered (No Claim)</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">
                  Partner does not meet Victoria&apos;s priority requirements.
                </span>
                <span className="inline-block mt-2 text-xs font-bold px-2 py-0.5 rounded bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-navy-700">
                  0 pts
                </span>
              </button>

              <button
                type="button"
                onClick={() => handlePartnerStatusChange('partnered_claiming')}
                className={`p-3.5 rounded-xl text-left border transition-all ${
                  inputs.partner?.status === 'partnered_claiming'
                    ? 'border-brand-600 bg-brand-50/70 dark:bg-brand-950/40 ring-1 ring-brand-600'
                    : 'border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-800/70 hover:border-slate-300'
                }`}
              >
                <span className="font-semibold text-slate-900 dark:text-white text-sm block">Claiming Partner Skills</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">
                  Partner satisfies all 3 Victorian requirements.
                </span>
                <span className="inline-block mt-2 text-xs font-bold px-2 py-0.5 rounded bg-brand-100 dark:bg-brand-900 text-brand-800 dark:text-brand-200 border border-brand-200 dark:border-brand-800">
                  Up to 50 pts
                </span>
              </button>
            </div>

            {/* Validation Checklist if claiming partner skills */}
            {inputs.partner?.status === 'partnered_claiming' && (
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-navy-800/60 border border-slate-200 dark:border-navy-700 space-y-3">
                <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Mandatory Partner Verification Checklist (All 3 Required for 50 Pts):
                </h3>

                <label className="flex items-start gap-3 cursor-pointer text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={inputs.partner.claimsTenFederalPoints ?? true}
                    onChange={(e) => handlePartnerCheckbox('claimsTenFederalPoints', e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                  />
                  <span>
                    <strong>1. Federal 10 Partner Points:</strong> The applicant claims 10 points for Partner Skills in the federal SkillSelect EOI (partner has Competent English and a suitable skills assessment).
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={inputs.partner.includedInNomination ?? true}
                    onChange={(e) => handlePartnerCheckbox('includedInNomination', e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                  />
                  <span>
                    <strong>2. Included on Application:</strong> The partner will be included as an applicant in the Victorian state nomination application.
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={inputs.partner.occupationInPriorityIndustry ?? true}
                    onChange={(e) => handlePartnerCheckbox('occupationInPriorityIndustry', e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                  />
                  <span>
                    <strong>3. Victorian Priority Industry:</strong> The partner&apos;s nominated occupation is on Victoria&apos;s current priority industry list.
                  </span>
                </label>

                {result.factors.partner.points === 50 ? (
                  <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    All 3 requirements satisfied: 50 points awarded.
                  </div>
                ) : (
                  <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 text-xs font-medium flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    One or more mandatory requirements unchecked: 0 points awarded.
                  </div>
                )}
              </div>
            )}
          </section>

          {/* SECTION H: ANNUAL EARNINGS */}
          <section className="bg-white dark:bg-navy-900 p-6 rounded-2xl border border-slate-200 dark:border-navy-800 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-brand-600" />
                <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
                  Section H
                </span>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300">
                Max 150 pts
              </span>
            </div>

            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
              Eligible Skilled Earnings in Victoria
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
              Onshore candidates currently employed in an eligible skilled occupation in Victoria can claim points based on annual gross earnings. Points scale from $80,000 (8 pts) to $170,000+ (150 pts max).
            </p>

            {/* Employment Status Toggle */}
            <div className="mb-4">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Are you currently working in eligible skilled employment in Victoria?
              </label>
              <div className="grid grid-cols-2 gap-3 max-w-md">
                <button
                  type="button"
                  onClick={() => handleVicEmployedToggle(true)}
                  className={`py-2.5 px-4 rounded-xl text-sm font-semibold border transition-all ${
                    inputs.earnings?.hasEligibleSkilledEmploymentInVic
                      ? 'border-brand-600 bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 ring-1 ring-brand-600'
                      : 'border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  Yes — Employed in Vic
                </button>
                <button
                  type="button"
                  onClick={() => handleVicEmployedToggle(false)}
                  className={`py-2.5 px-4 rounded-xl text-sm font-semibold border transition-all ${
                    !inputs.earnings?.hasEligibleSkilledEmploymentInVic
                      ? 'border-brand-600 bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 ring-1 ring-brand-600'
                      : 'border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  No / Offshore (0 pts)
                </button>
              </div>
            </div>

            {inputs.earnings?.hasEligibleSkilledEmploymentInVic && (
              <div className="space-y-4 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                  <div>
                    <label htmlFor="salary-input" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Eligible Annual Salary (AUD)
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 font-bold">$</span>
                      <input
                        id="salary-input"
                        type="number"
                        min="0"
                        step="500"
                        value={inputs.earnings.annualEarningsAud ?? ''}
                        onChange={(e) => handleAnnualSalaryChange(e.target.value)}
                        placeholder="e.g. 95000"
                        className="w-full pl-8 pr-4 py-2.5 text-base font-bold rounded-xl border border-slate-300 dark:border-navy-700 bg-white dark:bg-navy-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500"
                      />
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-navy-800/60 border border-slate-200 dark:border-navy-700">
                    <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">Earnings Points Awarded</span>
                    <span className="text-xl font-bold text-slate-900 dark:text-white">
                      {result.factors.earnings.points}{' '}
                      <span className="text-xs font-normal text-slate-400">/ 150 pts</span>
                    </span>
                    <span className="text-xs text-brand-600 dark:text-brand-400 block font-medium mt-0.5 truncate">
                      {result.factors.earnings.selectedLabel}
                    </span>
                  </div>
                </div>

                {/* Gross Pay Frequency helper toggle */}
                <div>
                  <button
                    type="button"
                    onClick={() => setShowGrossConverter(!showGrossConverter)}
                    className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
                  >
                    <span>{showGrossConverter ? 'Hide' : 'Need help calculating? Open'} Gross Pay Frequency Helper</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showGrossConverter ? 'rotate-180' : ''}`} />
                  </button>

                  {showGrossConverter && (
                    <div className="mt-3">
                      <GrossPayConverter
                        onApplySalary={(amt) => handleAnnualSalaryChange(amt.toString())}
                      />
                    </div>
                  )}
                </div>

                <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 pt-1">
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  <span>
                    Must comply with the{' '}
                    <a
                      href={VPT_CONFIG.earningsGuideUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-600 dark:text-brand-400 underline font-medium"
                    >
                      Victorian Annual Earnings Estimation Guide
                    </a>.
                  </span>
                </div>
              </div>
            )}
          </section>

          {/* SECTION I: FEDERAL SKILLSELECT NOTICE (DISTINCT SECTION) */}
          <section className="bg-slate-50 dark:bg-navy-950 p-6 rounded-2xl border border-slate-200 dark:border-navy-800">
            <div className="flex items-center gap-2 mb-2 text-slate-700 dark:text-slate-300">
              <ShieldCheck className="w-5 h-5 text-brand-600" />
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Federal SkillSelect Points (Separate Requirement)
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Remember: The Victorian Points Test (VPT) calculates how your Registration of Interest is ranked within Victoria. You must <strong>also</strong> achieve a minimum of 65 points on the Australian Department of Home Affairs federal points test to be eligible for a visa.
            </p>
            <div className="mt-3">
              <a
                href={VPT_CONFIG.federalPointsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
              >
                Launch Official Australian Government Points Calculator
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </section>
        </div>

        {/* Right Column: Sticky Live Score Summary & Result Dashboard (4 Cols on Desktop) */}
        <div className="lg:col-span-4 sticky top-20 space-y-6">
          <div className="bg-white dark:bg-navy-900 rounded-2xl p-6 border border-slate-200 dark:border-navy-800 shadow-md">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-navy-800">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Live Score Summary
              </span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  result.isComplete && !result.isProvisional
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                }`}
              >
                {result.isComplete && !result.isProvisional ? 'Complete' : 'Provisional'}
              </span>
            </div>

            {/* Total score hero */}
            <div className="py-6 text-center">
              <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest block font-medium">
                Estimated VPT Score
              </span>
              <div className="text-5xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tight my-1">
                {result.totalPoints}
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">
                Targeting Subclass {inputs.visaSubclass || '190'}
              </span>
            </div>

            {/* Factor breakdown progress bars */}
            <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-navy-800 text-xs">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Factor Breakdown
              </span>

              {[
                { name: 'Age', factor: result.factors.age },
                { name: 'English', factor: result.factors.english },
                { name: 'Experience', factor: result.factors.experience },
                { name: 'Education', factor: result.factors.education },
                { name: 'Occupation', factor: result.factors.occupation },
                { name: 'Partner', factor: result.factors.partner },
                { name: 'Victorian Earnings', factor: result.factors.earnings },
              ].map(({ name, factor }) => {
                const percentage = Math.round((factor.points / factor.maxPossible) * 100);
                return (
                  <div key={name} className="space-y-1">
                    <div className="flex justify-between text-slate-700 dark:text-slate-300 font-medium">
                      <span>{name}</span>
                      <span className="font-bold text-slate-900 dark:text-white">
                        {factor.points} <span className="text-slate-400 font-normal">/ {factor.maxPossible}</span>
                      </span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-navy-800 overflow-hidden">
                      <div
                        className="h-full bg-brand-600 dark:bg-brand-500 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action buttons */}
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-navy-800 space-y-2">
              <button
                type="button"
                onClick={handleCopySummary}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-brand-600 hover:bg-brand-700 text-white shadow-sm flex items-center justify-center gap-2 transition-all"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-200" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Summary Copied to Clipboard!' : 'Copy Score Summary'}
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleShare}
                  className="py-2 px-3 rounded-xl text-xs font-medium border border-slate-200 dark:border-navy-700 hover:bg-slate-50 dark:hover:bg-navy-800 text-slate-700 dark:text-slate-300 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{shared ? 'Shared!' : 'Share'}</span>
                </button>

                <button
                  type="button"
                  onClick={handlePrint}
                  className="py-2 px-3 rounded-xl text-xs font-medium border border-slate-200 dark:border-navy-700 hover:bg-slate-50 dark:hover:bg-navy-800 text-slate-700 dark:text-slate-300 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print / PDF</span>
                </button>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="w-full py-2 text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 flex items-center justify-center gap-1 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Start Again / Reset Form</span>
              </button>
            </div>

            {/* Verification & Caveat Notice */}
            <div className="mt-4 p-3 rounded-xl bg-slate-50 dark:bg-navy-800/50 text-[11px] text-slate-500 dark:text-slate-400 space-y-1.5">
              <div className="font-semibold text-slate-700 dark:text-slate-300">
                Official Program Note
              </div>
              <p className="leading-normal">
                Victoria does not publish a fixed VPT pass mark. This calculation estimates your ranking points based on published criteria (Oct 2024). It cannot predict or guarantee an invitation.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Salary Scenario Planner Section */}
      <SalaryScenarioPlanner currentInputs={inputs} />
    </div>
  );
}
