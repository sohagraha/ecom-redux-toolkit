import { useAppSelector } from '@/redux/hooks';
import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface PrivateRoutesProps {
  children: ReactNode;
}

export default function PrivateRoutes({ children }: PrivateRoutesProps) {
  const { user, isLoading } = useAppSelector((state) => state.user);
  const pathName = useLocation();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!user?.email && !isLoading) {
    return <Navigate to="/login" state={{ path: pathName }} />;
  } else return children;
}
