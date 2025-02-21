import ReactDOM from 'react-dom/client';
import { Suspense, StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthKitProvider } from '@workos-inc/authkit-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './lib/chart';
import App from './app';
import { AuthProvider } from './context/AuthProvider';

// ----------------------------------------------------------------------

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <AuthKitProvider clientId={import.meta.env.VITE_WORKOS_CLIENT_ID}>
          <AuthProvider>
            <QueryClientProvider client={queryClient}>
              <Suspense>
                <App />
              </Suspense>
            </QueryClientProvider>
          </AuthProvider>
        </AuthKitProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);
