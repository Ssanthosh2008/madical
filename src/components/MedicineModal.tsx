import React from 'react';
import { X, Pill, ShieldCheck, MessageSquarePlus, Factory } from 'lucide-react';
import type { Medicine } from '../types';

interface MedicineModalProps {
  medicine: Medicine | null;
  onClose: () => void;
  onAskAboutMedicine: (medicineName: string) => void;
}

export const MedicineModal: React.FC<MedicineModalProps> = ({
  medicine,
  onClose,
  onAskAboutMedicine
}) => {
  if (!medicine) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-700 relative max-h-[90vh] overflow-y-auto space-y-5 animate-scaleUp">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shrink-0">
            <Pill className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              {medicine.category}
            </span>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              {medicine.name}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 italic">
              Generic Name: {medicine.genericName}
            </p>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-slate-900/80 border border-blue-200 dark:border-blue-800 p-3 rounded-xl flex items-center gap-2 text-xs text-blue-800 dark:text-blue-300">
          <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
          <span>Sample medicine data for college project demonstration only. Dosage is strictly excluded.</span>
        </div>

        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Description & Use</h4>
          <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
            {medicine.generalUse}
          </p>
        </div>

        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            Common Precautions
          </h4>
          <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
            {medicine.commonPrecautions.map((p, idx) => (
              <li key={idx} className="flex items-start gap-2 bg-amber-50/50 dark:bg-amber-950/20 p-2 rounded-lg border border-amber-100 dark:border-amber-900/40">
                <span className="text-amber-500 font-bold">•</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>

        {medicine.sideEffects.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Reported Side Effects</h4>
            <div className="flex flex-wrap gap-1.5">
              {medicine.sideEffects.map((se, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium">
                  {se}
                </span>
              ))}
            </div>
          </div>
        )}

        {medicine.manufacturerInfo && (
          <div className="flex items-center gap-2 text-xs text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-700/60">
            <Factory className="w-3.5 h-3.5" />
            <span>Class: {medicine.manufacturerInfo}</span>
          </div>
        )}

        <div className="pt-3 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-semibold transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onAskAboutMedicine(medicine.name);
            }}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-semibold flex items-center gap-2 shadow-md transition-all"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>Ask MediBot About This</span>
          </button>
        </div>
      </div>
    </div>
  );
};
