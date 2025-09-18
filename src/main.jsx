import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router';
import router from './Router/router.jsx';
import AuthProvider from './AuthProvider/AuthProvider.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'quill/dist/quill.snow.css'; // Snow theme


const queryClient = new QueryClient();


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>

  </StrictMode>
);