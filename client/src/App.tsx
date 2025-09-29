import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import NotFound from "@/pages/not-found";
import { AdminApp } from "@/admin/AdminApp";

// Import all pages
import { HomePage } from "@/pages/HomePage";
import { CategoriesPage } from "@/pages/CategoriesPage";
import { ProductPage } from "@/pages/ProductPage";
import { CartPage } from "@/pages/CartPage";
import { LoginPage } from "@/pages/LoginPage";
import { RegisterPage } from "@/pages/RegisterPage";
import { MyProfilePage } from "@/pages/MyProfilePage";
import { ProfileSettingsPage } from "@/pages/ProfileSettingsPage";
import { OrderDetailsPage } from "@/pages/OrderDetailsPage";
import { RedeemCodePage } from "@/pages/RedeemCodePage";
import { OrderConfirmedPage } from "@/pages/OrderConfirmedPage";
import { PrivacyPolicyPage } from "@/pages/PrivacyPolicyPage";

function Router() {
  return (
    <Switch>
      {/* Admin routes */}
      <Route path="/admin" component={AdminApp} />
      <Route path="/admin/:rest*" component={AdminApp} />
      
      {/* Main pages */}
      <Route path="/" component={HomePage} />
      <Route path="/categories" component={CategoriesPage} />
      <Route path="/product/:id?" component={ProductPage} />
      <Route path="/cart" component={CartPage} />
      
      {/* Auth pages */}
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      
      {/* Profile pages */}
      <Route path="/profile" component={MyProfilePage} />
      <Route path="/profile/settings" component={ProfileSettingsPage} />
      <Route path="/order/:id?" component={OrderDetailsPage} />
      
      {/* Utility pages */}
      <Route path="/redeem" component={RedeemCodePage} />
      <Route path="/order-confirmed" component={OrderConfirmedPage} />
      <Route path="/privacy" component={PrivacyPolicyPage} />
      
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
