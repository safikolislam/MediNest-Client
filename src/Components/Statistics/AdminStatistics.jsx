import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

// A simple reusable component for displaying a stat card
const StatCard = ({ title, value, colorClass }) => (
  <div className={`flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-lg border-t-4 ${colorClass}`}>
    <h3 className="text-xl font-medium text-gray-700">{title}</h3>
    <p className="text-4xl font-bold mt-2 text-gray-900">${value}</p>
  </div>
);

const AdminStatistics = () => {
  const { data: stats, isLoading, error } = useQuery({
    queryKey: ['adminStats'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:3000/admin/stats');
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold text-gray-600">Loading statistics...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-xl font-semibold">Error fetching data: {error.message}</div>
      </div>
    );
  }

  const { totalRevenue, totalPaid, totalPending } = stats;

  // Prepare data for the charts
  const pieChartData = [
    { name: 'Paid', value: parseFloat(totalPaid) },
    { name: 'Pending', value: parseFloat(totalPending) },
  ];

  const COLORS = ['#22C55E', '#F97316']; // green and orange colors for the slices

  // Same data for bar chart
  const barChartData = [
    { name: 'Revenue', value: parseFloat(totalRevenue) },
    { name: 'Paid', value: parseFloat(totalPaid) },
    { name: 'Pending', value: parseFloat(totalPending) },
  ];

  return (
    <div className="container mx-auto p-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Admin Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <StatCard 
          title="Total Sales Revenue" 
          value={totalRevenue} 
          colorClass="border-blue-500" 
        />
        <StatCard 
          title="Total Paid" 
          value={totalPaid} 
          colorClass="border-green-500" 
        />
        <StatCard 
          title="Total Pending" 
          value={totalPending} 
          colorClass="border-orange-500" 
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Pie Chart */}
        <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">Revenue Breakdown</h3>
          <PieChart width={400} height={400}>
            <Pie
              data={pieChartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={150}
              fill="#8884d8"
              dataKey="value"
            >
              {pieChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
            <Legend />
          </PieChart>
        </div>

        {/* Column (Bar) Chart */}
        <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">Revenue Comparison</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
              <Legend />
              <Bar dataKey="value" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminStatistics;

