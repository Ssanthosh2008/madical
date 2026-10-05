import React, { useState } from 'react';
import { 
  History, PlusCircle, Trash2, Edit3, MessageSquare, 
  ChevronRight, Calendar, Check, X
} from 'lucide-react';
import type { ChatSession } from '../types';

interface ChatHistoryPageProps {
  sessions: ChatSession[];
  activeSessionId: string | null;
  onSelectSession: (id: string) => void;
  onNewChat: () => void;
  onRenameSession: (id: string, newTitle: string) => void;
  onDeleteSession: (id: string) => void;
  onClearAllHistory: () => void;
}

export const ChatHistoryPage: React.FC<ChatHistoryPageProps> = ({
  sessions,
  activeSessionId,
  onSelectSession,
  onNewChat,
  onRenameSession,
  onDeleteSession,
  onClearAllHistory
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitleText, setEditTitleText] = useState('');

  const handleStartRename = (session: ChatSession, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(session.id);
    setEditTitleText(session.title);
  };

  const handleSaveRename = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (editTitleText.trim()) {
      onRenameSession(id, editTitleText.trim());
    }
    setEditingId(null);
  };

  const handleCancelRename = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(null);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-8">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex items-center justify-between flex-wrap gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <History className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold">Conversation History</h1>
          </div>
          <p className="text-xs sm:text-sm text-blue-100 max-w-xl">
            View, reopen, rename, or manage past pharmacy assistant conversations stored persistently in browser memory.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onNewChat}
            className="px-5 py-3 rounded-2xl bg-white text-blue-700 font-bold text-xs flex items-center gap-2 shadow-md hover:bg-blue-50 transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span>New Chat</span>
          </button>

          {sessions.length > 0 && (
            <button
              onClick={onClearAllHistory}
              className="px-4 py-3 rounded-2xl bg-rose-500/20 hover:bg-rose-500/30 text-white border border-rose-400/30 font-semibold text-xs flex items-center gap-1.5 transition-colors"
              title="Clear all stored conversation history"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear All</span>
            </button>
          )}
        </div>
      </div>

      {sessions.length > 0 ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span>Saved Chat Sessions ({sessions.length})</span>
            <span>Persisted via localStorage</span>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {sessions.map((session) => {
              const isActive = session.id === activeSessionId;
              const isEditing = editingId === session.id;

              return (
                <div
                  key={session.id}
                  onClick={() => onSelectSession(session.id)}
                  className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-4 group ${
                    isActive
                      ? 'bg-blue-50/80 dark:bg-slate-800 border-blue-500 ring-2 ring-blue-500/20 shadow-sm'
                      : 'bg-white dark:bg-slate-800/80 border-slate-200/80 dark:border-slate-700 hover:border-blue-300 dark:hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0 flex-1">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      isActive ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300'
                    }`}>
                      <MessageSquare className="w-5 h-5" />
                    </div>

                    <div className="min-w-0 flex-1 space-y-1">
                      {isEditing ? (
                        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                          <input
                            type="text"
                            value={editTitleText}
                            onChange={(e) => setEditTitleText(e.target.value)}
                            className="px-2 py-1 text-xs rounded border border-blue-400 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none"
                            autoFocus
                          />
                          <button
                            onClick={(e) => handleSaveRename(session.id, e)}
                            className="p-1 rounded text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={handleCancelRename}
                            className="p-1 rounded text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <h3 className="font-bold text-sm text-slate-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {session.title}
                        </h3>
                      )}

                      <div className="flex items-center gap-3 text-[11px] text-slate-400 dark:text-slate-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(session.updatedAt).toLocaleDateString()}
                        </span>
                        <span>•</span>
                        <span>{session.messages.length} Messages</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                    {!isEditing && (
                      <button
                        onClick={(e) => handleStartRename(session, e)}
                        className="p-2 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors"
                        title="Rename conversation"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                    )}

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteSession(session.id);
                      }}
                      className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                      title="Delete conversation"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <ChevronRight className="w-5 h-5 text-slate-300 dark:text-slate-600 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-12 text-center space-y-4 shadow-sm">
          <History className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto" />
          <div className="space-y-1">
            <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200">No Chat History Found</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Start a new conversation with MediBot AI to automatically save chat logs.
            </p>
          </div>
          <button
            onClick={onNewChat}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors"
          >
            Start First Chat
          </button>
        </div>
      )}
    </div>
  );
};
