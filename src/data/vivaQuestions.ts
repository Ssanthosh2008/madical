export interface VivaTopic {
  title: string;
  question: string;
  answer: string;
  keyPoints: string[];
}

export const VIVA_TOPICS: VivaTopic[] = [
  {
    title: 'Project Objective',
    question: 'What is the primary objective of MediBot AI?',
    answer: 'MediBot AI is an interactive, simulated pharmacy assistant web application designed to demonstrate AI chatbot workflows, frontend tool calling, state management, browser storage persistence, and medical safety guardrails in a web environment.',
    keyPoints: ['Frontend simulation without external API costs', 'Interactive pharmacy guidance UI', 'Demonstrates tool calling & browser storage']
  },
  {
    title: 'Simulated AI Mechanism',
    question: 'How does the simulated AI work without a backend or external API?',
    answer: 'The system uses an intelligent keyword extraction & pattern matching algorithm in JavaScript/TypeScript. It analyzes input intent, maps key medical queries to predefined structured responses, and triggers frontend tool call functions.',
    keyPoints: ['Regex & token keyword matching', 'Asynchronous simulated response delay with typing animation', 'Fallback safety handlers for unknown queries']
  },
  {
    title: 'Frontend Tool Calling',
    question: 'How is Tool Calling implemented on the frontend?',
    answer: 'When a user submits a query (e.g., "What is Paracetamol?"), the AI engine detects the tool requirement and executes real TypeScript functions like searchMedicine() or getMedicineInformation(). It attaches a visual Tool Log badge to the chat message.',
    keyPoints: ['searchMedicine() - filters medicine catalog', 'getMedicineInformation() - retrieves precautions & uses', 'getGeneralHealthInformation() - handles wellness guidance', 'saveChatHistory() - persists session state']
  },
  {
    title: 'LocalStorage Memory Model',
    question: 'How does memory persistence work in this project?',
    answer: 'Browser localStorage is used for both Short-Term (active session state) and Long-Term Demo Memory (user preferences like theme mode, font choice, font size, and chat history logs).',
    keyPoints: ['Non-sensitive browser data storage', 'JSON serialization & deserialization', 'Clean reset & management options in Settings']
  },
  {
    title: 'Medical Safety Concept',
    question: 'What medical safety guardrails are built into MediBot AI?',
    answer: 'MediBot AI strictly enforces ethical medical disclaimers. It never gives dosage instructions, prescriptions, or medical diagnoses. Any query involving dangerous topics (dosage, pregnancy, severe symptoms) triggers a physician referral directive.',
    keyPoints: ['Strict anti-dosage policy', 'Mandatory physician referral for high-risk queries', 'Prominent safety disclaimers across all pages']
  }
];
