import React from "react";

const UserStatistics = () => {
  // Example data (replace with API data later)
  const payments = [
    { id: "TXN123456", status: "Paid" },
    { id: "TXN789012", status: "Pending" },
    { id: "TXN345678", status: "Paid" },
  ];

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Payment History</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Transaction ID
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {payments.map((payment, index) => (
              <tr key={index}>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {payment.id}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      payment.status === "Paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {payment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserStatistics;
