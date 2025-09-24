import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import LoadingSpinner from '../LoadingSpinner';
import { useContext } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';


import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer
} from 'recharts';

const UserStatistics = () => {
    const { user } = useContext(AuthContext);

    const { data: userOrders = [], isLoading, error } = useQuery({
        queryKey: ['userOrders', user?.email],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/my-orders?email=${user.email}`);
            return res.data;
        },
        enabled: !!user,
    });

    if (isLoading) return <LoadingSpinner />;
    if (error) return <div>Error fetching your data: {error.message}</div>;


    const totalOrders = userOrders.length;
    const totalPaidOrders = userOrders.filter(order => order.status === 'paid').length;
    const totalPendingOrders = userOrders.filter(order => order.status === 'pending').length;

  
    const pieData = [
        { name: 'Paid Orders', value: totalPaidOrders },
        { name: 'Pending Orders', value: totalPendingOrders },
    ];
    const pieColors = ['#4BC0C0', '#FF6384'];

  
    const barData = userOrders.map(order => ({
        name: `ID: ${order._id.substring(0, 8)}...`,
        price: order.totalPrice,
    }));

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold text-shadow-green-500 mb-6 text-center">User Statistics Dashboard </h2>

      
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 text-center">
                <div className="bg-purple-100 p-4 rounded-lg shadow-md">
                    <p className="text-gray-700 font-bold">Total Orders</p>
                    <p className="text-4xl font-extrabold text-purple-800">{totalOrders}</p>
                </div>
                <div className="bg-green-100 p-4 rounded-lg shadow-md">
                    <p className="text-gray-700 font-bold">Paid Orders</p>
                    <p className="text-4xl font-extrabold text-green-800">{totalPaidOrders}</p>
                </div>
                <div className="bg-red-100 p-4 rounded-lg shadow-md">
                    <p className="text-gray-700 font-bold">Pending Orders</p>
                    <p className="text-4xl font-extrabold text-red-800">{totalPendingOrders}</p>
                </div>
            </div>

         
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             
                <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                    <h3 className="text-xl font-semibold mb-4">Order Status Breakdown</h3>
                    <div className="w-full h-80">
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    label
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

              
                <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                    <h3 className="text-xl font-semibold mb-4">Order Prices</h3>
                    <div className="w-full h-80">
                        <ResponsiveContainer>
                            <BarChart data={barData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="price" fill="#36A2EB" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {userOrders.length === 0 && (
                <div className="text-center mt-10 text-gray-500">
                    No order data to display.
                </div>
            )}
        </div>
    );
};

export default UserStatistics;




