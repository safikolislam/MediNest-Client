import { Navigate, useLocation } from 'react-router'
import useRole from '../hooks/useRole'
import LoadingSpinner from '../Components/LoadingSpinner'

const AdminRoute = ({ children }) => {
  const [role, isRoleLoading] = useRole()
  const location = useLocation()

 

  if (isRoleLoading) return <LoadingSpinner />
  if (role === 'admin') return children

  return <Navigate to='/' replace />
}

export default AdminRoute



