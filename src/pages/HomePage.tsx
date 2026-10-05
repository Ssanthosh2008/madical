import React from 'react';
import { 
  MessageSquare, Search, Sparkles, Terminal, 
  History, Brain, Sliders, ArrowRight, Pill,
  CheckCircle2, GraduationCap
} from 'lucide-react';
import { DisclaimerBanner } from '../components/DisclaimerBanner';
import { VIVA_TOPICS } from '../data/vivaQuestions';
import type { ActiveTab } from '../types';

interface HomePageProps {
  onNavigate: (tab: ActiveTab) => void;
  onSendExampleQuestion: (question: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onSendExampleQuestion
}) => {
  const exampleQuestions = [
    'What is paracetamol commonly used for?',
    'Tell me about ibuprofen.',
    'What is a pain reliever?',
    'What precautions should I consider with medicines?'
  ];

  const features = [
    {
      icon: MessageSquare,
      title: 'AI Chat Assistant',
      description: 'Interactive pharmacy assistant with instant simulated AI responses and keyword parsing.',
      tab: 'chat' as ActiveTab,
      color: 'from-blue-500 to-indigo-600'
    },
    {
      icon: Search,
      title: 'Medicine Search',
      description: 'Comprehensive sample medicine catalog filtered by category, composition, and uses.',
      tab: 'search' as ActiveTab,
      color: 'from-cyan-500 to-blue-600'
    },
    {
      icon: Terminal,
      title: 'Tool Calling Demo',
      description: 'Frontend JS function execution visualization with input arguments and output logs.',
      tab: 'chat' as ActiveTab,
      color: 'from-amber-500 to-orange-600'
    },
    {
      icon: History,
      title: 'Chat History',
      description: 'Persistent conversation logs stored in browser memory across page refreshes.',
      tab: 'history' as ActiveTab,
      color: 'from-purple-500 to-indigo-600'
    },
    {
      icon: Brain,
      title: 'Browser Memory',
      description: 'Dual-layer short-term session state and long-term user preference storage.',
      tab: 'memory' as ActiveTab,
      color: 'from-emerald-500 to-teal-600'
    },
    {
      icon: Sliders,
      title: 'Custom Settings',
      description: 'Dynamic theme modes (light/dark), font selector, text size control, and data reset.',
      tab: 'settings' as ActiveTab,
      color: 'from-rose-500 to-pink-600'
    }
  ];

  return (
    <div className="space-y-12 max-w-6xl mx-auto pb-8">
      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-b from-blue-50/80 via-white to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 rounded-3xl p-8 sm:p-12 border border-blue-100 dark:border-slate-800 shadow-xl overflow-hidden text-center sm:text-left">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-blue-400/10 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold">
            <Pill className="w-4 h-4 text-blue-600 animate-pulse" />
            <span>Hello! I’m MediBot AI, your virtual pharmacy assistant.</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            MediBot AI <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Smart Pharmacy Assistant
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            An interactive, responsive web frontend demonstrating simulated AI chat, frontend tool calling, medicine catalog search, and browser localStorage state persistence. Built for B.Tech college project viva demonstration.
          </p>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2">
            <button
              onClick={() => onNavigate('chat')}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm flex items-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Start Chat</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              onClick={() => onNavigate('search')}
              className="px-6 py-3.5 rounded-2xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-bold text-sm border border-slate-300 dark:border-slate-700 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-2"
            >
              <Search className="w-4 h-4 text-blue-600" />
              <span>Medicine Search</span>
            </button>
          </div>
        </div>
      </section>

      <DisclaimerBanner />

      <section className="space-y-4">
        <div className="flex items-center gap-2 text-slate-900 dark:text-white">
          <Sparkles className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-bold">Try Example Questions</h2>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Click any question below to automatically open the chatbot and receive simulated AI guidance:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {exampleQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => onSendExampleQuestion(q)}
              className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 hover:bg-blue-50/70 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700 shadow-sm hover:border-blue-300 transition-all text-left group flex items-center justify-between gap-3"
            >
              <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                "{q}"
              </span>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all shrink-0" />
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Core Project Features</h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Explore the key modular components built into MediBot AI
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                onClick={() => onNavigate(feat.tab)}
                className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer space-y-3 group"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${feat.color} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {feat.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-800 space-y-8 relative overflow-hidden">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-widest text-blue-400 font-extrabold">Viva Preparation Guide</span>
            <h2 className="text-2xl font-black">Project Demo & Viva Overview</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {VIVA_TOPICS.map((topic, idx) => (
            <div key={idx} className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/60 space-y-2">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-blue-400" />
                <span>{topic.title}</span>
              </div>
              <h3 className="font-bold text-sm text-slate-100">{topic.question}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{topic.answer}</p>
              <div className="pt-2 flex flex-wrap gap-1.5">
                {topic.keyPoints.map((kp, kIdx) => (
                  <span key={kIdx} className="px-2 py-0.5 rounded bg-slate-950 text-slate-400 text-[10px] font-mono">
                    • {kp}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
