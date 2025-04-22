interface AnalysisResult {
  conditions: Array<{
    name: string;
    probability: 'High' | 'Medium' | 'Low';
    description: string;
    symptoms: string[];
    precautions: string[];
  }>;
  specialistRecommendation: {
    specialty: string;
    description: string;
    urgency: 'Immediate' | 'Soon' | 'Routine';
    virtualConsultAvailable: boolean;
    estimatedCost: string;
  };
  additionalRecommendations: {
    lifestyle: string[];
    immediateSteps: string[];
    followUp: string;
  };
}

export const analyzeSymptoms = (symptoms: string): Promise<AnalysisResult> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const symptomLower = symptoms.toLowerCase();
      
      if (symptomLower.includes('head') || symptomLower.includes('headache')) {
        resolve({
          conditions: [
            {
              name: 'Tension Headache',
              probability: 'High',
              description: 'A primary headache condition characterized by mild to moderate pain, often described as a tight band around the head. Common triggers include stress, lack of sleep, or eye strain.',
              symptoms: ['Dull head pain', 'Pressure around forehead', 'Tender scalp', 'Neck stiffness'],
              precautions: ['Rest in quiet room', 'Stay hydrated', 'Avoid bright lights', 'Practice stress management']
            },
            { 
              name: 'Migraine', 
              probability: 'Medium',
              description: 'A neurological condition causing severe throbbing pain, usually on one side of the head. Often accompanied by sensitivity to light and sound, nausea, and visual disturbances.',
              symptoms: ['Severe head pain', 'Nausea', 'Sensitivity to light and sound', 'Visual aura'],
              precautions: ['Rest in a dark, quiet room', 'Take prescribed medication', 'Avoid triggers', 'Stay hydrated']
            },
            { 
              name: 'Cluster Headache', 
              probability: 'Low',
              description: 'Extremely severe headaches occurring in cyclical patterns. Pain is typically centered around one eye and can last from 15 minutes to 3 hours.',
              symptoms: ['Intense one-sided pain', 'Eye tearing', 'Nasal congestion', 'Restlessness'],
              precautions: ['Seek immediate medical attention', 'Use prescribed treatments', 'Avoid alcohol during clusters']
            },
          ],
          specialistRecommendation: {
            specialty: 'neurology',
            description: 'A neurologist specializes in diagnosing and treating disorders of the nervous system, including complex headache conditions. They can perform detailed neurological examinations and recommend appropriate treatment plans.',
            urgency: 'Soon',
            virtualConsultAvailable: true,
            estimatedCost: '₹800 - ₹1500'
          },
          additionalRecommendations: {
            lifestyle: ['Maintain regular sleep schedule', 'Practice stress management', 'Stay hydrated', 'Exercise regularly'],
            immediateSteps: ['Take prescribed medication', 'Rest in a quiet, dark room', 'Apply cold/hot compress'],
            followUp: 'Schedule a follow-up in 2 weeks if symptoms persist or worsen'
          }
        });
      } 
      else if (symptomLower.includes('chest') || symptomLower.includes('heart') || symptomLower.includes('छाती') || symptomLower.includes('दिल')) {
        resolve({
          conditions: [
            { 
              name: 'Acid Reflux', 
              probability: 'High',
              description: 'Backward flow of stomach acid into the esophagus, causing heartburn.',
              symptoms: ['Heartburn', 'Indigestion', 'Nausea'],
              precautions: ['Avoid spicy foods', 'Stay upright after meals', 'Take prescribed medication']
            },
            { 
              name: 'Angina', 
              probability: 'Medium',
              description: 'Chest pain caused by reduced blood flow to the heart muscle.',
              symptoms: ['Chest pain', 'Shortness of breath', 'Nausea'],
              precautions: ['Rest in a quiet, dark room', 'Take prescribed medication', 'Avoid stress']
            },
            { 
              name: 'Anxiety', 
              probability: 'Medium',
              description: 'Psychological condition causing chest tightness and rapid heart rate.',
              symptoms: ['Chest tightness', 'Rapid heart rate', 'Anxiety'],
              precautions: ['Practice deep breathing exercises', 'Seek professional help', 'Avoid caffeine']
            },
          ],
          specialistRecommendation: {
            specialty: 'cardiology',
            description: 'A cardiologist specializes in diagnosing and treating heart conditions.',
            urgency: 'Soon',
            virtualConsultAvailable: true,
            estimatedCost: '₹1000 - ₹2000'
          },
          additionalRecommendations: {
            lifestyle: ['Maintain regular exercise', 'Eat a healthy diet', 'Avoid smoking'],
            immediateSteps: ['Take prescribed medication', 'Rest in a quiet, dark room'],
            followUp: 'Schedule a follow-up in 2 weeks if symptoms persist'
          }
        });
      } 
      else if (symptomLower.includes('stomach') || symptomLower.includes('पेट') || symptomLower.includes('abdomen')) {
        resolve({
          conditions: [
            { 
              name: 'Gastritis', 
              probability: 'High',
              description: 'Inflammation of the stomach lining, causing pain, nausea, and vomiting.',
              symptoms: ['Stomach pain', 'Nausea', 'Vomiting'],
              precautions: ['Avoid spicy foods', 'Stay hydrated', 'Take prescribed medication']
            },
            { 
              name: 'Irritable Bowel Syndrome', 
              probability: 'Medium',
              description: 'Intestinal disorder causing abdominal pain, bloating, and altered bowel habits.',
              symptoms: ['Abdominal pain', 'Bloating', 'Altered bowel habits'],
              precautions: ['Eat small, frequent meals', 'Avoid trigger foods', 'Take prescribed medication']
            },
            { 
              name: 'Appendicitis', 
              probability: 'Low',
              description: 'Inflammation of the appendix, causing severe pain in the lower right abdomen.',
              symptoms: ['Severe pain in lower right abdomen', 'Nausea', 'Vomiting'],
              precautions: ['Seek immediate medical attention', 'Take prescribed medication', 'Rest in a quiet room']
            },
          ],
          specialistRecommendation: {
            specialty: 'gastroenterology',
            description: 'A gastroenterologist specializes in diagnosing and treating disorders of the digestive system.',
            urgency: 'Routine',
            virtualConsultAvailable: true,
            estimatedCost: '₹1200 - ₹2500'
          },
          additionalRecommendations: {
            lifestyle: ['Maintain regular exercise', 'Eat a healthy diet', 'Avoid smoking'],
            immediateSteps: ['Take prescribed medication', 'Rest in a quiet, dark room'],
            followUp: 'Schedule a follow-up in 2 weeks if symptoms persist'
          }
        });
      } 
      else if (symptomLower.includes('skin') || symptomLower.includes('rash') || symptomLower.includes('त्वचा')) {
        resolve({
          conditions: [
            { 
              name: 'Contact Dermatitis', 
              probability: 'High',
              description: 'Skin inflammation caused by contact with an irritant or allergen.',
              symptoms: ['Itchy skin', 'Redness', 'Swelling'],
              precautions: ['Avoid contact with irritants or allergens', 'Use over-the-counter creams', 'Take prescribed medication']
            },
            { 
              name: 'Eczema', 
              probability: 'Medium',
              description: 'Inflammatory skin condition causing dry, itchy, and red skin.',
              symptoms: ['Itchy skin', 'Redness', 'Blisters'],
              precautions: ['Use over-the-counter creams', 'Take prescribed medication', 'Avoid triggers']
            },
            { 
              name: 'Fungal Infection', 
              probability: 'Medium',
              description: 'Infection caused by fungi, often presenting as a red, itchy rash with scaling.',
              symptoms: ['Itchy skin', 'Redness', 'Scaling'],
              precautions: ['Use over-the-counter creams', 'Take prescribed medication', 'Avoid triggers']
            },
          ],
          specialistRecommendation: {
            specialty: 'dermatology',
            description: 'A dermatologist specializes in diagnosing and treating skin conditions.',
            urgency: 'Routine',
            virtualConsultAvailable: true,
            estimatedCost: '₹1500 - ₹3000'
          },
          additionalRecommendations: {
            lifestyle: ['Maintain regular exercise', 'Eat a healthy diet', 'Avoid smoking'],
            immediateSteps: ['Take prescribed medication', 'Rest in a quiet, dark room'],
            followUp: 'Schedule a follow-up in 2 weeks if symptoms persist'
          }
        });
      } 
      else if (symptomLower.includes('joint') || symptomLower.includes('जोड़') || symptomLower.includes('bone') || symptomLower.includes('हड्डी')) {
        resolve({
          conditions: [
            { 
              name: 'Osteoarthritis', 
              probability: 'High',
              description: 'Degenerative joint disease causing pain and stiffness in the joints.',
              symptoms: ['Joint pain', 'Stiffness', 'Swelling'],
              precautions: ['Use over-the-counter pain relievers', 'Stay hydrated', 'Rest in a quiet room']
            },
            { 
              name: 'Rheumatoid Arthritis', 
              probability: 'Medium',
              description: 'Autoimmune disorder causing inflammation and pain in the joints.',
              symptoms: ['Joint pain', 'Swelling', 'Fatigue'],
              precautions: ['Use over-the-counter pain relievers', 'Take prescribed medication', 'Rest in a quiet room']
            },
            { 
              name: 'Gout', 
              probability: 'Low',
              description: 'Type of arthritis that causes sudden, severe joint pain, often in the big toe.',
              symptoms: ['Severe joint pain', 'Swelling', 'Redness'],
              precautions: ['Use over-the-counter pain relievers', 'Take prescribed medication', 'Rest in a quiet room']
            },
          ],
          specialistRecommendation: {
            specialty: 'orthopedic',
            description: 'An orthopedic specialist focuses on conditions affecting the musculoskeletal system.',
            urgency: 'Routine',
            virtualConsultAvailable: true,
            estimatedCost: '₹1800 - ₹3500'
          },
          additionalRecommendations: {
            lifestyle: ['Maintain regular exercise', 'Eat a healthy diet', 'Avoid smoking'],
            immediateSteps: ['Take prescribed medication', 'Rest in a quiet, dark room'],
            followUp: 'Schedule a follow-up in 2 weeks if symptoms persist'
          }
        });
      } 
      else if (symptomLower.includes('eye') || symptomLower.includes('आंख') || symptomLower.includes('vision') || symptomLower.includes('दृष्टि')) {
        resolve({
          conditions: [
            { 
              name: 'Conjunctivitis', 
              probability: 'High',
              description: 'Inflammation of the conjunctiva, causing redness, itching, and discharge.',
              symptoms: ['Red eyes', 'Itchy eyes', 'Discharge'],
              precautions: ['Use over-the-counter eye drops', 'Avoid rubbing eyes', 'Stay hydrated']
            },
            { 
              name: 'Dry Eye Syndrome', 
              probability: 'Medium',
              description: 'Condition where eyes don\'t produce enough tears, causing dryness and discomfort.',
              symptoms: ['Dry eyes', 'Itchy eyes', 'Blurred vision'],
              precautions: ['Use over-the-counter eye drops', 'Stay hydrated', 'Rest in a quiet room']
            },
            { 
              name: 'Cataract', 
              probability: 'Low',
              description: 'Clouding of the eye\'s lens, causing blurry vision.',
              symptoms: ['Blurred vision', 'Glare', 'Difficulty focusing'],
              precautions: ['Use over-the-counter eye drops', 'Take prescribed medication', 'Rest in a quiet room']
            },
          ],
          specialistRecommendation: {
            specialty: 'ophthalmology',
            description: 'An ophthalmologist specializes in eye and vision care.',
            urgency: 'Soon',
            virtualConsultAvailable: true,
            estimatedCost: '₹2000 - ₹4000'
          },
          additionalRecommendations: {
            lifestyle: ['Maintain regular exercise', 'Eat a healthy diet', 'Avoid smoking'],
            immediateSteps: ['Take prescribed medication', 'Rest in a quiet, dark room'],
            followUp: 'Schedule a follow-up in 2 weeks if symptoms persist'
          }
        });
      } 
      else if (symptomLower.includes('fever') || symptomLower.includes('बुखार') || symptomLower.includes('cough') || symptomLower.includes('खांसी')) {
        resolve({
          conditions: [
            { 
              name: 'Common Cold', 
              probability: 'High',
              description: 'Viral infection causing runny nose, sore throat, and mild fever.',
              symptoms: ['Runny nose', 'Sore throat', 'Mild fever'],
              precautions: ['Stay hydrated', 'Rest in a quiet room', 'Take prescribed medication']
            },
            { 
              name: 'Influenza', 
              probability: 'Medium',
              description: 'Viral infection causing high fever, body aches, and fatigue.',
              symptoms: ['High fever', 'Body aches', 'Fatigue'],
              precautions: ['Stay hydrated', 'Rest in a quiet room', 'Take prescribed medication']
            },
            { 
              name: 'COVID-19', 
              probability: 'Medium',
              description: 'Viral infection causing fever, cough, and shortness of breath.',
              symptoms: ['Fever', 'Cough', 'Shortness of breath'],
              precautions: ['Stay hydrated', 'Rest in a quiet room', 'Take prescribed medication']
            },
          ],
          specialistRecommendation: {
            specialty: 'general-medicine',
            description: 'A general physician can help diagnose and treat common illnesses.',
            urgency: 'Soon',
            virtualConsultAvailable: true,
            estimatedCost: '₹2500 - ₹5000'
          },
          additionalRecommendations: {
            lifestyle: ['Maintain regular exercise', 'Eat a healthy diet', 'Avoid smoking'],
            immediateSteps: ['Take prescribed medication', 'Rest in a quiet, dark room'],
            followUp: 'Schedule a follow-up in 2 weeks if symptoms persist'
          }
        });
      } 
      else {
        resolve({
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
      }
    }, 1500);
  });
};
