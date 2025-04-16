
import { useState } from "react";
import { toast } from "@/components/ui/sonner";
import { File, FileText, UploadCloud, Trash2, FileUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type Document = {
  id: string;
  name: string;
  type: string;
  description: string;
  date: string;
  fileUrl?: string; // In a real app, this would be a URL
};

const Documents = ({ userData, setUserData }: { userData: any; setUserData: (data: any) => void }) => {
  const [documents, setDocuments] = useState<Document[]>(userData?.documents || []);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newDocument, setNewDocument] = useState({
    name: "",
    type: "Medical Report",
    description: "",
    date: new Date().toISOString().split("T")[0],
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const documentTypes = [
    "Medical Report",
    "Lab Test Result",
    "Prescription",
    "Vaccination Record",
    "Insurance Document",
    "Hospital Bill",
    "Discharge Summary",
    "Other",
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      // Extract the file name and set it as the document name if not already set
      if (!newDocument.name) {
        const fileName = e.target.files[0].name.split('.')[0];
        setNewDocument({ ...newDocument, name: fileName });
      }
    }
  };

  const saveDocument = () => {
    if (!newDocument.name || !newDocument.type || !newDocument.date) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!selectedFile) {
      toast.error("Please select a file to upload");
      return;
    }

    // In a real app, you would upload the file to a storage service
    // and get a URL back. Here we'll just simulate it with a fake URL
    const fakeFileUrl = URL.createObjectURL(selectedFile);

    const newDocuments = [
      ...documents,
      {
        id: crypto.randomUUID(),
        ...newDocument,
        fileUrl: fakeFileUrl,
      },
    ];

    // Update local storage
    const updatedData = { ...userData, documents: newDocuments };
    localStorage.setItem("userData", JSON.stringify(updatedData));
    setUserData(updatedData);
    setDocuments(newDocuments);
    
    // Reset form
    setNewDocument({
      name: "",
      type: "Medical Report",
      description: "",
      date: new Date().toISOString().split("T")[0],
    });
    setSelectedFile(null);
    
    setIsAddingNew(false);
    toast.success("Document added successfully");
  };

  const deleteDocument = (id: string) => {
    const updatedDocuments = documents.filter(doc => doc.id !== id);
    
    // Update local storage
    const updatedData = { ...userData, documents: updatedDocuments };
    localStorage.setItem("userData", JSON.stringify(updatedData));
    setUserData(updatedData);
    setDocuments(updatedDocuments);
    
    toast.success("Document removed");
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Medical Documents</h2>
        <Button
          onClick={() => setIsAddingNew(true)}
          className="flex items-center gap-2"
          disabled={isAddingNew}
        >
          <UploadCloud className="h-4 w-4" />
          Upload New Document
        </Button>
      </div>
      
      {isAddingNew && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Upload Medical Document</CardTitle>
            <CardDescription>
              Upload medical reports, prescriptions, test results, etc.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid w-full items-center gap-2">
              <label htmlFor="file-upload" className="text-sm font-medium">Upload File *</label>
              <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center justify-center gap-2"
                >
                  {selectedFile ? (
                    <>
                      <FileUp className="h-8 w-8 text-[#9b87f5]" />
                      <span className="text-sm font-medium">{selectedFile.name}</span>
                      <span className="text-xs text-gray-500">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </span>
                    </>
                  ) : (
                    <>
                      <UploadCloud className="h-8 w-8 text-gray-400" />
                      <span className="text-sm font-medium">Click to select a file</span>
                      <span className="text-xs text-gray-500">
                        PDF, JPG, PNG files up to 10MB
                      </span>
                    </>
                  )}
                </label>
              </div>
            </div>
            
            <div className="grid w-full items-center gap-2">
              <label htmlFor="document-name" className="text-sm font-medium">Document Name *</label>
              <Input
                id="document-name"
                placeholder="e.g., Annual Checkup Report"
                value={newDocument.name}
                onChange={(e) => 
                  setNewDocument({ ...newDocument, name: e.target.value })
                }
              />
            </div>
            
            <div className="grid w-full items-center gap-2">
              <label htmlFor="document-type" className="text-sm font-medium">Document Type *</label>
              <select
                id="document-type"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={newDocument.type}
                onChange={(e) => 
                  setNewDocument({ ...newDocument, type: e.target.value })
                }
              >
                {documentTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
            <div className="grid w-full items-center gap-2">
              <label htmlFor="document-date" className="text-sm font-medium">Document Date *</label>
              <Input
                id="document-date"
                type="date"
                value={newDocument.date}
                onChange={(e) => 
                  setNewDocument({ ...newDocument, date: e.target.value })
                }
              />
            </div>
            
            <div className="grid w-full items-center gap-2">
              <label htmlFor="document-description" className="text-sm font-medium">Description</label>
              <Input
                id="document-description"
                placeholder="Brief description of the document"
                value={newDocument.description}
                onChange={(e) => 
                  setNewDocument({ ...newDocument, description: e.target.value })
                }
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setIsAddingNew(false)}>Cancel</Button>
            <Button className="bg-[#9b87f5] hover:bg-[#8b77e5]" onClick={saveDocument}>
              Upload Document
            </Button>
          </CardFooter>
        </Card>
      )}
      
      {documents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {documents.map((doc) => (
            <Card key={doc.id} className="overflow-hidden">
              <CardHeader className="bg-[#F6F8FA] py-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="bg-white p-2 rounded-md">
                      <FileText className="h-6 w-6 text-[#9b87f5]" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{doc.name}</CardTitle>
                      <CardDescription>{doc.type}</CardDescription>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-red-500 hover:text-red-700 hover:bg-red-100 h-8 w-8"
                    onClick={() => deleteDocument(doc.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="py-4">
                <p className="text-sm mb-2">
                  <span className="font-medium">Date:</span> {doc.date}
                </p>
                {doc.description && (
                  <p className="text-sm text-gray-600">{doc.description}</p>
                )}
              </CardContent>
              <CardFooter className="bg-[#F6F8FA] py-3">
                <Button 
                  variant="outline" 
                  className="w-full text-sm flex items-center gap-2"
                  onClick={() => window.open(doc.fileUrl, '_blank')}
                >
                  <File className="h-4 w-4" />
                  View Document
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 px-4">
          <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No Documents Uploaded</h3>
          <p className="mt-1 text-gray-500">
            You haven't uploaded any medical documents yet.
          </p>
          {!isAddingNew && (
            <Button 
              className="mt-4 bg-[#9b87f5] hover:bg-[#8b77e5]"
              onClick={() => setIsAddingNew(true)}
            >
              Upload Your First Document
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default Documents;
