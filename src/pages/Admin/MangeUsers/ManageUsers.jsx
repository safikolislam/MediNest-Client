import { useState } from "react"
import { useQuery } from "@tanstack/react-query"

import LoadingSpinner from "../../../Components/LoadingSpinner"
import useAxiosSecure from "../../../hooks/useAxiosSecure"
import UpdateUserRoleModal from "../../../Components/UpdateUserRoleModal"

const ManageUsers = () => {
  let [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState("")
  const axiosSecure = useAxiosSecure()

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosSecure("/all-users")
      return data
    },
  })

  if (isLoading) return <LoadingSpinner />

  return (
    <>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-10">
       
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-extrabold text-green-500 tracking-tight">
              Manage Users
            </h2>
            <p className="text-gray-500 mt-2 text-sm">
              View, verify, and update user roles with ease
            </p>
          </div>

          <div className="hidden md:block bg-white shadow-2xl rounded-xl overflow-hidden border border-gray-100">
            <table className="min-w-full table-auto">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="hover:bg-gray-50 transition duration-200"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-800">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-semibold">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          user.status === "requested"
                            ? "bg-yellow-100 text-yellow-700"
                            : user.status === "verified"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {user.status ? user.status : "Unavailable"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <button
                        onClick={() => {
                          setIsOpen(true)
                          setEmail(user.email)
                        }}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow hover:from-green-600 hover:to-green-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Update Role
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="space-y-4 md:hidden">
            {users.map((user) => (
              <div
                key={user._id}
                className="bg-white shadow-md rounded-lg p-4 border border-gray-100"
              >
                <p className="text-sm font-semibold text-gray-800">
                  {user.email}
                </p>
                <p className="mt-1 text-xs">
                  <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-semibold">
                    {user.role}
                  </span>
                </p>
                <p className="mt-2">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                      user.status === "requested"
                        ? "bg-yellow-100 text-yellow-700"
                        : user.status === "verified"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.status ? user.status : "Unavailable"}
                  </span>
                </p>
                <div className="mt-3">
                  <button
                    onClick={() => {
                      setIsOpen(true)
                      setEmail(user.email)
                    }}
                    className="w-full inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow hover:from-green-600 hover:to-green-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Update Role
                  </button>
                </div>
              </div>
            ))}
          </div>

        
          <UpdateUserRoleModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            userEmail={email}
          />
        </div>
      </div>
    </>
  )
}

export default ManageUsers




