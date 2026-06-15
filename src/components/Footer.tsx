/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sparkles, Mail, Send, CheckCircle, Share2, Twitter, Linkedin, Facebook, Link2 } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const [email, setEmail] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const [shareFeedback, setShareFeedback] = useState<string>('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSuccess(true);
      setEmail('');
      setTimeout(() => setSuccess(false), 4000);
    }
  };

  const handleShare = (platform: string) => {
    setShareFeedback(`Successfully generated ${platform} share payload link! Thank you for boosting our SEO.`);
    setTimeout(() => setShareFeedback(''), 4000);
  };

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12">
        
        {/* Top Segment: Newsletter and Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-slate-200 dark:border-slate-900 pb-12">
          
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white">
              <div className="w-6 h-6 rounded bg-indigo-600 flex items-center justify-center text-white text-xs font-black">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <span className="font-extrabold tracking-tight text-sm text-slate-950 dark:text-white">AI Business Hub</span>
            </div>
            <p className="text-xs leading-relaxed max-w-sm">
              Helping entrepreneurs, marketing agencies, e-commerce stores, and local businesses safely automate workflows, master ChatGPT prompts, and scale with ethical AI.
            </p>
          </div>

          <div className="lg:col-span-7 p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h5 className="font-bold text-slate-950 dark:text-white text-xs uppercase tracking-widest">Master AI Automation Letters</h5>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider shrink-0 w-fit">
                Free 50 tools guide included
              </span>
            </div>

            <form onSubmit={handleSubscribe} className="flex gap-2">
              <div className="relative flex-1">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  placeholder="Reviewers, enter email here..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs font-medium focus:outline-none focus:border-indigo-505"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
              >
                Join <Send className="w-3 h-3" />
              </button>
            </form>

            {success && (
              <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> Welcome aboard! Check your inbox for the "50 Best Business AI Tools" voucher file.
              </p>
            )}
          </div>
        </div>

        {/* Middle Segment: Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          
          {/* Column 1: Editorial categories */}
          <div className="space-y-3.5">
            <h6 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 select-none">AI Categories</h6>
            <nav className="flex flex-col gap-2 text-xs font-semibold">
              {[
                'AI Marketing Tools',
                'AI Content Creation',
                'AI Productivity',
                'AI Customer Support',
                'AI Automation',
                'AI for E-commerce',
                'AI for Local Businesses'
              ].map((cat) => (
                <button
                  key={cat}
                  onClick={() => onNavigate('categories')}
                  className="hover:text-slate-950 dark:hover:text-white transition-all text-left truncate cursor-pointer"
                >
                  {cat}
                </button>
              ))}
            </nav>
          </div>

          {/* Column 2: Specific Guides */}
          <div className="space-y-3.5">
            <h6 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 select-none">Top Money Pages</h6>
            <nav className="flex flex-col gap-2 text-xs font-semibold">
              <button onClick={() => onNavigate('best-ai-tools')} className="hover:text-slate-950 dark:hover:text-white transition-all text-left cursor-pointer">Best AI Tools for Businesses</button>
              <button onClick={() => onNavigate('comparisons')} className="hover:text-slate-950 dark:hover:text-white transition-all text-left cursor-pointer">ChatGPT vs Claude vs Gemini</button>
              <button onClick={() => onNavigate('blog')} className="hover:text-slate-950 dark:hover:text-white transition-all text-left cursor-pointer">Best Free AI Tools</button>
              <button onClick={() => onNavigate('tutorials')} className="hover:text-slate-950 dark:hover:text-white transition-all text-left cursor-pointer">Beginner's Automation Guide</button>
            </nav>
          </div>

          {/* Column 3: Site Navigations */}
          <div className="space-y-3.5">
            <h6 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 select-none">Knowledge Hub</h6>
            <nav className="flex flex-col gap-2 text-xs font-semibold">
              <button onClick={() => onNavigate('start-here')} className="hover:text-slate-950 dark:hover:text-white transition-all text-left cursor-pointer">Start Here Guide</button>
              <button onClick={() => onNavigate('about')} className="hover:text-slate-950 dark:hover:text-white transition-all text-left cursor-pointer">About Our Experts</button>
              <button onClick={() => onNavigate('reviews')} className="hover:text-slate-950 dark:hover:text-white transition-all text-left cursor-pointer">Verifiable Reviews</button>
              <button onClick={() => onNavigate('resources')} className="hover:text-slate-950 dark:hover:text-white transition-all text-left cursor-pointer">Download Products</button>
              <button onClick={() => onNavigate('newsletter')} className="hover:text-slate-950 dark:hover:text-white transition-all text-left cursor-pointer">The Active Newsletter</button>
              <button onClick={() => onNavigate('contact')} className="hover:text-slate-950 dark:hover:text-white transition-all text-left cursor-pointer">Get in Touch</button>
            </nav>
          </div>

          {/* Column 4: Legal & Policies */}
          <div className="space-y-3.5 col-span-2 md:col-span-1">
            <h6 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 select-none">Policy Guidelines</h6>
            <nav className="flex flex-col gap-2 text-xs font-semibold">
              <button onClick={() => onNavigate('privacy-policy')} className="hover:text-slate-950 dark:hover:text-white transition-all text-left cursor-pointer">Privacy & Cookie Policy</button>
              <button onClick={() => onNavigate('affiliate-disclosure')} className="hover:text-slate-950 dark:hover:text-white transition-all text-left cursor-pointer">Affiliate Transparency Disclosures</button>
              <button onClick={() => onNavigate('terms-and-conditions')} className="hover:text-slate-950 dark:hover:text-white transition-all text-left cursor-pointer">Terms & Conditions of Use</button>
            </nav>
          </div>
        </div>

        {/* Dynamic Social Sharing Module */}
        <div className="border-t border-slate-200 dark:border-slate-900 pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h6 className="text-xs font-bold text-slate-950 dark:text-white flex items-center gap-1.5 leading-none">
              <Share2 className="w-3.5 h-3.5 text-indigo-500" /> Help Us Grow
            </h6>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">If this hub helps save business operations hours, consider sharing our reviews with your network!</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleShare('Twitter')}
              className="p-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs transition-all flex items-center gap-1 font-bold cursor-pointer"
            >
              <Twitter className="w-3.5 h-3.5" /> X/Twitter
            </button>
            <button
              onClick={() => handleShare('LinkedIn')}
              className="p-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs transition-all flex items-center gap-1 font-bold cursor-pointer"
            >
              <Linkedin className="w-3.5 h-3.5" /> LinkedIn
            </button>
            <button
              onClick={() => handleShare('Facebook')}
              className="p-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs transition-all flex items-center gap-1 font-bold cursor-pointer"
            >
              <Facebook className="w-3.5 h-3.5" /> Facebook
            </button>
          </div>
        </div>

        {shareFeedback && (
          <p className="text-xs text-indigo-600 font-semibold bg-indigo-50 dark:bg-indigo-950/20 px-3 py-2 rounded-xl border border-indigo-100 dark:border-indigo-900/30 w-fit">{shareFeedback}</p>
        )}

        {/* FTC Affirmation and Copyright */}
        <div className="border-t border-slate-200 dark:border-slate-900 pt-8 text-[11px] leading-relaxed text-slate-400 dark:text-slate-500 space-y-4">
          <p className="italic">
            <strong>FTC Affiliate Disclosure:</strong> AI Business Hub is an independent media platform supported entirely by our readers. When you browse our reviews, and subsequently secure software packages from our direct referral buttons, we may acquire referral commissions at absolutely zero cost to you. This commission mechanism enables our team of engineers and publishers to continue stress-testing applications autonomously without relying on biased corporate sponsors.
          </p>
          <div className="flex justify-between items-center text-[10px] pt-2">
            <span>© 2026 AI Business Hub. Created for maximum E-E-A-T Search Optimization authority.</span>
            <span className="font-mono text-[9px] text-slate-400">Ver. 2.4.0 (Enterprise Suite)</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
