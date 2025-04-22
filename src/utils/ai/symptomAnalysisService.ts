
import { AnalysisResult } from './types';
import { analyzeChestSymptoms } from './conditionAnalyzers/chest';
import { analyzeHeadSymptoms } from './conditionAnalyzers/head';

const getDefaultAnalysis = (): AnalysisResult => ({
  conditions: [
    { 
      name: 'Multiple possibilities', 
      probability: 'Medium',
      description: 'Your symptoms could indicate various conditions. More specific information would help with analysis.',
      symptoms: ['Various symptoms'],
      precautions: ['Consult a healthcare professional']
    }
  ],
  specialistRecommendation: {
    specialty: 'general-medicine',
    description: 'A general physician can conduct an initial assessment and refer you to a specialist if needed.',
    urgency: 'Routine',
    virtualConsultAvailable: true,
    estimatedCost: '₹3000 - ₹6000'
  },
  additionalRecommendations: {
    lifestyle: ['Maintain regular exercise', 'Eat a healthy diet', 'Avoid smoking'],
    immediateSteps: ['Take prescribed medication', 'Rest in a quiet, dark room'],
    followUp: 'Schedule a follow-up in 2 weeks if symptoms persist'
  }
});

export const analyzeSymptoms = (symptoms: string): Promise<AnalysisResult> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const symptomLower = symptoms.toLowerCase();
      
      if (symptomLower.includes('chest') || symptomLower.includes('heart')) {
        resolve(analyzeChestSymptoms());
      } 
      else if (symptomLower.includes('head') || symptomLower.includes('migraine')) {
        resolve(analyzeHeadSymptoms());
      } 
      else {
        resolve(getDefaultAnalysis());
      }
    }, 1500);
  });
};
