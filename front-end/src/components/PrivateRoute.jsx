// front-end/src/components/PrivateRoute.jsx
import { Navigate, Outlet } from 'react-router-dom'
import { authService } from '../api/services'

export default function PrivateRoute() {
  const isAuthenticated = authService.isAuthenticated()
  
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}