
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Pill, Search, BadgeIndianRupee, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const alphabetLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const medicinesByAlphabet: Record<string, Medicine[]> = {
  A: [
    { id: 1, name: "Aspirin", type: "Tablet", price: "₹25", description: "Pain reliever and fever reducer", uses: ["Fever", "Pain", "Inflammation"] },
    { id: 2, name: "Azithromycin", type: "Tablet", price: "₹120", description: "Antibiotic for bacterial infections", uses: ["Bacterial infections", "Respiratory infections"] },
    { id: 3, name: "Amoxicillin", type: "Capsule", price: "₹70", description: "Antibiotic for bacterial infections", uses: ["Bacterial infections", "Ear infections"] },
  ],
  B: [
    { id: 4, name: "Benadryl", type: "Liquid", price: "₹95", description: "Antihistamine for allergies", uses: ["Allergies", "Cold symptoms"] },
    { id: 5, name: "Brufen", type: "Tablet", price: "₹35", description: "Pain reliever and anti-inflammatory", uses: ["Pain", "Fever", "Inflammation"] },
  ],
  C: [
    { id: 6, name: "Crocin", type: "Tablet", price: "₹20", description: "Fever and pain medication", uses: ["Fever", "Headache", "Body pain"] },
    { id: 7, name: "Cetirizine", type: "Tablet", price: "₹40", description: "Antihistamine for allergies", uses: ["Allergies", "Hay fever"] },
  ],
  D: [
    { id: 8, name: "Dolo-650", type: "Tablet", price: "₹30", description: "Fever and pain medication", uses: ["Fever", "Headache", "Pain"] },
  ],
};

const diseaseCategories = [
  { id: 1, name: "Fever & Pain", medicines: ["Aspirin", "Dolo-650", "Crocin", "Brufen"] },
  { id: 2, name: "Allergies", medicines: ["Cetirizine", "Benadryl"] },
  { id: 3, name: "Bacterial Infections", medicines: ["Azithromycin", "Amoxicillin"] },
];

interface Medicine {
  id: number;
  name: string;
  type: string;
  price: string;
  description: string;
  uses: string[];
}

const MedicineBrowser = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("alphabetical");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeLetter, setActiveLetter] = useState("A");
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);

  const filteredMedicines = searchTerm.length > 0 
    ? Object.values(medicinesByAlphabet)
        .flat()
        .filter(med => med.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : [];

  const handleMedicineSelect = (medicine: Medicine) => {
    setSelectedMedicine(medicine);
  };

  const updateCartCount = () => {
    // This function is just for UI update, the actual count is stored in localStorage
    const event = new Event('cartUpdated');
    window.dispatchEvent(event);
  };

  const handleAddToCart = (medicine: Medicine) => {
    const currentCart = JSON.parse(localStorage.getItem("currentCart") || "{}");
    
    // Convert price from string to number, removing the ₹ symbol
    const priceNumber = Number(medicine.price.replace("₹", ""));
    
    const existingItemIndex = currentCart.items ? 
      currentCart.items.findIndex(item => item.id === medicine.id) : -1;

    if (existingItemIndex >= 0) {
      // Item already exists, increment quantity
      currentCart.items[existingItemIndex].quantity += 1;
    } else {
      // Add new item
      if (!currentCart.items) currentCart.items = [];
      
      currentCart.items.push({
        id: medicine.id,
        name: medicine.name,
        brand: medicine.type,
        price: priceNumber,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=500", // Default medicine image
      });
    }

    // Calculate totals
    currentCart.subtotal = currentCart.items.reduce(
      (total, item) => total + (item.price * item.quantity), 0);
    currentCart.shipping = currentCart.subtotal > 0 ? 50 : 0; // ₹50 flat shipping
    currentCart.total = currentCart.subtotal + currentCart.shipping;

    // Save updated cart
    localStorage.setItem("currentCart", JSON.stringify(currentCart));
    
    // Update cart count in UI
    updateCartCount();
    
    toast.success(`Added ${medicine.name} to cart!`);
  };

  const handleBookNow = (medicine: Medicine) => {
    // Clear the cart first
    const freshCart = {
      items: [],
      subtotal: 0,
      shipping: 0,
      total: 0
    };
    
    // Add this medicine to cart
    const priceNumber = Number(medicine.price.replace("₹", ""));
    freshCart.items.push({
      id: medicine.id,
      name: medicine.name,
      brand: medicine.type,
      price: priceNumber,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=500", // Default medicine image
    });
    
    // Calculate totals
    freshCart.subtotal = priceNumber;
    freshCart.shipping = 50; // ₹50 flat shipping
    freshCart.total = freshCart.subtotal + freshCart.shipping;
    
    // Save cart and navigate to payment
    localStorage.setItem("currentCart", JSON.stringify(freshCart));
    updateCartCount();
    
    // Navigate to payment page
    navigate("/payment");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Input 
          placeholder="Search medicines..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
        <Button variant="outline" className="shrink-0">
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </div>

      {searchTerm.length > 0 && (
        <Card className="border border-gray-200">
          <CardHeader className="py-3">
            <CardTitle className="text-lg">Search Results</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredMedicines.length > 0 ? (
              <div className="space-y-2">
                {filteredMedicines.map(medicine => (
                  <div 
                    key={medicine.id} 
                    className="p-3 rounded-lg border border-gray-100 hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleMedicineSelect(medicine)}
                  >
                    <div className="font-medium">{medicine.name}</div>
                    <div className="text-sm text-gray-500">{medicine.type} • {medicine.price}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">No medicines found</div>
            )}
          </CardContent>
        </Card>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="alphabetical">Browse by Alphabet</TabsTrigger>
          <TabsTrigger value="category">Browse by Disease</TabsTrigger>
        </TabsList>

        <TabsContent value="alphabetical" className="space-y-4 mt-4">
          <ScrollArea className="max-w-full">
            <div className="flex space-x-1 pb-3">
              {alphabetLetters.map(letter => (
                <Button
                  key={letter}
                  variant={activeLetter === letter ? "default" : "outline"}
                  className="h-9 w-9 p-0 rounded-md"
                  onClick={() => setActiveLetter(letter)}
                  disabled={!medicinesByAlphabet[letter]}
                >
                  {letter}
                </Button>
              ))}
            </div>
          </ScrollArea>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {medicinesByAlphabet[activeLetter]?.map(medicine => (
              <Card key={medicine.id} className="cursor-pointer hover:bg-gray-50" onClick={() => handleMedicineSelect(medicine)}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-lg">{medicine.name}</h3>
                      <p className="text-sm text-gray-500">{medicine.type}</p>
                    </div>
                    <div className="text-[#9b87f5] font-semibold flex items-center">
                      <BadgeIndianRupee className="h-4 w-4 mr-1" />
                      {medicine.price.replace('₹', '')}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{medicine.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="category" className="space-y-4 mt-4">
          {diseaseCategories.map(category => (
            <Card key={category.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{category.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {category.medicines.map(medName => {
                    const medicine = Object.values(medicinesByAlphabet)
                      .flat()
                      .find(m => m.name === medName);
                    
                    return medicine ? (
                      <div 
                        key={medicine.id} 
                        className="p-3 rounded-lg border border-gray-100 hover:bg-gray-50 cursor-pointer"
                        onClick={() => handleMedicineSelect(medicine)}
                      >
                        <div className="font-medium">{medicine.name}</div>
                        <div className="text-sm text-gray-500">{medicine.type} • {medicine.price}</div>
                      </div>
                    ) : null;
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {selectedMedicine && (
        <Card className="border-2 border-[#9b87f5]/20">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle>{selectedMedicine.name}</CardTitle>
              <Button variant="outline" size="sm" onClick={() => setSelectedMedicine(null)}>Close</Button>
            </div>
            <CardDescription>{selectedMedicine.type}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-1">Description</h4>
              <p className="text-gray-600">{selectedMedicine.description}</p>
            </div>
            <div>
              <h4 className="font-medium mb-1">Uses</h4>
              <ul className="list-disc pl-5 text-gray-600">
                {selectedMedicine.uses.map((use, index) => (
                  <li key={index}>{use}</li>
                ))}
              </ul>
            </div>
            <div className="flex justify-between items-center pt-2">
              <div className="font-semibold text-lg text-[#9b87f5]">{selectedMedicine.price}</div>
              <div className="flex gap-2">
                <Button onClick={() => handleAddToCart(selectedMedicine)}>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="outline" onClick={() => handleBookNow(selectedMedicine)}>
                  Book Now
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MedicineBrowser;
