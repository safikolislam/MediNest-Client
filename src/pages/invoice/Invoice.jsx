import React from "react";
import { useLocation } from "react-router";
import { FaFileInvoiceDollar, FaPrint, FaShoppingCart } from "react-icons/fa";
import image from '../../assets/MedicineLogo.png'
const InvoicePage = () => {
  const location = useLocation();
  const { orderData, cart } = location.state || {};

  if (!orderData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white shadow-lg rounded-xl">
          <p className="text-lg text-gray-800">
            No invoice data available. Please complete a payment first.{" "}
            <FaShoppingCart className="inline-block ml-1" />
          </p>
        </div>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 print:p-0">
    
      <div
        id="invoice-container"
        className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8 md:p-12 print:shadow-none print:rounded-none"
      >
       
        <div className="text-center mb-8">
          <img
            src={image}
            alt="Website Logo"
            className="mx-auto w-20 mb-4"
          />
          <FaFileInvoiceDollar className="text-6xl text-green-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800">Invoice</h1>
          <p className="text-gray-600 mt-2">Thank you for your purchase!</p>
        </div>

    
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b pb-6 mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-700">
              Order Details
            </h2>
            <p className="mt-2 text-gray-600">
              <strong>Transaction ID:</strong> {orderData.transactionId}
            </p>
            <p className="text-gray-600">
              <strong>Date:</strong>{" "}
              {new Date(orderData.timestamp).toLocaleDateString()}
            </p>
            <p className="text-gray-600">
              <strong>Total Amount:</strong> $
              {orderData.totalPrice.toFixed(2)}
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-700">
              Customer Details
            </h2>
            <p className="mt-2 text-gray-600">
              <strong>Name:</strong> {orderData.userName}
            </p>
            <p className="text-gray-600">
              <strong>Email:</strong> {orderData.userEmail}
            </p>
          </div>
        </div>

        {/* Items Purchased */}
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Items Purchased
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-700 font-semibold">
                <th className="py-3 px-4 border-b">Item</th>
                <th className="py-3 px-4 border-b text-right">Quantity</th>
                <th className="py-3 px-4 border-b text-right">Price</th>
              </tr>
            </thead>
            <tbody>
              {cart &&
                cart.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b">{item.name}</td>
                    <td className="py-3 px-4 border-b text-right">
                      {item.quantity}
                    </td>
                    <td className="py-3 px-4 border-b text-right">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
            </tbody>
            <tfoot>
              <tr className="font-bold text-gray-800">
                <td colSpan="2" className="py-3 px-4 text-right">
                  Grand Total:
                </td>
                <td className="py-3 px-4 text-right">
                  ${orderData.totalPrice.toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

  
      <div className="flex justify-center mt-6 print:hidden">
        <button
          onClick={handlePrint}
          className="flex items-center bg-green-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md transition-colors duration-300"
        >
          <FaPrint className="mr-2" /> Print / Save as PDF
        </button>
      </div>
    </div>
  );
};

export default InvoicePage;



