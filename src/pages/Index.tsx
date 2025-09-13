
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeatureSlider from "@/components/FeatureSlider";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <FeatureSlider />
      <Hero />
      
      {/* Innovation Points */}
      <section className="py-20 bg-gradient-to-br from-mint-light to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6 font-poppins">Innovation & Technology</h2>
            <p className="text-xl text-navy/70 max-w-3xl mx-auto font-inter leading-relaxed">
              Our premium integrated platform combines cutting-edge AI, telemedicine, and cloud technologies 
              to revolutionize healthcare delivery across India.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "AI + Telemedicine + Cloud",
                description: "Revolutionary tri-technology fusion delivering unprecedented healthcare precision and accessibility.",
                number: "01"
              },
              {
                title: "Rural Healthcare Access",
                description: "Optimized for low bandwidth with offline capabilities, bringing specialists to remote villages.",
                number: "02"
              },
              {
                title: "Lightning Fast Diagnosis",
                description: "Sub-second AI analysis with instant specialist routing prevents critical complications.",
                number: "03"
              },
              {
                title: "Unified Health Ecosystem",
                description: "Complete healthcare journey from symptoms to recovery in one premium application.",
                number: "04"
              },
            ].map((point, index) => (
              <Card key={index} className="card-premium bg-white border-mint/20 group hover:border-mint/40">
                <CardContent className="p-8">
                  <div className="text-4xl font-bold text-mint mb-4 font-poppins">{point.number}</div>
                  <h3 className="font-bold text-xl mb-4 text-navy font-poppins group-hover:text-mint transition-colors">{point.title}</h3>
                  <p className="text-navy/70 leading-relaxed font-inter">{point.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SymptoCare Ayurveda Section */}
      <section className="py-20 bg-gradient-to-br from-ayurveda-background to-ayurveda-muted relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 text-ayurveda-accent/20 animate-pulse">
          <div className="text-6xl">🌿</div>
        </div>
        <div className="absolute bottom-10 right-10 text-ayurveda-accent/20 animate-pulse" style={{animationDelay: '1s'}}>
          <div className="text-5xl">🕉️</div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="text-4xl animate-bounce">🌿</span>
              <h2 className="text-4xl md:text-5xl font-bold text-ayurveda-primary font-poppins">SymptoCare Ayurveda</h2>
              <span className="text-4xl animate-bounce" style={{animationDelay: '0.5s'}}>🌿</span>
            </div>
            <p className="text-ayurveda-secondary-foreground max-w-4xl mx-auto text-xl leading-relaxed font-inter">
              Discover the ancient wisdom of Ayurveda integrated with modern technology. Our premium Ayurvedic platform 
              offers personalized holistic healing, natural remedies, and wellness guidance as a perfect complement to allopathic medicine.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: "🌱",
                title: "Premium Natural Remedies",
                description: "Authentic Ayurvedic formulations crafted by master practitioners with modern quality standards."
              },
              {
                icon: "🧘‍♀️",
                title: "Holistic Wellness Therapy",
                description: "Complete Panchakarma treatments, personalized yoga therapy, and guided meditation sessions."
              },
              {
                icon: "💚",
                title: "AI-Powered Prakriti Analysis",
                description: "Advanced AI determines your unique constitution and provides personalized lifestyle recommendations."
              }
            ].map((feature, index) => (
              <div key={index} className="card-premium bg-ayurveda-card border-ayurveda-accent/20 p-8 group">
                <div className="text-5xl mb-6 text-center group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                <h3 className="font-bold text-xl mb-4 text-ayurveda-primary text-center font-poppins group-hover:text-ayurveda-accent transition-colors">{feature.title}</h3>
                <p className="text-ayurveda-secondary-foreground text-center leading-relaxed font-inter">{feature.description}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <button className="bg-gradient-to-r from-ayurveda-primary to-ayurveda-accent text-ayurveda-primary-foreground px-12 py-5 rounded-full font-bold text-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 font-poppins">
              Experience Ayurveda Premium 🌿
            </button>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-navy-light to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6 font-poppins">Transforming Healthcare</h2>
            <p className="text-xl text-navy/70 max-w-3xl mx-auto font-inter leading-relaxed">
              Discover how our premium platform creates measurable impact across every aspect of healthcare delivery.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "95% Diagnosis Accuracy",
                description: "AI-powered analysis reduces misdiagnosis and ensures precise early intervention for better outcomes."
              },
              {
                title: "Rural Healthcare Revolution",
                description: "Bringing world-class specialists to remote villages with seamless telemedicine technology."
              },
              {
                title: "70% Cost Reduction",
                description: "Eliminate unnecessary hospital visits while maintaining premium quality healthcare delivery."
              },
              {
                title: "Carbon Neutral Care",
                description: "Sustainable healthcare model reducing travel emissions while expanding medical access."
              },
              {
                title: "Community Health Impact",
                description: "Empowering communities with preventive care knowledge and early intervention strategies."
              },
              {
                title: "Universal Healthcare Access",
                description: "Breaking language and accessibility barriers to serve every Indian with dignity and care."
              },
            ].map((benefit, index) => (
              <Card key={index} className="card-premium bg-white border-mint/20 group">
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-mint to-mint/80 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <div className="w-6 h-6 bg-white rounded-full"></div>
                  </div>
                  <h3 className="font-bold text-xl mb-4 text-navy font-poppins group-hover:text-mint transition-colors">{benefit.title}</h3>
                  <p className="text-navy/70 leading-relaxed font-inter">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Future Scope Section */}
      <section className="py-20 bg-gradient-to-br from-mint-light to-navy-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6 font-poppins">The Future of Healthcare</h2>
            <p className="text-xl text-navy/70 max-w-3xl mx-auto font-inter leading-relaxed">
              Pioneering tomorrow's healthcare innovations with cutting-edge technology and visionary medical solutions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Integrated Medical Ecosystem",
                description: "Unified platform connecting MBBS, Ayurveda, Homeopathy, and alternative medicine practices seamlessly.",
                gradient: "from-mint to-mint/80"
              },
              {
                title: "Smart Medicine Management",
                description: "AI-powered medication reminders with smart dispensers and real-time adherence monitoring.",
                gradient: "from-navy to-navy/80"
              },
              {
                title: "Home Healthcare Network",
                description: "On-demand specialist home visits with portable diagnostic equipment and telemedicine support.",
                gradient: "from-mint to-mint/80"
              },
              {
                title: "AI Health Education Assistant",
                description: "Personalized health education chatbot providing contextual medical information and wellness guidance.",
                gradient: "from-navy to-navy/80"
              },
            ].map((scope, index) => (
              <Card key={index} className="card-premium bg-white/80 backdrop-blur-sm border-2 border-dashed border-mint/40 group hover:border-mint">
                <CardContent className="p-8">
                  <div className={`w-16 h-16 bg-gradient-to-r ${scope.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300`}>
                    <div className="w-8 h-8 bg-white/30 rounded-xl"></div>
                  </div>
                  <h3 className="font-bold text-xl mb-4 text-navy font-poppins group-hover:text-mint transition-colors">{scope.title}</h3>
                  <p className="text-navy/70 leading-relaxed font-inter">{scope.description}</p>
                  <div className="mt-6 text-mint text-sm font-semibold font-inter">Coming Soon</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Index;
