
import { FaHistory } from 'react-icons/fa'
import MenuItem from './MenuItem'

const UserMenu = () => {
  return (
    <>
      {/* <MenuItem icon={MdDashboard} label=' Home' address='/dashboard' />
      <MenuItem icon={MdPayment} label='Make Payment' address='/dashboard/MakePayment' /> */}
      <MenuItem icon={FaHistory} label='Payment History' address='/dashboard/UserPaymentHistory' />
    </>
  )
}

export default UserMenu
