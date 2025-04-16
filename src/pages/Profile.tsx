
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PersonalDetails from "@/components/profile/PersonalDetails";
import MedicalDetails from "@/components/profile/MedicalDetails";
import MedicalHistory from "@/components/profile/MedicalHistory";
import Documents from "@/components/profile/Documents";
import FamilyGroups from "@/components/profile/FamilyGroups";
import { toast } from "@/components/ui/sonner";

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<any>(null);
  
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (!storedUserData) {
      toast.error("Please login to access your profile");
      navigate("/login");
      return;
    }
    
    try {
      const parsedUserData = JSON.parse(storedUserData);
      setUserData(parsedUserData);
    } catch (error) {
      localStorage.removeItem("userData");
      toast.error("Session data corrupted. Please login again");
      navigate("/login");
    }
  }, [navigate]);

  if (!userData) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="mt-2 text-gray-600">
            Manage your personal information and medical records
          </p>
        </div>

        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-8">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="medical">Medical</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="groups">Family Groups</TabsTrigger>
          </TabsList>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <TabsContent value="personal">
              <PersonalDetails userData={userData} setUserData={setUserData} />
            </TabsContent>
            
            <TabsContent value="medical">
              <MedicalDetails userData={userData} setUserData={setUserData} />
            </TabsContent>
            
            <TabsContent value="history">
              <MedicalHistory userData={userData} setUserData={setUserData} />
            </TabsContent>
            
            <TabsContent value="documents">
              <Documents userData={userData} setUserData={setUserData} />
            </TabsContent>
            
            <TabsContent value="groups">
              <FamilyGroups userData={userData} setUserData={setUserData} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
