
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Search, Filter, ShoppingCart, Heart, Plus, Minus } from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/sonner";

const medicineCategories = [
  { id: "all", name: "All Medicines" },
  { id: "prescription", name: "Prescription" },
  { id: "otc", name: "Over the Counter" },
  { id: "wellness", name: "Wellness" },
  { id: "personal", name: "Personal Care" },
  { id: "vitamins", name: "Vitamins & Supplements" },
  { id: "first-aid", name: "First Aid" },
  { id: "baby", name: "Baby Care" },
  { id: "devices", name: "Medical Devices" },
  { id: "ayurvedic", name: "Ayurvedic" },
  { id: "homeopathy", name: "Homeopathy" },
];

const medicines = [
  {
    id: "1",
    name: "Paracetamol 500mg",
    brand: "Crocin",
    category: "otc",
    price: 45,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=300",
    description: "For fever and mild to moderate pain",
    prescription: false,
    stock: 150,
  },
  {
    id: "2",
    name: "Amoxicillin 250mg",
    brand: "Mox",
    category: "prescription",
    price: 120,
    image: "https://images.unsplash.com/photo-1550572017-53a79502c33b?auto=format&fit=crop&q=80&w=300",
    description: "Antibiotic for bacterial infections",
    prescription: true,
    stock: 75,
  },
  {
    id: "3",
    name: "Vitamin D3 1000 IU",
    brand: "Depura",
    category: "vitamins",
    price: 195,
    image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&q=80&w=300",
    description: "Daily supplement for bone health",
    prescription: false,
    stock: 200,
  },
  {
    id: "4",
    name: "Digital Thermometer",
    brand: "Dr. Morepen",
    category: "devices",
    price: 250,
    image: "https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?auto=format&fit=crop&q=80&w=300",
    description: "Accurate temperature measurement",
    prescription: false,
    stock: 45,
  },
  {
    id: "5",
    name: "Elastic Bandage",
    brand: "Dyna",
    category: "first-aid",
    price: 80,
    image: "https://images.unsplash.com/photo-1631815587646-b85a1bb027e3?auto=format&fit=crop&q=80&w=300",
    description: "For sprains and muscle support",
    prescription: false,
    stock: 120,
  },
  {
    id: "6",
    name: "Insulin Glargine",
    brand: "Basalog",
    category: "prescription",
    price: 650,
    image: "https://images.unsplash.com/photo-1628771065518-0d82f1938462?auto=format&fit=crop&q=80&w=300",
    description: "Long-acting insulin for diabetes",
    prescription: true,
    stock: 30,
  },
  {
    id: "7",
    name: "Baby Diaper Rash Cream",
    brand: "Himalaya",
    category: "baby",
    price: 145,
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300",
    description: "Soothes and prevents diaper rash",
    prescription: false,
    stock: 85,
  },
  {
    id: "8",
    name: "Hand Sanitizer",
    brand: "Dettol",
    category: "personal",
    price: 75,
    image: "https://images.unsplash.com/photo-1605195340000-902c9a50579e?auto=format&fit=crop&q=80&w=300",
    description: "Kills 99.9% of germs",
    prescription: false,
    stock: 250,
  },
  {
    id: "9",
    name: "Ashwagandha Capsules",
    brand: "Patanjali",
    category: "ayurvedic",
    price: 220,
    image: "https://images.unsplash.com/photo-1607444291693-3af7c1fb2012?auto=format&fit=crop&q=80&w=300",
    description: "Herbal supplement for stress relief",
    prescription: false,
    stock: 90,
  },
  {
    id: "10",
    name: "Arnica 30C",
    brand: "SBL",
    category: "homeopathy",
    price: 130,
    image: "https://images.unsplash.com/photo-1585672850300-e05a24f0cf3f?auto=format&fit=crop&q=80&w=300",
    description: "Homeopathic remedy for pain relief",
    prescription: false,
    stock: 65,
  },
];

type CartItem = {
  id: string;
  name: string;
  brand: string;
  price: number;
  quantity: number;
  image: string;
};

const Store = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);

  const filteredMedicines = medicines.filter(medicine => {
    // Filter by category
    const categoryMatch = activeCategory === "all" || medicine.category === activeCategory;
    
    // Filter by search query
    const searchMatch = medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                       medicine.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       medicine.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return categoryMatch && searchMatch;
  });

  const addToCart = (medicine: any) => {
    const existingItemIndex = cart.findIndex(item => item.id === medicine.id);
    
    if (existingItemIndex >= 0) {
      // Item already in cart, increase quantity
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      // Add new item to cart
      setCart([...cart, { 
        id: medicine.id,
        name: medicine.name,
        brand: medicine.brand,
        price: medicine.price,
        quantity: 1,
        image: medicine.image
      }]);
    }
    
    toast.success(`Added ${medicine.name} to cart`);
  };

  const updateCartItemQuantity = (id: string, change: number) => {
    const existingItemIndex = cart.findIndex(item => item.id === id);
    
    if (existingItemIndex >= 0) {
      const updatedCart = [...cart];
      const newQuantity = updatedCart[existingItemIndex].quantity + change;
      
      if (newQuantity <= 0) {
        // Remove item if quantity becomes 0 or negative
        updatedCart.splice(existingItemIndex, 1);
      } else {
        // Update quantity
        updatedCart[existingItemIndex].quantity = newQuantity;
      }
      
      setCart(updatedCart);
    }
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
    toast.success("Item removed from cart");
  };

  const toggleWishlist = (id: string) => {
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter(itemId => itemId !== id));
      toast.success("Removed from wishlist");
    } else {
      setWishlist([...wishlist, id]);
      toast.success("Added to wishlist");
    }
  };

  const handleCheckout = () => {
    // Save cart to localStorage for the payment page
    localStorage.setItem('currentCart', JSON.stringify({
      items: cart,
      subtotal: cartTotal,
      shipping: 40,
      total: cartTotal + 40
    }));
    
    // Navigate to a payment page (this would need to be created)
    toast.success("Redirecting to payment...");
    navigate('/payment');
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Medical Store</h1>
          <p className="mt-2 text-gray-600">
            Browse our wide range of medicines and healthcare products
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content - Products */}
          <div className="lg:w-3/4">
            {/* Search and Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search medicines, brands, etc."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>
            
            {/* Categories */}
            <div className="mb-8 overflow-x-auto">
              <Tabs 
                value={activeCategory}
                onValueChange={setActiveCategory}
                className="w-full"
              >
                <TabsList className="mb-6 h-auto flex flex-nowrap overflow-x-auto pb-2 justify-start">
                  {medicineCategories.map((category) => (
                    <TabsTrigger
                      key={category.id}
                      value={category.id}
                      className="px-4 py-2 whitespace-nowrap"
                    >
                      {category.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {/* Products Grid */}
                {medicineCategories.map((category) => (
                  <TabsContent key={category.id} value={category.id} className="mt-0">
                    {filteredMedicines.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredMedicines.map((medicine) => (
                          <Card key={medicine.id} className="overflow-hidden">
                            <div className="relative h-48 overflow-hidden">
                              <img
                                src={medicine.image}
                                alt={medicine.name}
                                className="w-full h-full object-cover"
                              />
                              <Button
                                variant="ghost"
                                size="icon"
                                className={`absolute top-2 right-2 bg-white/80 backdrop-blur-sm ${
                                  wishlist.includes(medicine.id) ? 'text-red-500' : 'text-gray-500'
                                }`}
                                onClick={() => toggleWishlist(medicine.id)}
                              >
                                <Heart 
                                  className={`h-5 w-5 ${wishlist.includes(medicine.id) ? 'fill-current' : ''}`} 
                                />
                              </Button>
                              {medicine.prescription && (
                                <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                                  Prescription Required
                                </div>
                              )}
                            </div>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-base">{medicine.name}</CardTitle>
                              <CardDescription>{medicine.brand}</CardDescription>
                            </CardHeader>
                            <CardContent className="pb-2">
                              <p className="text-sm text-gray-600 mb-2">{medicine.description}</p>
                              <p className="text-lg font-semibold text-[#9b87f5]">₹{medicine.price.toFixed(2)}</p>
                              <p className="text-xs text-gray-500 mt-1">
                                {medicine.stock > 50 ? 'In Stock' : medicine.stock > 10 ? 'Low Stock' : 'Very Low Stock'}
                              </p>
                            </CardContent>
                            <CardFooter>
                              <Button 
                                className="w-full bg-[#9b87f5] hover:bg-[#8b77e5]"
                                disabled={medicine.prescription}
                                onClick={() => addToCart(medicine)}
                              >
                                {medicine.prescription ? 'Requires Prescription' : 'Add to Cart'}
                              </Button>
                            </CardFooter>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <p className="text-gray-500">No products found matching your criteria</p>
                      </div>
                    )}
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </div>
          
          {/* Sidebar - Cart */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Your Cart
              </h2>
              
              {cart.length > 0 ? (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-3 py-3 border-b">
                      <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-sm font-medium">{item.name}</h3>
                        <p className="text-xs text-gray-500">{item.brand}</p>
                        <p className="text-sm font-semibold mt-1">₹{item.price.toFixed(2)}</p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => updateCartItemQuantity(item.id, -1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="text-sm w-6 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => updateCartItemQuantity(item.id, 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 h-7 px-2"
                            onClick={() => removeFromCart(item.id)}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="pt-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Subtotal</span>
                      <span>₹{cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Shipping</span>
                      <span>₹40.00</span>
                    </div>
                    <div className="flex justify-between font-semibold text-base pt-2 border-t mt-2">
                      <span>Total</span>
                      <span>₹{(cartTotal + 40).toFixed(2)}</span>
                    </div>
                    
                    <Button 
                      className="w-full mt-4 bg-[#9b87f5] hover:bg-[#8b77e5]"
                      onClick={handleCheckout}
                    >
                      Checkout
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <ShoppingCart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-gray-500">Your cart is empty</h3>
                  <p className="text-sm text-gray-400 mt-1">Add items to get started</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Store;
