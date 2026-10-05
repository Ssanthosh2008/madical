import React from 'react';
import { Menu, Pill, Sparkles } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { DisclaimerBanner } from './DisclaimerBanner';
import type { ThemeMode, ActiveTab } from '../types';

interface NavbarProps {
  theme: ThemeMode;
  onToggleTheme: (theme: ThemeMode) => void;
  onOpenSidebar: () => void;
  activeTab: ActiveTab;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  onToggleTheme,
  onOpenSidebar,
  activeTab
}) => {
  const getTabTitle = (tab: ActiveTab) => {
    switch (tab) {
      case 'home': return 'Home Overview';
      case 'chat': return 'MediBot AI Chat Assistant';
      case 'search': return 'Pharmacy Medicine Catalog';
      case 'history': return 'Saved Chat Conversations';
      case 'memory': return 'Browser Memory & State';
      case 'settings': return 'App Customization Settings';
      case 'about': return 'Project Architecture & Viva Docs';
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSidebar}
            className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Open Menu"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center lg:hidden shadow-sm">
              <Pill className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white leading-tight">
                {getTabTitle(activeTab)}
              </h2>
              <div className="flex items-center gap-1.5 text-[10px] text-blue-600 dark:text-blue-400 font-semibold">
                <Sparkles className="w-3 h-3" />
                <span>Simulated AI Assistant</span>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden xl:block max-w-md">
          <DisclaimerBanner compact />
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>
      </div>
    </header>
  );
};
