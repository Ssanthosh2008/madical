import type { Medicine } from '../types';
import { 
  searchMedicine, 
  getMedicineInformation, 
  getGeneralHealthInformation 
} from './toolCallingService';

export interface ProcessedAiResponse {
  messageText: string;
  toolCall?: any;
  medicineRef?: Medicine;
  isSimulated: boolean;
}

/**
 * Intelligent Simulated AI Engine for MediBot AI
 * Uses keyword matching, safety regex checks, and triggers frontend tool calling functions.
 */
export function generateSimulatedAiResponse(userQuery: string): ProcessedAiResponse {
  const query = userQuery.trim().toLowerCase();

  // 1. MEDICAL SAFETY GUARDRAILS CHECK
  const dangerKeywords = [
    'dosage', 'dose', 'how many mg', 'how much to take', 'how many pills',
    'prescribe', 'prescription', 'diagnose', 'diagnosis', 'cure my',
    'pregnant', 'pregnancy', 'breastfeeding', 'toddler', 'baby', 'child dose',
    'emergency', 'chest pain', 'severe bleeding', 'anaphylaxis', 'overdose'
  ];

  const containsDanger = dangerKeywords.some(kw => query.includes(kw));

  if (containsDanger) {
    return {
      messageText: `⚠️ **Medical Safety Notice**: MediBot AI is a college project demonstration and **cannot** provide specific dosage recommendations, medical diagnoses, treatment plans, or prescription guidelines.\n\nFor questions regarding dosage, medication for children or pregnancy, or emergency health symptoms, please immediately consult a **qualified physician or licensed pharmacist**.`,
      toolCall: getGeneralHealthInformation('Medical Safety & Dosage Guardrails').toolCallLog,
      isSimulated: true
    };
  }

  // 2. GREETINGS & INTRODUCTIONS
  if (/^(hi|hello|hey|greetings|good morning|good afternoon|good evening|who are you)/.test(query)) {
    return {
      messageText: `Hello! I am **MediBot AI**, your virtual pharmacy assistant.\n\nI can help you explore general information, precautions, and categories for common medicines like **Paracetamol**, **Ibuprofen**, **Cetirizine**, **Amoxicillin**, and **Omeprazole**.\n\nWhat would you like to ask or search today?`,
      toolCall: getGeneralHealthInformation('Greetings & Assistant Overview').toolCallLog,
      isSimulated: true
    };
  }

  // 3. MEDICINE SPECIFIC LOOKUPS
  if (query.includes('paracetamol') || query.includes('acetaminophen') || query.includes('fever') || (query.includes('headache') && !query.includes('ibuprofen'))) {
    const info = getMedicineInformation('Paracetamol');
    if (info.found && info.medicine) {
      return {
        messageText: `**${info.medicine.name} (${info.medicine.genericName})**\n\n📌 **General Use:** ${info.medicine.generalUse}\n\n⚠️ **Common Precautions:**\n${info.medicine.commonPrecautions.map(p => `• ${p}`).join('\n')}\n\n💡 *Note: Always consult a doctor for personalized advice.*`,
        toolCall: info.toolCallLog,
        medicineRef: info.medicine,
        isSimulated: true
      };
    }
  }

  if (query.includes('ibuprofen') || query.includes('inflammation') || query.includes('joint pain') || query.includes('swelling') || query.includes('pain reliever')) {
    const info = getMedicineInformation('Ibuprofen');
    if (info.found && info.medicine) {
      return {
        messageText: `**${info.medicine.name}**\n\n📌 **General Use:** ${info.medicine.generalUse}\n\n⚠️ **Common Precautions:**\n${info.medicine.commonPrecautions.map(p => `• ${p}`).join('\n')}\n\n💡 *Take with food to minimize gastric discomfort.*`,
        toolCall: info.toolCallLog,
        medicineRef: info.medicine,
        isSimulated: true
      };
    }
  }

  if (query.includes('cetirizine') || query.includes('allergy') || query.includes('sneezing') || query.includes('hives') || query.includes('runny nose')) {
    const info = getMedicineInformation('Cetirizine');
    if (info.found && info.medicine) {
      return {
        messageText: `**${info.medicine.name}**\n\n📌 **General Use:** ${info.medicine.generalUse}\n\n⚠️ **Common Precautions:**\n${info.medicine.commonPrecautions.map(p => `• ${p}`).join('\n')}\n\n😴 *May cause mild drowsiness in some users.*`,
        toolCall: info.toolCallLog,
        medicineRef: info.medicine,
        isSimulated: true
      };
    }
  }

  if (query.includes('amoxicillin') || query.includes('antibiotic') || query.includes('bacterial infection')) {
    const info = getMedicineInformation('Amoxicillin');
    if (info.found && info.medicine) {
      return {
        messageText: `**${info.medicine.name}**\n\n📌 **General Use:** ${info.medicine.generalUse}\n\n⚠️ **Important Precautions:**\n${info.medicine.commonPrecautions.map(p => `• ${p}`).join('\n')}\n\n🚨 *Antibiotics require a valid medical prescription from a registered practitioner.*`,
        toolCall: info.toolCallLog,
        medicineRef: info.medicine,
        isSimulated: true
      };
    }
  }

  if (query.includes('omeprazole') || query.includes('pantoprazole') || query.includes('acid') || query.includes('heartburn') || query.includes('reflux') || query.includes('antacid')) {
    const info = getMedicineInformation('Omeprazole');
    if (info.found && info.medicine) {
      return {
        messageText: `**${info.medicine.name}**\n\n📌 **General Use:** ${info.medicine.generalUse}\n\n⚠️ **Common Precautions:**\n${info.medicine.commonPrecautions.map(p => `• ${p}`).join('\n')}`,
        toolCall: info.toolCallLog,
        medicineRef: info.medicine,
        isSimulated: true
      };
    }
  }

  if (query.includes('vitamin') || query.includes('zinc') || query.includes('supplement') || query.includes('immunity')) {
    const info = getMedicineInformation('Vitamin C & Zinc');
    if (info.found && info.medicine) {
      return {
        messageText: `**${info.medicine.name}**\n\n📌 **General Use:** ${info.medicine.generalUse}\n\n⚠️ **Precautions:**\n${info.medicine.commonPrecautions.map(p => `• ${p}`).join('\n')}`,
        toolCall: info.toolCallLog,
        medicineRef: info.medicine,
        isSimulated: true
      };
    }
  }

  // 4. PRECAUTIONS GENERAL SEARCH
  if (query.includes('precaution') || query.includes('side effect') || query.includes('warning') || query.includes('safe')) {
    const info = getGeneralHealthInformation('General Precaution Guidelines');
    return {
      messageText: `🛡️ **General Pharmaceutical Precautions**:\n\n1. **Always read labels**: Check for generic composition and expiry dates.\n2. **Avoid self-prescribing**: Especially for antibiotics and steroidal compounds.\n3. **Drug Interactions**: Inform your physician of any ongoing treatments.\n4. **Storage**: Store in a cool, dry place away from direct sunlight and out of children's reach.`,
      toolCall: info.toolCallLog,
      isSimulated: true
    };
  }

  // 5. SEARCH FALLBACK ATTEMPT
  const searchRes = searchMedicine(query);
  if (searchRes.found && searchRes.results.length > 0) {
    const firstMatch = searchRes.results[0];
    return {
      messageText: `I found information for **${firstMatch.name}** in our pharmacy database.\n\n📌 **Category:** ${firstMatch.category}\n📌 **General Use:** ${firstMatch.generalUse}\n\n⚠️ **Precautions:**\n${firstMatch.commonPrecautions.slice(0, 2).map(p => `• ${p}`).join('\n')}`,
      toolCall: searchRes.toolCallLog,
      medicineRef: firstMatch,
      isSimulated: true
    };
  }

  // 6. DEFAULT FRIENDLY FALLBACK
  return {
    messageText: `I am currently programmed with simulated responses for common medicines like **Paracetamol**, **Ibuprofen**, **Cetirizine**, **Amoxicillin**, **Omeprazole**, and **Vitamin C**.\n\nCould you try rephrasing your question or asking about one of these medicines? You can also check out our **Medicine Search** page to explore the full catalog!`,
    toolCall: getGeneralHealthInformation('Fallback Query Processing').toolCallLog,
    isSimulated: true
  };
}
