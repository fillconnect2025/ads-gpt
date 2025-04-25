
import { useAuth } from '@/context/AuthContext';
import { FacebookAdsAuthProvider } from '@/context/FacebookADSContext';
import { Loader2 } from 'lucide-react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <FacebookAdsAuthProvider>{children}</FacebookAdsAuthProvider>;
};

export default PrivateRoute;
