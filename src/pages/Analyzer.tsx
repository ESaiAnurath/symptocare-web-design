import { Search, Brain, Activity, Clock, CalendarClock, Video } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { analyzeSymptoms } from "@/utils/aiSymptomService";

const commonSymptoms = [
  "Headache",
  "Fever",
  "Cough",
  "Fatigue",
  "Nausea",
  "Sore throat",
  "Body ache",
  "Dizziness",
  "Stomach pain",
  "Breathing difficulty",
  "Skin rash",
  "Joint pain",
];

const SymptomAnalyzer = () => {
  const [symptoms, setSymptoms] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("analysis");
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAnalyze = async () => {
    if (!symptoms.trim()) {
      toast({
        title: "Enter Symptoms",
        description: "Please describe your symptoms",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      const result = await analyzeSymptoms(symptoms);
      setAnalysisResult(result);
      setActiveTab("results");
      toast({
        title: "Analysis Complete",
        description: "Your symptoms have been successfully analyzed",
      });
    } catch (error) {
      toast({
        title: "Analysis Error",
        description: "Sorry, an error occurred while analyzing symptoms",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const bookAppointment = (specialty: string) => {
    toast({
      title: "Appointment Booking",
      description: `Your appointment has been booked with ${specialty} specialist`,
    });
    navigate(`/doctors/${specialty}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#D3E4FD] to-white">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-gray-900 font-poppins">
              AI Symptom Analyzer
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Describe your symptoms and receive AI-powered analysis. Our advanced AI will suggest possible conditions and recommend appropriate specialists.
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 mb-8 w-full max-w-md mx-auto">
              <TabsTrigger value="analysis">Enter Symptoms</TabsTrigger>
              <TabsTrigger value="results" disabled={!analysisResult}>Results</TabsTrigger>
            </TabsList>

            <TabsContent value="analysis">
              <Card className="border-2 border-[#9b87f5]/20 shadow-lg">
                <CardHeader>
                  <CardTitle>Describe Your Symptoms</CardTitle>
                  <CardDescription>
                    Provide a detailed description of your symptoms in English
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex gap-4">
                    <Input
                      placeholder="Describe your symptoms here..."
                      value={symptoms}
                      onChange={(e) => setSymptoms(e.target.value)}
                      className="flex-1"
                    />
                    <Button 
                      onClick={handleAnalyze}
                      className="bg-[#9b87f5] hover:bg-[#8b77e5]"
                      disabled={isAnalyzing}
                    >
                      {isAnalyzing ? (
                        <>
                          <Brain className="mr-2 h-4 w-4 animate-pulse" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Search className="mr-2 h-4 w-4" />
                          Analyze
                        </>
                      )}
                    </Button>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Common Symptoms</h3>
                    <div className="flex flex-wrap gap-2">
                      {commonSymptoms.map((symptom) => (
                        <Button
                          key={symptom}
                          variant="outline"
                          className="text-sm"
                          onClick={() => setSymptoms(symptom)}
                        >
                          {symptom}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="results">
              {analysisResult && (
                <div className="grid gap-6 md:grid-cols-2">
                  <Card className="border-2 border-[#9b87f5]/20 shadow-lg">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          <Activity className="h-5 w-5 text-[#9b87f5]" />
                          Possible Conditions
                        </CardTitle>
                        <Badge className="bg-[#9b87f5]">AI Analysis</Badge>
                      </div>
                      <CardDescription>
                        Based on your symptoms, these conditions are possible
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {analysisResult.conditions.map((condition: any, index: number) => (
                          <div key={index} className="p-3 rounded-lg bg-gray-50">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-semibold">{condition.name}</h3>
                              <Badge variant={
                                condition.probability === 'High' ? 'destructive' :
                                condition.probability === 'Medium' ? 'default' : 'outline'
                              }>
                                {condition.probability} Probability
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600">{condition.description}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="text-xs text-gray-500 border-t p-4">
                      These are possible conditions only and should not be considered as a definitive diagnosis. Please consult a healthcare provider for proper diagnosis.
                    </CardFooter>
                  </Card>

                  <Card className="border-2 border-[#9b87f5]/20 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Brain className="h-5 w-5 text-[#9b87f5]" />
                        Specialist Recommendation
                      </CardTitle>
                      <CardDescription>
                        Most appropriate medical specialist for your symptoms
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="p-4 rounded-lg bg-[#F1F0FB]">
                        <h3 className="font-semibold text-lg mb-2 capitalize">
                          {analysisResult.specialistRecommendation.specialty}
                        </h3>
                        <p className="text-gray-600 mb-4">
                          {analysisResult.specialistRecommendation.description}
                        </p>
                        <div className="flex items-center text-sm">
                          <Clock className="h-4 w-4 mr-1 text-[#9b87f5]" />
                          <span>
                            Priority: {' '}
                            <span className={
                              analysisResult.specialistRecommendation.urgency === 'Immediate' ? 'text-red-500 font-medium' :
                              analysisResult.specialistRecommendation.urgency === 'Soon' ? 'text-amber-500 font-medium' : 
                              'text-green-500 font-medium'
                            }>
                              {analysisResult.specialistRecommendation.urgency}
                            </span>
                          </span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Button 
                          className="w-full bg-[#9b87f5] hover:bg-[#8b77e5]"
                          onClick={() => bookAppointment(analysisResult.specialistRecommendation.specialty)}
                        >
                          <CalendarClock className="mr-2 h-4 w-4" />
                          Book Specialist Appointment
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => bookAppointment(analysisResult.specialistRecommendation.specialty)}
                        >
                          <Video className="mr-2 h-4 w-4" />
                          Book Video Consultation
                        </Button>
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-col items-start border-t p-4">
                      <p className="text-xs text-gray-500 mb-2">
                        Note: If your symptoms are severe or you have an emergency condition, please contact emergency medical services immediately.
                      </p>
                      <Button variant="link" className="p-0 h-auto text-xs" onClick={() => setActiveTab("analysis")}>
                        Analyze Other Symptoms
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SymptomAnalyzer;
