
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      
      {/* Innovation Points */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Innovation and Features</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our integrated approach makes healthcare more accessible and effective.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "AI + Telemedicine + Cloud",
                description: "Combining three powerful technologies revolutionizing healthcare."
              },
              {
                title: "Works in Rural Areas",
                description: "Can be used in remote areas with low bandwidth and offline capabilities."
              },
              {
                title: "Fast Diagnosis",
                description: "Get quick analysis and instant specialist guidance—helping prevent complications."
              },
              {
                title: "Unified Health Platform",
                description: "From symptoms to specialists, everything is available in one application."
              },
            ].map((point, index) => (
              <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-[#9b87f5] mb-2">{index + 1}</div>
                  <h3 className="font-semibold text-lg mb-2">{point.title}</h3>
                  <p className="text-gray-600">{point.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-16 bg-gradient-to-br from-[#F1F0FB] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Impact and Benefits</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              See how our platform transforms the healthcare experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Better Diagnosis",
                description: "Reduces self-diagnosis errors and ensures early treatment."
              },
              {
                title: "Improved Accessibility",
                description: "Even rural users gain easy access to specialists."
              },
              {
                title: "Cost Savings",
                description: "Save time and money by reducing unnecessary hospital visits."
              },
              {
                title: "Eco Friendly",
                description: "Reduce your carbon footprint by traveling less."
              },
              {
                title: "Social Impact",
                description: "Increases preventive healthcare awareness."
              },
              {
                title: "Inclusive Healthcare",
                description: "Reaches more people with clear communication."
              },
            ].map((benefit, index) => (
              <Card key={index} className="border-none shadow-sm">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Future Scope Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Future Scope</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Plans for future developments and expansion of our platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Integration of Medical Systems",
                description: "Extending from MBBS to various medical practices."
              },
              {
                title: "Medicine Reminders",
                description: "Get alarms and reminders to take your medicine on time."
              },
              {
                title: "Offline Doctor Visits",
                description: "Booking services for home doctor visits."
              },
              {
                title: "Health Education Chatbot",
                description: "An AI chatbot for information and health education."
              },
            ].map((scope, index) => (
              <Card key={index} className="border border-dashed border-[#9b87f5]">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{scope.title}</h3>
                  <p className="text-gray-600">{scope.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
