import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import LoadingSpinner from '../../../Components/LoadingSpinner';

const UserPaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      if (!user?.email) {
        setLoading(false);
        return;
      }

      try {
        const res = await axiosSecure.get(`/user-orders?email=${user.email}`);
        setPayments(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch payment history', err);
        setError('Failed to load payment history. Please try again later.');
        toast.error('Failed to load payment history.');
        setLoading(false);
      }
    };

    fetchPayments();
  }, [user, axiosSecure]);

  if (loading) {
    return (
      <LoadingSpinner></LoadingSpinner>
      
    );
  }

  if (error) {
    return (
      <div className="text-center mt-10 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
        <p className="font-bold">Error!</p>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-8 tracking-tight">
        Payment History 
      </h2>
      {payments.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-10 bg-gray-50 rounded-lg shadow-inner">
          <p className="text-xl text-gray-500 font-medium">You haven't made any payments yet.</p>
          <p className="mt-2 text-md text-gray-400">Your transaction history will appear here once you make a purchase.</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow-2xl">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg">
              <tr>
                <th scope="col" className="py-4 px-6 text-left text-sm font-semibold tracking-wider">
                  Transaction ID
                </th>
                <th scope="col" className="py-4 px-6 text-left text-sm font-semibold tracking-wider">
                  Total Price
                </th>
                <th scope="col" className="py-4 px-6 text-left text-sm font-semibold tracking-wider">
                  Payment Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {payments.map((payment, index) => (
                <tr key={index} className="hover:bg-gray-100 transition-colors duration-200">
                  <td className="py-4 px-6 text-sm text-gray-800 font-mono">{payment.transactionId}</td>
                  <td className="py-4 px-6 text-sm text-gray-800 font-medium">${Number(payment.totalPrice).toFixed(2)}</td>
                  <td className="py-4 px-6 text-sm text-gray-500">{new Date(payment.timestamp).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserPaymentHistory;
