import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

// Landing & Auth
import Landing from "./pages/Landing";
import SelectRole from "./pages/auth/SelectRole";
import Login from "./pages/auth/Login";
import VerifyOtp from "./pages/auth/VerifyOtp";

// Homeowner Pages
import HomeownerDashboard from "./pages/homeowner/Dashboard";
import Properties from "./pages/homeowner/Properties";
import PropertyDetail from "./pages/homeowner/PropertyDetail";
import Capture from "./pages/homeowner/Capture";
import Profile from "./pages/homeowner/Profile";
import Notifications from "./pages/homeowner/Notifications";
import Checklist from "./pages/homeowner/Checklist";
import Inventory from "./pages/homeowner/Inventory";

// Agent Pages
import AgentDashboard from "./pages/agent/Dashboard";
import Clients from "./pages/agent/Clients";
import AgentProperties from "./pages/agent/AgentProperties";
import AgentProfile from "./pages/agent/AgentProfile";
import AgentNotifications from "./pages/agent/AgentNotifications";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Landing & Auth */}
            <Route path="/" element={<Landing />} />
            <Route path="/auth/select" element={<SelectRole />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/verify" element={<VerifyOtp />} />

            {/* Homeowner Routes */}
            <Route path="/dashboard" element={<HomeownerDashboard />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/properties/:id" element={<PropertyDetail />} />
            <Route path="/capture" element={<Capture />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/checklist" element={<Checklist />} />
            <Route path="/inventory" element={<Inventory />} />

            {/* Agent Routes */}
            <Route path="/agent/dashboard" element={<AgentDashboard />} />
            <Route path="/agent/clients" element={<Clients />} />
            <Route path="/agent/properties" element={<AgentProperties />} />
            <Route path="/agent/profile" element={<AgentProfile />} />
            <Route path="/agent/notifications" element={<AgentNotifications />} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
