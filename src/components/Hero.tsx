
import { ArrowRight, Brain, Activity, CloudCog } from 'lucide-react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="relative min-h-[85vh] flex items-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy/95 to-mint/20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(152,255,152,0.1),transparent)] animate-pulse"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(152,255,152,0.05),transparent)] animate-pulse delay-1000"></div>
        </div>
        
        {/* Floating Medical Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 text-mint/20 animate-bounce" style={{animationDelay: '1s'}}>
            <Brain className="h-8 w-8" />
          </div>
          <div className="absolute top-40 right-20 text-mint/20 animate-bounce" style={{animationDelay: '2s'}}>
            <Activity className="h-6 w-6" />
          </div>
          <div className="absolute bottom-40 left-20 text-mint/20 animate-bounce" style={{animationDelay: '0.5s'}}>
            <CloudCog className="h-7 w-7" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold font-poppins mb-8 tracking-tight">
              <span className="text-navy-foreground">Your Health,</span>
              <br />
              <span className="text-gradient bg-gradient-to-r from-mint to-mint/80 bg-clip-text text-transparent">Our Premium Care.</span>
            </h1>
            <p className="text-xl md:text-2xl text-navy-foreground/80 mb-12 leading-relaxed max-w-3xl mx-auto font-inter">
              Experience next-generation AI-powered healthcare with premium design. Get instant symptom analysis, 
              connect with top specialists, and access quality medical supplies - all in one revolutionary platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Button 
                size="lg" 
                className="btn-mint text-xl h-16 px-12 rounded-full font-semibold shadow-xl"
                onClick={() => navigate('/analyzer')}
              >
                Get AI Analysis Now
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-xl h-16 px-12 rounded-full font-semibold border-2 border-mint text-mint hover:bg-mint hover:text-navy shadow-xl"
                onClick={() => navigate('/doctors')}
              >
                Find Specialists
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 max-w-2xl mx-auto">
              {[
                ['10L+', 'Active Users', 'Trusted by millions'],
                ['500+', 'Top Specialists', 'Expert doctors online'],
                ['24/7', 'Premium Support', 'Always here for you'],
              ].map(([stat, label, desc]) => (
                <div key={label} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-mint mb-2 font-poppins">{stat}</div>
                  <div className="text-navy-foreground font-semibold text-lg mb-1">{label}</div>
                  <div className="text-navy-foreground/70 text-sm font-inter">{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-navy/5 to-mint/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Brain,
                title: "AI Symptom Analysis",
                description: "Advanced AI algorithms provide instant, accurate symptom analysis and health insights"
              },
              {
                icon: Activity,
                title: "Premium Specialists",
                description: "Connect with India's top-rated doctors and specialists for expert consultation"
              },
              {
                icon: CloudCog,
                title: "Secure Health Vault",
                description: "Your health records stored with military-grade security in our premium cloud"
              }
            ].map((feature, index) => (
              <div key={index} className="card-premium bg-white border-mint/20 p-8 group">
                <div className="rounded-full w-16 h-16 bg-mint/20 flex items-center justify-center mb-6 group-hover:bg-mint/30 transition-colors duration-300">
                  <feature.icon className="h-8 w-8 text-mint" />
                </div>
                <h3 className="font-bold text-xl mb-4 text-navy font-poppins">{feature.title}</h3>
                <p className="text-navy/80 leading-relaxed font-inter">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
