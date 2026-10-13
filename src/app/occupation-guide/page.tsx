'use client';

import React, { useState } from 'react';
import { Compass, Search, ExternalLink, ShieldAlert } from 'lucide-react';
import {
  VICTORIAN_PRIORITY_INDUSTRIES,
  VERIFIED_OCCUPATIONS,
} from '@/data/occupations';

export default function OccupationGuidePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [selectedSkillLevel, setSelectedSkillLevel] = useState<string>('all');

  const filteredOccupations = VERIFIED_OCCUPATIONS.filter((occ) => {
    const matchesSearch =
      occ.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      occ.anzscoCode.includes(searchTerm);
    const matchesIndustry =
      selectedIndustry === 'all' || occ.priorityIndustryId === selectedIndustry;
    const matchesSkillLevel =
      selectedSkillLevel === 'all' || occ.skillLevel === selectedSkillLevel;
    return matchesSearch && matchesIndustry && matchesSkillLevel;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 border border-brand-200 dark:border-brand-800">
          <Compass className="w-3.5 h-3.5" />
          Victorian Industry Priorities &amp; ANZSCO Tiers
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Occupation &amp; Priority Industry Guide
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed max-w-3xl">
          Learn how ANZSCO occupation skill levels affect your Victorian Points Test score, and explore the critical economic sectors Victoria targets for skilled visa nomination.
        </p>
      </div>

      {/* Crucial distinction alert */}
      <div className="p-6 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 text-amber-900 dark:text-amber-200 text-sm space-y-2 leading-relaxed">
        <div className="flex items-center gap-2 font-bold text-amber-800 dark:text-amber-300">
          <ShieldAlert className="w-5 h-5 flex-shrink-0" />
          <span>Crucial Legal Distinction: Priority Status vs Nomination Eligibility</span>
        </div>
        <p>
          Being <strong>listed as a priority occupation</strong> indicates that Victoria actively seeks candidates in this field to address acute labour shortages. However, priority listing does <strong>not</strong> guarantee an invitation. Furthermore, all applicants must separately satisfy baseline federal skilled visa prerequisites (such as holding a positive skills assessment and reaching 65 federal points) before receiving state nomination.
        </p>
      </div>

      {/* Understanding Skill Levels */}
      <div className="bg-white dark:bg-navy-900 p-8 rounded-3xl border border-slate-200 dark:border-navy-800 shadow-sm space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Understanding ANZSCO Skill Levels Under the VPT
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          The Australian and New Zealand Standard Classification of Occupations (ANZSCO) categorizes occupations into skill levels based on the range and complexity of tasks performed.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-brand-50/50 dark:bg-brand-950/30 border border-brand-200 dark:border-brand-800/60 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 dark:text-white text-base">
                Skill Level 1
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-600 text-white">
                50 VPT Points
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Commensurate with a Bachelor degree or higher qualification (e.g. Registered Nurses, Software Engineers, Civil Engineers, Secondary Teachers, Medical Doctors).
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-navy-800/60 border border-slate-200 dark:border-navy-700 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 dark:text-white text-base">
                Skill Level 2
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-200 dark:bg-navy-700 text-slate-700 dark:text-slate-300">
                0 VPT Points
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Commensurate with an Associate Degree, Advanced Diploma, or Diploma (e.g. Chef, Medical Technicians, Building Inspectors).
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-navy-800/60 border border-slate-200 dark:border-navy-700 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 dark:text-white text-base">
                Skill Level 3
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-200 dark:bg-navy-700 text-slate-700 dark:text-slate-300">
                0 VPT Points
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Commensurate with Certificate IV or Certificate III including at least 2 years of on-the-job training (e.g. Electricians, Carpenters, Cooks).
            </p>
          </div>
        </div>
      </div>

      {/* Priority Sectors Overview */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Victoria&apos;s Published Priority Sectors
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {VICTORIAN_PRIORITY_INDUSTRIES.map((sector) => (
            <div
              key={sector.id}
              className="p-5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 space-y-2 shadow-sm"
            >
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {sector.name}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {sector.description}
              </p>
              <div className="text-[11px] text-brand-600 dark:text-brand-400 font-medium">
                Target: {sector.targetFocus}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Searchable Verified Occupations Explorer */}
      <div className="bg-white dark:bg-navy-900 p-8 rounded-3xl border border-slate-200 dark:border-navy-800 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Verified Occupations Directory
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Sample verified Victorian priority occupations with ANZSCO codes and skill classifications.
            </p>
          </div>
          <div className="text-xs text-slate-400">
            Source: Live in Melbourne &bull; Oct 2024
          </div>
        </div>

        {/* Filter controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search title or ANZSCO code..."
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-navy-700 bg-slate-50 dark:bg-navy-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
          </div>

          <div>
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="w-full py-2 px-3 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-navy-700 bg-slate-50 dark:bg-navy-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
            >
              <option value="all">All Priority Industries</option>
              {VICTORIAN_PRIORITY_INDUSTRIES.map((ind) => (
                <option key={ind.id} value={ind.id}>
                  {ind.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={selectedSkillLevel}
              onChange={(e) => setSelectedSkillLevel(e.target.value)}
              className="w-full py-2 px-3 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-navy-700 bg-slate-50 dark:bg-navy-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
            >
              <option value="all">All Skill Levels</option>
              <option value="level_1">Skill Level 1 (50 VPT pts)</option>
              <option value="level_2">Skill Level 2 (0 VPT pts)</option>
              <option value="level_3">Skill Level 3 (0 VPT pts)</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-navy-800">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 dark:bg-navy-800/60 text-slate-700 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-navy-800">
              <tr>
                <th className="py-3 px-4">ANZSCO</th>
                <th className="py-3 px-4">Occupation Title</th>
                <th className="py-3 px-4">Skill Level</th>
                <th className="py-3 px-4">Priority Sector</th>
                <th className="py-3 px-4">Visas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-navy-800/60">
              {filteredOccupations.map((occ) => (
                <tr key={occ.anzscoCode} className="hover:bg-slate-50/80 dark:hover:bg-navy-800/40">
                  <td className="py-3 px-4 font-mono font-bold text-brand-600 dark:text-brand-400">
                    {occ.anzscoCode}
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">
                    {occ.title}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${
                        occ.skillLevel === 'level_1'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-slate-100 text-slate-700 dark:bg-navy-800 dark:text-slate-300'
                      }`}
                    >
                      {occ.skillLevel === 'level_1' ? 'Level 1 (50 pts)' : occ.skillLevel.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                    {occ.priorityIndustryName || 'General'}
                  </td>
                  <td className="py-3 px-4 text-xs font-mono">
                    {occ.eligibleSubclasses.map((s) => `Subclass ${s}`).join(', ')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredOccupations.length === 0 && (
          <div className="text-center py-8 text-slate-400 text-xs">
            No occupations matched your filter criteria. Try clearing search terms.
          </div>
        )}
      </div>

      {/* Official Links Footer */}
      <div className="p-6 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-slate-600 dark:text-slate-400">
          Want to verify the comprehensive official list directly with the Victorian Government?
        </div>
        <a
          href="https://liveinmelbourne.vic.gov.au/migrate/skilled-migration-visas"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-white dark:bg-navy-800 border border-slate-300 dark:border-navy-700 text-slate-800 dark:text-white hover:bg-slate-100 transition-colors shadow-2xs"
        >
          Live in Melbourne Portal <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
