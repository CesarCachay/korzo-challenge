import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { Box, CircularProgress } from '@mui/material';

import AuthContext from 'src/context/AuthProvider';

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const auth = useContext(AuthContext);

  if (!auth) {
    return <Navigate to="/sign-in" replace />;
  }

  if (auth.loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!auth.user) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
};

export default PrivateRoute;
