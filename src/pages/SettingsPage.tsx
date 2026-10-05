import React from 'react';
import { SettingsPanel } from '../components/SettingsPanel';
import type { UserPreferences } from '../types';

interface SettingsPageProps {
  preferences: UserPreferences;
  onUpdatePreferences: (updates: Partial<UserPreferences>) => void;
  onResetSettings: () => void;
  onClearCurrentChat: () => void;
  onClearAllHistory: () => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({
  preferences,
  onUpdatePreferences,
  onResetSettings,
  onClearCurrentChat,
  onClearAllHistory
}) => {
  return (
    <div className="w-full">
      <SettingsPanel
        preferences={preferences}
        onUpdatePreferences={onUpdatePreferences}
        onResetSettings={onResetSettings}
        onClearCurrentChat={onClearCurrentChat}
        onClearAllHistory={onClearAllHistory}
      />
    </div>
  );
};
