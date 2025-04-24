
import { Toaster as Sonner } from '@/components/ui/sonner';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DialogOnboarding from './components/dialog/Onboarding';
import Layout from './components/layout/Layout';
import PrivateRoute from './components/PrivateRoute';
import WhatsAppSupport from './components/WhatsAppSupport';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { TokenProvider } from './context/TokenContext';
import AdAccounts from './pages/AdAccounts';
import AiAnalysis from './pages/AiAnalysis';
import CampaignAnalysis from './pages/CampaignAnalysis';
import Dashboard from './pages/Dashboard';
import Help from './pages/Help';
import Integration from './pages/Integration';
import Landing from './pages/Landing';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Plans from './pages/Plans';
import Register from './pages/Register';
import Reports from './pages/Reports';
import SendRecoveryCode from './pages/resetPasswordForEmail/sendRecoveryCode';
import Settings from './pages/Settings';
import TokenUsage from './pages/TokenUsage';
import UserProfile from './pages/UserProfile';

// Component to verify authentication

const App = () => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <NotificationProvider>
            <TokenProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  {/* Public routes */}
                  <Route path="/" element={<Landing />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/registro" element={<Register />} />
                  <Route path="/send-recovery-code" element={<SendRecoveryCode />} />
                  
                  {/* Protected routes */}
                  <Route
                    element={
                      <PrivateRoute>
                        <Layout />
                        <DialogOnboarding />
                        <WhatsAppSupport phoneNumber="5511999999999" />
                      </PrivateRoute>
                    }
                  >
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route
                      path="/ai-analysis"
                      element={<AiAnalysis />}
                    />
                    <Route
                      path="/analise-ia"
                      element={<AiAnalysis />}
                    />
                    <Route
                      path="/campaign-analysis"
                      element={<CampaignAnalysis />}
                    />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/integration" element={<Integration />} />
                    <Route path="/help" element={<Help />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/profile" element={<UserProfile />} />
                    <Route path="/plans" element={<Plans />} />
                    <Route path="/token-usage" element={<TokenUsage />} />
                    <Route path="/ad-accounts" element={<AdAccounts />} />
                  </Route>

                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TokenProvider>
          </NotificationProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
