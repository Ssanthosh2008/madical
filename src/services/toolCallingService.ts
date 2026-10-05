import type { Medicine, ToolCallLog, ChatSession } from '../types';
import { SAMPLE_MEDICINES } from '../data/sampleMedicines';
import { getStoredChatSessions, saveChatSessions } from '../utils/localStorageUtils';

/**
 * Frontend Tool Calling Demonstration Services
 * These standard JS/TS functions represent executable tools that the Simulated AI engine calls.
 */

export function searchMedicine(query: string, category?: string): { found: boolean; results: Medicine[]; toolCallLog: ToolCallLog } {
  const cleanQuery = query.toLowerCase().trim();
  
  let results = SAMPLE_MEDICINES.filter(m => 
    m.name.toLowerCase().includes(cleanQuery) || 
    m.genericName.toLowerCase().includes(cleanQuery) ||
    m.generalUse.toLowerCase().includes(cleanQuery) ||
    m.category.toLowerCase().includes(cleanQuery)
  );

  if (category && category !== 'All') {
    results = results.filter(m => m.category.toLowerCase() === category.toLowerCase());
  }

  const toolCallLog: ToolCallLog = {
    functionName: 'searchMedicine',
    args: { query, category: category || 'All' },
    result: { count: results.length, matches: results.map(r => r.name) },
    timestamp: new Date().toLocaleTimeString()
  };

  return {
    found: results.length > 0,
    results,
    toolCallLog
  };
}

export function getMedicineInformation(medicineName: string): { found: boolean; medicine?: Medicine; toolCallLog: ToolCallLog } {
  const cleanName = medicineName.toLowerCase().trim();
  const medicine = SAMPLE_MEDICINES.find(m => 
    m.name.toLowerCase() === cleanName || 
    m.genericName.toLowerCase() === cleanName ||
    m.name.toLowerCase().includes(cleanName)
  );

  const toolCallLog: ToolCallLog = {
    functionName: 'getMedicineInformation',
    args: { medicineName },
    result: medicine ? { found: true, name: medicine.name, category: medicine.category } : { found: false },
    timestamp: new Date().toLocaleTimeString()
  };

  return {
    found: !!medicine,
    medicine,
    toolCallLog
  };
}

export function getGeneralHealthInformation(topic: string): { topic: string; disclaimer: string; toolCallLog: ToolCallLog } {
  const toolCallLog: ToolCallLog = {
    functionName: 'getGeneralHealthInformation',
    args: { topic },
    result: { status: 'general_info_retrieved', topic },
    timestamp: new Date().toLocaleTimeString()
  };

  return {
    topic,
    disclaimer: 'General health guidance only. Always consult a certified physician.',
    toolCallLog
  };
}

export function saveChatHistory(session: ChatSession): { success: boolean; sessionCount: number; toolCallLog: ToolCallLog } {
  const currentSessions = getStoredChatSessions();
  const existingIndex = currentSessions.findIndex(s => s.id === session.id);
  
  let updatedSessions: ChatSession[];
  if (existingIndex >= 0) {
    updatedSessions = [...currentSessions];
    updatedSessions[existingIndex] = session;
  } else {
    updatedSessions = [session, ...currentSessions];
  }

  saveChatSessions(updatedSessions);

  const toolCallLog: ToolCallLog = {
    functionName: 'saveChatHistory',
    args: { sessionId: session.id, messageCount: session.messages.length },
    result: { saved: true, totalSessions: updatedSessions.length },
    timestamp: new Date().toLocaleTimeString()
  };

  return {
    success: true,
    sessionCount: updatedSessions.length,
    toolCallLog
  };
}
