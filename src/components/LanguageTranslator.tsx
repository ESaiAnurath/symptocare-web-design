
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Globe } from "lucide-react";

const languages = [
  { code: "en", name: "English" },
  { code: "hi", name: "हिंदी (Hindi)" },
  { code: "bn", name: "বাংলা (Bengali)" },
  { code: "te", name: "తెలుగు (Telugu)" },
  { code: "ta", name: "தமிழ் (Tamil)" },
  { code: "mr", name: "मराठी (Marathi)" },
  { code: "gu", name: "ગુજરાતી (Gujarati)" },
  { code: "kn", name: "ಕನ್ನಡ (Kannada)" },
  { code: "ml", name: "മലയാളം (Malayalam)" },
  { code: "pa", name: "ਪੰਜਾਬੀ (Punjabi)" },
];

// This is a mock translation function
// In a real application, you would integrate with an actual translation API
const mockTranslate = (text: string, targetLang: string) => {
  // For demonstration purposes only - doesn't actually translate
  if (targetLang === "en") return text;
  
  // In a real app, this would call a translation API
  console.log(`Translating to ${targetLang}: ${text}`);
  return text; // Return original text for now
};

const LanguageTranslator = () => {
  const [currentLanguage, setCurrentLanguage] = useState("en");
  
  const handleLanguageChange = (langCode: string) => {
    setCurrentLanguage(langCode);
    // In a real app, this would trigger translation of page content
    document.documentElement.lang = langCode;
    
    // Store the language preference
    localStorage.setItem("preferredLanguage", langCode);
    
    // Mock translation demonstration
    console.log(`Language changed to: ${langCode}`);
    
    // You would typically have a context provider that manages translations
    // and updates the UI when language changes
  };
  
  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem("preferredLanguage");
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
      document.documentElement.lang = savedLanguage;
    }
  }, []);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full w-8 h-8">
          <Globe className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-3" align="end">
        <div className="space-y-2">
          <h3 className="font-medium text-sm">Select Language</h3>
          <Select value={currentLanguage} onValueChange={handleLanguageChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.code} value={lang.code}>
                  {lang.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default LanguageTranslator;
