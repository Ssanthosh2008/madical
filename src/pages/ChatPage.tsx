import React from 'react';
import type { ChatMessage as ChatMessageType, Medicine } from '../types';
import { ChatWindow } from '../components/ChatWindow';

interface ChatPageProps {
  messages: ChatMessageType[];
  isTyping: boolean;
  onSendMessage: (text: string) => void;
  onClearChat: () => void;
  onRegenerateResponse: () => void;
  onOpenMedicineModal: (medicine: Medicine) => void;
}

export const ChatPage: React.FC<ChatPageProps> = ({
  messages,
  isTyping,
  onSendMessage,
  onClearChat,
  onRegenerateResponse,
  onOpenMedicineModal
}) => {
  const sampleQuestions = [
    'What is paracetamol commonly used for?',
    'Tell me about ibuprofen.',
    'What precautions should I consider with medicines?',
    'What is cetirizine used for?'
  ];

  return (
    <div className="w-full">
      <ChatWindow
        messages={messages}
        isTyping={isTyping}
        onSendMessage={onSendMessage}
        onClearChat={onClearChat}
        onRegenerateResponse={onRegenerateResponse}
        onOpenMedicineModal={onOpenMedicineModal}
        sampleQuestions={sampleQuestions}
      />
    </div>
  );
};
