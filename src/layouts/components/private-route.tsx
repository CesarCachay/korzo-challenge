import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import AuthContext from 'src/context/AuthProvider';

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const auth = useContext(AuthContext);

  if (!auth || !auth.user) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
};

export default PrivateRoute;
