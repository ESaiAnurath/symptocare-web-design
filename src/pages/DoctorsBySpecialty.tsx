
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { toast } from "@/components/ui/sonner";
import { CalendarIcon, Video } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

// Mock data for doctors by specialty with Indian names and context
const doctorsBySpecialty = {
  cardiology: [
    { id: 1, name: "Dr. Rajesh Sharma", qualification: "MD, DM Cardiology", experience: "15 years", rating: 4.8, avatar: "👨‍⚕️", languages: ["Hindi", "English", "Punjabi"], fees: 1200 },
    { id: 2, name: "Dr. Priya Patel", qualification: "MD, DNB Interventional Cardiology", experience: "12 years", rating: 4.7, avatar: "👩‍⚕️", languages: ["Hindi", "English", "Gujarati"], fees: 1500 },
    { id: 3, name: "Dr. Sunil Gupta", qualification: "MD, DM Electrophysiology", experience: "10 years", rating: 4.9, avatar: "👨‍⚕️", languages: ["Hindi", "English", "Bengali"], fees: 1800 },
  ],
  neurology: [
    { id: 1, name: "Dr. Ananya Desai", qualification: "MD, DM Neurology", experience: "14 years", rating: 4.6, avatar: "👩‍⚕️", languages: ["Hindi", "English", "Marathi"], fees: 1500 },
    { id: 2, name: "Dr. Vikram Singh", qualification: "MCh Neurosurgery", experience: "18 years", rating: 4.9, avatar: "👨‍⚕️", languages: ["Hindi", "English", "Punjabi"], fees: 2000 },
    { id: 3, name: "Dr. Neha Kapoor", qualification: "MD, DM Clinical Neurophysiology", experience: "11 years", rating: 4.7, avatar: "👩‍⚕️", languages: ["Hindi", "English", "Tamil"], fees: 1400 },
  ],
  gastroenterology: [
    { id: 1, name: "Dr. Deepak Verma", qualification: "MD, DM Gastroenterology", experience: "13 years", rating: 4.5, avatar: "👨‍⚕️", languages: ["Hindi", "English", "Malayalam"], fees: 1300 },
    { id: 2, name: "Dr. Meenakshi Reddy", qualification: "MD, DM Hepatology", experience: "9 years", rating: 4.8, avatar: "👩‍⚕️", languages: ["Hindi", "English", "Telugu"], fees: 1600 },
  ],
  orthopedic: [
    { id: 1, name: "Dr. Ajay Khanna", qualification: "MS Orthopedic Surgery", experience: "16 years", rating: 4.7, avatar: "👨‍⚕️", languages: ["Hindi", "English", "Kannada"], fees: 1200 },
    { id: 2, name: "Dr. Sunita Agarwal", qualification: "MS, DNB Sports Medicine", experience: "12 years", rating: 4.6, avatar: "👩‍⚕️", languages: ["Hindi", "English", "Rajasthani"], fees: 1400 },
  ],
  oncology: [
    { id: 1, name: "Dr. Amit Mehta", qualification: "MD, DM Medical Oncology", experience: "20 years", rating: 4.9, avatar: "👨‍⚕️", languages: ["Hindi", "English", "Marathi"], fees: 2500 },
    { id: 2, name: "Dr. Kavita Iyer", qualification: "MD, DNB Radiation Oncology", experience: "15 years", rating: 4.8, avatar: "👩‍⚕️", languages: ["Hindi", "English", "Tamil"], fees: 2200 },
  ],
  gynecology: [
    { id: 1, name: "Dr. Pooja Malhotra", qualification: "MS, DNB Obstetrics & Gynecology", experience: "14 years", rating: 4.7, avatar: "👩‍⚕️", languages: ["Hindi", "English", "Punjabi"], fees: 1200 },
    { id: 2, name: "Dr. Isha Jain", qualification: "MD, DGO Reproductive Endocrinology", experience: "12 years", rating: 4.8, avatar: "👩‍⚕️", languages: ["Hindi", "English", "Gujarati"], fees: 1500 },
  ],
  dermatology: [
    { id: 1, name: "Dr. Rahul Mishra", qualification: "MD Dermatology", experience: "11 years", rating: 4.6, avatar: "👨‍⚕️", languages: ["Hindi", "English", "Bhojpuri"], fees: 1000 },
    { id: 2, name: "Dr. Shalini Choudhury", qualification: "MD, DVD Cosmetic Dermatology", experience: "9 years", rating: 4.7, avatar: "👩‍⚕️", languages: ["Hindi", "English", "Bengali"], fees: 1200 },
  ],
  ophthalmology: [
    { id: 1, name: "Dr. Vivek Sharma", qualification: "MS Ophthalmology", experience: "17 years", rating: 4.8, avatar: "👨‍⚕️", languages: ["Hindi", "English", "Marathi"], fees: 1100 },
    { id: 2, name: "Dr. Nandini Rao", qualification: "MD, FICO Retina Specialist", experience: "14 years", rating: 4.9, avatar: "👩‍⚕️", languages: ["Hindi", "English", "Kannada"], fees: 1400 },
  ],
  pediatrics: [
    { id: 1, name: "Dr. Manish Kumar", qualification: "MD Pediatrics", experience: "12 years", rating: 4.7, avatar: "👨‍⚕️", languages: ["Hindi", "English", "Punjabi"], fees: 900 },
    { id: 2, name: "Dr. Jyoti Arora", qualification: "MD, DM Pediatric Cardiology", experience: "10 years", rating: 4.8, avatar: "👩‍⚕️", languages: ["Hindi", "English", "Gujarati"], fees: 1200 },
  ]
};

// Default data for specialties not explicitly defined
const defaultDoctors = [
  { id: 1, name: "Dr. Akash Srivastava", qualification: "MD, Specialist", experience: "10 years", rating: 4.5, avatar: "👨‍⚕️", languages: ["Hindi", "English"], fees: 1000 },
  { id: 2, name: "Dr. Divya Sharma", qualification: "MD, Specialist", experience: "8 years", rating: 4.6, avatar: "👩‍⚕️", languages: ["Hindi", "English", "Tamil"], fees: 1200 },
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

const timeSlots = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", 
  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
  "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", 
  "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM"
];

const DoctorsBySpecialty = () => {
  const { specialty } = useParams<{ specialty: string }>();
  const [doctors, setDoctors] = useState<any[]>([]);
  const [specialtyTitle, setSpecialtyTitle] = useState("");
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [isVirtualConsultOpen, setIsVirtualConsultOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [consultationType, setConsultationType] = useState("physical");

  useEffect(() => {
    if (specialty) {
      // Get doctors for the specialty or use default if not found
      const specialtyDoctors = doctorsBySpecialty[specialty as keyof typeof doctorsBySpecialty] || defaultDoctors;
      setDoctors(specialtyDoctors);
      
      // Set the specialty title
      setSpecialtyTitle(specialtyNames[specialty as keyof typeof specialtyNames] || specialty);
    }
  }, [specialty]);

  const handleBookAppointment = (doctor: any) => {
    setSelectedDoctor(doctor);
    setIsAppointmentOpen(true);
  };

  const handleVirtualConsult = (doctor: any) => {
    setSelectedDoctor(doctor);
    setIsVirtualConsultOpen(true);
  };

  const handleAppointmentSubmit = () => {
    if (!selectedDate || !selectedTimeSlot || !patientName || !patientPhone) {
      toast.error("Please fill all required fields");
      return;
    }

    // In a real app, this would send data to a backend API
    toast.success(`Appointment booked with ${selectedDoctor.name} on ${format(selectedDate, "dd MMMM yyyy")} at ${selectedTimeSlot}`);
    
    // Reset form
    setIsAppointmentOpen(false);
    setSelectedDate(undefined);
    setSelectedTimeSlot("");
    setPatientName("");
    setPatientPhone("");
    setPatientEmail("");
  };

  const handleVirtualConsultSubmit = () => {
    if (!selectedDate || !selectedTimeSlot || !patientName || !patientPhone) {
      toast.error("Please fill all required fields");
      return;
    }

    // In a real app, this would schedule a virtual consultation
    toast.success(`Virtual consultation scheduled with ${selectedDoctor.name} on ${format(selectedDate, "dd MMMM yyyy")} at ${selectedTimeSlot}`);
    
    // Reset form
    setIsVirtualConsultOpen(false);
    setSelectedDate(undefined);
    setSelectedTimeSlot("");
    setPatientName("");
    setPatientPhone("");
    setPatientEmail("");
  };

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
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {doctor.name}
                    </h3>
                    <p className="text-sm text-gray-600">{doctor.qualification}</p>
                    <p className="text-sm text-gray-600">Experience: {doctor.experience}</p>
                    <div className="mt-2 flex items-center">
                      <span className="text-yellow-500">★</span>
                      <span className="ml-1 text-sm font-medium text-gray-900">{doctor.rating}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Languages: {doctor.languages.join(", ")}
                    </p>
                    <p className="text-sm font-semibold text-gray-900 mt-1">
                      Consultation Fee: ₹{doctor.fees}
                    </p>
                    <div className="mt-4 flex flex-col sm:flex-row gap-2">
                      <Button 
                        className="w-full bg-[#9b87f5] hover:bg-[#8b77e5]"
                        onClick={() => handleBookAppointment(doctor)}
                      >
                        Book Appointment
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full flex items-center justify-center gap-1"
                        onClick={() => handleVirtualConsult(doctor)}
                      >
                        <Video className="h-4 w-4" /> Virtual Consult
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Book Appointment Dialog */}
      <Dialog open={isAppointmentOpen} onOpenChange={setIsAppointmentOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Book Appointment</DialogTitle>
            <DialogDescription>
              {selectedDoctor && `Schedule an appointment with ${selectedDoctor.name}`}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="appointment-date">Select Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="appointment-date"
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : "Select a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                    disabled={(date) => 
                      date < new Date(new Date().setHours(0, 0, 0, 0)) || 
                      date.getDay() === 0
                    }
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="time-slot">Select Time Slot</Label>
              <Select value={selectedTimeSlot} onValueChange={setSelectedTimeSlot}>
                <SelectTrigger id="time-slot">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((slot) => (
                    <SelectItem key={slot} value={slot}>
                      {slot}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="consultation-type">Consultation Type</Label>
              <Select value={consultationType} onValueChange={setConsultationType}>
                <SelectTrigger id="consultation-type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="physical">In-Person Visit</SelectItem>
                  <SelectItem value="virtual">Video Consultation</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="patient-name">Patient Name*</Label>
              <Input 
                id="patient-name" 
                value={patientName} 
                onChange={(e) => setPatientName(e.target.value)} 
                required 
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="patient-phone">Phone Number*</Label>
              <Input 
                id="patient-phone" 
                value={patientPhone} 
                onChange={(e) => setPatientPhone(e.target.value)} 
                required 
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="patient-email">Email Address</Label>
              <Input 
                id="patient-email" 
                type="email" 
                value={patientEmail} 
                onChange={(e) => setPatientEmail(e.target.value)} 
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleAppointmentSubmit}>
              Confirm Appointment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Virtual Consultation Dialog */}
      <Dialog open={isVirtualConsultOpen} onOpenChange={setIsVirtualConsultOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Schedule Virtual Consultation</DialogTitle>
            <DialogDescription>
              {selectedDoctor && `Virtual consultation with ${selectedDoctor.name}`}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="virtual-date">Select Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="virtual-date"
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : "Select a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                    disabled={(date) => 
                      date < new Date(new Date().setHours(0, 0, 0, 0)) || 
                      date.getDay() === 0
                    }
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="virtual-time-slot">Select Time Slot</Label>
              <Select value={selectedTimeSlot} onValueChange={setSelectedTimeSlot}>
                <SelectTrigger id="virtual-time-slot">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((slot) => (
                    <SelectItem key={slot} value={slot}>
                      {slot}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="virtual-patient-name">Patient Name*</Label>
              <Input 
                id="virtual-patient-name" 
                value={patientName} 
                onChange={(e) => setPatientName(e.target.value)} 
                required 
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="virtual-patient-phone">Phone Number*</Label>
              <Input 
                id="virtual-patient-phone" 
                value={patientPhone} 
                onChange={(e) => setPatientPhone(e.target.value)} 
                required 
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="virtual-patient-email">Email Address*</Label>
              <Input 
                id="virtual-patient-email" 
                type="email" 
                value={patientEmail} 
                onChange={(e) => setPatientEmail(e.target.value)} 
                required
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleVirtualConsultSubmit} className="bg-[#9b87f5] hover:bg-[#8b77e5]">
              Schedule Virtual Consult
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DoctorsBySpecialty;
