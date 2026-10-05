import React from 'react';
import { MemoryPanel } from '../components/MemoryPanel';
import type { UserPreferences, ChatMessage } from '../types';

interface MemoryPageProps {
  preferences: UserPreferences;
  activeMessages: ChatMessage[];
  onUpdatePreferences: (updates: Partial<UserPreferences>) => void;
  onClearPreferences: () => void;
}

export const MemoryPage: React.FC<MemoryPageProps> = ({
  preferences,
  activeMessages,
  onUpdatePreferences,
  onClearPreferences
}) => {
  return (
    <div className="w-full">
      <MemoryPanel
        preferences={preferences}
        activeMessages={activeMessages}
        onUpdatePreferences={onUpdatePreferences}
        onClearPreferences={onClearPreferences}
      />
    </div>
  );
};
