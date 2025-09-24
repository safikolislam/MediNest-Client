import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  PieChart,
  Pie,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Cell,
  // Removed Label as it's not present in the reference image
} from 'recharts';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const SellerStatistics = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [pieData, setPieData] = useState([]);

  const { data: stats, isLoading, isError } = useQuery({
    queryKey: ['sellerStats', user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(`/seller/stats?email=${user.email}`);
      return response.data;
    },
    enabled: !!user?.email,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (stats) {
      setPieData([
        { name: 'Paid', value: stats.totalPaid, color: '#22c55e' }, // green-500
        { name: 'Pending', value: stats.totalPending, color: '#f97316' }, // orange-500
      ]);
    }
  }, [stats]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        Loading statistics...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold text-red-500">
        Error loading statistics. Please try again later.
      </div>
    );
  }

 
  const barData = [
    {
      name: 'Sales',
      'Total Revenue': stats.totalPaid + stats.totalPending,
      'Total Paid': stats.totalPaid,
      'Total Pending': stats.totalPending,
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-4xl font-extrabold text-green-900">Seller Dashboard</h1>
          <p className="mt-2 text-lg text-purple-600">An overview of your sales performance.</p>
        </div>
        
      
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
       
          <div className="relative bg-white p-6 rounded-xl shadow-lg flex items-center justify-between transition-transform transform hover:scale-105">
            <div className="absolute top-0 left-0 h-full w-2 bg-blue-500 rounded-l-xl"></div>
            <div className="flex-1 pl-4">
              <div className="text-sm font-light text-gray-500">TOTAL SALES REVENUE</div>
              <div className="text-3xl font-bold mt-1 text-gray-800">${(stats.totalPaid + stats.totalPending).toFixed(2)}</div>
            </div>
          </div>
          
      
          <div className="relative bg-white p-6 rounded-xl shadow-lg flex items-center justify-between transition-transform transform hover:scale-105">
            <div className="absolute top-0 left-0 h-full w-2 bg-green-500 rounded-l-xl"></div>
            <div className="flex-1 pl-4">
              <div className="text-sm font-light text-gray-500">TOTAL PAID</div>
              <div className="text-3xl font-bold mt-1 text-gray-800">${stats.totalPaid.toFixed(2)}</div>
            </div>
          </div>
          
      
          <div className="relative bg-white p-6 rounded-xl shadow-lg flex items-center justify-between transition-transform transform hover:scale-105">
            <div className="absolute top-0 left-0 h-full w-2 bg-orange-500 rounded-l-xl"></div>
            <div className="flex-1 pl-4">
              <div className="text-sm font-light text-gray-500">TOTAL PENDING</div>
              <div className="text-3xl font-bold mt-1 text-gray-800">${stats.totalPending.toFixed(2)}</div>
            </div>
          </div>
        </div>

 
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
       
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-700">
              Revenue Breakdown
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                
                  startAngle={90}
                  endAngle={-270}
                  stroke="none"
              
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
           
                </Pie>
                <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                <Legend layout="horizontal" align="center" verticalAlign="bottom" />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
    
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-700">
              Financial Summary
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                <Legend verticalAlign="bottom" height={36} />
                <Bar dataKey="Total Revenue" fill="#3b82f6" />
                <Bar dataKey="Total Paid" fill="#22c55e" />
                <Bar dataKey="Total Pending" fill="#f97316" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerStatistics;


