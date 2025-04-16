
import { useState } from "react";
import { toast } from "@/components/ui/sonner";
import { Heart, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type MedicalCondition = {
  id: string;
  condition: string;
  diagnosedDate: string;
  notes: string;
};

const MedicalHistory = ({ userData, setUserData }: { userData: any; setUserData: (data: any) => void }) => {
  const [conditions, setConditions] = useState<MedicalCondition[]>(userData?.medicalConditions || []);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newCondition, setNewCondition] = useState({
    condition: "",
    diagnosedDate: "",
    notes: "",
  });

  const saveCondition = () => {
    if (!newCondition.condition || !newCondition.diagnosedDate) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newConditions = [
      ...conditions,
      {
        id: crypto.randomUUID(),
        ...newCondition,
      },
    ];

    // Update local storage
    const updatedData = { ...userData, medicalConditions: newConditions };
    localStorage.setItem("userData", JSON.stringify(updatedData));
    setUserData(updatedData);
    setConditions(newConditions);
    
    // Reset form
    setNewCondition({
      condition: "",
      diagnosedDate: "",
      notes: "",
    });
    
    setIsAddingNew(false);
    toast.success("Medical condition added successfully");
  };

  const deleteCondition = (id: string) => {
    const updatedConditions = conditions.filter(condition => condition.id !== id);
    
    // Update local storage
    const updatedData = { ...userData, medicalConditions: updatedConditions };
    localStorage.setItem("userData", JSON.stringify(updatedData));
    setUserData(updatedData);
    setConditions(updatedConditions);
    
    toast.success("Medical condition removed");
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Medical History</h2>
        <Button
          onClick={() => setIsAddingNew(true)}
          className="flex items-center gap-2"
          disabled={isAddingNew}
        >
          <Plus className="h-4 w-4" />
          Add Medical Condition
        </Button>
      </div>
      
      {isAddingNew && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Add New Medical Condition</CardTitle>
            <CardDescription>
              Enter details about a medical condition or chronic illness
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid w-full items-center gap-2">
              <label htmlFor="condition" className="text-sm font-medium">Medical Condition *</label>
              <Input
                id="condition"
                placeholder="e.g., Asthma, Diabetes, Hypertension"
                value={newCondition.condition}
                onChange={(e) => 
                  setNewCondition({ ...newCondition, condition: e.target.value })
                }
              />
            </div>
            
            <div className="grid w-full items-center gap-2">
              <label htmlFor="diagnosedDate" className="text-sm font-medium">Date Diagnosed *</label>
              <Input
                id="diagnosedDate"
                type="date"
                value={newCondition.diagnosedDate}
                onChange={(e) => 
                  setNewCondition({ ...newCondition, diagnosedDate: e.target.value })
                }
              />
            </div>
            
            <div className="grid w-full items-center gap-2">
              <label htmlFor="notes" className="text-sm font-medium">Additional Notes</label>
              <Textarea
                id="notes"
                placeholder="Any additional details about the condition"
                value={newCondition.notes}
                onChange={(e) => 
                  setNewCondition({ ...newCondition, notes: e.target.value })
                }
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setIsAddingNew(false)}>Cancel</Button>
            <Button className="bg-[#9b87f5] hover:bg-[#8b77e5]" onClick={saveCondition}>
              Save Condition
            </Button>
          </CardFooter>
        </Card>
      )}
      
      {conditions.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Medical Condition</TableHead>
              <TableHead>Date Diagnosed</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {conditions.map((condition) => (
              <TableRow key={condition.id}>
                <TableCell className="font-medium">{condition.condition}</TableCell>
                <TableCell>{condition.diagnosedDate}</TableCell>
                <TableCell>{condition.notes || "N/A"}</TableCell>
                <TableCell>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-red-500 hover:text-red-700 hover:bg-red-100"
                    onClick={() => deleteCondition(condition.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center py-12 px-4">
          <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No Medical Conditions</h3>
          <p className="mt-1 text-gray-500">
            You haven't added any medical conditions yet.
          </p>
          {!isAddingNew && (
            <Button 
              className="mt-4 bg-[#9b87f5] hover:bg-[#8b77e5]"
              onClick={() => setIsAddingNew(true)}
            >
              Add Your First Condition
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default MedicalHistory;
