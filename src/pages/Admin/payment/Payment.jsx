// src/components/AdminPayments.jsx
import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import LoadingSpinner from '../../../Components/LoadingSpinner';

const AdminPayments = () => {
    const queryClient = useQueryClient();

 
    const { data: orders = [], isLoading, error } = useQuery({
        queryKey: ['allOrders'],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/admin/all-orders`);
            return res.data;
        },
    });

  
    const acceptPaymentMutation = useMutation({
        mutationFn: (orderId) => {
            return axios.patch(`${import.meta.env.VITE_API_URL}/admin/orders/accept/${orderId}`);
        },
        onSuccess: () => {
            toast.success('Payment accepted successfully!');
            queryClient.invalidateQueries(['allOrders']); 
        },
        onError: () => {
            toast.error('Failed to accept payment.');
        },
    });

    const handleAcceptPayment = (orderId) => {
        acceptPaymentMutation.mutate(orderId);
    };

    if (isLoading) return <LoadingSpinner></LoadingSpinner>;
    if (error) return <div>Error fetching data: {error.message}</div>;

    return (
        <div className="container mx-auto p-4">
            <title>All Payment || MediNest</title>
            <h2 className="text-2xl font-bold mb-4">Payment Management</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-3 px-4 border-b">Order ID</th>
                            <th className="py-3 px-4 border-b">User Email</th>
                            <th className="py-3 px-4 border-b">Total Price</th>
                           
                            <th className="py-3 px-4 border-b">Status</th>
                            <th className="py-3 px-4 border-b">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(orders) && orders.length > 0 ? (
                            orders.map((order) => (
                                <tr key={order._id} className="text-center hover:bg-gray-50 transition">
                                    <td className="py-2 px-4 border-b text-sm">{order._id}</td>
                                    <td className="py-2 px-4 border-b">{order.userEmail}</td>
                                    <td className="py-2 px-4 border-b font-semibold">
                                        ${order.totalPrice.toFixed(2)}
                                    </td>
                           
                                    <td className="py-2 px-4 border-b">
                                        {order.status === 'paid' ? (
                                            <span className="px-2 py-1 text-xs font-bold rounded-full bg-green-100 text-green-700">
                                                Paid
                                            </span>
                                        ) : (
                                            <span className="px-2 py-1 text-xs font-bold rounded-full bg-red-100 text-red-600">
                                                Pending
                                            </span>
                                        )}
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        {order.status === 'paid' ? (
                                            <span className="px-3 py-1 text-xs font-bold rounded-full bg-green-500 text-white">
                                                Accepted
                                            </span>
                                        ) : (
                                            <button
                                                onClick={() => handleAcceptPayment(order._id)}
                                                className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
                                                disabled={acceptPaymentMutation.isPending}
                                            >
                                                Accept Payment
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center py-6 text-gray-500">
                                    No payments found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminPayments;



