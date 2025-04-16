
import { useState } from "react";
import { toast } from "@/components/ui/sonner";
import { Users, UserPlus, UserX, Edit, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type FamilyMember = {
  id: string;
  name: string;
  relationship: string;
  age: string;
  email?: string;
  isRegistered: boolean;
};

type FamilyGroup = {
  id: string;
  name: string;
  members: FamilyMember[];
};

const FamilyGroups = ({ userData, setUserData }: { userData: any; setUserData: (data: any) => void }) => {
  const [groups, setGroups] = useState<FamilyGroup[]>(userData?.familyGroups || []);
  const [isAddingGroup, setIsAddingGroup] = useState(false);
  const [isAddingMember, setIsAddingMember] = useState<string | null>(null);
  const [isEditingGroup, setIsEditingGroup] = useState<string | null>(null);
  const [newGroupName, setNewGroupName] = useState("");
  const [editingGroupName, setEditingGroupName] = useState("");
  const [newMember, setNewMember] = useState({
    name: "",
    relationship: "",
    age: "",
    email: "",
    isRegistered: false,
  });

  const saveGroup = () => {
    if (!newGroupName) {
      toast.error("Please enter a group name");
      return;
    }

    const newGroups = [
      ...groups,
      {
        id: crypto.randomUUID(),
        name: newGroupName,
        members: [],
      },
    ];

    // Update local storage
    const updatedData = { ...userData, familyGroups: newGroups };
    localStorage.setItem("userData", JSON.stringify(updatedData));
    setUserData(updatedData);
    setGroups(newGroups);
    
    // Reset form
    setNewGroupName("");
    setIsAddingGroup(false);
    toast.success("Family group created successfully");
  };

  const updateGroupName = (groupId: string) => {
    if (!editingGroupName) {
      toast.error("Group name cannot be empty");
      return;
    }

    const updatedGroups = groups.map(group => 
      group.id === groupId ? { ...group, name: editingGroupName } : group
    );

    // Update local storage
    const updatedData = { ...userData, familyGroups: updatedGroups };
    localStorage.setItem("userData", JSON.stringify(updatedData));
    setUserData(updatedData);
    setGroups(updatedGroups);
    
    setIsEditingGroup(null);
    toast.success("Group name updated");
  };

  const deleteGroup = (groupId: string) => {
    const updatedGroups = groups.filter(group => group.id !== groupId);
    
    // Update local storage
    const updatedData = { ...userData, familyGroups: updatedGroups };
    localStorage.setItem("userData", JSON.stringify(updatedData));
    setUserData(updatedData);
    setGroups(updatedGroups);
    
    toast.success("Family group removed");
  };

  const saveMember = (groupId: string) => {
    if (!newMember.name || !newMember.relationship || !newMember.age) {
      toast.error("Please fill in all required fields");
      return;
    }

    const updatedGroups = groups.map(group => {
      if (group.id === groupId) {
        return {
          ...group,
          members: [
            ...group.members,
            {
              id: crypto.randomUUID(),
              ...newMember,
            },
          ],
        };
      }
      return group;
    });

    // Update local storage
    const updatedData = { ...userData, familyGroups: updatedGroups };
    localStorage.setItem("userData", JSON.stringify(updatedData));
    setUserData(updatedData);
    setGroups(updatedGroups);
    
    // Reset form
    setNewMember({
      name: "",
      relationship: "",
      age: "",
      email: "",
      isRegistered: false,
    });
    setIsAddingMember(null);
    toast.success("Family member added successfully");
  };

  const deleteMember = (groupId: string, memberId: string) => {
    const updatedGroups = groups.map(group => {
      if (group.id === groupId) {
        return {
          ...group,
          members: group.members.filter(member => member.id !== memberId),
        };
      }
      return group;
    });
    
    // Update local storage
    const updatedData = { ...userData, familyGroups: updatedGroups };
    localStorage.setItem("userData", JSON.stringify(updatedData));
    setUserData(updatedData);
    setGroups(updatedGroups);
    
    toast.success("Family member removed");
  };

  const relationshipOptions = [
    "Spouse", "Parent", "Child", "Sibling", "Grandparent", 
    "Grandchild", "Aunt/Uncle", "Niece/Nephew", "Cousin", "Other"
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Family Groups</h2>
        <Button
          onClick={() => setIsAddingGroup(true)}
          className="flex items-center gap-2"
          disabled={isAddingGroup}
        >
          <Users className="h-4 w-4" />
          Create New Family Group
        </Button>
      </div>
      
      {isAddingGroup && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Create New Family Group</CardTitle>
            <CardDescription>
              Create a group to manage healthcare for your family members
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-2">
              <label htmlFor="group-name" className="text-sm font-medium">Group Name *</label>
              <Input
                id="group-name"
                placeholder="e.g., Immediate Family, Parents, Children"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setIsAddingGroup(false)}>Cancel</Button>
            <Button className="bg-[#9b87f5] hover:bg-[#8b77e5]" onClick={saveGroup}>
              Create Group
            </Button>
          </CardFooter>
        </Card>
      )}
      
      {groups.length > 0 ? (
        <div className="space-y-8">
          {groups.map((group) => (
            <Card key={group.id}>
              <CardHeader className="pb-3">
                {isEditingGroup === group.id ? (
                  <div className="flex gap-2">
                    <Input
                      value={editingGroupName}
                      onChange={(e) => setEditingGroupName(e.target.value)}
                      className="max-w-xs"
                    />
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => updateGroupName(group.id)}
                      className="h-8 w-8 text-green-500"
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => setIsEditingGroup(null)}
                      className="h-8 w-8 text-red-500"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <CardTitle>{group.name}</CardTitle>
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => {
                          setIsEditingGroup(group.id);
                          setEditingGroupName(group.name);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-100"
                        onClick={() => deleteGroup(group.id)}
                      >
                        <UserX className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
                <CardDescription>
                  {group.members.length} {group.members.length === 1 ? 'member' : 'members'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {group.members.length > 0 ? (
                  <div className="space-y-3">
                    {group.members.map((member) => (
                      <div 
                        key={member.id} 
                        className="flex justify-between items-center p-3 border rounded-md"
                      >
                        <div>
                          <h4 className="font-medium">{member.name}</h4>
                          <div className="text-sm text-gray-500 mt-1">
                            <p>{member.relationship} • {member.age} years old</p>
                            {member.email && <p>{member.email}</p>}
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-100"
                          onClick={() => deleteMember(group.id, member.id)}
                        >
                          <UserX className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 py-2">No members added yet.</p>
                )}
              </CardContent>
              <CardFooter>
                {isAddingMember === group.id ? (
                  <Card className="w-full">
                    <CardHeader>
                      <CardTitle className="text-lg">Add Family Member</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid w-full items-center gap-2">
                        <label className="text-sm font-medium">Name *</label>
                        <Input
                          placeholder="Full name"
                          value={newMember.name}
                          onChange={(e) => 
                            setNewMember({ ...newMember, name: e.target.value })
                          }
                        />
                      </div>
                      
                      <div className="grid w-full items-center gap-2">
                        <label className="text-sm font-medium">Relationship *</label>
                        <select
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          value={newMember.relationship}
                          onChange={(e) => 
                            setNewMember({ ...newMember, relationship: e.target.value })
                          }
                        >
                          <option value="">Select relationship</option>
                          {relationshipOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div className="grid w-full items-center gap-2">
                        <label className="text-sm font-medium">Age *</label>
                        <Input
                          type="number"
                          placeholder="Age in years"
                          value={newMember.age}
                          onChange={(e) => 
                            setNewMember({ ...newMember, age: e.target.value })
                          }
                        />
                      </div>
                      
                      <div className="grid w-full items-center gap-2">
                        <label className="text-sm font-medium">Email Address</label>
                        <Input
                          type="email"
                          placeholder="Optional - for invitations"
                          value={newMember.email}
                          onChange={(e) => 
                            setNewMember({ ...newMember, email: e.target.value })
                          }
                        />
                      </div>
                      
                      <div className="flex justify-end gap-2 mt-4">
                        <Button 
                          variant="outline" 
                          onClick={() => setIsAddingMember(null)}
                        >
                          Cancel
                        </Button>
                        <Button 
                          className="bg-[#9b87f5] hover:bg-[#8b77e5]" 
                          onClick={() => saveMember(group.id)}
                        >
                          Add Member
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Button
                    className="w-full flex items-center gap-2"
                    variant="outline"
                    onClick={() => setIsAddingMember(group.id)}
                  >
                    <UserPlus className="h-4 w-4" />
                    Add Family Member
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 px-4">
          <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No Family Groups</h3>
          <p className="mt-1 text-gray-500">
            Create a family group to manage healthcare for your loved ones.
          </p>
          {!isAddingGroup && (
            <Button 
              className="mt-4 bg-[#9b87f5] hover:bg-[#8b77e5]"
              onClick={() => setIsAddingGroup(true)}
            >
              Create Your First Group
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default FamilyGroups;
