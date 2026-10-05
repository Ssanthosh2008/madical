import React from 'react';
import { 
  Sun, Moon, Type, Trash2, RotateCcw, 
  Brain, CheckCircle2, Sliders, Monitor
} from 'lucide-react';
import type { UserPreferences, FontFamily, FontSize } from '../types';

interface SettingsPanelProps {
  preferences: UserPreferences;
  onUpdatePreferences: (updates: Partial<UserPreferences>) => void;
  onResetSettings: () => void;
  onClearCurrentChat: () => void;
  onClearAllHistory: () => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  preferences,
  onUpdatePreferences,
  onResetSettings,
  onClearCurrentChat,
  onClearAllHistory
}) => {
  const fontFamilies: FontFamily[] = ['Inter', 'Poppins', 'Roboto', 'Open Sans', 'Nunito'];
  const fontSizes: { label: string; value: FontSize }[] = [
    { label: 'Small', value: 'small' },
    { label: 'Medium', value: 'medium' },
    { label: 'Large', value: 'large' },
    { label: 'Extra Large', value: 'xlarge' }
  ];

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md">
          <Sliders className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Custom Settings</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Configure appearance, fonts, memory options, and reset browser state
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-700/60 pb-3">
          <Monitor className="w-4 h-4 text-blue-500" />
          <span>Appearance Mode</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => onUpdatePreferences({ theme: 'light' })}
            className={`p-4 rounded-xl border flex items-center gap-3 transition-all ${
              preferences.theme === 'light'
                ? 'border-blue-600 bg-blue-50/50 dark:bg-slate-700 text-blue-900 dark:text-white font-semibold ring-2 ring-blue-500/20'
                : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'
            }`}
          >
            <Sun className="w-5 h-5 text-amber-500" />
            <div className="text-left">
              <div className="text-sm">Light Mode</div>
              <div className="text-[11px] text-slate-400 font-normal">Clean bright interface</div>
            </div>
            {preferences.theme === 'light' && <CheckCircle2 className="w-4 h-4 text-blue-600 ml-auto" />}
          </button>

          <button
            onClick={() => onUpdatePreferences({ theme: 'dark' })}
            className={`p-4 rounded-xl border flex items-center gap-3 transition-all ${
              preferences.theme === 'dark'
                ? 'border-blue-600 bg-slate-900 text-white font-semibold ring-2 ring-blue-500/20'
                : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'
            }`}
          >
            <Moon className="w-5 h-5 text-indigo-400" />
            <div className="text-left">
              <div className="text-sm">Dark Mode</div>
              <div className="text-[11px] text-slate-400 font-normal">Sleek dark interface</div>
            </div>
            {preferences.theme === 'dark' && <CheckCircle2 className="w-4 h-4 text-blue-400 ml-auto" />}
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm space-y-5">
        <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-700/60 pb-3">
          <Type className="w-4 h-4 text-blue-500" />
          <span>Font & Typography Settings</span>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">Select Font Family</label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {fontFamilies.map((font) => (
              <button
                key={font}
                onClick={() => onUpdatePreferences({ fontFamily: font })}
                style={{ fontFamily: font }}
                className={`p-2.5 rounded-xl border text-xs text-center transition-all ${
                  preferences.fontFamily === font
                    ? 'border-blue-600 bg-blue-600 text-white font-bold shadow-md'
                    : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                }`}
              >
                {font}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">Select Text Size</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {fontSizes.map((size) => (
              <button
                key={size.value}
                onClick={() => onUpdatePreferences({ fontSize: size.value })}
                className={`p-2.5 rounded-xl border text-xs text-center font-medium transition-all ${
                  preferences.fontSize === size.value
                    ? 'border-blue-600 bg-blue-600 text-white shadow-md font-bold'
                    : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                }`}
              >
                {size.label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
          <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Live Typography Preview</span>
          <p 
            style={{ fontFamily: preferences.fontFamily }}
            className={`text-slate-800 dark:text-slate-200 leading-relaxed ${
              preferences.fontSize === 'small' ? 'text-xs' :
              preferences.fontSize === 'medium' ? 'text-sm' :
              preferences.fontSize === 'large' ? 'text-base' : 'text-lg'
            }`}
          >
            "MediBot AI is configured to use {preferences.fontFamily} font family at {preferences.fontSize} size. Changes are automatically saved in browser localStorage."
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-700/60 pb-3">
          <Brain className="w-4 h-4 text-blue-500" />
          <span>Demo Memory Controls</span>
        </div>

        <div className="flex items-center justify-between p-3.5 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700">
          <div>
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Enable Demo Memory</h4>
            <p className="text-[11px] text-slate-400">Allows storing non-sensitive user preferences in localStorage</p>
          </div>
          <button
            onClick={() => onUpdatePreferences({ demoMemoryEnabled: !preferences.demoMemoryEnabled })}
            className={`w-12 h-6 rounded-full p-1 transition-colors ${
              preferences.demoMemoryEnabled ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-600'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white transition-transform ${
                preferences.demoMemoryEnabled ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-700/60 pb-3">
          <Trash2 className="w-4 h-4 text-rose-500" />
          <span>Data & Storage Actions</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={onClearCurrentChat}
            className="p-3 bg-slate-50 dark:bg-slate-700/50 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-slate-700 dark:text-slate-200 hover:text-rose-600 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors"
          >
            <span>Clear Current Conversation</span>
            <Trash2 className="w-4 h-4 text-slate-400" />
          </button>

          <button
            onClick={onClearAllHistory}
            className="p-3 bg-slate-50 dark:bg-slate-700/50 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-slate-700 dark:text-slate-200 hover:text-rose-600 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors"
          >
            <span>Clear All Saved Chat History</span>
            <Trash2 className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      </div>

      <div className="pt-2 flex justify-end">
        <button
          onClick={onResetSettings}
          className="px-5 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset Settings to Default</span>
        </button>
      </div>
    </div>
  );
};
