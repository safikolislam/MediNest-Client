import { MdDashboard, MdPayment } from 'react-icons/md'
import { FaHistory } from 'react-icons/fa'
import MenuItem from './MenuItem'

const UserMenu = () => {
  return (
    <>
      <MenuItem icon={MdDashboard} label='User Home' address='/dashboard' />
      <MenuItem icon={MdPayment} label='Make Payment' address='/dashboard/payment' />
      <MenuItem icon={FaHistory} label='Payment History' address='/dashboard/Payment' />
    </>
  )
}

export default UserMenu
