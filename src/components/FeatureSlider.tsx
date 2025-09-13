import { ChevronLeft, ChevronRight, Brain, Stethoscope, Store, Activity, Leaf, Shield } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';

const features = [
  {
    id: 'analyzer',
    icon: Brain,
    title: 'AI Symptom Analyzer',
    description: 'Get instant AI-powered symptom analysis',
    path: '/analyzer',
    color: 'from-mint to-mint/80'
  },
  {
    id: 'doctors',
    icon: Stethoscope,
    title: 'Find Doctors',
    description: 'Connect with qualified specialists',
    path: '/doctors',
    color: 'from-navy to-navy/80'
  },
  {
    id: 'store',
    icon: Store,
    title: 'Medical Store',
    description: 'Order medicines & health products',
    path: '/store',
    color: 'from-mint to-mint/80'
  },
  {
    id: 'services',
    icon: Activity,
    title: 'Health Services',
    description: 'Comprehensive healthcare services',
    path: '/services',
    color: 'from-navy to-navy/80'
  },
  {
    id: 'ayurveda',
    icon: Leaf,
    title: 'Ayurveda Care',
    description: 'Holistic healing & wellness',
    path: '/ayurveda',
    color: 'from-ayurveda-primary to-ayurveda-accent'
  },
  {
    id: 'insurance',
    icon: Shield,
    title: 'Health Insurance',
    description: 'Protect your health & finances',
    path: '/insurance',
    color: 'from-mint to-mint/80'
  }
];

const FeatureSlider = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % features.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + features.length) % features.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, []);

  const getVisibleFeatures = () => {
    const visible = [];
    for (let i = 0; i < 4; i++) {
      visible.push(features[(currentIndex + i) % features.length]);
    }
    return visible;
  };

  return (
    <div className="w-full bg-white/50 backdrop-blur-sm border-b border-mint/20 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={prevSlide}
            className="text-navy hover:text-mint hover:bg-mint/10 transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <div className="flex-1 overflow-hidden">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mx-4">
              {getVisibleFeatures().map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.id}
                    onClick={() => navigate(feature.path)}
                    className="cursor-pointer group"
                  >
                    <div className={`bg-gradient-to-r ${feature.color} p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 border border-mint/20`}>
                      <div className="flex items-center space-x-3">
                        <div className="bg-white/20 p-2 rounded-lg">
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-white text-sm truncate">
                            {feature.title}
                          </h3>
                          <p className="text-white/80 text-xs truncate">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={nextSlide}
            className="text-navy hover:text-mint hover:bg-mint/10 transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Indicator dots */}
        <div className="flex justify-center mt-4 space-x-2">
          {features.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                index === currentIndex ? 'bg-mint' : 'bg-navy/20'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureSlider;