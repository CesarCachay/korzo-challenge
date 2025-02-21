import { useState, useContext, useCallback } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { useRouter } from 'src/routes/hooks';

import AuthContext from 'src/context/AuthProvider';

export function VerifyView() {
  const auth = useContext(AuthContext);
  const router = useRouter();

  if (!auth) throw new Error('AuthContext must be used within an AuthProvider');

  const { verify } = auth;
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setErrorMessage(null);
      setLoading(true);

      const error = await verify(email);

      if (error) {
        setErrorMessage(error);
      } else {
        router.push('/');
      }

      setLoading(false);
    },
    [verify, email, router]
  );

  return (
    <Box gap={1.5} display="flex" flexDirection="column" alignItems="center">
      <Box sx={{ m: 5 }}>
        <Typography variant="h5">Verify user to get started</Typography>
      </Box>

      <Box width={800} display="flex" flexDirection="column" alignItems="flex-end">
        <TextField
          fullWidth
          name="email"
          label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          InputLabelProps={{ shrink: true }}
          required
          sx={{ mb: 3 }}
        />

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          color="inherit"
          variant="contained"
          onClick={handleVerify}
          loading={loading}
        >
          Verify User
        </LoadingButton>
      </Box>

      <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 2 }}>
        {errorMessage && <Typography color="error">{errorMessage}</Typography>}
      </Box>
    </Box>
  );
}
