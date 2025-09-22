
import LoadingSpinner from '../Components/LoadingSpinner'
import AdminStatistics from '../Components/Statistics/AdminStatistics'
import SellerStatistics from '../Components/Statistics/SellerStatistics'
import UserStatistics from '../Components/Statistics/UserStatistics'
import useRole from '../hooks/useRole'


const Statistics = () => {
  const [role, isRoleLoading] = useRole()
  if (isRoleLoading) return <LoadingSpinner />
  return (
    <div>
      <h1 className="font-bold text-2xl text-green-500">Welcome to Dashboard</h1>
      {role === 'admin' && <AdminStatistics/>}
      {role === 'seller' && <SellerStatistics />}
      {role === 'user' && <UserStatistics />}
    </div>
  )
}

export default Statistics