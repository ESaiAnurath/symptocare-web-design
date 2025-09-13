import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AIChatbot from "./components/AIChatbot";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SymptomAnalyzer from "./pages/Analyzer";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Store from "./pages/Store";
import Doctors from "./pages/Doctors";
import DoctorsBySpecialty from "./pages/DoctorsBySpecialty";
import Insurance from "./pages/Insurance";
import Services from "./pages/Services";
import Payment from "./pages/Payment";
import Ayurveda from "./pages/Ayurveda";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/analyzer" element={<SymptomAnalyzer />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/store" element={<Store />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/doctors/:specialty" element={<DoctorsBySpecialty />} />
          <Route path="/insurance" element={<Insurance />} />
          <Route path="/services" element={<Services />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/ayurveda" element={<Ayurveda />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <AIChatbot />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
