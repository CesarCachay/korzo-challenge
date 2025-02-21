import { Navigate } from 'react-router-dom';

import { useUser } from 'src/hooks/use-user';

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const user = useUser();

  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
};

export default PrivateRoute;
