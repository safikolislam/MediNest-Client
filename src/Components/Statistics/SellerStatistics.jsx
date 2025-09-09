import React from "react";

const SellerStatistics = () => {
  // Example data (you’ll replace with real API values later)
  const stats = {
    total: 12000,
    paid: 9500,
    pending: 2500,
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Seller Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Total Revenue */}
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold text-gray-700">Total Sales Revenue</h2>
          <p className="mt-4 text-2xl font-bold text-green-600">
            ${stats.total.toLocaleString()}
          </p>
        </div>

        {/* Paid Total */}
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold text-gray-700">Paid Total</h2>
          <p className="mt-4 text-2xl font-bold text-blue-600">
            ${stats.paid.toLocaleString()}
          </p>
        </div>

        {/* Pending Total */}
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold text-gray-700">Pending Total</h2>
          <p className="mt-4 text-2xl font-bold text-red-600">
            ${stats.pending.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SellerStatistics;
