/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Sparkles, Menu, X, Moon, Sun, Search, Compass, ShieldCheck } from 'lucide-react';

interface NavigationProps {
  activePage: string;
  onNavigate: (page: string) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function Navigation({
  activePage,
  onNavigate,
  isDarkMode,
  onToggleTheme,
  searchQuery,
  onSearchChange,
}: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'start-here', label: 'Start Here', badge: 'New' },
    { id: 'best-ai-tools', label: 'Best AI Tools' },
    { id: 'comparisons', label: 'Comparisons' },
    { id: 'blog', label: 'Blog' },
    { id: 'tutorials', label: 'Tutorials' },
    { id: 'resources', label: 'Resources' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand identity */}
        <button
          onClick={() => handleLinkClick('home')}
          className="flex items-center gap-2 text-slate-900 dark:text-white group shrink-0 select-none cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-indigo-600 dark:bg-indigo-500 flex items-center justify-center text-white font-black hover:rotate-6 transition-all duration-300">
            <Sparkles className="w-4 h-4 fill-current" />
          </div>
          <span className="text-base font-extrabold tracking-tight dark:text-white text-slate-950">
            AI Business Hub
          </span>
        </button>

        {/* Desktop links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer select-none ${
                activePage === link.id
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-sm'
                  : 'text-slate-500 hover:text-slate-950 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-900/40'
              }`}
            >
              {link.label}
              {link.badge && (
                <span className="text-[8px] font-extrabold px-1.5 py-0.5 uppercase bg-emerald-500 text-white rounded-full leading-none shrink-0">
                  {link.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Global actions: Search, Theme Toggle, Mobile Burger */}
        <div className="flex items-center gap-3">
          
          {/* Mock Global Search Field */}
          <div className="relative hidden sm:block max-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Filter site content..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-900/60 text-slate-950 dark:text-white border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs font-semibold focus:outline-none focus:border-indigo-500 transition-all"
            />
          </div>

          <button
            onClick={onToggleTheme}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-500 dark:text-slate-400 cursor-pointer"
            aria-label="Toggle visual theme"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 lg:hidden rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-500 dark:text-slate-400 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-4 space-y-4 animate-fade-in">
          
          <div className="relative sm:hidden">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-905 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs font-semibold focus:outline-none focus:border-indigo-500 text-slate-900 dark:text-white"
            />
          </div>

          <nav className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`p-2.5 rounded-xl text-xs font-bold text-left cursor-pointer ${
                  activePage === link.id
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950'
                    : 'text-slate-600 bg-slate-50 hover:bg-slate-100 dark:text-slate-400 dark:bg-slate-900/50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="border-t border-slate-100 dark:border-slate-900 pt-3 flex flex-wrap gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest justify-center">
            <button onClick={() => handleLinkClick('about')} className="hover:text-slate-600">About</button>
            <span>•</span>
            <button onClick={() => handleLinkClick('reviews')} className="hover:text-slate-600">Reviews</button>
            <span>•</span>
            <button onClick={() => handleLinkClick('categories')} className="hover:text-slate-600">Categories</button>
            <span>•</span>
            <button onClick={() => handleLinkClick('contact')} className="hover:text-slate-600">Contact</button>
          </div>
        </div>
      )}
    </header>
  );
}
