
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Mock data for doctors by specialty
const doctorsBySpecialty = {
  cardiology: [
    { id: 1, name: "Dr. John Smith", qualification: "MD, Cardiology", experience: "15 years", rating: 4.8, avatar: "👨‍⚕️" },
    { id: 2, name: "Dr. Emily Johnson", qualification: "MD, Interventional Cardiology", experience: "12 years", rating: 4.7, avatar: "👩‍⚕️" },
    { id: 3, name: "Dr. Michael Chen", qualification: "MD, Electrophysiology", experience: "10 years", rating: 4.9, avatar: "👨‍⚕️" },
  ],
  neurology: [
    { id: 1, name: "Dr. Sarah Williams", qualification: "MD, Neurology", experience: "14 years", rating: 4.6, avatar: "👩‍⚕️" },
    { id: 2, name: "Dr. Robert Davis", qualification: "MD, Neurosurgery", experience: "18 years", rating: 4.9, avatar: "👨‍⚕️" },
    { id: 3, name: "Dr. Jennifer Lee", qualification: "MD, Clinical Neurophysiology", experience: "11 years", rating: 4.7, avatar: "👩‍⚕️" },
  ],
  gastroenterology: [
    { id: 1, name: "Dr. David Wilson", qualification: "MD, Gastroenterology", experience: "13 years", rating: 4.5, avatar: "👨‍⚕️" },
    { id: 2, name: "Dr. Lisa Brown", qualification: "MD, Hepatology", experience: "9 years", rating: 4.8, avatar: "👩‍⚕️" },
  ],
  orthopedic: [
    { id: 1, name: "Dr. James Taylor", qualification: "MD, Orthopedic Surgery", experience: "16 years", rating: 4.7, avatar: "👨‍⚕️" },
    { id: 2, name: "Dr. Patricia Martinez", qualification: "MD, Sports Medicine", experience: "12 years", rating: 4.6, avatar: "👩‍⚕️" },
  ],
  oncology: [
    { id: 1, name: "Dr. Thomas Anderson", qualification: "MD, Medical Oncology", experience: "20 years", rating: 4.9, avatar: "👨‍⚕️" },
    { id: 2, name: "Dr. Karen White", qualification: "MD, Radiation Oncology", experience: "15 years", rating: 4.8, avatar: "👩‍⚕️" },
  ],
  gynecology: [
    { id: 1, name: "Dr. Michelle Rodriguez", qualification: "MD, Obstetrics & Gynecology", experience: "14 years", rating: 4.7, avatar: "👩‍⚕️" },
    { id: 2, name: "Dr. Elizabeth Clark", qualification: "MD, Reproductive Endocrinology", experience: "12 years", rating: 4.8, avatar: "👩‍⚕️" },
  ],
  dermatology: [
    { id: 1, name: "Dr. Daniel Lewis", qualification: "MD, Dermatology", experience: "11 years", rating: 4.6, avatar: "👨‍⚕️" },
    { id: 2, name: "Dr. Susan Martin", qualification: "MD, Cosmetic Dermatology", experience: "9 years", rating: 4.7, avatar: "👩‍⚕️" },
  ],
  ophthalmology: [
    { id: 1, name: "Dr. Richard Hall", qualification: "MD, Ophthalmology", experience: "17 years", rating: 4.8, avatar: "👨‍⚕️" },
    { id: 2, name: "Dr. Nancy Thompson", qualification: "MD, Retina Specialist", experience: "14 years", rating: 4.9, avatar: "👩‍⚕️" },
  ],
  pediatrics: [
    { id: 1, name: "Dr. Mark Miller", qualification: "MD, Pediatrics", experience: "12 years", rating: 4.7, avatar: "👨‍⚕️" },
    { id: 2, name: "Dr. Jessica Parker", qualification: "MD, Pediatric Cardiology", experience: "10 years", rating: 4.8, avatar: "👩‍⚕️" },
  ]
};

// Default data for specialties not explicitly defined
const defaultDoctors = [
  { id: 1, name: "Dr. Alex Johnson", qualification: "MD, Specialist", experience: "10 years", rating: 4.5, avatar: "👨‍⚕️" },
  { id: 2, name: "Dr. Maria Garcia", qualification: "MD, Specialist", experience: "8 years", rating: 4.6, avatar: "👩‍⚕️" },
];

const specialtyNames = {
  cardiology: "Cardiology",
  neurology: "Neurology",
  gastroenterology: "Gastroenterology",
  orthopedic: "Orthopedic",
  oncology: "Oncology",
  gynecology: "Gynecology",
  dermatology: "Dermatology",
  ophthalmology: "Ophthalmology",
  pediatrics: "Pediatrics",
  endocrinology: "Endocrinology",
  urology: "Urology",
  nephrology: "Nephrology",
  radiology: "Radiology",
  "plastic-surgery": "Plastic Surgery",
  neonatology: "Neonatology",
  "vascular-surgery": "Vascular Surgery"
};

const DoctorsBySpecialty = () => {
  const { specialty } = useParams<{ specialty: string }>();
  const [doctors, setDoctors] = useState<any[]>([]);
  const [specialtyTitle, setSpecialtyTitle] = useState("");

  useEffect(() => {
    if (specialty) {
      // Get doctors for the specialty or use default if not found
      const specialtyDoctors = doctorsBySpecialty[specialty as keyof typeof doctorsBySpecialty] || defaultDoctors;
      setDoctors(specialtyDoctors);
      
      // Set the specialty title
      setSpecialtyTitle(specialtyNames[specialty as keyof typeof specialtyNames] || specialty);
    }
  }, [specialty]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{specialtyTitle} Specialists</h1>
            <p className="mt-2 text-gray-600">
              Find the best {specialtyTitle.toLowerCase()} specialists for your needs
            </p>
          </div>
          <Link to="/doctors">
            <Button variant="outline">Back to Specialties</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <Card key={doctor.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start">
                  <div className="text-4xl mr-4">{doctor.avatar}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {doctor.name}
                    </h3>
                    <p className="text-sm text-gray-600">{doctor.qualification}</p>
                    <p className="text-sm text-gray-600">Experience: {doctor.experience}</p>
                    <div className="mt-2 flex items-center">
                      <span className="text-yellow-500">★</span>
                      <span className="ml-1 text-sm font-medium text-gray-900">{doctor.rating}</span>
                    </div>
                    <div className="mt-4">
                      <Button className="w-full">Book Appointment</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorsBySpecialty;
