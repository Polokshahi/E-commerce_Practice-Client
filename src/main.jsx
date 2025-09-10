import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import router from './Router/router.jsx'
import AuthProvder from './AuthProvider/AuthProvder.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvder>
  <RouterProvider router={router} />
    </AuthProvder>
  
  </StrictMode>,
)
