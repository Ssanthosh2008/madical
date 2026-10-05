import React from 'react';
import { 
  Code2, ShieldAlert, Cpu, Terminal, 
  HardDrive, Layers, Pill, GraduationCap 
} from 'lucide-react';
import { DisclaimerBanner } from '../components/DisclaimerBanner';

export const AboutPage: React.FC = () => {
  const techStack = [
    { name: 'React.js', role: 'UI Component Architecture & Virtual DOM Rendering' },
    { name: 'TypeScript', role: 'Strict Type Safety, Interfaces, & Data Schemas' },
    { name: 'Tailwind CSS', role: 'Modern Healthcare Aesthetics, Glassmorphic Styling & Dark Mode' },
    { name: 'Lucide Icons', role: 'Clean Vector Icons for Modern Healthcare UI' },
    { name: 'Browser localStorage', role: 'Non-sensitive Short & Long Term Persistence' }
  ];

  return (
    <div className="space-y-10 max-w-5xl mx-auto pb-12">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-3xl p-8 sm:p-10 shadow-xl relative overflow-hidden space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
            <Pill className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-xs uppercase tracking-wider text-blue-200 font-extrabold">Project Documentation</span>
            <h1 className="text-3xl font-black">MediBot AI Architecture</h1>
          </div>
        </div>
        <p className="text-sm text-blue-100 max-w-2xl leading-relaxed">
          MediBot AI is a complete frontend demonstration platform designed for B.Tech college project presentation and viva evaluation. It showcases AI conversation flows, frontend tool calling, state management, and strict medical guardrails without requiring paid cloud APIs or backends.
        </p>
        <div className="inline-block bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/20 text-xs font-bold">
          Project Type: AI Pharmacy Assistant Demonstration
        </div>
      </div>

      <DisclaimerBanner />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
            <Layers className="w-4 h-4" />
            <span>Project Objective</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            To create an interactive, accessible, non-API-dependent web assistant that demonstrates how modern pharmacy assistants handle user inquiries, validate safety limits, filter medicines, and maintain conversation context.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
            <GraduationCap className="w-4 h-4" />
            <span>Problem Solved</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Demonstrates an ethical, cost-effective prototype for health information retrieval that prevents dangerous self-prescribing or unverified dosage intake while illustrating modern frontend engineering concepts for academic evaluation.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-700/60 pb-3 flex items-center gap-2">
          <Cpu className="w-5 h-5 text-blue-600" />
          <span>Technical Architecture & Modules</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex items-center gap-2 font-bold text-xs text-blue-600 dark:text-blue-400">
              <Cpu className="w-4 h-4" />
              <span>Simulated AI Engine</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Uses regex pattern matching and semantic keyword categorization to deliver contextual responses with typing indicators.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex items-center gap-2 font-bold text-xs text-amber-600 dark:text-amber-400">
              <Terminal className="w-4 h-4" />
              <span>Frontend Tool Calling</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Executes real TypeScript functions like searchMedicine() & getMedicineInformation(), embedding visual Tool Badges into chat bubbles.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex items-center gap-2 font-bold text-xs text-emerald-600 dark:text-emerald-400">
              <HardDrive className="w-4 h-4" />
              <span>Browser Persistence</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Stores user preferences (theme mode, font choice, font size) and full chat session logs using JSON serialization in localStorage.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Code2 className="w-5 h-5 text-blue-600" />
          <span>Technologies Used</span>
        </h2>
        <div className="divide-y divide-slate-100 dark:divide-slate-700/60">
          {techStack.map((tech, idx) => (
            <div key={idx} className="py-3 flex items-center justify-between gap-4 text-xs">
              <span className="font-bold text-slate-900 dark:text-white">{tech.name}</span>
              <span className="text-slate-500 dark:text-slate-400 text-right">{tech.role}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-rose-50 dark:bg-rose-950/40 p-6 rounded-3xl border border-rose-200 dark:border-rose-900 space-y-3">
        <div className="flex items-center gap-2 text-rose-700 dark:text-rose-300 font-bold text-sm">
          <ShieldAlert className="w-5 h-5" />
          <span>Medical Safety Guardrails</span>
        </div>
        <p className="text-xs text-rose-800 dark:text-rose-200 leading-relaxed">
          The system strictly forbids returning dosage calculations, prescribing unverified drugs, or diagnosing illnesses. High-risk topics trigger automated referrals directing users to licensed healthcare professionals.
        </p>
      </div>
    </div>
  );
};
