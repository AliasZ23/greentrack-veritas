
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SupplierDetails from "./pages/SupplierDetails";
import VerificationProcesses from "./pages/VerificationProcesses";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AddSupplier from "./pages/AddSupplier";
import Account from "./pages/Account";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";
import Documents from "./pages/Documents";

// Create a new query client with better error handling
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 30000,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <BrowserRouter basename="/">
          <AuthProvider>
            <Toaster />
            <Sonner />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/supplier/:id" element={<SupplierDetails />} />
              <Route path="/verification" element={<VerificationProcesses />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/documents" element={<Documents />} />
              
              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/add-supplier" element={<AddSupplier />} />
                <Route path="/account" element={<Account />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/notifications" element={<Notifications />} />
              </Route>
              
              {/* Default redirect to home page if no route matches */}
              <Route path="index" element={<Navigate to="/" replace />} />
              <Route path="index.html" element={<Navigate to="/" replace />} />
              
              {/* 404 Route - this will catch all unmatched routes */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
