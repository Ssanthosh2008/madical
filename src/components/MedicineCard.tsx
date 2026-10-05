import React from 'react';
import { Pill, AlertCircle, ChevronRight, MessageSquarePlus } from 'lucide-react';
import type { Medicine } from '../types';

interface MedicineCardProps {
  medicine: Medicine;
  onViewDetails: (medicine: Medicine) => void;
  onAskAboutMedicine?: (medicineName: string) => void;
}

export const MedicineCard: React.FC<MedicineCardProps> = ({
  medicine,
  onViewDetails,
  onAskAboutMedicine
}) => {
  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case 'Pain Relief':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-200 dark:border-amber-800';
      case 'Anti-inflammatory':
        return 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border-rose-200 dark:border-rose-800';
      case 'Antibiotics':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 border-purple-200 dark:border-purple-800';
      case 'Antihistamines':
        return 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800';
      case 'Antacids':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border-blue-200 dark:border-blue-800';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 text-white flex items-center justify-center shadow-md shrink-0 group-hover:scale-105 transition-transform">
              <Pill className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {medicine.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                {medicine.genericName}
              </p>
            </div>
          </div>
          <span className={`text-[11px] px-2.5 py-1 rounded-full font-semibold border ${getCategoryBadgeClass(medicine.category)}`}>
            {medicine.category}
          </span>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
          {medicine.generalUse}
        </p>

        {medicine.commonPrecautions.length > 0 && (
          <div className="bg-amber-50/70 dark:bg-amber-950/30 p-2.5 rounded-xl border border-amber-200/60 dark:border-amber-900/50 flex items-start gap-2 text-[11px] text-amber-900 dark:text-amber-200">
            <AlertCircle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <span className="line-clamp-2">{medicine.commonPrecautions[0]}</span>
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between gap-2">
        <button
          onClick={() => onViewDetails(medicine)}
          className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1 transition-colors"
        >
          <span>View Details</span>
          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>

        {onAskAboutMedicine && (
          <button
            onClick={() => onAskAboutMedicine(medicine.name)}
            className="px-2.5 py-1.5 rounded-lg bg-blue-50 dark:bg-slate-700 hover:bg-blue-100 dark:hover:bg-slate-600 text-blue-700 dark:text-blue-200 text-[11px] font-medium flex items-center gap-1 transition-colors"
            title={`Ask MediBot AI about ${medicine.name}`}
          >
            <MessageSquarePlus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Ask AI</span>
          </button>
        )}
      </div>
    </div>
  );
};
