import { Navigate, Outlet } from 'react-router';
import { useAuthContext } from '@/hooks/useAuthContext';

function ProtectedRoutes() {
  const { isAuthenticated } = useAuthContext();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoutes;
