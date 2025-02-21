import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export default function AuthCallbackHandler() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const code = searchParams.get('code');
    const errorParam = searchParams.get('error');

    if (errorParam) {
      setError('Authentication failed. Please try again.');
      setTimeout(() => navigate('/sign-in'), 3000);
    } else if (code) {
      navigate('/dashboard');
    } else {
      setError('Invalid authentication callback.');
      setTimeout(() => navigate('/sign-in'), 3000);
    }
  }, [searchParams, navigate]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      {error ? (
        <div>{error}</div>
      ) : (
        <>
          <CircularProgress />
          <div>Processing authentication...</div>
        </>
      )}
    </Box>
  );
}
