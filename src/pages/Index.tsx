
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      
      {/* Tech Stack Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">हमारी तकनीकी विशेषताएं</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              अत्याधुनिक AI तकनीक का उपयोग करके, हम त्वरित और सटीक लक्षण विश्लेषण प्रदान करते हैं
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              { name: "React.js", type: "Frontend", color: "bg-blue-100 text-blue-800" },
              { name: "Express.js", type: "Backend", color: "bg-green-100 text-green-800" },
              { name: "MongoDB", type: "Database", color: "bg-emerald-100 text-emerald-800" },
              { name: "TensorFlow", type: "AI/ML", color: "bg-orange-100 text-orange-800" },
              { name: "AWS/GCP", type: "Cloud", color: "bg-purple-100 text-purple-800" },
            ].map((tech, index) => (
              <Card key={index} className="text-center border-none shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <Badge className={tech.color}>{tech.type}</Badge>
                  <h3 className="font-semibold mt-2">{tech.name}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Innovation Points */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">नवाचार और विशेषताएं</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              हमारा एकीकृत दृष्टिकोण स्वास्थ्य सेवा को अधिक सुलभ और प्रभावी बनाता है
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "AI + टेलीमेडिसिन + क्लाउड",
                description: "तीन शक्तिशाली तकनीकों का संयोजन जो स्वास्थ्य सेवा को बदल देता है"
              },
              {
                title: "ग्रामीण क्षेत्रों में काम करता है",
                description: "कम बैंडविड्थ और ऑफलाइन क्षमताओं के साथ दूरदराज के क्षेत्रों में उपयोग किया जा सकता है"
              },
              {
                title: "शीघ्र निदान",
                description: "शीघ्र निदान और तत्काल विशेषज्ञ मार्गदर्शन, जटिलताओं को रोकने में मदद करता है"
              },
              {
                title: "एकीकृत स्वास्थ्य प्लेटफॉर्म",
                description: "लक्षण से लेकर विशेषज्ञ तक, सब कुछ एक ही एप्लिकेशन में उपलब्ध है"
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">प्रभाव और लाभ</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              हमारा प्लेटफ़ॉर्म स्वास्थ्य सेवा के अनुभव को कैसे बदलता है
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "बेहतर निदान",
                description: "स्व-निदान त्रुटियों को कम करता है और जल्दी उपचार सुनिश्चित करता है"
              },
              {
                title: "पहुंच में सुधार",
                description: "ग्रामीण उपयोगकर्ता भी विशेषज्ञों तक आसानी से पहुंच सकते हैं"
              },
              {
                title: "आर्थिक लाभ",
                description: "अनावश्यक अस्पताल के दौरे कम करके समय और पैसे की बचत होती है"
              },
              {
                title: "पर्यावरण अनुकूल",
                description: "यात्रा कम करके कार्बन पदचिह्न को कम करता है"
              },
              {
                title: "सामाजिक प्रभाव",
                description: "निवारक स्वास्थ्य जागरूकता बढ़ती है"
              },
              {
                title: "समावेशी स्वास्थ्य सेवा",
                description: "बहुभाषी समर्थन के साथ अधिक लोगों तक पहुंचता है"
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">भविष्य का विस्तार</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              हमारे प्लेटफॉर्म के भविष्य के विकास और विस्तार की योजनाएँ
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "विभिन्न चिकित्सा पद्धतियों का एकीकरण",
                description: "एमबीबीएस से लेकर आयुर्वेद, आयुष और होम्योपैथी तक का विस्तार"
              },
              {
                title: "दवा रिमाइंडर",
                description: "अपनी दवाओं को समय पर लेने के लिए अलार्म और रिमाइंडर"
              },
              {
                title: "ऑफलाइन डॉक्टर विजिट",
                description: "घर पर डॉक्टर की विज़िट के लिए बुकिंग सेवा"
              },
              {
                title: "स्वास्थ्य शिक्षा चैटबॉट",
                description: "स्वास्थ्य शिक्षा और जानकारी के आदान-प्रदान के लिए AI चैटबॉट"
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
