import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';

import { Login } from '@/pages/auth/Login';
import { OTPVerification } from '@/pages/auth/OTPVerification';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/otp-verification" element={<OTPVerification />} />
          
          {/* Protected routes will go here */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import Index from "./pages/Index";
import RoleSelect from "./pages/RoleSelect";
import CustomerDashboard from "./pages/CustomerDashboard";
import TravelerDashboard from "./pages/TravelerDashboard";
import ProductConfirmation from "./pages/ProductConfirmation";
import Profile from "./pages/Profile";
import Wallet from "./pages/Wallet";
import PhoneAuth from "./pages/auth/PhoneAuth";
import OTPVerification from "./pages/auth/OTPVerification";
import ProfileSetup from "./pages/auth/ProfileSetup";
import NotFound from "./pages/NotFound";
import "./App.css";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<PhoneAuth />} />
            <Route path="/auth/verify" element={<OTPVerification />} />
            <Route path="/auth/profile" element={<ProfileSetup />} />
            
            {/* Protected Routes */}
            <Route
              path="/role-select"
              element={
                <ProtectedRoute>
                  <RoleSelect />
                </ProtectedRoute>
              }
            />
            <Route
              path="/customer"
              element={
                <ProtectedRoute requireRole="customer">
                  <CustomerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/traveler"
              element={
                <ProtectedRoute requireRole="traveler">
                  <TravelerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/product-confirmation/:requestId"
              element={
                <ProtectedRoute>
                  <ProductConfirmation />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/wallet"
              element={
                <ProtectedRoute requireRole="traveler">
                  <Wallet />
                </ProtectedRoute>
              }
            />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
