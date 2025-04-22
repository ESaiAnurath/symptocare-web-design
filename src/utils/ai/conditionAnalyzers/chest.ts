
import { AnalysisResult } from '../types';

export const analyzeChestSymptoms = (): AnalysisResult => ({
  conditions: [
    { 
      name: 'Acute Coronary Syndrome', 
      probability: 'High',
      description: 'A range of conditions associated with sudden, reduced blood flow to the heart.',
      symptoms: ['Chest pain', 'Shortness of breath', 'Cold sweat'],
      precautions: ['Seek immediate medical attention', 'Take prescribed medication', 'Rest']
    },
    { 
      name: 'Anxiety Attack', 
      probability: 'Medium',
      description: 'A sudden episode of intense fear that triggers severe physical reactions.',
      symptoms: ['Rapid heartbeat', 'Chest tightness', 'Breathing difficulty'],
      precautions: ['Practice deep breathing', 'Stay calm', 'Contact healthcare provider']
    }
  ],
  specialistRecommendation: {
    specialty: 'cardiology',
    description: 'Immediate cardiology consultation recommended for chest pain evaluation.',
    urgency: 'Immediate',
    virtualConsultAvailable: true,
    estimatedCost: '₹2000 - ₹3500'
  },
  additionalRecommendations: {
    lifestyle: ['Avoid strenuous activity', 'Monitor blood pressure', 'Take prescribed medications'],
    immediateSteps: ['Call emergency services', 'Take aspirin if prescribed', 'Stay calm'],
    followUp: 'Schedule immediate follow-up with cardiologist'
  }
});
