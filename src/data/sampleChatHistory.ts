import type { ChatSession } from '../types';

export const INITIAL_CHAT_SESSIONS: ChatSession[] = [
  {
    id: 'session-1',
    title: 'Paracetamol Usage & Information',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    messages: [
      {
        id: 'msg-1',
        sender: 'user',
        text: 'What is paracetamol commonly used for?',
        timestamp: '2 days ago'
      },
      {
        id: 'msg-2',
        sender: 'medibot',
        text: 'Paracetamol (Acetaminophen) is commonly used for mild to moderate pain relief (such as headaches, toothaches, or muscle aches) and to reduce fever. Please consult a qualified doctor or pharmacist for advice specific to your situation.',
        timestamp: '2 days ago',
        isSimulated: true,
        toolCall: {
          functionName: 'getMedicineInformation',
          args: { medicineName: 'Paracetamol' },
          result: { found: true, medicineName: 'Paracetamol' },
          timestamp: new Date(Date.now() - 86400000 * 2).toLocaleTimeString()
        }
      }
    ]
  },
  {
    id: 'session-2',
    title: 'General Allergy Medication',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    messages: [
      {
        id: 'msg-3',
        sender: 'user',
        text: 'Tell me about cetirizine and allergy relief.',
        timestamp: '5 days ago'
      },
      {
        id: 'msg-4',
        sender: 'medibot',
        text: 'Cetirizine is an antihistamine used to relieve allergy symptoms like sneezing, runny nose, and itching. Note: It may cause mild drowsiness in some individuals.',
        timestamp: '5 days ago',
        isSimulated: true,
        toolCall: {
          functionName: 'searchMedicine',
          args: { query: 'cetirizine' },
          result: { count: 1, name: 'Cetirizine' },
          timestamp: new Date(Date.now() - 86400000 * 5).toLocaleTimeString()
        }
      }
    ]
  }
];
