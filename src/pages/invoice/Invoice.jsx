import { useRef, useState } from "react";
import useAuth from "../../hooks/useAuth";
import logo from "../../assets/MedicineLogo.png";

const Invoice = () => {
  const { cart, totalPrice } = useAuth();
  const { user } = useAuth();
  const invoiceRef = useRef();
  const [showNotification, setShowNotification] = useState(false);

  const handlePrint = () => {
   
    setShowNotification(true);

   
    setTimeout(() => setShowNotification(false), 20000);

   
    setTimeout(() => {
      window.print();
    }, 500);
  };

  return (
    <div className="mt-30 min-h-screen bg-gray-100 flex justify-center items-center py-10 relative">
   
      {showNotification && (
        <div className="absolute top-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-lg transition">
          📄 Print window opened! (Choose "Save as PDF" to download)
        </div>
      )}

      <div
        ref={invoiceRef}
        className="bg-white shadow-lg rounded-xl p-10 w-full max-w-3xl"
      >
   
        <div className="flex justify-between items-center border-b pb-4">
          <img src={logo} alt="Website Logo" className="h-12 w-auto" />
          <h2 className="text-2xl font-bold text-gray-800">Invoice</h2>
        </div>

    
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Billed To:</h3>
            <p className="text-gray-600 font-bold">
              {user?.displayName || "John Doe"}
            </p>
            <p className="text-gray-600 font-bold">
              {user?.email || "johndoe@email.com"}
            </p>
          </div>
          <div className="text-right">
            <h3 className="text-lg font-semibold text-gray-700">Invoice #</h3>
            <p className="text-gray-600">{Date.now()}</p>
            <p className="text-gray-600">
              Date: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>

     
        <div className="mt-8">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="py-2 px-3 font-semibold text-gray-700">Item</th>
                <th className="py-2 px-3 font-semibold text-gray-700">Company</th>
                <th className="py-2 px-3 font-semibold text-gray-700">Price</th>
                <th className="py-2 px-3 font-semibold text-gray-700">Quantity</th>
                <th className="py-2 px-3 font-semibold text-gray-700">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr
                  key={item._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="py-2 px-3 text-gray-700">{item.name}</td>
                  <td className="py-2 px-3 text-gray-600">{item.company}</td>
                  <td className="py-2 px-3 text-gray-600">
                    ${parseFloat(item.price).toFixed(2)}
                  </td>
                  <td className="py-2 px-3 text-gray-600">{item.quantity}</td>
                  <td className="py-2 px-3 font-semibold text-gray-800">
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

   
        <div className="flex justify-end mt-6">
          <div className="text-right">
            <p className="text-lg font-bold text-gray-800">
              Total: ${totalPrice.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={handlePrint}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg shadow-md transition"
          >
            🖨️ Print / Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default Invoice;


