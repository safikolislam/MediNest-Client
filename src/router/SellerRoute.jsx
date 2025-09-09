import { Navigate } from 'react-router'

import useRole from '../hooks/useRole'
import LoadingSpinner from '../Components/LoadingSpinner'

const SellerRoute = ({ children }) => {
  const [role, isRoleLoading] = useRole()

  console.log('I was here, in SellerRoute')
  if (isRoleLoading) return <LoadingSpinner />
  if (role === 'seller') return children
  return <Navigate to='/' replace='true' />
}

export default SellerRoute