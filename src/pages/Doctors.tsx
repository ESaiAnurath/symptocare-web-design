
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";

const specialties = [
  { name: "Cardiology", icon: "❤️", path: "cardiology" },
  { name: "Neurology", icon: "🧠", path: "neurology" },
  { name: "Gastroenterology", icon: "🫁", path: "gastroenterology" },
  { name: "Orthopedic", icon: "🦴", path: "orthopedic" },
  { name: "Oncology", icon: "🔬", path: "oncology" },
  { name: "Gynecology", icon: "👩", path: "gynecology" },
  { name: "Dermatology", icon: "🔍", path: "dermatology" },
  { name: "Ophthalmology", icon: "👁️", path: "ophthalmology" },
  { name: "Pediatrics", icon: "👶", path: "pediatrics" },
  { name: "Endocrinology", icon: "⚕️", path: "endocrinology" },
  { name: "Urology", icon: "🔬", path: "urology" },
  { name: "Nephrology", icon: "🫀", path: "nephrology" },
  { name: "Radiology", icon: "📷", path: "radiology" },
  { name: "Plastic Surgery", icon: "✂️", path: "plastic-surgery" },
  { name: "Neonatology", icon: "👶", path: "neonatology" },
  { name: "Vascular Surgery", icon: "🩺", path: "vascular-surgery" },
];

const Doctors = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Find Doctors</h1>
          <p className="mt-2 text-gray-600">
            Choose a specialty to find the right doctor for you
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {specialties.map((specialty) => (
            <Link key={specialty.path} to={`/doctors/${specialty.path}`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">{specialty.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {specialty.name}
                  </h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
