
import { ArrowRight, Brain, Activity, Video, CloudCog } from 'lucide-react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-[#D3E4FD] to-white">
      <div 
        className="absolute inset-0 bg-white/40"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold font-poppins mb-6 tracking-tight">
              आपका स्वास्थ्य,<br />
              <span className="text-[#9b87f5]">हमारी देखभाल।</span>
              <span className="block text-xl font-normal text-gray-600 mt-2">
                Your Health, Our Care.
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              AI-आधारित स्वास्थ्य सेवा का अनुभव करें। तुरंत लक्षण विश्लेषण प्राप्त करें, विशेषज्ञों से जुड़ें, और गुणवत्तापूर्ण चिकित्सा आपूर्ति तक पहुंचें - सब एक ही जगह पर।
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-[#9b87f5] hover:bg-[#8b77e5] text-lg h-12"
                onClick={() => navigate('/analyzer')}
              >
                लक्षण विश्लेषण करें
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg h-12"
                onClick={() => navigate('/doctors')}
              >
                डॉक्टर खोजें
              </Button>
            </div>
            <div className="mt-12 grid grid-cols-3 gap-8">
              {[
                ['10L+', 'सक्रिय उपयोगकर्ता'],
                ['500+', 'विशेषज्ञ'],
                ['24/7', 'सहायता'],
              ].map(([stat, label]) => (
                <div key={label}>
                  <div className="text-2xl font-bold text-[#9b87f5]">{stat}</div>
                  <div className="text-gray-600">{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative hidden md:block">
            <div className="absolute w-full h-full bg-gradient-to-br from-[#9b87f5]/30 to-transparent rounded-3xl transform rotate-3"></div>
            <img
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=2000"
              alt="Indian doctor with digital tablet"
              className="relative z-10 rounded-2xl shadow-2xl h-[600px] w-full object-cover"
            />
            
            <div className="absolute top-4 left-4 bg-white p-4 rounded-xl shadow-lg z-20 flex items-center">
              <Brain className="text-[#9b87f5] mr-2" />
              <span className="font-medium">AI लक्षण विश्लेषण</span>
            </div>
            
            <div className="absolute bottom-4 right-4 bg-white p-4 rounded-xl shadow-lg z-20 flex items-center">
              <Video className="text-[#9b87f5] mr-2" />
              <span className="font-medium">वीडियो परामर्श</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {[
            {
              icon: Brain,
              title: "AI लक्षण विश्लेषण",
              description: "अपने लक्षणों का AI द्वारा विश्लेषण करें और संभावित स्थितियों के बारे में जानें"
            },
            {
              icon: Activity,
              title: "सही विशेषज्ञ से जुड़ें",
              description: "आपके लक्षणों के आधार पर सबसे उपयुक्त विशेषज्ञ से जुड़ें"
            },
            {
              icon: Video,
              title: "वीडियो परामर्श",
              description: "घर बैठे विशेषज्ञों से वीडियो कॉल के माध्यम से परामर्श करें"
            },
            {
              icon: CloudCog,
              title: "सुरक्षित स्वास्थ्य रिकॉर्ड",
              description: "अपने स्वास्थ्य रिकॉर्ड को क्लाउड पर सुरक्षित रूप से संग्रहित करें"
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="rounded-full w-12 h-12 bg-[#F1F0FB] flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-[#9b87f5]" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
