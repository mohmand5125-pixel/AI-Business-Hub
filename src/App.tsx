/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { 
  Sparkles, BookOpen, Clock, ArrowRight, Star, CheckCircle, 
  Search, ShieldCheck, Compass, Sliders, Play, 
  FileText, Mail, MessageSquare, Info, ShieldAlert, 
  Download, ArrowUpRight, Check, ChevronDown, ChevronUp,
  Inbox, Calendar, UserCheck, PhoneCall, HelpCircle, FileCheck
} from 'lucide-react';

import Navigation from './components/Navigation';
import Footer from './components/Footer';
import CompareEngine from './components/CompareEngine';
import ToolFinderQuiz from './components/ToolFinderQuiz';
import LeadMagnetModal, { DOWNLOAD_PRODUCTS_DB } from './components/LeadMagnetModal';
import SEOPlannerTracker from './components/SEOPlannerTracker';
import { TrendingToolsWidget, ExpertSpotlightWidget } from './components/SidebarWidgets';

import { AI_TOOLS_DB, CATEGORIES_LIST } from './data/tools';
import { CONTENT_PLAN_DB, FULL_BLOG_ARTICLES } from './data/blogPosts';
import { BlogPost, ContentPlannerDay, AITool } from './types';

export default function App() {
  const [activePage, setActivePage] = useState<string>('home');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Blog detailed post state
  const [selectedPostSlug, setSelectedPostSlug] = useState<string | null>(null);
  
  // Interactive accordions
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [selectedToolCategory, setSelectedToolCategory] = useState<string>('all');
  
  // Newsletter interactive inbox simulation state
  const [selectedEmailIndex, setSelectedEmailIndex] = useState<number>(0);
  
  // Contact Form States
  const [contactForm, setContactForm] = useState({ name: '', email: '', bizType: 'freelancer', message: '' });
  const [contactSuccess, setContactSuccess] = useState<boolean>(false);

  // Scroll to top upon page navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage, selectedPostSlug]);

  const handleNavigateToPost = (slug: string) => {
    setSelectedPostSlug(slug);
    setActivePage('blog-detail');
  };

  const handleNavigate = (pageId: string) => {
    setSelectedPostSlug(null);
    setActivePage(pageId);
  };

  const handleToggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Filter tools for directory
  const filteredTools = AI_TOOLS_DB.filter((tool) => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tool.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedToolCategory === 'all' || tool.category === selectedToolCategory;
    return matchesSearch && matchesCategory;
  });

  // Filter planner data for display/editor
  const filteredPlannerList = CONTENT_PLAN_DB.filter((day) => {
    const matchesSearch = day.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          day.primaryKeyword.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategoryFilter === 'all' || day.category === selectedCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Newsletter inbox simulator records
  const EMAIL_FUNNEL = [
    {
      subject: "📧 Email 1: Welcome to the AI Business Hub + Your VIP PDF Voucher inside!",
      heading: "Day 1: Set Up and Vetted Tools",
      body: `Hello! Sarah Jenkins here. Beautiful to secure your connection.

You just made the smartest operational decision of 2026. In your immediate welcome portal, you are gaining complete, unlocked PDF download directories for 50 major commercial tools.

No code writing. No expensive developer fees. Just complete blueprints to map your physical pipelines.

Tomorrow, we are auditing the absolute best beginner tools to install on a $0 starting budget. Stay tuned!`,
    },
    {
      subject: "🚀 Email 2: The $0 AI Marketing Stack for Busy Solopreneurs",
      heading: "Day 2: No-Cost High Scaling",
      body: `Hey there! Hopefully you read through our PDF handbook yesterday.

Today, we are skipping the expensive fees. Did you know you can set up complete, high-quality social copy frameworks, generate vector graphic drafts, and audit competitor local map packs with completely free modules?

We highlight Canva Magic Studio, the standard free modules of ChatGPT, and Google Gemini Search grounding parameters. Here is how to configure them...`,
    },
    {
      subject: "⏱️ Email 3: Saving 14 Hours Every Week (The Automated Inbox Blueprint)",
      heading: "Day 3: Systems Orchestration",
      body: `Welcome back operational masters.

Today, let's target your absolute biggest time sink: Administrative email responses.

By connecting Make.com and ChatGPT API, we built a simple flow:
1. Receive client inquiry
2. Auto-audit sentiment and category categories
3. Generate high-conversion baseline replies
4. Save drafts in your mail inbox for simple reviewer checks.

This singular workflow saves our consulting clients more than 1.5 workdays every single week!`,
    },
    {
      subject: "🔥 Email 4: Top Recommendations (The Software Retainer Killer)",
      heading: "Day 4: Best-in-class Conversions",
      body: `Hello friend!

If you are paying costly marketing agency retainers just to response to Google Reviews, publish basic blog content, or maintain an e-commerce catalog, today's guides will change your math entirely.

We rank the elite automation combinations: Claude Pro for deep copywriting, ManyChat for Instagram DMs, and BrightLocal for physical store map packs. Check our detailed comparison grids on the Hub!`,
    },
    {
      subject: "💎 Email 5: Double your Revenue in 90 Days (Consulting Lead Invitation)",
      heading: "Day 5: Unlocked Systems Growth",
      body: `Sarah here for our final setup sequence.

You now possess the blueprints, prompt packs, and tool registries to automate 80% of your administrative workload.

But if you are ready to scale with custom private databases, relational pipelines, or high-volume API automations modeled specifically for your agency, store, or clinic, let's schedule a physical strategy session.

Reply "SYSTEMS AUDIT" to book one of our 5 premium monthly spots!`,
    }
  ];

  const currentEmailSim = EMAIL_FUNNEL[selectedEmailIndex];

  return (
    <div className={`min-h-screen transition-colors duration-200 ${isDarkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      
      {/* Dynamic Sticky Top Navigation */}
      <Navigation 
        activePage={activePage} 
        onNavigate={handleNavigate} 
        isDarkMode={isDarkMode} 
        onToggleTheme={handleToggleTheme}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Container Wrapper */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 animate-fade-in">
        
        {/* ========================================================= */}
        {/* SCREEN 1: HOME PAGE                                       */}
        {/* ========================================================= */}
        {activePage === 'home' && (
          <div className="space-y-16">
            
            {/* HERO MODULE */}
            <section id="hero-section" className="text-center space-y-6 py-8 md:py-12 max-w-4xl mx-auto">
              <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold text-indigo-700 bg-indigo-50 dark:text-indigo-400 dark:bg-indigo-950/50 rounded-full border border-indigo-100 dark:border-indigo-900/40 leading-none">
                <Sparkles className="w-3.5 h-3.5 text-indigo-500 fill-indigo-500" /> Voted Best AI Business Resource of 2026
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-950 dark:text-white leading-tight">
                Unlock AI Systems To Save <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500">Hours of Work</span> & Grow Sales
              </h1>
              <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                Comprehensive, practical guides, interactive tool finders, and copy-paste prompt structures configured to help small businesses, freelancers, and marketing agencies automate tedious operations.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <button 
                  onClick={() => handleNavigate('start-here')}
                  className="px-6 py-3 font-extrabold text-sm text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-md cursor-pointer transition-all flex items-center gap-1"
                >
                  Start The Beginner Path <ArrowRight className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleNavigate('best-ai-tools')}
                  className="px-6 py-3 font-bold text-sm text-slate-900 bg-white dark:bg-slate-90 shadow-sm border border-slate-200 dark:border-slate-800 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-900 rounded-xl cursor-pointer transition-all"
                >
                  Inspect Recommended Tools
                </button>
              </div>

              {/* Target Audience Badges */}
              <div className="pt-8 space-y-2 border-t border-slate-200/50 dark:border-slate-800/60 max-w-lg mx-auto">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Specially customized blueprints for:</span>
                <div className="flex flex-wrap justify-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400">
                  {['Shopify Stores', 'Independent Consultants', 'Local Clinics', 'SEO Bloggers', 'Agencies'].map((tag) => (
                    <span key={tag} className="px-2.5 py-1 bg-slate-100 dark:bg-slate-900 rounded-lg">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            {/* FEATURED ARTICLES MODULE */}
            <section id="featured-articles" className="space-y-6">
              <div className="flex justify-between items-end">
                <h2 className="text-2xl font-bold text-slate-950 dark:text-white">Featured Publications & Guides</h2>
                <button onClick={() => handleNavigate('blog')} className="text-xs font-bold text-indigo-500 hover:underline inline-flex items-center gap-0.5 cursor-pointer">
                  Browse All 30 Days <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Bento Grid layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Main banner block (Day 1 blog) */}
                <div className="lg:col-span-8 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-2xl p-6 hover:shadow-md transition-all flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400 rounded-full">
                        ⭐ Editorial Highlight (Day 1)
                      </span>
                      <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> 12 min read
                      </span>
                    </div>
                    <img
                      src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
                      alt="Hero business illustration"
                      referrerPolicy="no-referrer"
                      className="w-full h-48 object-cover rounded-xl border border-slate-100 dark:border-slate-900"
                    />
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-950 dark:text-white leading-tight">
                      Best AI Tools for Small Businesses in 2026 (The Operational Equalizer)
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                      Discover the absolute best AI models, social automators, and spreadsheet processors currently deployed by lean startup systems to scale operations without hiring expensive staff lists.
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-100 dark:border-slate-900">
                    <div className="flex items-center gap-3">
                      <img
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80"
                        alt="Sarah Jenkins Author"
                        referrerPolicy="no-referrer"
                        className="w-9 h-9 rounded-full object-cover shrink-0"
                      />
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white">Sarah Jenkins</div>
                        <div className="text-[10px] text-slate-400">Head of Systems Content</div>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleNavigateToPost('best-ai-tools-small-businesses')}
                      className="inline-flex items-center gap-1 px-4 py-2 font-bold text-xs text-white bg-slate-950 dark:bg-white dark:text-slate-950 rounded-xl transition-all cursor-pointer"
                    >
                      Read Guide <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Sidebar teasers */}
                <div className="lg:col-span-4 space-y-6">
                  
                  {/* Teaser 1: Day 2 */}
                  <div className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-2xl p-5 hover:shadow-md transition-all space-y-3 flex flex-col justify-between h-[235px]">
                    <div>
                      <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
                        <span>Day 2 Comparison</span>
                        <span>10 min read</span>
                      </div>
                      <h4 className="font-bold text-slate-950 dark:text-white text-sm mt-1 mb-1.5 leading-snug">
                        ChatGPT Plus vs Claude Pro vs Gemini Advanced: The $20 Battle
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                        Which consumer model is actually worth your operational expense budget? We review text nuances, data uploads, and visual output codes head-to-head.
                      </p>
                    </div>
                    <button 
                      onClick={() => handleNavigateToPost('chatgpt-vs-gemini-vs-claude')}
                      className="text-xs font-bold text-indigo-500 flex items-center gap-0.5 hover:underline cursor-pointer"
                    >
                      Analyze Comparison <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Teaser 2: Day 3 */}
                  <div className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-2xl p-5 hover:shadow-md transition-all space-y-3 flex flex-col justify-between h-[235px]">
                    <div>
                      <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
                        <span>Day 3 Productivity</span>
                        <span>8 min read</span>
                      </div>
                      <h4 className="font-bold text-slate-950 dark:text-white text-sm mt-1 mb-1.5 leading-snug">
                        15 Strategic AI Integrations That Save Real Workday Hours
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                        Tired of copy-pasting customer records? These fifteen direct automations handle review responders, meeting minutes, and invoice logs autonomously.
                      </p>
                    </div>
                    <button 
                      onClick={() => handleNavigateToPost('ai-tools-save-business-hours')}
                      className="text-xs font-bold text-indigo-500 flex items-center gap-0.5 hover:underline cursor-pointer"
                    >
                      Review Productivity Stack <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>

              </div>
            </section>

            {/* DYNAMIC COMPARE ENGINE CALLOUT */}
            <section id="homepage-comparator" className="space-y-4">
              <div className="text-center max-w-lg mx-auto space-y-2">
                <h2 className="text-2xl font-bold text-slate-950 dark:text-white">Which Chatbot is Right for Your Team?</h2>
                <p className="text-xs text-slate-400">Avoid throwing money blindly. Test our dynamic model comparator engine to select your specific match.</p>
              </div>
              <CompareEngine />
            </section>

            {/* POPULAR CATEGORIES */}
            <section id="popular-categories" className="space-y-6">
              <h2 className="text-2xl font-bold text-center text-slate-950 dark:text-white">Operational Topic Centers</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {CATEGORIES_LIST.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategoryFilter(cat);
                      handleNavigate('categories');
                    }}
                    className="p-4 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-xl text-center group transition-all select-none cursor-pointer"
                  >
                    <div className="font-bold text-slate-950 dark:text-white text-xs group-hover:text-indigo-500 transition-all">{cat}</div>
                    <span className="text-[10px] text-slate-400 font-semibold group-hover:underline block mt-1">Browse Blueprints →</span>
                  </button>
                ))}
              </div>
            </section>

            {/* EMAIL LEAD CAPTURE SYSTEM */}
            <LeadMagnetModal />

            {/* TESTIMONIALS SECTION */}
            <section id="testimonials-section" className="space-y-6">
              <h2 className="text-2xl font-bold text-center text-slate-950 dark:text-white">Endorsed by Real Small Firms</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    quote: "We connected ManyChat and ChatGPT API to respond to Instagram DM quote inquiries. It reduced weekend administrative callbacks by 85% with absolutely zero cold client lost.",
                    author: "Dr. Amanda Kelly",
                    role: "Founder, Kelly Allied Clinics"
                  },
                  {
                    quote: "As an e-commerce catalog store owner, writing 120 product descriptions was a total bottleneck. The direct ChatGPT sheets macros we downloaded from here completed the rows in 12 mins.",
                    author: "Liam O'Connor",
                    role: "Chief Merchant, Apex Leather Goods"
                  },
                  {
                    quote: "BrightLocal recommendations entirely transformed our map presence. We went from ranking position 8 to consistently sitting inside local position 2 inside 4 weeks.",
                    author: "Marcus Vance",
                    role: "Executive Director, Vance Plumbing Co."
                  }
                ].map((testi, idx) => (
                  <div key={idx} className="p-5 border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-950 rounded-2xl space-y-4">
                    <p className="text-xs text-slate-500 dark:text-slate-400 italic leading-relaxed">
                      "{testi.quote}"
                    </p>
                    <div className="flex items-center gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-900">
                      <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-900 dark:text-white font-extrabold text-xs">
                        {testi.author[0]}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-950 dark:text-white">{testi.author}</div>
                        <div className="text-[10px] text-slate-400">{testi.role}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ SECTION */}
            <section id="faq-section" className="space-y-6 max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-center text-slate-950 dark:text-white">Hub Operation FAQs</h2>
              <div className="space-y-3">
                {[
                  {
                    q: "Are these recommendations affiliate-driven?",
                    ans: "Yes. To maintain a complete, high-quality testing framework without charging reader paywalls, we run referral links tracking codes. However, we strictly benchmark every tool's operational stability beforehand to respect E-E-A-T guidelines."
                  },
                  {
                    q: "Are the download templates completely free?",
                    ans: "Absolutely! The Prompt Bundle, Automation Blueprints, and Content Calendars are free to download as soon as you confirm an email link."
                  },
                  {
                    q: "What defines an AI-first small business system in 2026?",
                    ans: "Instead of hiring manual data entry workers, modern startups leverage simple webhook triggers (via Make/Zapier) sending data directly to robust models like Claude, returning structured responses straight to active client pipelines."
                  }
                ].map((item, i) => (
                  <div key={i} className="border border-slate-250 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-950">
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                      className="w-full text-left px-5 py-4 font-bold text-xs sm:text-sm text-slate-950 dark:text-white flex justify-between items-center bg-slate-50/20 hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer"
                    >
                      <span>{item.q}</span>
                      <span>{expandedFaq === i ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}</span>
                    </button>
                    {expandedFaq === i && (
                      <div className="px-5 py-4 border-t border-slate-100 dark:border-slate-900/60 text-xs text-slate-500 dark:text-slate-400 leading-relaxed bg-white dark:bg-slate-950">
                        {item.ans}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

          </div>
        )}

        {/* ========================================================= */}
        {/* SCREEN 2: START HERE                                      */}
        {/* ========================================================= */}
        {activePage === 'start-here' && (
          <div className="space-y-12">
            
            <section className="text-center max-w-3xl mx-auto space-y-4">
              <span className="px-3 py-1 bg-indigo-100 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400 text-xs font-bold uppercase rounded-full tracking-widest leading-none">
                Entry Blueprint Guide
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white">
                How to Automate Your Business Pipelines
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Welcome to the Hub! If you are feeling overwhelmed by all the options on social media, this page is your clear, simplified starting line. Follow these sequence steps:
              </p>
            </section>

            {/* Sequence steps timeline */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {[
                { step: "1", title: "Audit Bottlenecks", desc: "List all tedious manual emails, data formatting, and review replies you waste hours on." },
                { step: "2", title: "Run Diagnostic", desc: "Input your budget and goals below to identify your exact matching software setup." },
                { step: "3", title: "Claim Handbooks", desc: "Unlock our pre-written Prompt Bundles and Zapier templates under the Resources tab." },
                { step: "4", title: "Verify Output", desc: "Never blind copy-paste. Audit and edit all generated models to respect brand guidelines." },
                { step: "5", title: "Automate Loops", desc: "Establish triggers to let digital scenarios process routine administrative queues." },
              ].map((item, idx) => (
                <div key={idx} className="p-4 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-2xl relative space-y-2">
                  <div className="w-8 h-8 rounded-full bg-indigo-600 dark:bg-indigo-500 text-white flex items-center justify-center font-extrabold text-xs select-none">
                    {item.step}
                  </div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-950 dark:text-white pt-2">{item.title}</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Embedding Tool diagnostic Quiz */}
            <div className="pt-8 space-y-4">
              <div className="text-center max-w-sm mx-auto">
                <h3 className="text-lg font-bold text-slate-950 dark:text-white">Diagnostic Wizard</h3>
                <p className="text-xs text-slate-400">Run the wizard inline to filter best companion tools.</p>
              </div>
              <ToolFinderQuiz />
            </div>

            {/* Starting Tools highlighting */}
            <section className="space-y-6">
              <h3 className="text-xl font-bold text-center text-slate-950 dark:text-white">Our Absolute "Top 3 Starter Recommendations"</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { name: "Claude (Anthropic)", badge: "Creative Copilot", desc: "Amazing editorial writer if you need sales emails, newsletters, and webpage layouts.", linkPage: "best-ai-tools" },
                  { name: "ManyChat", badge: "Reply Automation", desc: "Perfect companion if your shop gets dozens of comments daily requesting checkout links.", linkPage: "best-ai-tools" },
                  { name: "Zapier AI Central", badge: "Central Nervous System", desc: "Integrator mapping spreadsheets, notifications, and contacts together cleanly.", linkPage: "best-ai-tools" },
                ].map((opt, i) => (
                  <div key={i} className="p-5 border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-950 rounded-2xl flex flex-col justify-between">
                    <div className="space-y-2">
                      <span className="text-[9px] font-bold px-2 py-0.5 bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-400 uppercase rounded">
                        {opt.badge}
                      </span>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white pt-1">{opt.name}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{opt.desc}</p>
                    </div>
                    <button 
                      onClick={() => handleNavigate(opt.linkPage)} 
                      className="text-xs font-bold text-indigo-500 flex items-center gap-1 hover:underline pt-4 mt-4 border-t border-slate-50 dark:border-slate-900 cursor-pointer"
                    >
                      Read full reviews <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </section>

          </div>
        )}

        {/* ========================================================= */}
        {/* SCREEN 3: ABOUT                                           */}
        {/* ========================================================= */}
        {activePage === 'about' && (
          <div className="space-y-12 max-w-4xl mx-auto">
            
            <section className="text-center space-y-4">
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400 text-xs font-bold uppercase rounded-full tracking-widest leading-none">
                E-E-A-T Editorial Guidelines
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
                About the AI Business Hub Expert Team
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
                Discover our strict testing standards, systems-consulting goals, and why our reviews are trusted by thousands of active micro-firm directors.
              </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              
              <div className="md:col-span-1 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-5 rounded-2xl space-y-4 text-center">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=350&q=80"
                  alt="Sarah Jenkins Leader"
                  referrerPolicy="no-referrer"
                  className="w-28 h-28 rounded-full object-cover mx-auto border border-indigo-200"
                />
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">Sarah Jenkins</h4>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">Head of Operational Systems</p>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Sarah has spent over 6 years advising enterprise consultancies on optimizing administrative workflows. Now she runs boutique system integrations for solo creators and medical practitioners.
                </p>
              </div>

              <div className="md:col-span-2 space-y-6">
                <div className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 rounded-2xl space-y-4">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Our Master Mission Manifesto</h3>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    Most marketing publications publish basic, ungrounded reviews of software tools using robots simply to capture referral clicks. They have never actually connected Zapier triggered endpoints or monitored Meta webhook errors in real business benches.
                  </p>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    At AI Business Hub, we run a strict **"Hands-On First" Editorial Guideline**. We physically subscribe to Claude, test ChatGPT Spreadsheet macro APIs against real localized lead sheets, and configure ManyChat logic for active stores before writing a singular reviews line.
                  </p>
                </div>

                <div className="p-5 border border-emerald-100 dark:border-emerald-950 bg-emerald-50/25 dark:bg-emerald-950/20 rounded-2xl space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 dark:text-emerald-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" /> Trust Verification Metrics
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-350">
                    <li className="flex items-start gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" /> No artificial intelligence-generated slop copy. Every guide is updated by human writers.</li>
                    <li className="flex items-start gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" /> Zero sponsored reviews where corporations pay to dictate scores or bias results.</li>
                    <li className="flex items-start gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" /> Full transparent affiliate cookie indicators across both reviews and lists.</li>
                  </ul>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* SCREEN 4: BLOG PLATFORM & INDIVIDUAL ARTICLES             */}
        {/* ========================================================= */}
        {activePage === 'blog' && (
          <div className="space-y-12">
            
            <section className="text-center max-w-2xl mx-auto space-y-3">
              <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white">The Hub's 30-Day Content & SEO Plan</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Explore our full, comprehensive thirty-day editorial plan mapping structured frameworks, search intent categories, LSI keywords, and drafted copies.
              </p>
            </section>

            {/* Render interactive 30-day index controller */}
            <SEOPlannerTracker onNavigateToPost={handleNavigateToPost} />

            {/* List of current written live articles ready to read */}
            <section className="space-y-6 pt-8 border-t border-slate-250 dark:border-slate-800">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-1.5 leading-none">
                <FileCheck className="w-5 h-5 text-indigo-500" /> Currently Drafted & Unlocked Blog Posts (Day 1 - 3)
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {FULL_BLOG_ARTICLES.map((art) => (
                  <div key={art.id} className="border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-950 rounded-2xl p-5 hover:shadow-md transition-all flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex justify-between text-[9px] font-bold text-slate-400 uppercase">
                        <span>{art.category}</span>
                        <span>{art.readTime}</span>
                      </div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm leading-snug hover:text-indigo-600 cursor-pointer" onClick={() => handleNavigateToPost(art.slug)}>
                        {art.title}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                        {art.metaDesc}
                      </p>
                    </div>

                    <button 
                      onClick={() => handleNavigateToPost(art.slug)}
                      className="text-xs font-bold text-indigo-500 flex items-center gap-0.5 hover:underline pt-4 mt-4 border-t border-slate-100 dark:border-slate-900 cursor-pointer"
                    >
                      Read full article <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </section>

          </div>
        )}

        {/* ========================================================= */}
        {/* SCREEN 4.5: DETAILED REUSABLE ARTICLE VIEWER              */}
        {/* ========================================================= */}
        {activePage === 'blog-detail' && selectedPostSlug && (
          (() => {
            const article = FULL_BLOG_ARTICLES.find(a => a.slug === selectedPostSlug);
            if (!article) return <p className="text-xs">Article not found.</p>;
            
            return (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Content Column */}
                <article className="lg:col-span-8 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-2xl p-6 sm:p-8 space-y-8 shadow-sm">
                  
                  {/* Article Metadata */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-xs font-semibold text-slate-400">
                      <span>Category: <strong>{article.category}</strong></span>
                      <span>Published: {article.publishedDate}</span>
                    </div>

                    <h1 className="text-2xl sm:text-3.5xl font-extrabold text-slate-950 dark:text-white leading-tight">
                      {article.title}
                    </h1>

                    {/* Author profile */}
                    <div className="flex items-center gap-3 py-3 border-y border-slate-100 dark:border-slate-900">
                      <img
                        src={article.author.avatar}
                        alt={article.author.name}
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 rounded-full object-cover shrink-0 border"
                      />
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white">{article.author.name}</div>
                        <div className="text-[10px] text-slate-400">{article.author.role}</div>
                      </div>
                    </div>
                  </div>

                  {/* Table of contents and keyword guide */}
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">Table of Contents</h4>
                    <ul className="space-y-1.5 text-xs text-slate-950 dark:text-slate-300 font-bold ml-1">
                      <li><a href="#intro" className="hover:underline">1. Introduction & Executive Brief</a></li>
                      {article.h2Sections?.map((sec, i) => (
                        <li key={i}><a href={`#sec-${i}`} className="hover:underline">{2 + i}. {sec.h2}</a></li>
                      ))}
                      {article.affiliateCallouts && (
                        <li><a href="#recommendations" className="hover:underline">Detailed Vetted Software Profiles</a></li>
                      )}
                      {article.comparisons && (
                        <li><a href="#compare-table" className="hover:underline">Head-to-Head Specification Matrix</a></li>
                      )}
                      <li><a href="#faqs" className="hover:underline">Frequently Asked Questions (FAQs)</a></li>
                    </ul>
                  </div>

                  {/* Body written content sections */}
                  <div id="intro" className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed space-y-4 whitespace-pre-wrap">
                    {article.contentMarkdown}
                  </div>

                  {article.h2Sections?.map((sec, i) => (
                    <div key={i} id={`sec-${i}`} className="space-y-3">
                      <h2 className="text-xl font-bold text-slate-950 dark:text-white">{sec.h2}</h2>
                      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed whitespace-pre-wrap">{sec.content}</p>
                    </div>
                  ))}

                  {/* Render complete customized affiliate boxes style from guidelines */}
                  {article.affiliateCallouts && (
                    <div id="recommendations" className="space-y-6 pt-4">
                      <h3 className="text-lg font-bold text-slate-950 dark:text-white">Vetted Software Profiles & Promo Codes</h3>
                      
                      {article.affiliateCallouts.map((call, idx) => (
                        <div key={idx} className="border border-slate-200 dark:border-emerald-900/60 bg-white dark:bg-slate-950 rounded-2xl p-5 shadow-sm space-y-4 relative overflow-hidden">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                            <div>
                              <span className="text-[10px] font-bold px-2 py-0.5 bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-400 uppercase rounded">
                                {call.badge}
                              </span>
                              <h4 className="text-base font-bold text-slate-950 dark:text-white mt-1.5">{call.toolName}</h4>
                            </div>
                            <span className="text-xs font-mono font-bold text-emerald-600">{call.pricing}</span>
                          </div>

                          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{call.description}</p>
                          
                          <div className="space-y-1.5 bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl border border-slate-100">
                            <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Key Features Evaluated:</span>
                            {call.features.map((feat, fIdx) => (
                              <div key={fIdx} className="flex items-start gap-1.5 text-xs text-slate-400">
                                <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                <span>{feat}</span>
                              </div>
                            ))}
                          </div>

                          <a
                            href={call.affiliateUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-fit inline-flex items-center justify-center gap-1.5 px-5 py-2.5 font-bold text-xs text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all"
                          >
                            {call.ctaText} <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Comparisons table */}
                  {article.comparisons && (
                    <div id="compare-table" className="space-y-3 overflow-x-auto">
                      <h3 className="text-lg font-bold text-slate-950 dark:text-white">Comparative Performance Scorecard</h3>
                      <table className="min-w-full text-xs text-left text-slate-500 dark:text-slate-400 border border-slate-150 rounded-lg overflow-hidden">
                        <thead className="bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-white font-bold">
                          <tr>
                            {article.comparisons.headers.map((head, i) => (
                              <th key={i} className="p-3 border-b">{head}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {article.comparisons.rows.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-slate-50 dark:hover:bg-slate-900 border-b">
                              {row.map((cell, cIdx) => (
                                <td key={cIdx} className="p-3">{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* FAQs list */}
                  {article.faqs && (
                    <div id="faqs" className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-900">
                      <h3 className="text-lg font-bold text-slate-950 dark:text-white">Frequently Asked Questions</h3>
                      <div className="space-y-3">
                        {article.faqs.map((faq, fIdx) => (
                          <div key={fIdx} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/45 border border-slate-100">
                            <h4 className="font-bold text-xs sm:text-sm text-slate-950 dark:text-white mb-2">{faq.question}</h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{faq.answer}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Bottom Newsletter Magnet Callout */}
                  <div className="bg-gradient-to-br from-indigo-50 to-emerald-50/10 p-5 rounded-2xl border border-indigo-100/50 space-y-3 text-center">
                    <h4 className="font-bold text-slate-950 text-sm">Download Our Small Business Automated Workflow checklists</h4>
                    <p className="text-xs text-slate-400 max-w-lg mx-auto">Get prompt calendars, subject list models, and JSON scenarios ready to copy into Make.com absolute free.</p>
                    <button onClick={() => handleNavigate('resources')} className="px-5 py-2 bg-slate-900 text-white hover:opacity-80 rounded-xl font-bold text-xs flex items-center gap-1.5 mx-auto cursor-pointer">
                      Claim Your Free Blueprints <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </article>

                {/* Right Sidebar Publisher companion info */}
                <div className="lg:col-span-4 space-y-6">
                  
                  {/* SEO METADATA EXPERIMENT DRAWER FOR REVIEWER */}
                  <div className="p-5 border border-indigo-200 dark:border-indigo-950 bg-indigo-50/20 dark:bg-indigo-950/20 rounded-2xl space-y-3.5">
                    <span className="text-[9px] font-bold px-2 py-0.5 bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-400 uppercase rounded tracking-widest leading-none block w-fit">
                      SEO Publisher Brief
                    </span>
                    <h4 className="text-xs font-bold text-slate-950 dark:text-white uppercase tracking-wider">Target Phrase Parameters:</h4>
                    <div className="space-y-2 text-xs">
                      <div>
                        <span className="text-slate-400 font-semibold block">Primary Keyword:</span>
                        <code className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 font-mono">"{article.keywords?.primary}"</code>
                      </div>
                      <div>
                        <span className="text-slate-400 font-semibold block">Secondary LSI:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {article.keywords?.secondary.map((tag, tIdx) => (
                            <span key={tIdx} className="px-1.5 py-0.5 text-[10px] bg-white dark:bg-slate-900 border rounded font-bold">{tag}</span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="text-slate-400 font-semibold block">Meta Description:</span>
                        <p className="text-[11px] text-slate-500 leading-relaxed italic mt-1 bg-white dark:bg-slate-900/60 p-2 border rounded">"{article.metaDesc}"</p>
                      </div>
                      <div>
                        <span className="text-slate-400 font-semibold block">Internal Link Targets:</span>
                        <div className="flex flex-wrap gap-1 mt-1 text-[10px] font-mono font-bold text-blue-500">
                          <span>/categories</span>•<span>/start-here</span>•<span>/resources</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Sidebar Teasers widgets */}
                  <TrendingToolsWidget onNavigate={handleNavigate} />
                  <ExpertSpotlightWidget />
                </div>

              </div>
            );
          })()
        )}

        {/* ========================================================= */}
        {/* SCREEN 5: CATEGORIES ROUTE                                */}
        {/* ========================================================= */}
        {activePage === 'categories' && (
          <div className="space-y-8">
            
            <section className="text-center max-w-2xl mx-auto space-y-3">
              <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white">Topic Category Directories</h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Filter articles, metrics, frameworks, and reviews based on your active operational focus area.
              </p>
            </section>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2 justify-center border-b border-slate-100 dark:border-slate-900 pb-6">
              <button
                onClick={() => setSelectedCategoryFilter('all')}
                className={`px-3 py-1.5 text-xs font-bold uppercase rounded-lg transition-all cursor-pointer ${
                  selectedCategoryFilter === 'all'
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950'
                    : 'bg-slate-100 text-slate-500 hover:text-slate-950 dark:bg-slate-900 dark:text-slate-400'
                }`}
              >
                All Categories ({CONTENT_PLAN_DB.length})
              </button>
              {CATEGORIES_LIST.map((cat) => {
                const count = CONTENT_PLAN_DB.filter(d => d.category === cat).length;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategoryFilter(cat)}
                    className={`px-3 py-1.5 text-xs font-bold uppercase rounded-lg transition-all cursor-pointer ${
                      selectedCategoryFilter === cat
                        ? 'bg-indigo-600 text-white dark:bg-indigo-500'
                        : 'bg-slate-100 text-slate-500 hover:text-slate-950 dark:bg-slate-900 dark:text-slate-400'
                    }`}
                  >
                    {cat} ({count})
                  </button>
                );
              })}
            </div>

            {/* Structured Results Display */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPlannerList.map((day) => (
                <div key={day.day} className="border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-950 rounded-2xl p-5 hover:shadow-md transition-all flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase">
                      <span>Day {day.day} plan</span>
                      <span>Target: {day.searchIntent}</span>
                    </div>
                    <h4 className="font-bold text-slate-950 dark:text-white text-sm leading-snug">{day.title}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">{day.metaDescription}</p>
                    <div className="text-[10px] bg-slate-50 dark:bg-slate-900/60 p-2 rounded-lg text-slate-400">
                      Primary Target Key: <strong>"{day.primaryKeyword}"</strong>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-50 dark:border-slate-900 flex justify-between items-center">
                    {day.isWritten && day.slug ? (
                      <button
                        onClick={() => handleNavigateToPost(day.slug!)}
                        className="text-xs font-bold text-indigo-500 hover:underline flex items-center gap-0.5"
                      >
                        Read Post Draft <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <span className="text-[10px] font-bold text-slate-400">Planned for Calendar</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* SCREEN 6: CORE TOOLS DIRECTORY                            */}
        {/* ========================================================= */}
        {activePage === 'best-ai-tools' && (
          <div className="space-y-8">
            
            <section className="text-center max-w-2xl mx-auto space-y-3">
              <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white">The Ultimate Business AI Tools Directory (2026)</h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                A highly comprehensive, stress-tested registry of 12 best software packages to replace expensive agency retainers. Use search toggles to filter.
              </p>
            </section>

            {/* Categorical tool filters */}
            <div className="flex flex-wrap gap-2 justify-center border-b border-slate-100 dark:border-slate-900 pb-6">
              {['all', ...CATEGORIES_LIST].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedToolCategory(cat)}
                  className={`px-3 py-1 text-xs font-bold uppercase rounded-lg transition-all cursor-pointer ${
                    selectedToolCategory === cat
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950'
                      : 'bg-slate-100 text-slate-500 hover:text-slate-950 dark:bg-slate-900 dark:text-slate-400'
                  }`}
                >
                  {cat === 'all' ? 'All Classes' : cat}
                </button>
              ))}
            </div>

            {/* Grid List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.map((tool) => (
                <div key={tool.id} className="border border-slate-205 dark:border-slate-850 bg-white dark:bg-slate-950 rounded-2xl p-5 hover:shadow-md transition-all flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start gap-2">
                      <span className="text-[9px] font-bold px-2 py-0.5 bg-indigo-50 text-indigo-700 dark:text-indigo-400 dark:bg-indigo-950/40 rounded uppercase">
                        {tool.category}
                      </span>
                      <span className="text-xs font-mono font-bold text-emerald-600 shrink-0">{tool.pricing.startingAt}</span>
                    </div>

                    <div>
                      <h4 className="font-extrabold text-base text-slate-900 dark:text-white leading-tight">{tool.name}</h4>
                      {tool.badge && (
                        <span className="text-[9px] font-bold text-amber-600 block mt-0.5">🎖️ {tool.badge}</span>
                      )}
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">{tool.description}</p>
                    
                    {/* Expandable detailed spec checks */}
                    <div className="space-y-1.5 pt-3 border-t border-slate-50 dark:border-slate-900">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Core Benefits Checklist:</span>
                      {tool.pros.map((pro, pIdx) => (
                        <div key={pIdx} className="flex items-start gap-1 text-xs text-slate-400">
                          <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{pro}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-50 dark:border-slate-800 flex justify-between items-center gap-3">
                    <div className="flex items-center gap-1 text-xs font-mono font-bold text-slate-505">
                      <Star className="w-3.5 h-3.5 fill-current text-amber-400" /> {tool.rating} Rating
                    </div>
                    <a
                      href={tool.affiliateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 font-bold text-xs text-white bg-slate-950 hover:opacity-90 dark:bg-white dark:text-slate-950 rounded-xl transition-all inline-flex items-center gap-1"
                    >
                      Access Tool <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* SCREEN 7: VERIFIED EDITORIAL REVIEWS                      */}
        {/* ========================================================= */}
        {activePage === 'reviews' && (
          <div className="space-y-12 max-w-4xl mx-auto">
            
            <section className="text-center space-y-3">
              <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white">Vetted Software Reviews Platform</h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Read deep-dive, hands-on, objective reviews of major standalone software options. No company sponsorships; purely vetted logs and metrics.
              </p>
            </section>

            <div className="space-y-8">
              {[
                {
                  name: "Claude 3.5 Sonnet Pro",
                  score: "9.8 / 10",
                  pros: ["Unbeatable human-like writing tone", "Artifacts are a revolution for drafting", "Pristine logical programming boundaries"],
                  cons: ["Strict frequency parameters", "Lacks embedded live internet research index"],
                  conclusion: "Claude Pro is the absolute gold standard for editorial bloggers, newsletters publishers, and wireframing designers. Completely transforms your manual typing limits.",
                  badge: "Best Copywriter Tool"
                },
                {
                  name: "Zapier Central Enterprise",
                  score: "9.4 / 10",
                  pros: ["Flawless SaaS integrations across 6k+ platforms", "Natural language instructions builder", "Dynamic self-correcting assistant bots"],
                  cons: ["Subscription gets expensive on multi-run actions", "Debug error panels are highly technical"],
                  conclusion: "If your business operations rely on synchronizing data rapidly across spreadsheets, client files, and invoices, Zapier is easily the most convenient connector.",
                  badge: "Best Systems connector"
                },
                {
                  name: "ManyChat Automated DMs",
                  score: "9.2 / 10",
                  pros: ["Official validated Meta API setup", "Auto-grabs customer email during conversations", "High-converting templates out of the box"],
                  cons: ["Bound purely to Meta networks", "Buttons trigger configuration requires strict audits"],
                  conclusion: "E-commerce stores and Instagram agencies lose hundreds of sales simple because they can't reply to comment-links fast enough. ManyChat resolves this instantly.",
                  badge: "Best E-Commerce Conversion bot"
                }
              ].map((rev, i) => (
                <div key={i} className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-2xl p-6 shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="text-[9px] font-extrabold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded uppercase">
                        {rev.badge}
                      </span>
                      <h3 className="font-extrabold text-lg text-slate-950 dark:text-white mt-1.5">{rev.name}</h3>
                    </div>
                    <span className="text-xs font-mono font-extrabold text-indigo-650 bg-indigo-50 dark:bg-indigo-950 px-3 py-1 rounded-full">{rev.score} Audit Score</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-900/40 p-4 rounded-xl border border-slate-100 dark:border-slate-900">
                    <div>
                      <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block mb-1">PROS:</span>
                      {rev.pros.map((p, idx) => (
                        <div key={idx} className="flex items-start gap-1 text-xs text-slate-600 dark:text-slate-305">
                          <Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                          <span>{p}</span>
                        </div>
                      ))}
                    </div>
                    <div>
                      <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block mb-1">CONS:</span>
                      {rev.cons.map((c, idx) => (
                        <div key={idx} className="flex items-start gap-1 text-xs text-slate-505 dark:text-slate-400">
                          <span className="text-red-500 mr-1">•</span>
                          <span>{c}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="text-xs sm:text-sm text-slate-500 leading-relaxed italic border-l-4 border-indigo-500 pl-3">
                    <strong>Verdict:</strong> {rev.conclusion}
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* SCREEN 8: Head-to-Head Comparisons                       */}
        {/* ========================================================= */}
        {activePage === 'comparisons' && (
          <div className="space-y-12">
            
            <section className="text-center max-w-2xl mx-auto space-y-3">
              <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white">Head-to-Head Specification Shootouts</h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Detailed side-by-side matrices contrasting consumer limits, performance speeds, pricing tiers, and AI design capabilities.
              </p>
            </section>

            {/* Embedding Compare Engine */}
            <CompareEngine />

            {/* Comparison specs grid lists */}
            <section className="space-y-6 max-w-3xl mx-auto pt-6">
              <h3 className="text-lg font-bold text-slate-950 dark:text-white text-center">Zapier vs Make.com (No-Code Automators Shootout)</h3>
              <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-950">
                <table className="min-w-full text-left text-xs text-slate-500 dark:text-slate-450">
                  <thead className="bg-slate-50 dark:bg-slate-900 border-b">
                    <tr>
                      <th className="p-3.5 font-bold text-slate-950 dark:text-white">Feature Criteria</th>
                      <th className="p-3.5 font-bold text-indigo-600">Zapier Central</th>
                      <th className="p-3.5 font-bold text-emerald-600">Make.com Studio</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-900">
                    <tr>
                      <td className="p-3.5 font-bold">Best Target Audience</td>
                      <td className="p-3.5">Non-technical founders, quick integrations</td>
                      <td className="p-3.5">Developers, agency directors, dense loop operations</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold">Visual Layout Maps</td>
                      <td className="p-3.5">Standard chronological listings</td>
                      <td className="p-3.5">An exquisite drag-and-drop spatial canvas</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold">Cost-to-Use ROI</td>
                      <td className="p-3.5">High cost on high task frequency runs</td>
                      <td className="p-3.5">Highly budget-friendly, granular pricing</td>
                    </tr>
                    <tr className="bg-indigo-50/20">
                      <td className="p-3.5 font-bold">Final Verdict</td>
                      <td className="p-3.5">Choose Zapier for simple, text-natural workflows</td>
                      <td className="p-3.5">Choose Make to support high-scale localized records</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

          </div>
        )}

        {/* ========================================================= */}
        {/* SCREEN 9: TUTORIALS BLUEPRINTS VIEW                       */}
        {/* ========================================================= */}
        {activePage === 'tutorials' && (
          <div className="space-y-12 max-w-4xl mx-auto">
            
            <section className="text-center space-y-3">
              <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white">Practical AI Tutorials & Guides</h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Step-by-step technical blueprints with exact prompt codes, JSON sheets, and triggers configuration diagrams.
              </p>
            </section>

            <div className="space-y-8 animate-fade-in">
              {[
                {
                  title: "How to Build an Automated Email Response Loop (Vetted in 2026)",
                  level: "Intermediate Integration",
                  stepText: "1. Create a free Make.com account. 2. Link your Google Workspace or Outlook inbox API. 3. Establish action node trigger 'On New Gmail'. 4. Add action node 'ChatGPT 4o-mini' with system copy prompt, passing the email raw body details. 5. Instruct model to write a pre-vetted customer responder. 6. Pipe resulting text back into draft folder."
                },
                {
                  title: "Setup Instagram Comment DM automation (ManyChat Guide)",
                  level: "Beginner Choice",
                  stepText: "1. Secure access to ManyChat. 2. Connect verified Facebook business profile and active Instagram grid. 3. Establish visual branch trigger 'On User Comments on Post'. 4. Filter phrase 'Send Details'. 5. Trigger conversational message passing your Shopify product checkout link. 6. Automatically capture email parameters before checkout."
                }
              ].map((tut, i) => (
                <div key={i} className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-2xl p-6 shadow-sm space-y-4">
                  <div className="flex justify-between items-center text-xs font-semibold text-slate-400">
                    <span>Tutorial {i + 1}</span>
                    <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-400 rounded-md uppercase text-[9px] font-bold">{tut.level}</span>
                  </div>
                  <h3 className="font-extrabold text-lg text-slate-950 dark:text-white leading-tight">{tut.title}</h3>
                  <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-100 dark:border-slate-800 leading-relaxed text-xs sm:text-sm text-slate-505">
                    {tut.stepText}
                  </div>
                  <div className="flex justify-end pt-2">
                    <button onClick={() => handleNavigate('resources')} className="inline-flex items-center gap-1 text-xs font-bold text-indigo-500 hover:underline cursor-pointer">
                      Download complete scenario blueprint <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* SCREEN 10: RESOURCES DOWNLOADS VIEW                       */}
        {/* ========================================================= */}
        {activePage === 'resources' && (
          <div className="space-y-8 max-w-4xl mx-auto">
            
            <section className="text-center space-y-3">
              <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white">Premium Downloads & Templates Suite</h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Unlock instant PDF manuals, spreadsheet spreadsheets, and pre-written copywriting prompt bundles. Free to use with email voucher validation.
              </p>
            </section>

            {/* Render complete LeadMagnet Downloads center */}
            <LeadMagnetModal />

          </div>
        )}

        {/* ========================================================= */}
        {/* SCREEN 11: NEWSLETTER INBOX SIMULATION                    */}
        {/* ========================================================= */}
        {activePage === 'newsletter' && (
          <div className="space-y-8 max-w-5xl mx-auto">
            
            <section className="text-center space-y-3">
              <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white">Interactive Email Sequence Simulator</h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Discover exactly what we deliver across our 5-day Welcome Funnel before subscribing. Click any day to read full emails inside our live preview inbox.
              </p>
            </section>

            {/* Email Inbox Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 border border-slate-205 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-2xl overflow-hidden shadow-sm h-[500px]">
              
              {/* Inbox Navigation sidebar */}
              <div className="lg:col-span-4 border-r border-slate-200 dark:border-slate-850 bg-slate-50/50 dark:bg-slate-900/40 p-3 space-y-1.5 overflow-y-auto">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest p-2 flex items-center gap-1.5 select-none lines">
                  <Inbox className="w-3.5 h-3.5" /> Simulator Inbox Feed
                </div>
                {EMAIL_FUNNEL.map((mail, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedEmailIndex(idx)}
                    className={`w-full text-left p-3 rounded-xl transition-all border flex flex-col gap-1.5 cursor-pointer select-none ${
                      selectedEmailIndex === idx
                        ? 'bg-white dark:bg-slate-950 border-indigo-500 shadow-sm'
                        : 'border-transparent hover:bg-slate-100 dark:hover:bg-slate-900'
                    }`}
                  >
                    <span className="text-[10px] font-bold text-indigo-650 dark:text-indigo-400 font-mono">{mail.heading}</span>
                    <span className="text-xs font-bold text-slate-900 dark:text-white truncate">{mail.subject}</span>
                  </button>
                ))}
              </div>

              {/* Inbox Active Mail Reading panel */}
              <div className="lg:col-span-8 p-6 flex flex-col justify-between overflow-y-auto">
                <div className="space-y-4">
                  <div className="border-b border-slate-100 dark:border-slate-900 pb-4 space-y-1">
                    <span className="text-[10px] text-slate-400 font-semibold block">From: <strong>Sarah Jenkins (Sarah@AIBusinessHub.com)</strong></span>
                    <h3 className="font-extrabold text-sm sm:text-base text-slate-950 dark:text-white">{currentEmailSim.subject}</h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-350 leading-relaxed whitespace-pre-wrap font-sans">
                    {currentEmailSim.body}
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-100 dark:border-slate-900 flex flex-col sm:flex-row justify-between items-center gap-3">
                  <span className="text-[10px] text-slate-400">Join our newsletter list today to claim real copies.</span>
                  <a
                    href="#lead-optin-form"
                    onClick={() => handleNavigate('resources')}
                    className="px-4 py-2 font-bold text-xs text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all inline-flex items-center gap-1"
                  >
                    Claim Handbooks Now <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* SCREEN 12: GET IN TOUCH CONTACT FORM                      */}
        {/* ========================================================= */}
        {activePage === 'contact' && (
          <div className="max-w-2xl mx-auto space-y-8">
            
            <section className="text-center space-y-3">
              <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white">Coordinate Systems Audits</h2>
              <p className="text-xs sm:text-sm text-slate-505 dark:text-slate-400 leading-relaxed">
                Need customized system setups? Fill our touch forms below to describe bottlenecks and request private consultations.
              </p>
            </section>

            <div className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-2xl p-6 shadow-sm">
              {!contactSuccess ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setContactSuccess(true);
                  }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-white text-xs font-semibold px-4 py-3 border border-slate-205 dark:border-slate-800 rounded-xl focus:outline-none focus:border-indigo-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Corporate Email</label>
                      <input
                        type="email"
                        required
                        placeholder="john@company.com"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-white text-xs font-semibold px-4 py-3 border border-slate-205 dark:border-slate-800 rounded-xl focus:outline-none focus:border-indigo-505 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Tell us about your business</label>
                    <select
                      value={contactForm.bizType}
                      onChange={(e) => setContactForm({ ...contactForm, bizType: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-bold px-4 py-3 border border-slate-205 dark:border-slate-800 rounded-xl focus:outline-none focus:border-indigo-500 transition-all cursor-pointer"
                    >
                      <option value="ecommerce">Shopify Store Seller</option>
                      <option value="freelancer">Freelancer / Consultancy</option>
                      <option value="local">Local Clinic or Firm</option>
                      <option value="agency">Multi-Client Marketing Agency</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Administrative Bottleneck details</label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Specify your tedious operational tasks and monthly targets here..."
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-white text-xs font-semibold px-4 py-3 border border-slate-205 dark:border-slate-800 rounded-xl focus:outline-none focus:border-indigo-500 transition-all leading-relaxed"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    Submit Consulting Request <PhoneCall className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <div className="text-center py-8 space-y-4 animate-fade-in">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto text-lg font-bold">
                    ✓
                  </div>
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">Submission Captured</h3>
                  <p className="text-xs text-slate-505 leading-relaxed max-w-sm mx-auto">
                    Thank you, <strong>{contactForm.name}</strong>. Sarah Jenkins will review your operational bottleneck details and contact your inbox at <strong>{contactForm.email}</strong> within 1 workday.
                  </p>
                  <button
                    onClick={() => {
                      setContactForm({ name: '', email: '', bizType: 'freelancer', message: '' });
                      setContactSuccess(false);
                    }}
                    className="text-xs font-semibold text-slate-400 hover:text-indigo-505 cursor-pointer underline"
                  >
                    Submit another response representation
                  </button>
                </div>
              )}
            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* SCREEN 13: PRIVACY POLICY                                 */}
        {/* ========================================================= */}
        {activePage === 'privacy-policy' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white">Privacy & Cookie Policy</h2>
            <div className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-2xl p-6 space-y-4 text-xs sm:text-sm text-slate-500 leading-relaxed">
              <p>Welcome to <strong>AI Business Hub</strong>. We strictly respect client visual records and data secrets. This webpage details our procedural collections of emails and search parameters.</p>
              <h4 className="font-bold text-slate-950 dark:text-white pt-2 text-sm">1. Information We Collect</h4>
              <p>When you subscribe to claim resources prompts manuals, we store email addresses safely within verified mail providers. We never lease or sell directories listings to third-party corporate databases.</p>
              <h4 className="font-bold text-slate-950 dark:text-white pt-2 text-sm">2. Cookies and Referrals Tracking</h4>
              <p>We leverage tracking parameters cookie strings. When clicking our direct affiliate buttons to secure software memberships, third party networks record referrals to grant us commissions at absolutely zero expense to you.</p>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* SCREEN 14: AFFILIATE DISCLOSURES                          */}
        {/* ========================================================= */}
        {activePage === 'affiliate-disclosure' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white">Affiliate Transparency Disclosures</h2>
            <div className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-2xl p-6 space-y-4 text-xs sm:text-sm text-slate-505 leading-relaxed">
              <div className="p-4 bg-indigo-50/20 dark:bg-indigo-950/20 rounded-xl border border-indigo-100 dark:border-indigo-900 border-l-4 border-l-indigo-500">
                <strong>FTC Guidelines Alignment:</strong> We maintain complete honesty. Affiliate marketing is our exclusive monetization pipeline, enabling us to review software packages autonomously.
              </div>
              <p>At AI Business Hub, our central purpose is to recommend tested, stable, operational software programs (Claude Pro, Zapier, ManyChat). If you decide to subscribe after clicking our links, we gain referral points.</p>
              <p>Our scores and reviews are determined purely by direct mechanical testing logs and user benchmarks. We do not accept sponsored pay packets to elevate specific platforms or skew ratings.</p>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* SCREEN 15: TERMS AND CONDITIONS                           */}
        {/* ========================================================= */}
        {activePage === 'terms-and-conditions' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white">Terms & Conditions of Use</h2>
            <div className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-2xl p-6 space-y-4 text-xs sm:text-sm text-slate-500 leading-relaxed">
              <h4 className="font-bold text-slate-950 dark:text-white text-sm">1. License of Use For Download Checklists</h4>
              <p>All downloadable material, prompt packages, automation scenarios templates, and spreadsheets remain copyright folders properties of AI Business Hub. We grant individual, non-transferable, free operational license keys for internal startup optimizations only.</p>
              <h4 className="font-bold text-slate-950 dark:text-white pt-2 text-sm">2. Disclaimer of Guarantees</h4>
              <p>Artificial Intelligence models evolve daily. We do not warrant that all Zaps actions will operate uninterrupted. Always stress test all scripts before scaling them into operational client databases.</p>
            </div>
          </div>
        )}

      </main>

      {/* Exquisite Multi-Column Footer with Share Blueprints */}
      <Footer onNavigate={handleNavigate} />

    </div>
  );
}
