import { useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalPrice: contextTotal } = useAuth();

 
  const totalPrice = location.state?.totalPrice ?? contextTotal;

  const handleConfirm = () => {
    navigate("/invoice", { state: { totalPrice } });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Checkout
        </h2>

        <p className="mt-4 text-gray-600 text-center">
          Please review your order before proceeding.
        </p>

        <div className="mt-6 border-t pt-4">
          <p className="text-lg font-semibold text-gray-800">
            Grand Total:{" "}
            <span className="text-green-600">
              ${totalPrice?.toFixed(2)}
            </span>
          </p>
        </div>

        <button
          onClick={handleConfirm}
          className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition"
        >
          ✅ Confirm & Continue
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;





