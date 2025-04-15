
import { Search } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";

const commonSymptoms = [
  "Headache",
  "Fever",
  "Cough",
  "Fatigue",
  "Nausea",
  "Sore throat",
  "Body ache",
  "Dizziness",
];

const SymptomAnalyzer = () => {
  const [symptoms, setSymptoms] = useState<string>("");
  const [results, setResults] = useState<string[]>([]);

  const handleAnalyze = () => {
    // Dummy analysis for now
    const dummyResults = [
      "Based on your symptoms, you might be experiencing:",
      "- Common Cold (High probability)",
      "- Seasonal Allergies (Medium probability)",
      "- Viral Infection (Low probability)",
      "",
      "Recommended actions:",
      "- Rest and stay hydrated",
      "- Monitor your temperature",
      "- Consider over-the-counter medication",
      "",
      "Please consult a healthcare professional for accurate diagnosis."
    ];
    setResults(dummyResults);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#D3E4FD] to-white">
      <Navbar />
      <div className="container mx-auto px-4 pt-24">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-gray-900 font-poppins">
              Symptom Analyzer
            </h1>
            <p className="text-gray-600 text-lg">
              Describe your symptoms and get instant analysis
            </p>
          </div>

          <Card className="border-2 border-[#9b87f5]/20">
            <CardHeader>
              <CardTitle>Enter Your Symptoms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex gap-4">
                <Input
                  placeholder="Type your symptoms here..."
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  onClick={handleAnalyze}
                  className="bg-[#9b87f5] hover:bg-[#8b77e5]"
                >
                  <Search className="mr-2 h-4 w-4" />
                  Analyze
                </Button>
              </div>

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

              {results.length > 0 && (
                <Card className="mt-6 bg-[#F1F0FB]">
                  <CardContent className="pt-6">
                    <div className="space-y-2">
                      {results.map((result, index) => (
                        <p key={index} className="text-gray-700">
                          {result}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SymptomAnalyzer;
