/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Star, ArrowRight, ShieldCheck, Mail, Sparkles, Check } from 'lucide-react';
import { AI_TOOLS_DB } from '../data/tools';

interface SidebarWidgetsProps {
  onNavigate: (page: string) => void;
}

export function TrendingToolsWidget({ onNavigate }: SidebarWidgetsProps) {
  const topTools = AI_TOOLS_DB.slice(0, 3); // Get ChatGPT, Gemini, Claude

  return (
    <div className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">Trending Core Tools</h5>
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
      </div>

      <div className="space-y-4">
        {topTools.map((tool) => (
          <div key={tool.id} className="group relative space-y-1 bg-slate-50 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-100/60 dark:border-slate-800">
            <div className="flex justify-between items-start">
              <span className="font-bold text-slate-950 dark:text-white text-xs group-hover:text-indigo-600 transition-all">{tool.name}</span>
              <span className="text-[10px] font-mono text-emerald-600 font-semibold">{tool.pricing.startingAt}</span>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">{tool.description}</p>
            <div className="flex justify-between items-center pt-2 text-[10px] text-slate-400">
              <span className="flex items-center gap-0.5"><Star className="w-3 h-3 fill-current text-amber-400" /> {tool.rating}</span>
              <button
                onClick={() => onNavigate('best-ai-tools')}
                className="text-[10px] font-bold text-indigo-500 group-hover:underline inline-flex items-center gap-0.5 cursor-pointer"
              >
                Inspect Price <ArrowRight className="w-2.5 h-2.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function NewsletterWidget() {
  const [email, setEmail] = useState<string>('');
  const [done, setDone] = useState<boolean>(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setDone(true);
      setEmail('');
    }
  };

  return (
    <div className="border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-indigo-50/20 to-emerald-50/10 dark:from-slate-950 dark:to-emerald-950/20 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="space-y-1">
        <span className="text-[9px] font-bold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase block">POPULAR DOWNLOAD</span>
        <h5 className="text-sm font-extrabold text-slate-900 dark:text-white leading-tight">Get the Free "50 AI Tools Handbook"</h5>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Save hours searching. Verified tools spreadsheet lists pros, cons, and promo links.</p>
      </div>

      {!done ? (
        <form onSubmit={onSubmit} className="space-y-2">
          <input
            type="email"
            required
            placeholder="Reviewer email address..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-white text-xs font-semibold px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:border-indigo-550"
          />
          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1"
          >
            Claim Free Handbook <Mail className="w-3.5 h-3.5" />
          </button>
        </form>
      ) : (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 text-emerald-800 dark:text-emerald-400 rounded-xl space-y-1">
          <div className="text-xs font-bold flex items-center gap-1 text-emerald-900 dark:text-emerald-400">
            <Check className="w-3.5 h-3.5 text-emerald-500" /> Bundle Unlocked!
          </div>
          <p className="text-[11px] leading-relaxed">Please navigate to the Resources tab to directly download your assets.</p>
        </div>
      )}
    </div>
  );
}

export function ExpertSpotlightWidget() {
  return (
    <div className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Expert Content Spotlight</div>
      <div className="flex items-center gap-3">
        <img
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
          alt="Sarah Jenkins"
          referrerPolicy="no-referrer"
          className="w-12 h-12 rounded-full border border-slate-100 object-cover shrink-0"
        />
        <div>
          <h6 className="text-xs font-bold text-slate-950 dark:text-white">Sarah Jenkins</h6>
          <span className="text-[10px] text-slate-400">Head of Systems Consulting</span>
        </div>
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
        Sarah Jenkins spent 6 years advising Fortune 500 corporate giants on scaling operations. Now she publishes daily automation blueprints on AI Business Hub.
      </p>
      <div className="text-[10px] text-emerald-800 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 p-2.5 rounded-xl border border-emerald-100/30 font-semibold flex items-center gap-1.5 leading-none">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> Real, verified human testers (No AI-slop reviews)
      </div>
    </div>
  );
}
