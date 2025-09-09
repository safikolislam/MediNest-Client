import React, { useState, useEffect } from "react";

const AdminStatistics = () => {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    paidTotal: 0,
    pendingTotal: 0,
  });

 
  useEffect(() => {
    const fetchStats = async () => {
   
      const data = {
        totalRevenue: 12500,
        paidTotal: 10000,
        pendingTotal: 2500,
      };
      setStats(data);
    };
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Revenue */}
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold text-gray-600">Total Revenue</h2>
          <p className="text-3xl font-bold text-green-600 mt-2">
            ${stats.totalRevenue.toLocaleString()}
          </p>
        </div>

        {/* Paid Total */}
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold text-gray-600">Paid Total</h2>
          <p className="text-3xl font-bold text-blue-600 mt-2">
            ${stats.paidTotal.toLocaleString()}
          </p>
        </div>

        {/* Pending Total */}
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold text-gray-600">Pending Total</h2>
          <p className="text-3xl font-bold text-yellow-600 mt-2">
            ${stats.pendingTotal.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminStatistics;
