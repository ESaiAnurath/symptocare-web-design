
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/sonner";
import { Ruler, Weight, Calendar, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const medicalDetailsSchema = z.object({
  height: z.string().min(2, { message: "Please enter your height" }),
  weight: z.string().min(1, { message: "Please enter your weight" }),
  birthDate: z.string().min(1, { message: "Please enter your date of birth" }),
  bloodGroup: z.string().min(1, { message: "Please select your blood group" }),
  allergies: z.string().optional(),
});

type MedicalDetailsFormValues = z.infer<typeof medicalDetailsSchema>;

const MedicalDetails = ({ userData, setUserData }: { userData: any; setUserData: (data: any) => void }) => {
  const [isEditing, setIsEditing] = useState(false);
  
  // Initialize form with existing data or defaults
  const defaultValues: Partial<MedicalDetailsFormValues> = {
    height: userData?.height || "",
    weight: userData?.weight || "",
    birthDate: userData?.birthDate || "",
    bloodGroup: userData?.bloodGroup || "",
    allergies: userData?.allergies || "",
  };
  
  const form = useForm<MedicalDetailsFormValues>({
    resolver: zodResolver(medicalDetailsSchema),
    defaultValues,
  });

  function onSubmit(data: MedicalDetailsFormValues) {
    // Update local storage with new data
    const updatedData = { ...userData, ...data };
    localStorage.setItem("userData", JSON.stringify(updatedData));
    setUserData(updatedData);
    
    toast.success("Medical details updated successfully");
    setIsEditing(false);
  }

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  if (!isEditing) {
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Basic Medical Details</h2>
          <Button onClick={() => setIsEditing(true)}>Edit Details</Button>
        </div>
        
        <div className="space-y-6">
          <div className="flex items-start gap-3">
            <Ruler className="h-5 w-5 text-[#9b87f5] mt-1" />
            <div>
              <h3 className="text-sm font-medium text-gray-500">Height</h3>
              <p className="mt-1 text-lg">{userData?.height ? `${userData.height} cm` : "Not specified"}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Weight className="h-5 w-5 text-[#9b87f5] mt-1" />
            <div>
              <h3 className="text-sm font-medium text-gray-500">Weight</h3>
              <p className="mt-1 text-lg">{userData?.weight ? `${userData.weight} kg` : "Not specified"}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-[#9b87f5] mt-1" />
            <div>
              <h3 className="text-sm font-medium text-gray-500">Date of Birth</h3>
              <p className="mt-1 text-lg">{userData?.birthDate || "Not specified"}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Droplets className="h-5 w-5 text-[#9b87f5] mt-1" />
            <div>
              <h3 className="text-sm font-medium text-gray-500">Blood Group</h3>
              <p className="mt-1 text-lg">{userData?.bloodGroup || "Not specified"}</p>
            </div>
          </div>
          
          <div className="px-8">
            <h3 className="text-sm font-medium text-gray-500">Known Allergies</h3>
            <p className="mt-1 text-lg">{userData?.allergies || "None specified"}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Edit Medical Details</h2>
        <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="height"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Height (cm)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Enter your height in cm" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Weight (kg)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Enter your weight in kg" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="birthDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Birth</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="bloodGroup"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Blood Group</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your blood group" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {bloodGroups.map((group) => (
                      <SelectItem key={group} value={group}>
                        {group}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="allergies"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Known Allergies</FormLabel>
                <FormControl>
                  <Input placeholder="List any allergies (if none, leave blank)" {...field} />
                </FormControl>
                <FormDescription>
                  Separate multiple allergies with commas
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" className="bg-[#9b87f5] hover:bg-[#8b77e5]">Save Changes</Button>
        </form>
      </Form>
    </div>
  );
};

export default MedicalDetails;
