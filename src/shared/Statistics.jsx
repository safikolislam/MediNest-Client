

import LoadingSpinner from '../Components/LoadingSpinner'
import AdminStatistics from '../Components/Statistics/AdminStatistics'
import SellerStatistics from '../Components/Statistics/SellerStatistics'
import UserStatistics from '../Components/Statistics/UserStatistics'
import useAuth from '../hooks/useAuth'




import useRole from '../hooks/useRole'


const Statistics = () => {
  const [role, isRoleLoading] = useRole()
  if (isRoleLoading) return <LoadingSpinner />
const {user} = useAuth()
  return (
    <div>
     <h1 className="text-3xl font-bold bg-gradient-to-r from-green-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
  Welcome, <span className="bg-gradient-to-r from-blue-400 via-teal-500 to-green-600 bg-clip-text text-transparent">{user?.displayName}</span>
</h1>
      {role === 'admin' && <AdminStatistics/>}
      {role === 'seller' && <SellerStatistics />}
      {role === 'user' && <UserStatistics />}
    </div>
  )
}

export default Statistics