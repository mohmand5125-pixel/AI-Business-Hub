/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Search, Filter, BookOpen, Clock, ArrowUpRight, TrendingUp, CheckCircle, HelpCircle, Activity } from 'lucide-react';
import { CONTENT_PLAN_DB } from '../data/blogPosts';
import { ContentPlannerDay } from '../types';

interface SEOPlannerProps {
  onNavigateToPost: (slug: string) => void;
}

export default function SEOPlannerTracker({ onNavigateToPost }: SEOPlannerProps) {
  const [search, setSearch] = useState<string>('');
  const [intentFilter, setIntentFilter] = useState<string>('all');
  const [selectedDayNum, setSelectedDayNum] = useState<number>(1);

  const selectedDay = CONTENT_PLAN_DB.find(d => d.day === selectedDayNum) || CONTENT_PLAN_DB[0];

  const filteredDays = CONTENT_PLAN_DB.filter((day) => {
    const matchesSearch = day.title.toLowerCase().includes(search.toLowerCase()) || 
                          day.primaryKeyword.toLowerCase().includes(search.toLowerCase());
    const matchesIntent = intentFilter === 'all' || day.searchIntent.toLowerCase() === intentFilter.toLowerCase();
    return matchesSearch && matchesIntent;
  });

  return (
    <div id="seo-planner-tracker" className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      
      {/* Search and Day Selector Panel */}
      <div className="lg:col-span-4 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-2xl p-4 shadow-sm space-y-4 max-h-[640px] overflow-y-auto">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-slate-950 dark:text-white text-sm flex items-center gap-1.5 leading-none">
            <Activity className="w-4 h-4 text-indigo-500" /> Content Planner (Day 1-30)
          </h4>
          <span className="text-[10px] font-mono tracking-widest px-2 py-0.5 bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400 rounded-full font-bold">
            MASTER CALENDAR
          </span>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search keywords or titles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs font-semibold focus:outline-none focus:border-indigo-500 transition-all text-slate-950 dark:text-slate-200"
          />
        </div>

        <div className="flex gap-2 border-b border-slate-100 dark:border-slate-900 pb-2">
          {['all', 'informational', 'commercial'].map((intent) => (
            <button
              key={intent}
              onClick={() => setIntentFilter(intent)}
              className={`flex-1 text-[10px] font-bold uppercase py-1 rounded-md transition-all cursor-pointer ${
                intentFilter === intent
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950'
                  : 'bg-slate-50 text-slate-400 hover:text-slate-200 dark:bg-slate-900'
              }`}
            >
              {intent}
            </button>
          ))}
        </div>

        <div className="space-y-1.5">
          {filteredDays.length === 0 ? (
            <div className="text-center py-6 text-xs text-slate-400">No content strategies match search terms.</div>
          ) : (
            filteredDays.map((day) => (
              <button
                key={day.day}
                onClick={() => setSelectedDayNum(day.day)}
                className={`w-full text-left p-3 rounded-xl transition-all border flex items-center justify-between cursor-pointer ${
                  selectedDayNum === day.day
                    ? 'border-indigo-500 bg-indigo-50/25 dark:bg-indigo-950/20'
                    : 'border-transparent hover:bg-slate-50 dark:hover:bg-slate-900'
                }`}
              >
                <div className="space-y-0.5 truncate pr-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 font-mono">Day {day.day}</span>
                    {day.isWritten && (
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" title="Article Drafted" />
                    )}
                  </div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white truncate">{day.title}</div>
                  <div className="text-[10px] text-slate-400 truncate">Keyword: <strong>{day.primaryKeyword}</strong></div>
                </div>
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase shrink-0 ${
                  day.searchIntent === 'Commercial'
                    ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400'
                    : 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400'
                }`}>
                  {day.searchIntent[0]}
                </span>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Structured SEO Brief Detailed View */}
      <div className="lg:col-span-8 space-y-6">
        <div className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-900 pb-5">
            <div>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[10px] font-bold uppercase rounded-md bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-400">
                SEO Article Brief Calendar (Day {selectedDay.day} of 30)
              </span>
              <h3 className="text-lg font-bold text-slate-950 dark:text-white mt-1.5">{selectedDay.title}</h3>
              <p className="text-xs text-slate-400 mt-1">Category placement: <strong>{selectedDay.category}</strong></p>
            </div>

            {selectedDay.isWritten && selectedDay.slug ? (
              <button
                onClick={() => onNavigateToPost(selectedDay.slug!)}
                className="inline-flex items-center gap-1.5 px-4 py-2 font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition-all cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5" /> Read Complete Article Copy
              </button>
            ) : (
              <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 bg-slate-50 dark:bg-slate-900 rounded-xl flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> Scheduled for Pipeline
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Search Intent Goal</span>
              <span className="text-xs font-semibold text-slate-900 dark:text-white inline-flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-500" /> {selectedDay.searchIntent}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Suggested Word Count</span>
              <span className="text-xs font-bold text-slate-900 dark:text-white font-mono">
                {selectedDay.suggestedLength.toLocaleString()} words
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 sm:col-span-2 md:col-span-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Primary Target Key</span>
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                "{selectedDay.primaryKeyword}"
              </span>
            </div>
          </div>

          {/* Keywords & Linking */}
          <div className="space-y-4 pt-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Secondary LSI Keywords:</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedDay.secondaryKeywords.map((tag, i) => (
                    <span key={i} className="px-2 py-0.5 text-[10px] font-bold text-slate-600 bg-slate-100 dark:text-slate-300 dark:bg-slate-900 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Suggested Internal Links:</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedDay.internalLinks.map((link, i) => (
                    <span key={i} className="px-2 py-0.5 text-[10px] font-bold text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-950/30 rounded border border-blue-100 dark:border-blue-900/30 font-mono">
                      {link}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 dark:border-slate-900 pt-4 space-y-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-slate-500 block mb-1">SEO Title Tag</span>
                <div className="text-xs font-semibold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-900 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800">
                  {selectedDay.seoTitle}
                </div>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-slate-500 block mb-1">Meta Description Tag</span>
                <div className="text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 leading-relaxed">
                  {selectedDay.metaDescription}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-100 dark:border-slate-900 pt-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-slate-500 block mb-1">Affiliate Targets</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedDay.affiliateOpportunities.map((aff, i) => (
                    <span key={i} className="px-2.5 py-1 text-xs font-semibold bg-emerald-50 text-emerald-800 dark:bg-emerald-950/35 dark:text-emerald-400 rounded-xl border border-emerald-100 dark:border-emerald-900/10">
                      🔗 {aff}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-slate-500 block mb-1">Highest Conversion CTA placement</span>
                <p className="text-xs text-slate-400 leading-relaxed italic">{selectedDay.ctaPlacement}</p>
              </div>
            </div>

            <div className="bg-indigo-50/20 dark:bg-indigo-950/10 p-4 rounded-xl border border-indigo-50 dark:border-indigo-950 text-xs">
              <span className="font-bold text-indigo-900 dark:text-indigo-400 block mb-1">Social Promotion Content Ideas:</span>
              <ul className="list-disc list-inside space-y-1 text-slate-500 dark:text-slate-400 leading-relaxed">
                {selectedDay.socialMediaIdeas.map((idea, i) => (
                  <li key={i}>{idea}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
