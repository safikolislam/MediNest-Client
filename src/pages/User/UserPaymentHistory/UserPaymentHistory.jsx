import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { AuthContext } from '../../../Contexts/AuthContext';
import LoadingSpinner from '../../../Components/LoadingSpinner';

const UserPayments = () => {
  const { user } = useContext(AuthContext);

  const {
    data: userOrders = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['userOrders', user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/my-orders?email=${user.email}`
      );
      return res.data;
    },
    enabled: !!user,
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500 font-medium text-center mt-6"> Error fetching your data: {error.message}</div>;

  return (
    <div className="container mx-auto p-6">
      <title>My Payment || User Dashboard</title>
      <h2 className="text-3xl font-extrabold mb-6 text-gray-800 text-center">
         My Payment History
      </h2>

      <div className="overflow-x-auto rounded-2xl shadow-lg border border-green-200 bg-gradient-to-br from-gray-50 to-white">
        <table className="min-w-full text-sm text-green-500 to-blue-500">
          <thead className="bg-gradient-to-r from-gray-100 to-gray-200 sticky top-0">
            <tr>
              <th className="py-3 px-6 border-b text-left font-semibold">Transaction ID</th>
              <th className="py-3 px-6 border-b text-center font-semibold">Total Price</th>
              <th className="py-3 px-6 border-b text-center font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(userOrders) && userOrders.length > 0 ? (
              userOrders.map((order, idx) => (
                <tr
                  key={order._id}
                  className={`transition hover:scale-[1.01] hover:bg-gray-50 ${
                    idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/70'
                  }`}
                >
                  <td className="py-3 px-6 border-b text-xs font-mono text-gray-600">
                    {order._id}
                  </td>
                  <td className="py-3 px-6 border-b text-center font-semibold text-gray-800">
                    ${order.totalPrice.toFixed(2)}
                  </td>
                  <td className="py-3 px-6 border-b text-center">
                    {order.status === 'paid' ? (
                      <span className="px-3 py-1 text-xs font-bold rounded-full bg-green-100 text-green-700 shadow-sm">
                         Paid
                      </span>
                    ) : (
                      <span className="px-3 py-1 text-xs font-bold rounded-full bg-red-100 text-red-600 shadow-sm">
                         Pending
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  className="text-center py-8 text-gray-500 italic"
                >
                  No payment history found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserPayments;


