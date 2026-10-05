export interface Medicine {
  id: string;
  name: string;
  genericName: string;
  category: 'Pain Relief' | 'Antibiotics' | 'Antihistamines' | 'Antacids' | 'Anti-inflammatory' | 'Vitamins & Supplements';
  generalUse: string;
  commonPrecautions: string[];
  description: string;
  sideEffects: string[];
  manufacturerInfo?: string;
}

export interface ToolCallLog {
  functionName: 'searchMedicine' | 'getMedicineInformation' | 'getGeneralHealthInformation' | 'saveChatHistory';
  args: Record<string, any>;
  result: any;
  timestamp: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'medibot';
  text: string;
  timestamp: string;
  toolCall?: ToolCallLog;
  isSimulated?: boolean;
  medicineRef?: Medicine;
}

export interface ChatSession {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messages: ChatMessage[];
}

export type ThemeMode = 'light' | 'dark';
export type FontFamily = 'Inter' | 'Poppins' | 'Roboto' | 'Open Sans' | 'Nunito';
export type FontSize = 'small' | 'medium' | 'large' | 'xlarge';

export interface UserPreferences {
  theme: ThemeMode;
  fontFamily: FontFamily;
  fontSize: FontSize;
  language: string;
  demoMemoryEnabled: boolean;
}

export type ActiveTab = 'home' | 'chat' | 'search' | 'history' | 'memory' | 'settings' | 'about';
