import type { UserPreferences, ChatSession } from '../types';
import { INITIAL_CHAT_SESSIONS } from '../data/sampleChatHistory';

const PREFERENCES_KEY = 'medibot_user_preferences';
const CHAT_SESSIONS_KEY = 'medibot_chat_sessions';
const ACTIVE_SESSION_KEY = 'medibot_active_session_id';

export const DEFAULT_PREFERENCES: UserPreferences = {
  theme: 'light',
  fontFamily: 'Inter',
  fontSize: 'medium',
  language: 'English',
  demoMemoryEnabled: true
};

export const getStoredPreferences = (): UserPreferences => {
  try {
    const item = localStorage.getItem(PREFERENCES_KEY);
    return item ? { ...DEFAULT_PREFERENCES, ...JSON.parse(item) } : DEFAULT_PREFERENCES;
  } catch (error) {
    console.error('Error reading preferences from localStorage:', error);
    return DEFAULT_PREFERENCES;
  }
};

export const savePreferences = (prefs: Partial<UserPreferences>): UserPreferences => {
  try {
    const current = getStoredPreferences();
    const updated = { ...current, ...prefs };
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.error('Error saving preferences to localStorage:', error);
    return DEFAULT_PREFERENCES;
  }
};

export const clearStoredPreferences = (): UserPreferences => {
  try {
    localStorage.removeItem(PREFERENCES_KEY);
  } catch (error) {
    console.error('Error clearing preferences:', error);
  }
  return DEFAULT_PREFERENCES;
};

export const getStoredChatSessions = (): ChatSession[] => {
  try {
    const item = localStorage.getItem(CHAT_SESSIONS_KEY);
    if (!item) {
      localStorage.setItem(CHAT_SESSIONS_KEY, JSON.stringify(INITIAL_CHAT_SESSIONS));
      return INITIAL_CHAT_SESSIONS;
    }
    return JSON.parse(item);
  } catch (error) {
    console.error('Error reading chat sessions from localStorage:', error);
    return INITIAL_CHAT_SESSIONS;
  }
};

export const saveChatSessions = (sessions: ChatSession[]): void => {
  try {
    localStorage.setItem(CHAT_SESSIONS_KEY, JSON.stringify(sessions));
  } catch (error) {
    console.error('Error saving chat sessions to localStorage:', error);
  }
};

export const getActiveSessionId = (): string | null => {
  try {
    return localStorage.getItem(ACTIVE_SESSION_KEY);
  } catch (error) {
    return null;
  }
};

export const setActiveSessionId = (id: string | null): void => {
  try {
    if (id) {
      localStorage.setItem(ACTIVE_SESSION_KEY, id);
    } else {
      localStorage.removeItem(ACTIVE_SESSION_KEY);
    }
  } catch (error) {
    console.error('Error setting active session id:', error);
  }
};

export const resetAllLocalStorage = (): void => {
  try {
    localStorage.removeItem(PREFERENCES_KEY);
    localStorage.removeItem(CHAT_SESSIONS_KEY);
    localStorage.removeItem(ACTIVE_SESSION_KEY);
  } catch (error) {
    console.error('Error resetting localStorage:', error);
  }
};
