
import { FaHistory, FaHome } from 'react-icons/fa'
import MenuItem from './MenuItem'



const UserMenu = () => {
  return (
    <>
        <MenuItem icon={FaHome} label='Home' address='/dashboard' />
     
      <MenuItem icon={FaHistory} label='Payment History' address='/dashboard/UserPaymentHistory' />
    </>
  )
}

export default UserMenu
