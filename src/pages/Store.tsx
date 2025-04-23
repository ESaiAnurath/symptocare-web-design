
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, ShoppingCart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import MedicineBrowser from "@/components/MedicineBrowser";

const MedicalStore = () => {
  const [activeTab, setActiveTab] = useState<string>("featured");

  const featuredProducts = [
    {
      id: 1,
      name: "Digital Blood Pressure Monitor",
      price: "₹1,999",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1612532275214-e4ca76d0e4d1?auto=format&fit=crop&q=80&w=500",
      category: "Devices",
    },
    {
      id: 2,
      name: "Digital Thermometer",
      price: "₹299",
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=500",
      category: "Devices",
    },
    {
      id: 3,
      name: "First Aid Kit",
      price: "₹699",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1585828292920-638a2a78cb38?auto=format&fit=crop&q=80&w=500",
      category: "Emergency",
    },
    {
      id: 4,
      name: "Hand Sanitizer (Pack of 3)",
      price: "₹199",
      rating: 4.3,
      image: "https://images.unsplash.com/photo-1584738766473-61c083514bf4?auto=format&fit=crop&q=80&w=500",
      category: "Hygiene",
    },
  ];

  // Dummy handlers for demonstration
  const handleAddToCart = (product: typeof featuredProducts[0]) => {
    alert(`Added ${product.name} to cart!`);
  };

  const handleBookNow = (product: typeof featuredProducts[0]) => {
    alert(`Booked ${product.name}!`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Medical Store</h1>
              <p className="text-gray-600 mt-1">
                Browse and purchase quality medical supplies and medicines
              </p>
            </div>
            <div className="flex gap-2">
              <Input 
                placeholder="Search products..." 
                className="max-w-xs"
              />
              <Button variant="outline">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
              <Button variant="ghost" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0">0</Badge>
              </Button>
            </div>
          </div>

          <Tabs defaultValue="featured" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-8">
              <TabsTrigger value="featured">Featured Products</TabsTrigger>
              <TabsTrigger value="medicines">Medicines</TabsTrigger>
              <TabsTrigger value="equipment">Medical Equipment</TabsTrigger>
            </TabsList>

            <TabsContent value="featured">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredProducts.map((product) => (
                  <Card key={product.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <div className="h-48 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <Badge className="mb-2">{product.category}</Badge>
                      <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                      <div className="flex justify-between items-center mt-2 gap-2">
                        <span className="font-bold text-[#9b87f5]">{product.price}</span>
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => handleAddToCart(product)}>
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Add to Cart
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleBookNow(product)}>
                            Book Now
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="medicines">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    {/* Cannot use Pill icon per lucide-react-icons allowed list, so omit or use Cart icon if desired */}
                    Browse Medicines
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <MedicineBrowser />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="equipment">
              <div className="text-center py-12">
                <h3 className="text-xl font-medium text-gray-800">Medical Equipment Coming Soon</h3>
                <p className="text-gray-600 mt-2">We're expanding our inventory with quality medical equipment.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default MedicalStore;

