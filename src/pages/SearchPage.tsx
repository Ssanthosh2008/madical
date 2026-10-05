import React, { useState, useMemo } from 'react';
import { SearchBar } from '../components/SearchBar';
import { MedicineCard } from '../components/MedicineCard';
import { MedicineModal } from '../components/MedicineModal';
import { SAMPLE_MEDICINES } from '../data/sampleMedicines';
import type { Medicine } from '../types';
import { ShieldCheck, Pill } from 'lucide-react';

interface SearchPageProps {
  onAskAboutMedicine: (medicineName: string) => void;
}

export const SearchPage: React.FC<SearchPageProps> = ({ onAskAboutMedicine }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeModalMedicine, setActiveModalMedicine] = useState<Medicine | null>(null);

  const categories = [
    'All',
    'Pain Relief',
    'Anti-inflammatory',
    'Antibiotics',
    'Antihistamines',
    'Antacids',
    'Vitamins & Supplements'
  ];

  const filteredMedicines = useMemo(() => {
    return SAMPLE_MEDICINES.filter(med => {
      const matchesSearch = 
        med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        med.genericName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        med.generalUse.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = 
        selectedCategory === 'All' || med.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-8">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <Pill className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-blue-200 font-semibold">Pharmacy Intelligence</span>
              <h1 className="text-2xl sm:text-3xl font-extrabold">Medicine Catalog & Search</h1>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-blue-100 max-w-2xl leading-relaxed">
            Search medicines by brand name, generic formula, or intended general use. Click any card to inspect precautions and details.
          </p>
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-blue-200" />
            <span>Sample medicine data for college project demonstration only.</span>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          categories={categories}
          onClear={() => {
            setSearchTerm('');
            setSelectedCategory('All');
          }}
        />
      </div>

      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-2">
        <span>Showing <strong className="text-slate-900 dark:text-white font-bold">{filteredMedicines.length}</strong> medicines</span>
        {searchTerm && (
          <span>Filtering by search query: "<strong className="text-blue-600 dark:text-blue-400">{searchTerm}</strong>"</span>
        )}
      </div>

      {filteredMedicines.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMedicines.map((med) => (
            <MedicineCard
              key={med.id}
              medicine={med}
              onViewDetails={setActiveModalMedicine}
              onAskAboutMedicine={onAskAboutMedicine}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-12 text-center space-y-4 shadow-sm">
          <Pill className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto" />
          <div className="space-y-1">
            <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200">No matching medicines found</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Try adjusting your search terms or clearing category filters.
            </p>
          </div>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
            }}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors"
          >
            Reset Catalog Filters
          </button>
        </div>
      )}

      <MedicineModal
        medicine={activeModalMedicine}
        onClose={() => setActiveModalMedicine(null)}
        onAskAboutMedicine={onAskAboutMedicine}
      />
    </div>
  );
};
