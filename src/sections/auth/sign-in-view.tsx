import { useState, useContext, useCallback } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { validateEmail, validatePassword } from 'src/utils/form-validation';

import AuthContext from 'src/context/AuthProvider';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function SignInView() {
  const auth = useContext(AuthContext);
  const router = useRouter();

  if (!auth) throw new Error('AuthContext must be used within an AuthProvider');

  const { login } = auth;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const handleSignIn = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setErrorMessage(null);
      setEmailError(null);
      setPasswordError(null);
      setLoading(true);

      let valid = true;

      if (!validateEmail(email)) {
        setEmailError('Please enter a valid email address.');
        valid = false;
      }

      if (!validatePassword(password)) {
        setPasswordError('Password must be at least 6 characters long.');
        valid = false;
      }

      if (!valid) {
        setLoading(false);
        return;
      }

      const error = await login(email, password);

      if (error) {
        setErrorMessage(error);
      } else {
        router.push('/');
      }

      setLoading(false);
    },
    [login, email, password, router]
  );

  const handleRedirectPage = (path: string) => {
    if (path === 'create') {
      router.push('/create-user');
    } else {
      router.push('/verify-user');
    }
  };

  const renderForm = (
    <Box display="flex" flexDirection="column" alignItems="flex-end">
      <TextField
        fullWidth
        name="email"
        label="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email address"
        InputLabelProps={{ shrink: true }}
        error={!!emailError}
        helperText={emailError}
        required
        sx={{ mb: 3 }}
      />

      <Link
        color="text.primary"
        variant="subtitle2"
        sx={{ mb: 1.5, cursor: 'pointer' }}
        onClick={() => handleRedirectPage('verify')}
      >
        Verify user
      </Link>

      <TextField
        fullWidth
        name="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        InputLabelProps={{ shrink: true }}
        error={!!passwordError}
        helperText={passwordError}
        type={showPassword ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{ mb: 3 }}
      />

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        color="inherit"
        variant="contained"
        onClick={handleSignIn}
        loading={loading}
      >
        Sign in
      </LoadingButton>
    </Box>
  );

  return (
    <>
      <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
        <Typography variant="h5">Sign in</Typography>
        <Typography variant="body2" color="text.secondary">
          Don’t have an account?
          <Link
            variant="subtitle2"
            sx={{ ml: 0.5, cursor: 'pointer' }}
            onClick={() => handleRedirectPage('create')}
          >
            Get started
          </Link>
        </Typography>
      </Box>

      <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 2 }}>
        {errorMessage && <Typography color="error">{errorMessage}</Typography>}
      </Box>

      {renderForm}
    </>
  );
}
