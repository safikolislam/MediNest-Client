import { BsFillHouseAddFill } from 'react-icons/bs'
import { MdCampaign, MdHome } from 'react-icons/md'
import { FaMoneyBillAlt } from 'react-icons/fa'
import MenuItem from './MenuItem'

const SellerMenu = () => {
  return (
    <>
      <MenuItem
        icon={MdHome}
        label='Seller Home'
        address='/dashboard' 
      />
      <MenuItem
        icon={BsFillHouseAddFill}
        label='Manage Medicines'
        address='/dashboard/ManageMedicine'  
      />
      <MenuItem
        icon={FaMoneyBillAlt}
        label='Payment History'
        address='/dashboard/PaymentHistory'  
      />
      <MenuItem
        icon={MdCampaign}
        label='Ask For Advertisement'
        address='/dashboard/Advertisement'  
      />
    </>
  )
}

export default SellerMenu

