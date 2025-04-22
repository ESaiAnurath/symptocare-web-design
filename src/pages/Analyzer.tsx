
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
  "सिरदर्द (Headache)",
  "बुखार (Fever)",
  "खांसी (Cough)",
  "थकान (Fatigue)",
  "मतली (Nausea)",
  "गले में खराश (Sore throat)",
  "शरीर में दर्द (Body ache)",
  "चक्कर आना (Dizziness)",
  "पेट दर्द (Stomach pain)",
  "सांस लेने में तकलीफ (Breathing difficulty)",
  "त्वचा पर चकत्ते (Skin rash)",
  "जोड़ों में दर्द (Joint pain)",
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
        title: "लक्षण दर्ज करें",
        description: "कृपया अपने लक्षणों का विवरण दें",
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
        title: "विश्लेषण पूरा हुआ",
        description: "आपके लक्षणों का विश्लेषण सफलतापूर्वक पूरा हुआ",
      });
    } catch (error) {
      toast({
        title: "विश्लेषण में त्रुटि",
        description: "क्षमा करें, लक्षणों का विश्लेषण करते समय कोई त्रुटि हुई",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const bookAppointment = (specialty: string) => {
    toast({
      title: "अपॉइंटमेंट बुक की जा रही है",
      description: `आपको ${specialty} विशेषज्ञ के पास भेजा जा रहा है`,
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
              AI लक्षण विश्लेषक
              <span className="block text-xl font-normal text-gray-600 mt-2">
                AI Symptom Analyzer
              </span>
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              अपने लक्षणों का वर्णन करें और AI-आधारित विश्लेषण प्राप्त करें। हमारा AI आपके लक्षणों के आधार पर संभावित स्थितियों का सुझाव देगा और उचित विशेषज्ञ की सिफारिश करेगा।
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 mb-8 w-full max-w-md mx-auto">
              <TabsTrigger value="analysis">लक्षण दर्ज करें</TabsTrigger>
              <TabsTrigger value="results" disabled={!analysisResult}>परिणाम</TabsTrigger>
            </TabsList>

            <TabsContent value="analysis">
              <Card className="border-2 border-[#9b87f5]/20 shadow-lg">
                <CardHeader>
                  <CardTitle>अपने लक्षणों का वर्णन करें</CardTitle>
                  <CardDescription>
                    हिंदी या अंग्रेजी में अपने लक्षणों का विस्तृत वर्णन दें
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex gap-4">
                    <Input
                      placeholder="अपने लक्षणों का यहां वर्णन करें..."
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
                          विश्लेषण हो रहा है...
                        </>
                      ) : (
                        <>
                          <Search className="mr-2 h-4 w-4" />
                          विश्लेषण करें
                        </>
                      )}
                    </Button>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">सामान्य लक्षण</h3>
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
                          संभावित स्थितियां
                        </CardTitle>
                        <Badge className="bg-[#9b87f5]">AI विश्लेषण</Badge>
                      </div>
                      <CardDescription>
                        आपके लक्षणों के आधार पर, ये स्थितियां संभावित हैं
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
                                {condition.probability === 'High' ? 'उच्च संभावना' :
                                 condition.probability === 'Medium' ? 'मध्यम संभावना' : 'निम्न संभावना'}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600">{condition.description}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="text-xs text-gray-500 border-t p-4">
                      ये सिर्फ संभावित स्थितियां हैं और इन्हें पक्का निदान न मानें। कृपया सही निदान के लिए चिकित्सक से परामर्श करें।
                    </CardFooter>
                  </Card>

                  <Card className="border-2 border-[#9b87f5]/20 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Brain className="h-5 w-5 text-[#9b87f5]" />
                        विशेषज्ञ सिफारिश
                      </CardTitle>
                      <CardDescription>
                        आपके लक्षणों के लिए सबसे उपयुक्त चिकित्सा विशेषज्ञ
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
                            प्राथमिकता: {' '}
                            <span className={
                              analysisResult.specialistRecommendation.urgency === 'Immediate' ? 'text-red-500 font-medium' :
                              analysisResult.specialistRecommendation.urgency === 'Soon' ? 'text-amber-500 font-medium' : 
                              'text-green-500 font-medium'
                            }>
                              {analysisResult.specialistRecommendation.urgency === 'Immediate' ? 'तत्काल' :
                               analysisResult.specialistRecommendation.urgency === 'Soon' ? 'जल्द' : 'नियमित'}
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
                          विशेषज्ञ अपॉइंटमेंट बुक करें
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => bookAppointment(analysisResult.specialistRecommendation.specialty)}
                        >
                          <Video className="mr-2 h-4 w-4" />
                          वीडियो परामर्श बुक करें
                        </Button>
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-col items-start border-t p-4">
                      <p className="text-xs text-gray-500 mb-2">
                        नोट: अगर आपके लक्षण गंभीर हैं या आपातकालीन स्थिति है, तो कृपया तुरंत आपातकालीन चिकित्सा सेवा से संपर्क करें।
                      </p>
                      <Button variant="link" className="p-0 h-auto text-xs" onClick={() => setActiveTab("analysis")}>
                        अन्य लक्षणों का विश्लेषण करें
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
