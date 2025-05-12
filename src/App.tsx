
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import Dashboard from "@/pages/Dashboard";
import Contacts from "@/pages/Contacts";
import ContactDetailPage from "@/pages/ContactDetail";
import Appointments from "@/pages/Appointments";
import Deals from "@/pages/Deals";
import Activities from "@/pages/Activities";
import Settings from "@/pages/Settings";
import Admin from "@/pages/Admin";
import TimeTracking from "@/pages/TimeTracking";
import TimeManagement from "@/pages/TimeManagement";
import Messages from "@/pages/Messages";
import NotFound from "@/pages/NotFound";
import AuthLayout from "@/components/auth/AuthLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthLayout>
          <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/contacts/:id" element={<ContactDetailPage />} />
              <Route path="/appointments" element={<Appointments />} />
              <Route path="/deals" element={<Deals />} />
              <Route path="/activities" element={<Activities />} />
              <Route path="/time-tracking" element={<TimeTracking />} />
              <Route path="/time-management" element={<TimeManagement />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </AuthLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
