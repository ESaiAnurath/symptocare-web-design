
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

const Hero = () => {
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
              Your Health,<br />
              <span className="text-[#9b87f5]">Our Care.</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Experience healthcare reimagined. Get instant symptom analysis, connect with specialists, and access quality medical supplies - all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-[#9b87f5] hover:bg-[#8b77e5] text-lg h-12">
                Analyze Symptoms
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg h-12">
                Find a Doctor
              </Button>
            </div>
            <div className="mt-12 grid grid-cols-3 gap-8">
              {[
                ['1M+', 'Active Users'],
                ['500+', 'Specialists'],
                ['24/7', 'Support'],
              ].map(([stat, label]) => (
                <div key={label}>
                  <div className="text-2xl font-bold text-[#9b87f5]">{stat}</div>
                  <div className="text-gray-600">{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative hidden md:block">
            <div className="aspect-square rounded-full bg-[#D3E4FD] absolute -top-8 -right-8 w-72 h-72" />
            <img
              src="https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&q=80&w=1000"
              alt="Medical professionals"
              className="relative z-10 rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
