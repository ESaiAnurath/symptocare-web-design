
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Ambulance, ShoppingCart, Microscope, Phone, AlertTriangle, FirstAidKit } from "lucide-react";
import { Button } from "@/components/ui/button";

const Services = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Our Services</h1>
          <p className="mt-2 text-gray-600">
            Quick access to essential healthcare services
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <AlertTriangle className="h-5 w-5" />
                Emergency Services
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-gray-600">
                24/7 emergency response with trained medical professionals. Immediate assistance for critical situations.
              </p>
              <div className="space-y-2">
                <Button className="w-full bg-red-500 hover:bg-red-600">
                  <Phone className="mr-2 h-4 w-4" />
                  Emergency Helpline
                </Button>
                <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-100">
                  <Ambulance className="mr-2 h-4 w-4" />
                  Call Ambulance
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FirstAidKit className="h-5 w-5 text-blue-500" />
                First Aid
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-gray-600">
                Professional first aid services and emergency medical supplies delivered to your location.
              </p>
              <Button className="w-full">
                Request First Aid
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-purple-500" />
                Medicine Delivery
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-gray-600">
                Get medicines delivered to your doorstep within hours. 24/7 delivery for emergency medicines.
              </p>
              <Button className="w-full bg-purple-500 hover:bg-purple-600">
                Order Medicines
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Services;
