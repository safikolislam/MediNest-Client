import { MdDashboard, MdCategory, MdPayment, MdOutlineReport, MdOutlineCampaign } from 'react-icons/md'
import { FaUsers } from 'react-icons/fa'
import MenuItem from './MenuItem'

const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={MdDashboard} label=' Home' address='/dashboard' />
      <MenuItem icon={FaUsers} label='Manage Users' address='/dashboard/ManageUsers' />
      <MenuItem icon={MdCategory} label='Manage Categories' address='/dashboard/ManageCategories' />
      <MenuItem icon={MdPayment} label='Payment Management' address='/dashboard/payment' />
      <MenuItem icon={MdOutlineReport} label='Sales Report' address='/dashboard/report' />
      <MenuItem icon={MdOutlineCampaign} label='Banner Advertise' address='/dashboard/bannerAds' />
    </>
  )
}

export default AdminMenu
