import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../../../hooks/useAuth';


const PaymentHistory = () => {
  const { user } = useAuth(); 
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/seller-orders?email=${user.email}`)
        .then((res) => setOrders(res.data))
        .catch((error) => console.error("Error fetching seller orders:", error));
    }
  }, [user]);

  return (
    <div className="p-6">
      <title>Seller Dashboard || Payment History</title>
      <h2 className="text-xl font-bold mb-4 text-green-500">Payment History</h2>

      {orders.length === 0 ? (
        <p>No sales found.</p>
      ) : (
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Buyer</th>
              <th className="border border-gray-300 px-4 py-2">Medicine</th>
              <th className="border border-gray-300 px-4 py-2">Price</th>
              <th className="border border-gray-300 px-4 py-2">Quantity</th>
              <th className="border border-gray-300 px-4 py-2">Transaction</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) =>
              order.cart.map((item, idx) => (
                <tr key={`${order._id}-${idx}`}>
                  <td className="border border-gray-300 px-4 py-2">{order.userName}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                  <td className="border border-gray-300 px-4 py-2">${item.price}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.quantity}</td>
                  <td className="border border-gray-300 px-4 py-2">{order.transactionId}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded text-white ${
                        order.status === "pending" ? "bg-yellow-500" : "bg-green-600"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PaymentHistory;









