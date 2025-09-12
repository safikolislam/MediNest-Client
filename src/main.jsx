import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './router/router'
import AuthProvider from './Contexts/AuthProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <div className="montserrat-normal">
      <QueryClientProvider client={queryClient}>
      <AuthProvider>
<RouterProvider router={router}></RouterProvider>
      </AuthProvider>
   </QueryClientProvider>
   </div>
   <Toaster position="top-right" reverseOrder={false}  ></Toaster>
  </StrictMode>,
)
