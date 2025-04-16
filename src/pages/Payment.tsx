
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/sonner";
import { useForm } from "react-hook-form";
import { CreditCard, Landmark, Wallet, ArrowLeft } from "lucide-react";

interface CartData {
  items: {
    id: string;
    name: string;
    brand: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  subtotal: number;
  shipping: number;
  total: number;
}

const paymentMethods = [
  { id: "card", name: "Credit/Debit Card", icon: CreditCard },
  { id: "upi", name: "UPI", icon: Wallet },
  { id: "netbanking", name: "Net Banking", icon: Landmark },
];

const Payment = () => {
  const navigate = useNavigate();
  const [cartData, setCartData] = useState<CartData | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [processing, setProcessing] = useState(false);
  
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      cardNumber: "",
      cardName: "",
      cardExpiry: "",
      cardCvv: "",
      upiId: "",
      bank: "",
    },
  });

  useEffect(() => {
    // Get cart data from localStorage
    const storedCart = localStorage.getItem("currentCart");
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        setCartData(parsedCart);
      } catch (error) {
        console.error("Error parsing cart data:", error);
        toast.error("Could not load cart data");
        navigate("/store");
      }
    } else {
      toast.error("No items in cart");
      navigate("/store");
    }
  }, [navigate]);

  const handlePaymentSubmit = () => {
    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      toast.success("Payment successful! Your order has been placed.");
      
      // Clear cart data from localStorage
      localStorage.removeItem("currentCart");
      
      // Save order in order history
      const orders = JSON.parse(localStorage.getItem("orderHistory") || "[]");
      const newOrder = {
        id: `ORD${Date.now()}`,
        date: new Date().toISOString(),
        items: cartData?.items || [],
        total: cartData?.total || 0,
        status: "Processing",
      };
      
      orders.push(newOrder);
      localStorage.setItem("orderHistory", JSON.stringify(orders));
      
      // Navigate to success page or store
      navigate("/");
    }, 2000);
  };

  if (!cartData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-20 pb-12 px-4 max-w-7xl mx-auto flex items-center justify-center min-h-[60vh]">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Button 
          variant="ghost" 
          className="mb-6 flex items-center gap-2"
          onClick={() => navigate("/store")}
        >
          <ArrowLeft className="w-4 h-4" /> Back to Store
        </Button>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Order Summary */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
                <CardDescription>
                  {cartData.items.length} item{cartData.items.length !== 1 ? "s" : ""} in your cart
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartData.items.map((item) => (
                  <div key={item.id} className="flex gap-3 py-2 border-b">
                    <div className="w-12 h-12 rounded overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-sm font-medium">{item.name}</h3>
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>Qty: {item.quantity}</span>
                        <span>₹{item.price.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>₹{cartData.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>₹{cartData.shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>GST (18%)</span>
                    <span>₹{(cartData.subtotal * 0.18).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-base pt-2 border-t mt-2">
                    <span>Total</span>
                    <span>₹{(cartData.total + cartData.subtotal * 0.18).toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Right Side - Payment Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Delivery & Payment</CardTitle>
                <CardDescription>
                  Fill in your details to complete your order
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form className="space-y-6">
                    {/* Delivery Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Delivery Information</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your full name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your phone number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="Enter your email address" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your full address" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>City</FormLabel>
                              <FormControl>
                                <Input placeholder="City" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="state"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>State</FormLabel>
                              <FormControl>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select state" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="andhra-pradesh">Andhra Pradesh</SelectItem>
                                    <SelectItem value="assam">Assam</SelectItem>
                                    <SelectItem value="bihar">Bihar</SelectItem>
                                    <SelectItem value="delhi">Delhi</SelectItem>
                                    <SelectItem value="gujarat">Gujarat</SelectItem>
                                    <SelectItem value="karnataka">Karnataka</SelectItem>
                                    <SelectItem value="kerala">Kerala</SelectItem>
                                    <SelectItem value="maharashtra">Maharashtra</SelectItem>
                                    <SelectItem value="punjab">Punjab</SelectItem>
                                    <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
                                    <SelectItem value="telangana">Telangana</SelectItem>
                                    <SelectItem value="uttar-pradesh">Uttar Pradesh</SelectItem>
                                    <SelectItem value="west-bengal">West Bengal</SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="pincode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Pin Code</FormLabel>
                              <FormControl>
                                <Input placeholder="Pin code" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    {/* Payment Methods */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Payment Method</h3>
                      
                      <RadioGroup 
                        value={paymentMethod} 
                        onValueChange={setPaymentMethod} 
                        className="grid grid-cols-1 md:grid-cols-3 gap-4"
                      >
                        {paymentMethods.map((method) => {
                          const Icon = method.icon;
                          return (
                            <div key={method.id}>
                              <RadioGroupItem 
                                value={method.id} 
                                id={method.id} 
                                className="peer sr-only" 
                              />
                              <Label
                                htmlFor={method.id}
                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                              >
                                <Icon className="mb-3 h-6 w-6" />
                                {method.name}
                              </Label>
                            </div>
                          );
                        })}
                      </RadioGroup>
                      
                      {/* Card Payment Fields */}
                      {paymentMethod === "card" && (
                        <div className="space-y-4 mt-4">
                          <FormField
                            control={form.control}
                            name="cardNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Card Number</FormLabel>
                                <FormControl>
                                  <Input placeholder="1234 5678 9012 3456" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="cardName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Name on Card</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter name as on card" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="cardExpiry"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Expiry Date</FormLabel>
                                  <FormControl>
                                    <Input placeholder="MM/YY" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="cardCvv"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>CVV</FormLabel>
                                  <FormControl>
                                    <Input placeholder="123" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      )}
                      
                      {/* UPI Payment Fields */}
                      {paymentMethod === "upi" && (
                        <div className="space-y-4 mt-4">
                          <FormField
                            control={form.control}
                            name="upiId"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>UPI ID</FormLabel>
                                <FormControl>
                                  <Input placeholder="example@upi" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      )}
                      
                      {/* Net Banking Fields */}
                      {paymentMethod === "netbanking" && (
                        <div className="space-y-4 mt-4">
                          <FormField
                            control={form.control}
                            name="bank"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Select Bank</FormLabel>
                                <FormControl>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select your bank" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="sbi">State Bank of India</SelectItem>
                                      <SelectItem value="hdfc">HDFC Bank</SelectItem>
                                      <SelectItem value="icici">ICICI Bank</SelectItem>
                                      <SelectItem value="axis">Axis Bank</SelectItem>
                                      <SelectItem value="kotak">Kotak Mahindra Bank</SelectItem>
                                      <SelectItem value="pnb">Punjab National Bank</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      )}
                    </div>
                  </form>
                </Form>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-[#9b87f5] hover:bg-[#8b77e5]"
                  disabled={processing}
                  onClick={handlePaymentSubmit}
                >
                  {processing ? "Processing..." : `Pay ₹${(cartData.total + cartData.subtotal * 0.18).toFixed(2)}`}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
