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
import AddProperty from "./pages/homeowner/AddProperty";
import Capture from "./pages/homeowner/Capture";
import Profile from "./pages/homeowner/Profile";
import Notifications from "./pages/homeowner/Notifications";
import Checklist from "./pages/homeowner/Checklist";
import Inventory from "./pages/homeowner/Inventory";
import PhotoGallery from "./pages/homeowner/PhotoGallery";
import PhotoCompare from "./pages/homeowner/PhotoCompare";
import PhotoRequests from "./pages/homeowner/PhotoRequests";
import WeatherAlertDetail from "./pages/homeowner/WeatherAlertDetail";

// Agent Pages
import AgentDashboard from "./pages/agent/Dashboard";
import Clients from "./pages/agent/Clients";
import ClientDetail from "./pages/agent/ClientDetail";
import AddClient from "./pages/agent/AddClient";
import InviteClient from "./pages/agent/InviteClient";
import AgentProperties from "./pages/agent/AgentProperties";
import AgentProfile from "./pages/agent/AgentProfile";
import AgentNotifications from "./pages/agent/AgentNotifications";
import RequestPhotos from "./pages/agent/RequestPhotos";
import Renewals from "./pages/agent/Renewals";
import ChecklistTemplates from "./pages/agent/ChecklistTemplates";

import Splash from "./pages/Splash";
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
            <Route path="/" element={<Splash />} />
            <Route path="/landing" element={<Landing />} />
            <Route path="/auth/select" element={<SelectRole />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/verify" element={<VerifyOtp />} />

            {/* Homeowner Routes */}
            <Route path="/dashboard" element={<HomeownerDashboard />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/properties/add" element={<AddProperty />} />
            <Route path="/properties/:id" element={<PropertyDetail />} />
            <Route path="/properties/:id/edit" element={<AddProperty />} />
            <Route path="/properties/:id/photos" element={<PhotoGallery />} />
            <Route path="/properties/:id/photos/compare" element={<PhotoCompare />} />
            <Route path="/capture" element={<Capture />} />
            <Route path="/photo-requests" element={<PhotoRequests />} />
            <Route path="/weather-alerts/:id" element={<WeatherAlertDetail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/checklist" element={<Checklist />} />
            <Route path="/inventory" element={<Inventory />} />

            {/* Agent Routes */}
            <Route path="/agent/dashboard" element={<AgentDashboard />} />
            <Route path="/agent/clients" element={<Clients />} />
            <Route path="/agent/clients/add" element={<AddClient />} />
            <Route path="/agent/clients/invite" element={<InviteClient />} />
            <Route path="/agent/clients/:id" element={<ClientDetail />} />
            <Route path="/agent/properties" element={<AgentProperties />} />
            <Route path="/agent/properties/:id" element={<PropertyDetail />} />
            <Route path="/agent/properties/:id/request-photos" element={<RequestPhotos />} />
            <Route path="/agent/renewals" element={<Renewals />} />
            <Route path="/agent/templates" element={<ChecklistTemplates />} />
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
