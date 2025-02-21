import ReactDOM from 'react-dom/client';
import { Suspense, StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthKitProvider } from '@workos-inc/authkit-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './lib/chart';
import App from './app';

// ----------------------------------------------------------------------

const queryClient = new QueryClient();

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error(
    "Root element not found. Ensure you have a <div id='root'></div> in your index.html"
  );
}
const root = ReactDOM.createRoot(rootElement as HTMLElement);

root.render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AuthKitProvider
            clientId={import.meta.env.VITE_WORKOS_CLIENT_ID}
            redirectUri={import.meta.env.VITE_WORKOS_REDIRECT_URI}
          >
            <Suspense fallback={<div>Loading ....</div>}>
              <App />
            </Suspense>
          </AuthKitProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);
