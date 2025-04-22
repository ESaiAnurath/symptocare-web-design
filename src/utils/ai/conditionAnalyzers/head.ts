
import { AnalysisResult } from '../types';

export const analyzeHeadSymptoms = (): AnalysisResult => ({
  conditions: [
    {
      name: 'Migraine',
      probability: 'High',
      description: 'A neurological condition causing severe headaches with various triggers.',
      symptoms: ['Severe headache', 'Light sensitivity', 'Nausea'],
      precautions: ['Rest in dark room', 'Stay hydrated', 'Avoid triggers']
    },
    {
      name: 'Tension Headache',
      probability: 'Medium',
      description: 'Common headache caused by muscle tension and stress.',
      symptoms: ['Dull head pain', 'Neck tension', 'Stress'],
      precautions: ['Stress management', 'Regular breaks', 'Good posture']
    }
  ],
  specialistRecommendation: {
    specialty: 'neurology',
    description: 'A neurologist can help diagnose and treat recurring headaches.',
    urgency: 'Soon',
    virtualConsultAvailable: true,
    estimatedCost: '₹1500 - ₹3000'
  },
  additionalRecommendations: {
    lifestyle: ['Regular sleep schedule', 'Stress management', 'Trigger avoidance'],
    immediateSteps: ['Rest in quiet room', 'Take prescribed medication'],
    followUp: 'Book appointment if symptoms persist'
  }
});
