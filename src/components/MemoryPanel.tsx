import React from 'react';
import { Brain, Cpu, HardDrive, ShieldAlert, Trash2, Lock } from 'lucide-react';
import type { UserPreferences, ChatMessage } from '../types';

interface MemoryPanelProps {
  preferences: UserPreferences;
  activeMessages: ChatMessage[];
  onUpdatePreferences: (updates: Partial<UserPreferences>) => void;
  onClearPreferences: () => void;
}

export const MemoryPanel: React.FC<MemoryPanelProps> = ({
  preferences,
  activeMessages,
  onUpdatePreferences,
  onClearPreferences
}) => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-blue-200 font-semibold">Demo Memory Architecture</span>
              <h2 className="text-2xl font-bold">Browser Storage & Context</h2>
            </div>
          </div>
          <p className="text-sm text-blue-100 max-w-2xl leading-relaxed">
            MediBot AI features a dual-layer memory system comprising runtime short-term session state and browser localStorage long-term preference memory.
          </p>
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 text-xs font-semibold">
            <Lock className="w-3.5 h-3.5 text-blue-300" />
            <span>This is browser-based demo memory and is not cloud AI memory.</span>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 p-4 rounded-2xl flex items-start gap-3 text-xs sm:text-sm text-amber-900 dark:text-amber-200">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <h4 className="font-bold text-amber-950 dark:text-amber-100">Privacy & Data Security Policy</h4>
          <p className="mt-1 text-amber-800 dark:text-amber-300 leading-relaxed">
            MediBot AI strictly complies with privacy standards. It does not store medical diagnosis history, sensitive personal health data, or patient medical records. Only non-sensitive app settings are stored locally.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/60 pb-3">
            <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm">
              <Cpu className="w-4 h-4 text-blue-500" />
              <span>Short-Term Session Context</span>
            </div>
            <span className="bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 text-xs px-2.5 py-0.5 rounded-full font-semibold">
              RAM State
            </span>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            Maintains message exchange history during your active browser tab session.
          </p>

          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Active Message Stack:</span>
              <span className="font-bold text-blue-600 dark:text-blue-400">{activeMessages.length} Messages</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">State Storage:</span>
              <span className="font-semibold text-slate-700 dark:text-slate-300">React useState Hook</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/60 pb-3">
            <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm">
              <HardDrive className="w-4 h-4 text-indigo-500" />
              <span>Long-Term Demo Memory</span>
            </div>
            <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
              preferences.demoMemoryEnabled 
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
            }`}>
              {preferences.demoMemoryEnabled ? 'Active (localStorage)' : 'Disabled'}
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
              <span className="text-slate-500">Theme Mode:</span>
              <span className="font-semibold capitalize text-slate-800 dark:text-slate-200">{preferences.theme}</span>
            </div>
            <div className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
              <span className="text-slate-500">Font Family:</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">{preferences.fontFamily}</span>
            </div>
            <div className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
              <span className="text-slate-500">Font Size:</span>
              <span className="font-semibold capitalize text-slate-800 dark:text-slate-200">{preferences.fontSize}</span>
            </div>
            <div className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
              <span className="text-slate-500">Language:</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">{preferences.language}</span>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between gap-2">
            <button
              onClick={() => onUpdatePreferences({ demoMemoryEnabled: !preferences.demoMemoryEnabled })}
              className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              {preferences.demoMemoryEnabled ? 'Disable Demo Memory' : 'Enable Demo Memory'}
            </button>
            <button
              onClick={onClearPreferences}
              className="px-3 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900 border border-rose-200 dark:border-rose-800 text-xs font-semibold flex items-center gap-1 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Memory</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
