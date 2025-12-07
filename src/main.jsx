import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from "react-router";
import './index.css';
import router from './Routes/Routes.jsx';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import  AuthProvider from "./contexts/AuthProvider.jsx";


// Create a client
const queryClient = new QueryClient()


createRoot(document.getElementById('root')).render(
  <StrictMode>

    <QueryClientProvider client={queryClient}>
       <AuthProvider>
     <RouterProvider router={router} />
     <ToastContainer />
  
</AuthProvider>
    </QueryClientProvider>

  </StrictMode>,
)
