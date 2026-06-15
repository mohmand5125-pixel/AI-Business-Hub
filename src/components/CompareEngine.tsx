/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Sliders, Sparkles, AlertCircle, ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface ModelSpecs {
  name: string;
  creator: string;
  pricing: string;
  contextWindow: string;
  bestFor: string;
  pros: string[];
  cons: string[];
  metrics: {
    writing: number;
    coding: number;
    speed: number;
    multimodal: number;
    value: number;
  };
  verdict: string;
}

const COMPARISON_MODELS: Record<string, ModelSpecs> = {
  chatgpt: {
    name: 'ChatGPT Plus',
    creator: 'OpenAI',
    pricing: '$20 / month',
    contextWindow: '128k input tokens',
    bestFor: 'Advanced data analysis, Custom GPT bots, voice conversational tasks',
    pros: [
      'Amazing voice integration features (Advanced Voice Mode)',
      'Unrivaled CSV/Excel raw files sorting capabilities',
      'The massive custom GPT Store ecosystem for ready-made agents'
    ],
    cons: [
      'Writing styles often require careful coaching to avoid robotic wording',
      'Browser UI gets sluggish during heavy data generation requests'
    ],
    metrics: {
      writing: 85,
      coding: 94,
      speed: 90,
      multimodal: 95,
      value: 92
    },
    verdict: 'Choose ChatGPT Plus if your work demands heavy data science calculations, custom workspace-sharing pipelines, or specialized agents. Still the most robust general-purpose engine.'
  },
  claude: {
    name: 'Claude Pro',
    creator: 'Anthropic',
    pricing: '$20 / month',
    contextWindow: '200k input tokens',
    bestFor: 'Flawless copywriting, organic storytelling, complex web wireframing',
    pros: [
      'The most organic and non-artificial writing voice in existence',
      'Artifacts interface lets you test rendering pages and designs in-canvas',
      'Double the capacity of standard context limits for major book layouts'
    ],
    cons: [
      'Very strict daily message throttles during heavy network loads',
      'No native direct live internet search capability on standalone tabs'
    ],
    metrics: {
      writing: 98,
      coding: 97,
      speed: 84,
      multimodal: 88,
      value: 95
    },
    verdict: 'Choose Claude Pro if you are a freelance publisher, designer, or software developer. Its writing output reads with an authentic human voice, and its coding capabilities are highly detailed.'
  },
  gemini: {
    name: 'Gemini Advanced',
    creator: 'Google',
    pricing: '$20 / month (Includes Workspace)',
    contextWindow: '2,000,000 input tokens',
    bestFor: 'Massive document analysis, Google Workspace integration, live internet audits',
    pros: [
      'A mammoth 2-million-token context limit that digests full booklets easily',
      'Direct, real-time live web indexing powered by Google Search mechanics',
      'Natively reads, drafts, and audits within Google Mail, Sheets, and Docs'
    ],
    cons: [
      'Slightly lower compliance values for intricate single-line code formatting',
      'Prefers verbose speech patterns'
    ],
    metrics: {
      writing: 88,
      coding: 88,
      speed: 95,
      multimodal: 92,
      value: 90
    },
    verdict: 'Choose Gemini Advanced if your workspace revolves around the Google Workspace Ecosystem. It is the absolute champion for conducting complex research over massive files.'
  }
};

export default function CompareEngine() {
  const [modelA, setModelA] = useState<string>('chatgpt');
  const [modelB, setModelB] = useState<string>('claude');
  const [useWeight, setUseWeight] = useState<boolean>(true);

  // Simple metric score calculators
  const specA = COMPARISON_MODELS[modelA];
  const specB = COMPARISON_MODELS[modelB];

  const getMetricAverage = (specs: ModelSpecs) => {
    const list = Object.values(specs.metrics);
    return Math.round(list.reduce((sum, v) => sum + v, 0) / list.length);
  };

  return (
    <div id="compare-engine-card" className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-2xl p-6 shadow-sm overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-100 dark:border-slate-900">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-emerald-700 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/40 rounded-full mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Interactive comparison engine
          </span>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Compare Chatbots Head-to-Head</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Select platforms to evaluate business logic scores, pricing, and pros/cons.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setUseWeight(!useWeight)}
            className={`inline-flex items-center gap-2 px-3  py-1.5 text-xs font-medium rounded-lg transition-all ${
              useWeight 
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950' 
                : 'bg-slate-100 text-slate-600 dark:bg-slate-900 dark:text-slate-300'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            {useWeight ? 'Showing Detailed Specs' : 'Simple Mode'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Select Primary AI</label>
          <select
            value={modelA}
            onChange={(e) => setModelA(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 px-4 py-2.5 rounded-xl text-sm font-semibold focus:outline-none focus:border-emerald-500 transition-all cursor-pointer"
          >
            <option value="chatgpt">ChatGPT Plus (OpenAI)</option>
            <option value="claude">Claude Pro (Anthropic)</option>
            <option value="gemini">Gemini Advanced (Google)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Select Competitor</label>
          <select
            value={modelB}
            onChange={(e) => setModelB(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 px-4 py-2.5 rounded-xl text-sm font-semibold focus:outline-none focus:border-emerald-500 transition-all cursor-pointer"
          >
            <option value="chatgpt">ChatGPT Plus (OpenAI)</option>
            <option value="claude">Claude Pro (Anthropic)</option>
            <option value="gemini">Gemini Advanced (Google)</option>
          </select>
        </div>
      </div>

      {modelA === modelB ? (
        <div className="bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-400 p-4 rounded-xl flex items-start gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <p className="text-sm">You have selected the same model for both placements. Change one of the models above to analyze and contrast their different business capabilities!</p>
        </div>
      ) : (
        <div className="space-y-8 animate-fade-in">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-100 dark:border-slate-900">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold text-slate-950 dark:text-white">{specA.name}</span>
                <span className="px-2 py-0.5 text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400 rounded-full">
                  Score: {getMetricAverage(specA)}%
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-2"><strong>Pricing:</strong> {specA.pricing}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-2"><strong>Context:</strong> {specA.contextWindow}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4"><strong>Best Use Case:</strong> {specA.bestFor}</p>
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Pros checklist:</span>
                {specA.pros.map((p, i) => (
                  <div key={i} className="flex items-start gap-1.5 text-xs text-slate-600 dark:text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                    <span>{p}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-100 dark:border-slate-900">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold text-slate-950 dark:text-white">{specB.name}</span>
                <span className="px-2 py-0.5 text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400 rounded-full">
                  Score: {getMetricAverage(specB)}%
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-2"><strong>Pricing:</strong> {specB.pricing}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-2"><strong>Context:</strong> {specB.contextWindow}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4"><strong>Best Use Case:</strong> {specB.bestFor}</p>
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Pros checklist:</span>
                {specB.pros.map((p, i) => (
                  <div key={i} className="flex items-start gap-1.5 text-xs text-slate-600 dark:text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                    <span>{p}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Metrics comparison charts */}
          {useWeight && (
            <div className="space-y-3.5 p-4 border border-slate-100 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-900/10 rounded-xl">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">Capability Metric Chart</h4>
              
              {/* Writing */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-700 dark:text-slate-300">Copywriting & Narrative Tone</span>
                  <span className="font-mono text-slate-500">{specA.metrics.writing} vs {specB.metrics.writing}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 h-2.5 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full transition-all" style={{ width: `${specA.metrics.writing}%` }}></div>
                  <div className="h-full bg-purple-500 rounded-full transition-all" style={{ width: `${specB.metrics.writing}%` }}></div>
                </div>
              </div>

              {/* Coding */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-700 dark:text-slate-300">Code Synthesis & Advanced Logic</span>
                  <span className="font-mono text-slate-500">{specA.metrics.coding} vs {specB.metrics.coding}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 h-2.5 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full transition-all" style={{ width: `${specA.metrics.coding}%` }}></div>
                  <div className="h-full bg-purple-500 rounded-full transition-all" style={{ width: `${specB.metrics.coding}%` }}></div>
                </div>
              </div>

              {/* Speed */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-700 dark:text-slate-300">In-Session Velocity (Time to First-token)</span>
                  <span className="font-mono text-slate-500">{specA.metrics.speed} vs {specB.metrics.speed}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 h-2.5 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full transition-all" style={{ width: `${specA.metrics.speed}%` }}></div>
                  <div className="h-full bg-purple-500 rounded-full transition-all" style={{ width: `${specB.metrics.speed}%` }}></div>
                </div>
              </div>

              {/* Multimodal */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-700 dark:text-slate-300">Multi-Modal Processing (Images/PDFs)</span>
                  <span className="font-mono text-slate-500">{specA.metrics.multimodal} vs {specB.metrics.multimodal}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 h-2.5 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full transition-all" style={{ width: `${specA.metrics.multimodal}%` }}></div>
                  <div className="h-full bg-purple-500 rounded-full transition-all" style={{ width: `${specB.metrics.multimodal}%` }}></div>
                </div>
              </div>

              {/* Value */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-700 dark:text-slate-300">Price-to-Value ROI</span>
                  <span className="font-mono text-slate-500">{specA.metrics.value} vs {specB.metrics.value}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 h-2.5 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full transition-all" style={{ width: `${specA.metrics.value}%` }}></div>
                  <div className="h-full bg-purple-500 rounded-full transition-all" style={{ width: `${specB.metrics.value}%` }}></div>
                </div>
              </div>

              <div className="flex justify-end gap-4 text-[10px] font-bold text-slate-400 mt-2">
                <span className="flex items-center gap-1"><span className="w-2 h-2 bg-indigo-500 rounded-full"></span> {specA.name}</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 bg-purple-500 rounded-full"></span> {specB.name}</span>
              </div>
            </div>
          )}

          {/* Expert Publisher Verdict */}
          <div className="p-5 rounded-2xl border-l-4 border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/20 text-slate-800 dark:text-slate-300 text-sm">
            <h5 className="font-bold text-emerald-900 dark:text-emerald-400 flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 shrink-0" /> Publisher’s Active Verdict
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-800">
              <div className="pb-3 md:pb-0 md:pr-4">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{specA.name}</p>
                <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">{specA.verdict}</p>
              </div>
              <div className="pt-3 md:pt-0 md:pl-4">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{specB.name}</p>
                <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">{specB.verdict}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
