/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { HelpCircle, ArrowRight, RefreshCw, Check, Sparkles, AlertCircle } from 'lucide-react';
import { AI_TOOLS_DB } from '../data/tools';
import { AITool } from '../types';

interface QuizAnswers {
  businessType: string;
  budget: string;
  painPoint: string;
}

export default function ToolFinderQuiz() {
  const [step, setStep] = useState<number>(1);
  const [answers, setAnswers] = useState<QuizAnswers>({
    businessType: '',
    budget: '',
    painPoint: '',
  });
  const [result, setResult] = useState<AITool | null>(null);
  const [diagnosticText, setDiagnosticText] = useState<string>('');

  const handleSelectOption = (field: keyof QuizAnswers, value: string) => {
    setAnswers({ ...answers, [field]: value });
    if (step < 3) {
      setStep(step + 1);
    } else {
      calculateResult({ ...answers, [field]: value });
    }
  };

  const calculateResult = (finalAnswers: QuizAnswers) => {
    // Basic diagnostic logic matching tool database
    let recommended: AITool | undefined;
    let explanation = '';

    if (finalAnswers.businessType === 'ecommerce') {
      if (finalAnswers.painPoint === 'customer_support') {
        recommended = AI_TOOLS_DB.find(t => t.id === 'manychat') || AI_TOOLS_DB.find(t => t.id === 'intercom-fin');
        explanation = 'Since you run an e-commerce shop receiving constant social DMs and inquiries, ManyChat AI is your absolute best match. It connects directly with Meta APIs to convert comment-mentions into transactional cart links instantly.';
      } else {
        recommended = AI_TOOLS_DB.find(t => t.id === 'shopify-magic');
        explanation = 'As an e-commerce owner focused on fast product listing cycles, Shopify Magic gives you built-in generative AI to draft magnetic product attributes and copy vectors absolutely free.';
      }
    } else if (finalAnswers.businessType === 'local') {
      recommended = AI_TOOLS_DB.find(t => t.id === 'brightlocal-ai');
      explanation = 'For local map rankings and geo-targeted walk-ins, BrightLocal AI reviews your local listings, drafts optimized review reactions, and boosts local presence checklists.';
    } else if (finalAnswers.painPoint === 'automation') {
      if (finalAnswers.budget === 'low') {
        recommended = AI_TOOLS_DB.find(t => t.id === 'make');
        explanation = 'To build complex database actions on a budget, Make.com is your match. It offers incredible multi-step visual branch pathways for less than half the monthly cost of alternative platforms.';
      } else {
        recommended = AI_TOOLS_DB.find(t => t.id === 'zapier');
        explanation = 'Zapier Central is the absolute gold standard for multi-app setups. Simply write natural language to program smart virtual assistants which trigger on email responses, sheet columns, and team tools.';
      }
    } else if (finalAnswers.painPoint === 'copywriting') {
      recommended = AI_TOOLS_DB.find(t => t.id === 'claude');
      explanation = 'For premium copy, articles, and organic content, Claude Pro is the industry favorite. It skips robotic patterns and generates deep, nuanced editorial outputs matching true consumer sentiment.';
    } else {
      recommended = AI_TOOLS_DB.find(t => t.id === 'chatgpt') || AI_TOOLS_DB.find(t => t.id === 'gemini');
      explanation = 'As a generalist seeking solid structural analysis and day-to-day calculations, ChatGPT Plus provides the most comprehensive data interpreter environment to automate repetitive workbook uploads.';
    }

    setResult(recommended || AI_TOOLS_DB[0]);
    setDiagnosticText(explanation);
    setStep(4);
  };

  const resetQuiz = () => {
    setAnswers({ businessType: '', budget: '', painPoint: '' });
    setStep(1);
    setResult(null);
    setDiagnosticText('');
  };

  return (
    <div id="ai-tool-finder-quiz" className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-2xl p-6 shadow-sm overflow-hidden">
      <div className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-indigo-700 bg-indigo-50 dark:text-indigo-400 dark:bg-indigo-950/40 rounded-full mb-3 w-fit">
        <HelpCircle className="w-3.5 h-3.5" /> AI Tool Finder Diagnostic
      </div>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Discover Your Perfect AI Companion</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Answer three simple business filters to reveal customized instructions and tool picks tailored specifically for your workflow.</p>

      {/* Steps Indicator */}
      {step < 4 && (
        <div className="flex items-center gap-2 mb-6">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                s <= step ? 'bg-indigo-600 dark:bg-indigo-500' : 'bg-slate-100 dark:bg-slate-800'
              }`}
            />
          ))}
          <span className="text-xs font-bold text-slate-400 shrink-0 select-none ml-2">Step {step}/3</span>
        </div>
      )}

      {/* Step 1: Business Type */}
      {step === 1 && (
        <div className="animate-fade-in space-y-4">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">What describes your active business?</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { id: 'ecommerce', label: 'E-commerce Seller', desc: 'Shopify, Amazon, WooCommerce brands' },
              { id: 'freelancer', label: 'Freelancer / Copywriter', desc: 'Designs, blogs, consultancy, code' },
              { id: 'local', label: 'Local Business', desc: 'Dentists, lawyers, construction, retail' },
              { id: 'agency', label: 'Marketing Agency', desc: 'Managing multi-channel client accounts' },
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleSelectOption('businessType', opt.id)}
                className="text-left p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500 hover:bg-indigo-50/20 transition-all group shrink-0 select-none cursor-pointer"
              >
                <div className="font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 text-sm">{opt.label}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{opt.desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Budget */}
      {step === 2 && (
        <div className="animate-fade-in space-y-4">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">What is your monthly target budget for software?</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'zero', label: '$0 (Completely Free)', desc: 'Only free plans and credits' },
              { id: 'low', label: '$15 - $40 / month', desc: 'Basic startup tools' },
              { id: 'high', label: '$100+ / month', desc: 'High scalability features' },
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleSelectOption('budget', opt.id)}
                className="text-left p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500 hover:bg-indigo-50/20 transition-all select-none cursor-pointer"
              >
                <div className="font-bold text-slate-900 dark:text-white text-sm mb-1">{opt.label}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">{opt.desc}</div>
              </button>
            ))}
          </div>
          <button onClick={() => setStep(step - 1)} className="text-xs font-semibold text-slate-400 hover:text-slate-200 flex items-center gap-1 cursor-pointer">← Go Back</button>
        </div>
      )}

      {/* Step 3: Pain Point */}
      {step === 3 && (
        <div className="animate-fade-in space-y-4">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">What is your absolute biggest bottleneck right now?</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { id: 'copywriting', label: 'Copywriting & Content Creation', desc: 'Struggling to draft blogs, emails, social posts' },
              { id: 'customer_support', label: 'Customer Support Responses', desc: 'Spent hours daily replying to basic questions' },
              { id: 'automation', label: 'Disconnect in systems / admin', desc: 'Manually moving files and copy-pasting entries' },
              { id: 'sales_leads', label: 'Lead Sourcing & Outbound', desc: 'Need lists of vetted contact emails and targets' },
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleSelectOption('painPoint', opt.id)}
                className="text-left p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500 hover:bg-indigo-50/20 transition-all select-none cursor-pointer"
              >
                <div className="font-bold text-slate-900 dark:text-white text-sm">{opt.label}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{opt.desc}</div>
              </button>
            ))}
          </div>
          <button onClick={() => setStep(step - 1)} className="text-xs font-semibold text-slate-400 hover:text-slate-200 flex items-center gap-1 cursor-pointer">← Go Back</button>
        </div>
      )}

      {/* Step 4: Diagnostic Output */}
      {step === 4 && result && (
        <div className="animate-fade-in space-y-6">
          <div className="p-5 rounded-2xl border border-indigo-100 dark:border-indigo-950 bg-indigo-50/30 dark:bg-indigo-950/20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-lg">
                  {result.name[0]}
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Our Perfect recommendation:</span>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">{result.name}</h4>
                </div>
              </div>
              <span className="self-start sm:self-auto px-3 py-1 text-xs font-bold text-emerald-700 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/50 rounded-full border border-emerald-100 dark:border-emerald-900/40">
                ⭐ {result.rating} Rating
              </span>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">{result.description}</p>
            
            <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400 italic bg-white dark:bg-slate-900/60 p-3 rounded-xl border border-slate-100 dark:border-slate-900">
              💡 <strong>Why this matches:</strong> {diagnosticText}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Action Plan Checklist:</h5>
              {result.pros.map((p, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                  <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span>{p}</span>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 space-y-3">
              <div className="text-xs text-slate-400"><strong>Starting Pricing:</strong> {result.pricing.startingAt}</div>
              <div className="text-xs text-slate-400"><strong>Category:</strong> {result.category}</div>
              <a
                href={result.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-1 px-4 py-2 text-xs font-bold text-white bg-slate-900 dark:bg-slate-50 dark:text-slate-950 hover:opacity-90 rounded-lg transition-all"
              >
                Access {result.name} <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-900">
            <span className="text-xs text-slate-400">Affiliate Link disclosure: The brand may compensate the blog with credits at zero cost to you.</span>
            <button
              onClick={resetQuiz}
              className="px-3.5 py-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-400 dark:text-indigo-400 dark:hover:text-indigo-300 inline-flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Restart Quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
