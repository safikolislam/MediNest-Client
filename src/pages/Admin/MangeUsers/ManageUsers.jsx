import { useState } from "react"
import { useQuery } from "@tanstack/react-query"


import LoadingSpinner from "../../../Components/LoadingSpinner"
import useAxiosSecure from "../../../hooks/useAxiosSecure"
import UpdateUserRoleModal from "../../../Components/UpdateUserRoleModal"



const ManageUsers = () => {
  let [isOpen, setIsOpen] = useState(false)
  const [email,setEmail]=useState('')
  const axiosSecure = useAxiosSecure()

  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { data } = await axiosSecure('/all-users')
      return data
    },
  })

  if (isLoading) return <LoadingSpinner />

  return (
    <>
      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-8'>
          <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
            <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
              <table className='min-w-full leading-normal'>
                <thead>
                  <tr>
                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                      Email
                    </th>
                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                      Role
                    </th>
                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                      Status
                    </th>
                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                        <p className='text-gray-900 whitespace-no-wrap'>{user.email}</p>
                      </td>
                      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                        <p className='text-gray-900 whitespace-no-wrap'>{user.role}</p>
                      </td>
                      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                        <p
                          className={`${
                            user.status === 'requested'
                              ? 'text-yellow-500'
                              : user.status === 'verified'
                              ? 'text-green-500'
                              : 'text-red-500'
                          } whitespace-no-wrap`}
                        >
                          {user.status ? user.status : 'Unavailable'}
                        </p>
                      </td>
                      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                        <span
                        onClick={() =>{
                        setIsOpen(true);
                        setEmail(user.email)
                        }}
                          className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'
                        >
                          <span
                            aria-hidden='true'
                            className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
                          ></span>
                          <span className='relative'>Update Role</span>
                        </span>

                       
                 
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
                     <UpdateUserRoleModal
                          isOpen={isOpen}
                          setIsOpen={setIsOpen}
                     
                          userEmail={email}
                        />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ManageUsers

