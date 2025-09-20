import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './router/router'
import AuthProvider from './Contexts/AuthProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { ToastContainer } from 'react-toastify'
import 'aos/dist/aos.css';
import Aos from 'aos';
const queryClient = new QueryClient();
Aos.init()
createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <div className="montserrat-normal">
      <QueryClientProvider client={queryClient}>
      <AuthProvider>
<RouterProvider router={router}></RouterProvider>
      </AuthProvider>
   </QueryClientProvider>
   </div>
   <ToastContainer  position="top-right" autoClose={2000}
></ToastContainer>
  </StrictMode>,
)
