import { useState } from 'react';
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Leaf, Heart, Brain, Star, MapPin, Phone, Calendar, Users } from 'lucide-react';

const Ayurveda = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const ayurvedaDoctors = [
    {
      id: 1,
      name: "Dr. Rajesh Sharma",
      specialization: "Panchakarma Specialist",
      experience: "15 years",
      rating: 4.8,
      consultationFee: "₹800",
      location: "Mumbai, Maharashtra",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400",
      availability: "Available Today",
      treatments: ["Panchakarma", "Arthritis Treatment", "Stress Management"]
    },
    {
      id: 2,
      name: "Dr. Priya Nair",
      specialization: "Ayurvedic Gynecology",
      experience: "12 years",
      rating: 4.9,
      consultationFee: "₹700",
      location: "Kerala, India",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400",
      availability: "Available Tomorrow",
      treatments: ["Women's Health", "Fertility Treatment", "Hormonal Balance"]
    },
    {
      id: 3,
      name: "Dr. Amit Gupta",
      specialization: "Ayurvedic Dermatology",
      experience: "18 years",
      rating: 4.7,
      consultationFee: "₹900",
      location: "Rishikesh, Uttarakhand",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=400",
      availability: "Available Now",
      treatments: ["Skin Disorders", "Hair Treatment", "Beauty Enhancement"]
    }
  ];

  const wellnessTips = [
    {
      title: "Morning Routine for Vata Balance",
      description: "Start your day with warm water, oil pulling, and gentle yoga to balance Vata dosha.",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68e71?auto=format&fit=crop&q=80&w=400",
      category: "Daily Routine",
      benefits: ["Better Sleep", "Improved Digestion", "Mental Clarity"]
    },
    {
      title: "Turmeric Golden Milk Recipe",
      description: "A traditional Ayurvedic drink with anti-inflammatory properties and immune support.",
      image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&q=80&w=400",
      category: "Herbal Remedy",
      benefits: ["Anti-inflammatory", "Better Sleep", "Immunity Boost"]
    },
    {
      title: "Abhyanga Self-Massage",
      description: "Daily oil massage technique to nourish the skin and calm the nervous system.",
      image: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&q=80&w=400",
      category: "Self Care",
      benefits: ["Stress Relief", "Better Circulation", "Skin Health"]
    },
    {
      title: "Pranayama for Mental Peace",
      description: "Ancient breathing techniques to reduce stress and enhance mental clarity.",
      image: "https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&q=80&w=400",
      category: "Meditation",
      benefits: ["Stress Relief", "Mental Clarity", "Emotional Balance"]
    }
  ];

  const holisticTherapies = [
    {
      name: "Panchakarma Detox",
      description: "Complete body purification and rejuvenation through five therapeutic procedures.",
      duration: "14-21 days",
      benefits: ["Complete Detox", "Rejuvenation", "Disease Prevention"],
      price: "₹25,000 - ₹45,000"
    },
    {
      name: "Shirodhara Therapy",
      description: "Continuous stream of medicated oil poured on forehead for deep relaxation.",
      duration: "45-60 minutes",
      benefits: ["Stress Relief", "Better Sleep", "Mental Clarity"],
      price: "₹2,500 - ₹4,000"
    },
    {
      name: "Ayurvedic Massage",
      description: "Traditional oil massage using specific techniques and herbal oils.",
      duration: "60-90 minutes",
      benefits: ["Muscle Relief", "Better Circulation", "Skin Health"],
      price: "₹1,500 - ₹3,000"
    },
    {
      name: "Yoga & Meditation",
      description: "Personalized yoga sessions with meditation for holistic wellness.",
      duration: "60 minutes",
      benefits: ["Flexibility", "Mental Peace", "Spiritual Growth"],
      price: "₹800 - ₹1,500"
    }
  ];

  return (
    <div className="min-h-screen bg-ayurveda-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-ayurveda-muted to-ayurveda-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Leaf className="h-8 w-8 text-ayurveda-accent" />
              <h1 className="text-4xl md:text-5xl font-bold text-ayurveda-primary">
                SymptoCare Ayurveda
              </h1>
              <Leaf className="h-8 w-8 text-ayurveda-accent" />
            </div>
            <p className="text-xl text-ayurveda-secondary-foreground max-w-3xl mx-auto leading-relaxed">
              Experience the ancient wisdom of Ayurveda with modern convenience. 
              Find certified practitioners, explore natural therapies, and embrace holistic wellness.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="doctors" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-ayurveda-card border border-ayurveda-muted">
              <TabsTrigger value="doctors" className="data-[state=active]:bg-ayurveda-primary data-[state=active]:text-ayurveda-primary-foreground">
                <Users className="h-4 w-4 mr-2" />
                Ayurveda Doctors
              </TabsTrigger>
              <TabsTrigger value="wellness" className="data-[state=active]:bg-ayurveda-primary data-[state=active]:text-ayurveda-primary-foreground">
                <Heart className="h-4 w-4 mr-2" />
                Wellness Tips
              </TabsTrigger>
              <TabsTrigger value="therapies" className="data-[state=active]:bg-ayurveda-primary data-[state=active]:text-ayurveda-primary-foreground">
                <Brain className="h-4 w-4 mr-2" />
                Holistic Therapies
              </TabsTrigger>
            </TabsList>

            {/* Ayurveda Doctors Tab */}
            <TabsContent value="doctors" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ayurvedaDoctors.map((doctor) => (
                  <Card key={doctor.id} className="border-ayurveda-muted bg-ayurveda-card hover:shadow-xl transition-all duration-300">
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={doctor.image}
                          alt={doctor.name}
                          className="w-16 h-16 rounded-full object-cover border-2 border-ayurveda-primary"
                        />
                        <div>
                          <CardTitle className="text-ayurveda-primary text-lg">{doctor.name}</CardTitle>
                          <p className="text-ayurveda-secondary-foreground text-sm">{doctor.specialization}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <Star className="h-4 w-4 fill-ayurveda-accent text-ayurveda-accent" />
                            <span className="text-sm text-ayurveda-secondary-foreground">{doctor.rating}</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-ayurveda-secondary-foreground">
                          <MapPin className="h-4 w-4" />
                          {doctor.location}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-ayurveda-secondary-foreground">
                          <Calendar className="h-4 w-4" />
                          {doctor.availability}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-ayurveda-primary">
                            {doctor.consultationFee}
                          </span>
                          <Badge variant="secondary" className="bg-ayurveda-secondary text-ayurveda-secondary-foreground">
                            {doctor.experience}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {doctor.treatments.map((treatment, index) => (
                            <Badge key={index} variant="outline" className="text-xs border-ayurveda-primary text-ayurveda-primary">
                              {treatment}
                            </Badge>
                          ))}
                        </div>
                        <Button className="w-full bg-ayurveda-primary hover:bg-ayurveda-accent text-ayurveda-primary-foreground hover:text-ayurveda-accent-foreground transition-colors">
                          Book Consultation
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Wellness Tips Tab */}
            <TabsContent value="wellness" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {wellnessTips.map((tip, index) => (
                  <Card key={index} className="border-ayurveda-muted bg-ayurveda-card hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <div className="relative h-48">
                      <img
                        src={tip.image}
                        alt={tip.title}
                        className="w-full h-full object-cover"
                      />
                      <Badge className="absolute top-4 left-4 bg-ayurveda-primary text-ayurveda-primary-foreground">
                        {tip.category}
                      </Badge>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-xl mb-3 text-ayurveda-primary">{tip.title}</h3>
                      <p className="text-ayurveda-secondary-foreground mb-4 leading-relaxed">{tip.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {tip.benefits.map((benefit, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs border-ayurveda-accent text-ayurveda-accent">
                            {benefit}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Holistic Therapies Tab */}
            <TabsContent value="therapies" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {holisticTherapies.map((therapy, index) => (
                  <Card key={index} className="border-ayurveda-muted bg-ayurveda-card hover:shadow-xl transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="text-ayurveda-primary flex items-center gap-2">
                        <Leaf className="h-5 w-5 text-ayurveda-accent" />
                        {therapy.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-ayurveda-secondary-foreground leading-relaxed">
                          {therapy.description}
                        </p>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-ayurveda-secondary-foreground">Duration:</span>
                          <span className="font-semibold text-ayurveda-primary">{therapy.duration}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-ayurveda-secondary-foreground">Price Range:</span>
                          <span className="font-semibold text-ayurveda-primary">{therapy.price}</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {therapy.benefits.map((benefit, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs border-ayurveda-primary text-ayurveda-primary">
                              {benefit}
                            </Badge>
                          ))}
                        </div>
                        <Button className="w-full bg-ayurveda-primary hover:bg-ayurveda-accent text-ayurveda-primary-foreground hover:text-ayurveda-accent-foreground transition-colors">
                          Book Therapy Session
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default Ayurveda;