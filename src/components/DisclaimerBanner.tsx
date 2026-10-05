import React from 'react';
import { AlertTriangle, Sparkles, ShieldCheck } from 'lucide-react';

interface DisclaimerBannerProps {
  compact?: boolean;
}

export const DisclaimerBanner: React.FC<DisclaimerBannerProps> = ({ compact = false }) => {
  if (compact) {
    return (
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900 border border-blue-200 dark:border-slate-700 px-3 py-1.5 rounded-lg flex items-center justify-between gap-2 text-xs text-blue-900 dark:text-blue-200 shadow-sm">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
          <span className="font-semibold">College Project Demo</span>
          <span className="text-slate-400 dark:text-slate-500">•</span>
          <span>Simulated AI Responses</span>
        </div>
        <div className="hidden md:flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>Non-Medical Demonstration Only</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-amber-50/90 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/60 p-3.5 rounded-xl flex items-start gap-3 text-amber-900 dark:text-amber-200 text-xs sm:text-sm shadow-sm transition-all duration-200">
      <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
      <div className="space-y-1">
        <div className="flex items-center gap-2 font-bold text-amber-950 dark:text-amber-100">
          <span>College Project Demo – Simulated AI Responses</span>
        </div>
        <p className="leading-relaxed text-amber-800 dark:text-amber-300">
          MediBot AI is a college project demonstration and does not provide medical diagnosis, prescriptions, or professional medical advice. Always consult a qualified doctor or pharmacist for medical concerns.
        </p>
      </div>
    </div>
  );
};
