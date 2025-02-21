import { Navigate } from 'react-router-dom';
import { useAuth } from '@workos-inc/authkit-react';

import { Box, LinearProgress } from '@mui/material';

interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" flex="1 1 auto">
        <LinearProgress />
      </Box>
    );
  }

  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }

  return <>{children}</>;
}
