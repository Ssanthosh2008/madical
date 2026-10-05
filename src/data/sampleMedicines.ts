import type { Medicine } from '../types';

export const SAMPLE_MEDICINES: Medicine[] = [
  {
    id: 'med-1',
    name: 'Paracetamol',
    genericName: 'Acetaminophen',
    category: 'Pain Relief',
    generalUse: 'Commonly used to relieve mild to moderate pain (such as headaches, muscle aches, toothaches) and to reduce fever.',
    commonPrecautions: [
      'Avoid taking with other products containing paracetamol to prevent accidental overdose.',
      'Do not exceed daily limits to avoid severe liver damage.',
      'Inform doctor if you have a history of severe liver or kidney disease.',
      'Avoid heavy alcohol consumption while using this medication.'
    ],
    description: 'Paracetamol is a widely used analgesic and antipyretic medication available over-the-counter.',
    sideEffects: ['Nausea (rare)', 'Allergic reactions/rashes (rare)', 'Liver toxicity in excessive doses'],
    manufacturerInfo: 'Generic Pharmaceutical Standard'
  },
  {
    id: 'med-2',
    name: 'Ibuprofen',
    genericName: 'Ibuprofen',
    category: 'Anti-inflammatory',
    generalUse: 'Used for relieving pain, reducing inflammation, and lowering fever. Effective for mild dental pain, joint pain, and menstrual discomfort.',
    commonPrecautions: [
      'Take with food or milk to reduce stomach discomfort.',
      'Avoid if you have active stomach ulcers or history of gastrointestinal bleeding.',
      'Use with caution if you have asthma, hypertension, or heart conditions.',
      'Consult a doctor before taking during pregnancy or breastfeeding.'
    ],
    description: 'Ibuprofen belongs to the class of Non-Steroidal Anti-Inflammatory Drugs (NSAIDs).',
    sideEffects: ['Stomach upset or heartburn', 'Dizziness', 'Mild headache'],
    manufacturerInfo: 'Standard NSAID Formulation'
  },
  {
    id: 'med-3',
    name: 'Cetirizine',
    genericName: 'Cetirizine Hydrochloride',
    category: 'Antihistamines',
    generalUse: 'Used to treat allergy symptoms such as sneezing, runny nose, watery eyes, itching, and hives or skin allergic reactions.',
    commonPrecautions: [
      'May cause drowsiness in some individuals; avoid operating heavy machinery if affected.',
      'Avoid consuming alcohol alongside cetirizine as it increases sedation.',
      'Consult a physician if symptoms persist beyond 7 days.',
      'Special care required for elderly patients and those with kidney impairment.'
    ],
    description: 'Cetirizine is a second-generation antihistamine with minimal sedative effects compared to older antihistamines.',
    sideEffects: ['Mild drowsiness', 'Dry mouth', 'Tiredness'],
    manufacturerInfo: 'Allergy Care Generic'
  },
  {
    id: 'med-4',
    name: 'Amoxicillin',
    genericName: 'Amoxicillin Trihydrate',
    category: 'Antibiotics',
    generalUse: 'A broad-spectrum penicillin antibiotic used to treat various bacterial infections such as respiratory tract, ear, nose, throat, and urinary tract infections.',
    commonPrecautions: [
      'MUST be taken only under strict doctor prescription; never self-medicate with antibiotics.',
      'Complete the full course prescribed by your physician even if symptoms improve early.',
      'Inform your doctor immediately if you have any known penicillin allergy.',
      'Ineffective against viral infections like common cold or flu.'
    ],
    description: 'Amoxicillin is an aminopenicillin antibiotic that stops the growth of bacteria.',
    sideEffects: ['Mild diarrhea', 'Skin rash', 'Stomach upset'],
    manufacturerInfo: 'Prescription Antibiotic Class'
  },
  {
    id: 'med-5',
    name: 'Omeprazole',
    genericName: 'Omeprazole Magnesium',
    category: 'Antacids',
    generalUse: 'Reduces excess stomach acid secretion. Commonly used to treat heartburn, acid reflux (GERD), and stomach ulcers.',
    commonPrecautions: [
      'Swallow capsules whole; do not crush or chew.',
      'Best taken before a meal (usually in the morning).',
      'Long-term unmonitored use may affect magnesium and vitamin B12 absorption.',
      'Consult a gastroenterologist for persistent acid reflux symptoms.'
    ],
    description: 'Omeprazole is a Proton Pump Inhibitor (PPI) that inhibits stomach acid secretion.',
    sideEffects: ['Headache', 'Abdominal pain', 'Flatulence or constipation'],
    manufacturerInfo: 'Gastro-Health Generic'
  },
  {
    id: 'med-6',
    name: 'Pantoprazole',
    genericName: 'Pantoprazole Sodium',
    category: 'Antacids',
    generalUse: 'Used for short-term treatment of erosive esophagitis associated with acid reflux and hypersecretory conditions.',
    commonPrecautions: [
      'Requires proper clinical evaluation for severe acid symptoms.',
      'Take 30-60 minutes before breakfast for optimal efficacy.',
      'Do not stop or alter therapy without consulting your treating physician.'
    ],
    description: 'Pantoprazole is a gastrointestinal proton pump inhibitor.',
    sideEffects: ['Mild headache', 'Diarrhea', 'Nausea'],
    manufacturerInfo: 'Gastro-Health Generic'
  },
  {
    id: 'med-7',
    name: 'Azithromycin',
    genericName: 'Azithromycin Dihydrate',
    category: 'Antibiotics',
    generalUse: 'A macrolide antibiotic used to treat susceptible bacterial infections including acute bacterial sinusitis and community-acquired pneumonia.',
    commonPrecautions: [
      'Prescription-only medication. Overuse leads to antibiotic resistance.',
      'Inform healthcare provider if you have underlying heart rhythm disorders.',
      'Report any severe watery diarrhea immediately to a physician.'
    ],
    description: 'Azithromycin is a macrolide antibacterial agent.',
    sideEffects: ['Nausea', 'Loose stools', 'Abdominal discomfort'],
    manufacturerInfo: 'Macrolide Antibiotic Generic'
  },
  {
    id: 'med-8',
    name: 'Vitamin C & Zinc',
    genericName: 'Ascorbic Acid + Zinc Citrate',
    category: 'Vitamins & Supplements',
    generalUse: 'Nutritional supplement used to support immune system health, antioxidant defense, and overall vitality.',
    commonPrecautions: [
      'Dietary supplements should not replace a balanced nutritional diet.',
      'Excessive intake may cause digestive distress.',
      'Consult a doctor before use if you have kidney stone history.'
    ],
    description: 'Essential micronutrient supplement for health maintenance.',
    sideEffects: ['Stomach cramp with mega-doses'],
    manufacturerInfo: 'Nutritional Care Standard'
  }
];
