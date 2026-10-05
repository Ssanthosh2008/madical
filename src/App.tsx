import { useState, useEffect, useCallback } from 'react';
import type { 
  ActiveTab, UserPreferences, ChatSession, ChatMessage 
} from './types';
import { 
  getStoredPreferences, savePreferences, clearStoredPreferences,
  getStoredChatSessions, saveChatSessions, getActiveSessionId, 
  setActiveSessionId, resetAllLocalStorage 
} from './utils/localStorageUtils';
import { generateSimulatedAiResponse } from './services/simulatedAiService';
import { saveChatHistory } from './services/toolCallingService';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { HomePage } from './pages/HomePage';
import { ChatPage } from './pages/ChatPage';
import { SearchPage } from './pages/SearchPage';
import { ChatHistoryPage } from './pages/ChatHistoryPage';
import { MemoryPage } from './pages/MemoryPage';
import { SettingsPage } from './pages/SettingsPage';
import { AboutPage } from './pages/AboutPage';

export function App() {
  // 1. Navigation & UI States
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 2. Preferences State (localStorage)
  const [preferences, setPreferences] = useState<UserPreferences>(getStoredPreferences);

  // 3. Chat History & Sessions State (localStorage)
  const [sessions, setSessions] = useState<ChatSession[]>(getStoredChatSessions);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(() => {
    const savedId = getActiveSessionId();
    const all = getStoredChatSessions();
    if (savedId && all.some(s => s.id === savedId)) {
      return savedId;
    }
    return all.length > 0 ? all[0].id : null;
  });

  const [isTyping, setIsTyping] = useState(false);

  // Helper to get active messages
  const currentSession = sessions.find(s => s.id === currentSessionId);
  const activeMessages = currentSession ? currentSession.messages : [];

  // Update theme class on root element
  useEffect(() => {
    const root = document.documentElement;
    if (preferences.theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [preferences.theme]);

  // Persist preference updates
  const handleUpdatePreferences = (updates: Partial<UserPreferences>) => {
    const newPrefs = savePreferences(updates);
    setPreferences(newPrefs);
  };

  // Reset all settings
  const handleResetSettings = () => {
    resetAllLocalStorage();
    const defaultPrefs = clearStoredPreferences();
    setPreferences(defaultPrefs);
    const freshSessions = getStoredChatSessions();
    setSessions(freshSessions);
    if (freshSessions.length > 0) {
      setCurrentSessionId(freshSessions[0].id);
      setActiveSessionId(freshSessions[0].id);
    }
  };

  // Chat Session Actions
  const handleNewChat = useCallback(() => {
    const newId = `session-${Date.now()}`;
    const newSession: ChatSession = {
      id: newId,
      title: 'New Conversation',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: []
    };

    const updated = [newSession, ...sessions];
    setSessions(updated);
    setCurrentSessionId(newId);
    setActiveSessionId(newId);
    saveChatSessions(updated);
    setActiveTab('chat');
  }, [sessions]);

  // Send Message Handler
  const handleSendMessage = useCallback((text: string) => {
    let targetSessionId = currentSessionId;
    let targetSessions = [...sessions];

    // If no active session, create one
    if (!targetSessionId || !targetSessions.some(s => s.id === targetSessionId)) {
      const newId = `session-${Date.now()}`;
      const titleSnippet = text.length > 25 ? `${text.slice(0, 25)}...` : text;
      const newSession: ChatSession = {
        id: newId,
        title: titleSnippet,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        messages: []
      };
      targetSessions = [newSession, ...targetSessions];
      targetSessionId = newId;
      setCurrentSessionId(newId);
      setActiveSessionId(newId);
    }

    const sessionIndex = targetSessions.findIndex(s => s.id === targetSessionId);
    if (sessionIndex === -1) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const activeSess = targetSessions[sessionIndex];
    
    // Auto rename session if first user message
    let sessionTitle = activeSess.title;
    if (activeSess.messages.length === 0 || activeSess.title === 'New Conversation') {
      sessionTitle = text.length > 28 ? `${text.slice(0, 28)}...` : text;
    }

    const updatedMessages = [...activeSess.messages, userMessage];
    const updatedSession: ChatSession = {
      ...activeSess,
      title: sessionTitle,
      updatedAt: new Date().toISOString(),
      messages: updatedMessages
    };

    targetSessions[sessionIndex] = updatedSession;
    setSessions(targetSessions);
    saveChatSessions(targetSessions);

    // Trigger Typing Animation & Simulated AI Response
    setIsTyping(true);

    setTimeout(() => {
      const processed = generateSimulatedAiResponse(text);

      const botMessage: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'medibot',
        text: processed.messageText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        toolCall: processed.toolCall,
        medicineRef: processed.medicineRef,
        isSimulated: processed.isSimulated
      };

      const finalMessages = [...updatedMessages, botMessage];
      const finalSession: ChatSession = {
        ...updatedSession,
        messages: finalMessages,
        updatedAt: new Date().toISOString()
      };

      // Call tool saveChatHistory
      saveChatHistory(finalSession);

      const finalSessionsList = getStoredChatSessions();
      setSessions(finalSessionsList);
      setIsTyping(false);
    }, 700);
  }, [currentSessionId, sessions]);

  // Handle Example Question Click from Home
  const handleSendExampleQuestion = (question: string) => {
    setActiveTab('chat');
    handleSendMessage(question);
  };

  // Handle "Ask About Medicine" from Catalog/Modal
  const handleAskAboutMedicine = (medicineName: string) => {
    setActiveTab('chat');
    handleSendMessage(`Tell me general information and precautions for ${medicineName}.`);
  };

  // Clear current active chat messages
  const handleClearCurrentChat = () => {
    if (!currentSessionId) return;
    const updated = sessions.map(s => {
      if (s.id === currentSessionId) {
        return { ...s, messages: [], updatedAt: new Date().toISOString() };
      }
      return s;
    });
    setSessions(updated);
    saveChatSessions(updated);
  };

  // Clear all history
  const handleClearAllHistory = () => {
    setSessions([]);
    setCurrentSessionId(null);
    setActiveSessionId(null);
    saveChatSessions([]);
  };

  // Regenerate Response for last message
  const handleRegenerateResponse = () => {
    if (!currentSession || currentSession.messages.length < 2) return;
    const lastUserMsgIndex = [...currentSession.messages].reverse().findIndex(m => m.sender === 'user');
    if (lastUserMsgIndex === -1) return;

    const actualUserMsgIndex = currentSession.messages.length - 1 - lastUserMsgIndex;
    const lastUserMsg = currentSession.messages[actualUserMsgIndex];

    // Trim messages to user message
    const trimmedMessages = currentSession.messages.slice(0, actualUserMsgIndex + 1);
    const updatedSession = { ...currentSession, messages: trimmedMessages };

    const updatedSessions = sessions.map(s => s.id === currentSession.id ? updatedSession : s);
    setSessions(updatedSessions);

    setIsTyping(true);
    setTimeout(() => {
      const processed = generateSimulatedAiResponse(lastUserMsg.text);
      const botMsg: ChatMessage = {
        id: `msg-${Date.now()}`,
        sender: 'medibot',
        text: processed.messageText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        toolCall: processed.toolCall,
        medicineRef: processed.medicineRef,
        isSimulated: processed.isSimulated
      };

      const finalSess = { ...updatedSession, messages: [...trimmedMessages, botMsg] };
      saveChatHistory(finalSess);
      setSessions(getStoredChatSessions());
      setIsTyping(false);
    }, 700);
  };

  // Select Font Family Class
  const getFontFamilyClass = (font: string) => {
    switch (font) {
      case 'Poppins': return 'font-poppins';
      case 'Roboto': return 'font-roboto';
      case 'Open Sans': return 'font-open-sans';
      case 'Nunito': return 'font-nunito';
      default: return 'font-inter';
    }
  };

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors ${getFontFamilyClass(preferences.fontFamily)}`}>
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onNewChat={handleNewChat}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        <Navbar
          theme={preferences.theme}
          onToggleTheme={(t) => handleUpdatePreferences({ theme: t })}
          onOpenSidebar={() => setIsSidebarOpen(true)}
          activeTab={activeTab}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {activeTab === 'home' && (
            <HomePage
              onNavigate={setActiveTab}
              onSendExampleQuestion={handleSendExampleQuestion}
            />
          )}

          {activeTab === 'chat' && (
            <ChatPage
              messages={activeMessages}
              isTyping={isTyping}
              onSendMessage={handleSendMessage}
              onClearChat={handleClearCurrentChat}
              onRegenerateResponse={handleRegenerateResponse}
              onOpenMedicineModal={(med) => handleAskAboutMedicine(med.name)}
            />
          )}

          {activeTab === 'search' && (
            <SearchPage onAskAboutMedicine={handleAskAboutMedicine} />
          )}

          {activeTab === 'history' && (
            <ChatHistoryPage
              sessions={sessions}
              activeSessionId={currentSessionId}
              onSelectSession={(id) => {
                setCurrentSessionId(id);
                setActiveSessionId(id);
                setActiveTab('chat');
              }}
              onNewChat={handleNewChat}
              onRenameSession={(id, title) => {
                const updated = sessions.map(s => s.id === id ? { ...s, title } : s);
                setSessions(updated);
                saveChatSessions(updated);
              }}
              onDeleteSession={(id) => {
                const updated = sessions.filter(s => s.id !== id);
                setSessions(updated);
                saveChatSessions(updated);
                if (currentSessionId === id) {
                  setCurrentSessionId(updated.length > 0 ? updated[0].id : null);
                }
              }}
              onClearAllHistory={handleClearAllHistory}
            />
          )}

          {activeTab === 'memory' && (
            <MemoryPage
              preferences={preferences}
              activeMessages={activeMessages}
              onUpdatePreferences={handleUpdatePreferences}
              onClearPreferences={() => {
                clearStoredPreferences();
                setPreferences(getStoredPreferences());
              }}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsPage
              preferences={preferences}
              onUpdatePreferences={handleUpdatePreferences}
              onResetSettings={handleResetSettings}
              onClearCurrentChat={handleClearCurrentChat}
              onClearAllHistory={handleClearAllHistory}
            />
          )}

          {activeTab === 'about' && (
            <AboutPage />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
