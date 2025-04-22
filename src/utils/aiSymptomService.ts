
// Mock AI symptom analysis service
// In a production app, this would connect to a real ML model API

interface AnalysisResult {
  conditions: Array<{
    name: string;
    probability: 'High' | 'Medium' | 'Low';
    description: string;
  }>;
  specialistRecommendation: {
    specialty: string;
    description: string;
    urgency: 'Immediate' | 'Soon' | 'Routine';
  };
}

// This simulates an AI model analyzing symptoms
export const analyzeSymptoms = (symptoms: string): Promise<AnalysisResult> => {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      // Very basic keyword matching for demo purposes
      // In a real app, this would be a sophisticated ML model
      const symptomLower = symptoms.toLowerCase();
      
      if (symptomLower.includes('head') || symptomLower.includes('मिरगी') || symptomLower.includes('सिरदर्द')) {
        resolve({
          conditions: [
            { 
              name: 'Tension Headache', 
              probability: 'High',
              description: 'Pain or discomfort in the head, scalp, or neck, often associated with muscle tightness.'
            },
            { 
              name: 'Migraine', 
              probability: 'Medium',
              description: 'Intense throbbing pain, usually on one side of the head, often with nausea and sensitivity to light and sound.'
            },
            { 
              name: 'Sinusitis', 
              probability: 'Low',
              description: 'Inflammation of the sinuses, causing facial pain, headache, and nasal congestion.'
            },
          ],
          specialistRecommendation: {
            specialty: 'neurology',
            description: 'A neurologist specializes in diagnosing and treating disorders of the nervous system, including headaches.',
            urgency: 'Routine'
          }
        });
      } 
      else if (symptomLower.includes('chest') || symptomLower.includes('heart') || symptomLower.includes('छाती') || symptomLower.includes('दिल')) {
        resolve({
          conditions: [
            { 
              name: 'Acid Reflux', 
              probability: 'High',
              description: 'Backward flow of stomach acid into the esophagus, causing heartburn.'
            },
            { 
              name: 'Angina', 
              probability: 'Medium',
              description: 'Chest pain caused by reduced blood flow to the heart muscle.'
            },
            { 
              name: 'Anxiety', 
              probability: 'Medium',
              description: 'Psychological condition causing chest tightness and rapid heart rate.'
            },
          ],
          specialistRecommendation: {
            specialty: 'cardiology',
            description: 'A cardiologist specializes in diagnosing and treating heart conditions.',
            urgency: 'Soon'
          }
        });
      } 
      else if (symptomLower.includes('stomach') || symptomLower.includes('पेट') || symptomLower.includes('abdomen')) {
        resolve({
          conditions: [
            { 
              name: 'Gastritis', 
              probability: 'High',
              description: 'Inflammation of the stomach lining, causing pain, nausea, and vomiting.'
            },
            { 
              name: 'Irritable Bowel Syndrome', 
              probability: 'Medium',
              description: 'Intestinal disorder causing abdominal pain, bloating, and altered bowel habits.'
            },
            { 
              name: 'Appendicitis', 
              probability: 'Low',
              description: 'Inflammation of the appendix, causing severe pain in the lower right abdomen.'
            },
          ],
          specialistRecommendation: {
            specialty: 'gastroenterology',
            description: 'A gastroenterologist specializes in diagnosing and treating disorders of the digestive system.',
            urgency: 'Routine'
          }
        });
      } 
      else if (symptomLower.includes('skin') || symptomLower.includes('rash') || symptomLower.includes('त्वचा')) {
        resolve({
          conditions: [
            { 
              name: 'Contact Dermatitis', 
              probability: 'High',
              description: 'Skin inflammation caused by contact with an irritant or allergen.'
            },
            { 
              name: 'Eczema', 
              probability: 'Medium',
              description: 'Inflammatory skin condition causing dry, itchy, and red skin.'
            },
            { 
              name: 'Fungal Infection', 
              probability: 'Medium',
              description: 'Infection caused by fungi, often presenting as a red, itchy rash with scaling.'
            },
          ],
          specialistRecommendation: {
            specialty: 'dermatology',
            description: 'A dermatologist specializes in diagnosing and treating skin conditions.',
            urgency: 'Routine'
          }
        });
      } 
      else if (symptomLower.includes('joint') || symptomLower.includes('जोड़') || symptomLower.includes('bone') || symptomLower.includes('हड्डी')) {
        resolve({
          conditions: [
            { 
              name: 'Osteoarthritis', 
              probability: 'High',
              description: 'Degenerative joint disease causing pain and stiffness in the joints.'
            },
            { 
              name: 'Rheumatoid Arthritis', 
              probability: 'Medium',
              description: 'Autoimmune disorder causing inflammation and pain in the joints.'
            },
            { 
              name: 'Gout', 
              probability: 'Low',
              description: 'Type of arthritis that causes sudden, severe joint pain, often in the big toe.'
            },
          ],
          specialistRecommendation: {
            specialty: 'orthopedic',
            description: 'An orthopedic specialist focuses on conditions affecting the musculoskeletal system.',
            urgency: 'Routine'
          }
        });
      } 
      else if (symptomLower.includes('eye') || symptomLower.includes('आंख') || symptomLower.includes('vision') || symptomLower.includes('दृष्टि')) {
        resolve({
          conditions: [
            { 
              name: 'Conjunctivitis', 
              probability: 'High',
              description: 'Inflammation of the conjunctiva, causing redness, itching, and discharge.'
            },
            { 
              name: 'Dry Eye Syndrome', 
              probability: 'Medium',
              description: 'Condition where eyes don\'t produce enough tears, causing dryness and discomfort.'
            },
            { 
              name: 'Cataract', 
              probability: 'Low',
              description: 'Clouding of the eye\'s lens, causing blurry vision.'
            },
          ],
          specialistRecommendation: {
            specialty: 'ophthalmology',
            description: 'An ophthalmologist specializes in eye and vision care.',
            urgency: 'Soon'
          }
        });
      } 
      else if (symptomLower.includes('fever') || symptomLower.includes('बुखार') || symptomLower.includes('cough') || symptomLower.includes('खांसी')) {
        resolve({
          conditions: [
            { 
              name: 'Common Cold', 
              probability: 'High',
              description: 'Viral infection causing runny nose, sore throat, and mild fever.'
            },
            { 
              name: 'Influenza', 
              probability: 'Medium',
              description: 'Viral infection causing high fever, body aches, and fatigue.'
            },
            { 
              name: 'COVID-19', 
              probability: 'Medium',
              description: 'Viral infection causing fever, cough, and shortness of breath.'
            },
          ],
          specialistRecommendation: {
            specialty: 'general-medicine',
            description: 'A general physician can help diagnose and treat common illnesses.',
            urgency: 'Soon'
          }
        });
      } 
      else {
        // Default response for any other symptoms
        resolve({
          conditions: [
            { 
              name: 'Multiple possibilities', 
              probability: 'Medium',
              description: 'Your symptoms could indicate various conditions. More specific information would help with analysis.'
            }
          ],
          specialistRecommendation: {
            specialty: 'general-medicine',
            description: 'A general physician can conduct an initial assessment and refer you to a specialist if needed.',
            urgency: 'Routine'
          }
        });
      }
    }, 1500); // 1.5 second delay to simulate AI processing
  });
};
