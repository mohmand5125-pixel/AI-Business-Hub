/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Download, Mail, CheckCircle2, Copy, Sparkles, Star, Loader2, ArrowRight } from 'lucide-react';
import { DownloadableProduct } from '../types';

export const DOWNLOAD_PRODUCTS_DB: DownloadableProduct[] = [
  {
    id: 'free50',
    title: '50 AI Tools Every Small Business Owner Should Know',
    description: 'The definitive handbook detailing specific tool features, pricing models, and direct, verified links for micro-SBL models.',
    type: 'Bundle',
    fileSize: '4.2 MB',
    downloadsCount: 14209,
    features: [
      'Comprehensive ratings of 50 major commercial tools',
      'Tested promo codes and signup vouchers list',
      'Step-by-step beginners checklist PDF handbook'
    ],
    downloadUrl: '50_ai_tools_handbook_2026.pdf'
  },
  {
    id: 'prompt_bundle',
    title: 'Ultimate AI Prompt Bundle',
    description: 'High-converting copywriting triggers, corporate model planners, and structured system instructions for Claude, Gemini, and ChatGPT.',
    type: 'Prompt Pack',
    fileSize: '1.2 MB',
    downloadsCount: 8430,
    features: [
      '30 industry-specific strategic planning prompt blocks',
      'Brand style voice-training variables formulas',
      'Ad copywriting frames (AIDA & PAS structures)'
    ],
    downloadUrl: 'ai_marketing_prompts_2026.txt'
  },
  {
    id: 'automation_templates',
    title: 'Small Business Automation Templates',
    description: 'Vetted JSON blueprints and step tutorials to copy-paste directly into Make.com and Zapier Central scenarios.',
    type: 'Template',
    fileSize: '0.8 MB',
    downloadsCount: 5211,
    features: [
      'Customer email-to-sheet sync JSON templates',
      'Automated review notification webhook blueprints',
      'Multi-channel social scheduler config maps'
    ],
    downloadUrl: 'automation_scenarios_blueprints.json'
  },
  {
    id: 'content_calendar',
    title: 'AI Content Calendar Spreadsheet',
    description: 'Ready-to-use spreadsheet showing frequency mapping, optimization slots, and topic hubs for a 365-day publishing runway.',
    type: 'Calendar',
    fileSize: '2.5 MB',
    downloadsCount: 9355,
    features: [
      'Fully structured spreadsheet file (Excel/Sheets ready)',
      'Pre-populated title structures and key phrase maps',
      'Affiliate link placement track columns'
    ],
    downloadUrl: 'ai_content_calendar_master.xlsx'
  }
];

export default function LeadMagnetModal() {
  const [email, setEmail] = useState<string>('');
  const [subscribed, setSubscribed] = useState<boolean>(false);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadCompletedId, setDownloadCompletedId] = useState<string | null>(null);
  const [errorText, setErrorText] = useState<string>('');
  const [promptPreview, setPromptPreview] = useState<string | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorText('Please specify a valid physical email address.');
      return;
    }
    setErrorText('');
    setSubscribed(true);
  };

  const handleDownload = (prod: DownloadableProduct) => {
    if (!subscribed) {
      setErrorText(`Please sign up below to unlock immediate downloads for "${prod.title}".`);
      document.getElementById('lead-optin-form')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    setDownloadingId(prod.id);
    setErrorText('');

    setTimeout(() => {
      setDownloadingId(null);
      setDownloadCompletedId(prod.id);
      
      // Let's output a nice interactive preview for standard client copy!
      if (prod.id === 'prompt_bundle') {
        setPromptPreview(`[COPY-PASTE CORE BRAND VOICE PROMPT]
Act as an elite small business copywriter and marketing systems architect.
Our Brand: [Insert Brand Name]
Our Target Market: [Insert Audience - e.g. Freelance designers]
We deliver: [Insert value - e.g. affordable legal templates]
Please write a 5-part welcome email autoresponder sequence utilizing standard conversational, E-E-A-T rich language. Stop using words like 'revolutionize', 'testament', 'pave the way', or 'excited to announce'. Use short sentences, questions to stimulate interest, and direct visual callouts to the product link below.`);
      } else if (prod.id === 'automation_templates') {
        setPromptPreview(`[ZAPIER TRIGGER LOGIC TEMPLATE JSON]
{
  "trigger": "New Lead Generated",
  "app": "Google Sheets",
  "action_node_1": "Google Gemini Core AI: Extract painPoints, budgetTier, and companyScale from feedback cell",
  "action_node_2": "Slack: Direct message Sales Manager with summary payload",
  "action_node_3": "Mailerlite: Subscribe lead to the VIP Welcome Funnel list"
}`);
      } else {
        setPromptPreview(`[SUCCESS] File "${prod.downloadUrl}" simulated download complete! 
Thank you for using AI Business Hub resources.`);
      }
    }, 1500);
  };

  return (
    <div id="downloads-resources-card" className="space-y-8">
      {/* Newsletter Signup (Opt-in Lead Gate) */}
      <div className="border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-indigo-50/50 to-emerald-50/10 dark:from-slate-900/60 dark:to-emerald-950/20 rounded-2xl p-6 shadow-sm">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-indigo-700 bg-indigo-100 dark:text-indigo-400 dark:bg-indigo-950/40 rounded-full">
            <Star className="w-3.5 h-3.5 fill-current" /> Download Center & Lead Magnet
          </span>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white leading-tight">
            Unlock the Hub's Premium Toolkit & Prompt Packs
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Join 12,400+ entrepreneurs who receive our weekly "AI Automation Letters" and get absolute instant access to the digital PDF manuals below.
          </p>

          {!subscribed ? (
            <form id="lead-optin-form" onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 pt-4">
              <div className="relative flex-1">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  placeholder="Enter your email to verify and unlock templates..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white dark:bg-slate-900 text-slate-950 dark:text-white border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm font-medium focus:outline-none focus:border-indigo-500 transition-all"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 rounded-xl font-bold text-sm text-white bg-indigo-600 hover:bg-indigo-500 flex items-center justify-center gap-2 group cursor-pointer transition-all shrink-0"
              >
                Claim Free Products <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-all" />
              </button>
            </form>
          ) : (
            <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 text-emerald-900 dark:text-emerald-400 p-4 rounded-xl flex items-center gap-2 max-w-lg mx-auto text-left justify-center mt-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
              <div className="text-xs">
                <strong>E-mail Confirmed!</strong> All premium products below are now fully unlocked. Click download on any template to inspect or copy files.
              </div>
            </div>
          )}

          {errorText && <p className="text-xs text-red-500 font-semibold">{errorText}</p>}
        </div>
      </div>

      {/* Catalog of downloadable items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {DOWNLOAD_PRODUCTS_DB.map((prod) => (
          <div
            key={prod.id}
            className={`border rounded-2xl p-5 flex flex-col justify-between hover:shadow-md transition-all ${
              subscribed 
                ? 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950' 
                : 'border-slate-100 dark:border-slate-900/40 bg-slate-50/50 dark:bg-slate-900/10'
            }`}
          >
            <div>
              <div className="flex justify-between items-start gap-2 mb-3">
                <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-md ${
                  prod.type === 'Template' 
                    ? 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300' 
                    : prod.type === 'Prompt Pack'
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                    : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                }`}>
                  {prod.type}
                </span>
                <span className="text-xs font-mono text-slate-400 select-none">{prod.fileSize} / {prod.downloadsCount.toLocaleString()} downloads</span>
              </div>
              <h4 className="text-base font-bold text-slate-950 dark:text-white mb-1.5">{prod.title}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">{prod.description}</p>
              
              <div className="space-y-1.5 mb-5 border-t border-slate-50 dark:border-slate-900 pt-3">
                {prod.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-1.5 text-xs text-slate-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => handleDownload(prod)}
              className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                downloadingId === prod.id 
                  ? 'bg-slate-100 dark:bg-slate-900 text-slate-400' 
                  : downloadCompletedId === prod.id
                  ? 'bg-emerald-50 dark:bg-emerald-950 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/40'
                  : subscribed
                  ? 'bg-slate-900 hover:bg-slate-800 dark:bg-white text-white dark:text-slate-950'
                  : 'bg-slate-200 dark:bg-slate-900 text-slate-400'
              }`}
            >
              {downloadingId === prod.id ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" /> Verifying Email Link...
                </>
              ) : downloadCompletedId === prod.id ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Product Grabbed Successfully!
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" /> {subscribed ? 'Download Asset Now' : 'Sign Up To Download'}
                </>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Code Copy & Plaintext interactive preview panel */}
      {promptPreview && (
        <div className="animate-fade-in p-5 rounded-xl border border-emerald-100 dark:border-emerald-950 bg-emerald-50/20 dark:bg-emerald-950/20 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-900 dark:text-emerald-400 uppercase tracking-widest flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Physical file content view (Simulated)
            </span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(promptPreview);
                alert('Copied to system clipboard!');
              }}
              className="px-3 py-1 text-xs font-semibold text-slate-900 bg-white dark:bg-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 rounded-md hover:opacity-80 inline-flex items-center gap-1 cursor-pointer"
            >
              <Copy className="w-3 h-3" /> Copy Full Code
            </button>
          </div>
          <pre className="text-xs text-slate-500 dark:text-slate-400 font-mono overflow-x-auto bg-white dark:bg-slate-950 p-4 border border-slate-100 dark:border-slate-900 rounded-lg whitespace-pre-wrap leading-relaxed">
            {promptPreview}
          </pre>
        </div>
      )}
    </div>
  );
}
