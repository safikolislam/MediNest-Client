import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './router/router'
import AuthProvider from './Contexts/AuthProvider'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="open-sans-normal">
      <AuthProvider>
<RouterProvider router={router}></RouterProvider>
      </AuthProvider>
   
   </div>
  </StrictMode>,
)
