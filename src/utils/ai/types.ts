
export interface AnalysisResult {
  conditions: Condition[];
  specialistRecommendation: SpecialistRecommendation;
  additionalRecommendations: AdditionalRecommendations;
}

export interface Condition {
  name: string;
  probability: 'High' | 'Medium' | 'Low';
  description: string;
  symptoms: string[];
  precautions: string[];
}

export interface SpecialistRecommendation {
  specialty: string;
  description: string;
  urgency: 'Immediate' | 'Soon' | 'Routine';
  virtualConsultAvailable: boolean;
  estimatedCost: string;
}

export interface AdditionalRecommendations {
  lifestyle: string[];
  immediateSteps: string[];
  followUp: string;
}
