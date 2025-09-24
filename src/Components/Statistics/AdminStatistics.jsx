import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { 
    PieChart, Pie, Cell, Tooltip, Legend, 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, 
    ResponsiveContainer 
} from 'recharts';
import LoadingSpinner from '../LoadingSpinner';


const StatCard = ({ title, value, icon, colorClass }) => (
  <div className={`relative flex items-center p-5 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out border-l-4 ${colorClass}`}>
    <div className="mr-4">
      {icon}
    </div>
    <div>
      <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">{title}</h3>
      <p className="text-3xl font-bold text-gray-900 mt-1">${value}</p>
    </div>
  </div>
);


const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" className="font-bold">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};


const AdminStatistics = () => {
  const { data: stats, isLoading, error } = useQuery({
    queryKey: ['adminStats'],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/admin/stats`);
      return res.data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-slate-100 p-4">
        <div className="flex items-center p-6 bg-white border-l-4 border-red-500 rounded-lg shadow-lg">
          <svg className="w-8 h-8 mr-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Oops!</h3>
            <p className="text-red-600">Error fetching data: {error.message}</p>
          </div>
        </div>
      </div>
    );
  }

  const { totalRevenue = 0, totalPaid = 0, totalPending = 0 } = stats || {};

  const pieChartData = [
    { name: 'Paid', value: parseFloat(totalPaid) },
    { name: 'Pending', value: parseFloat(totalPending) },
  ];
  
  const barChartData = [
    { name: 'Revenue', value: parseFloat(totalRevenue) },
    { name: 'Paid', value: parseFloat(totalPaid) },
    { name: 'Pending', value: parseFloat(totalPending) },
  ];

  const PIE_COLORS = ['#22C55E' , '#F97316' ];
  const BAR_COLORS = ['#3B82F6' , '#22C55E' , '#F97316' ];

  return (
    <div className="container mx-auto p-4 md:p-8 bg-slate-100 min-h-screen font-sans">
      <header className="mb-10 text-center">
        <h2 className="text-4xl font-extrabold text-green-800 to-blue-400 via-orange-200">Admin Dashboard</h2>
        <p className="text-lg text-gray-500 mt-2">An overview of your sales performance.</p>
      </header>
      
     
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <StatCard 
          title="Total Sales Revenue" 
          value={Number(totalRevenue).toFixed(2)} 
          colorClass="border-sky-500"
          icon={<svg className="w-8 h-8 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01"></path></svg>}
        />
        <StatCard 
          title="Total Paid" 
          value={Number(totalPaid).toFixed(2)} 
          colorClass="border-green-500"
          icon={<svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>}
        />
        <StatCard 
          title="Total Pending" 
          value={Number(totalPending).toFixed(2)} 
          colorClass="border-orange-500"
          icon={<svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>}
        />
      </div>

    
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        
       
        <div className="lg:col-span-2 flex flex-col p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-6 text-gray-800">Revenue Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
                stroke="none"
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
              <Legend iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>

   
        <div className="lg:col-span-3 flex flex-col p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-6 text-gray-800">Financial Summary</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barChartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tick={{ fill: '#6B7280' }} />
              <YAxis tickFormatter={(value) => `$${value}`} tick={{ fill: '#6B7280' }}/>
              <Tooltip
                formatter={(value) => `$${Number(value).toFixed(2)}`}
                cursor={{fill: 'rgba(240, 240, 240, 0.6)'}}
              />
              <Legend iconType="square" />
              <Bar dataKey="value" barSize={50} radius={[4, 4, 0, 0]}>
                {barChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={BAR_COLORS[index % BAR_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminStatistics;

