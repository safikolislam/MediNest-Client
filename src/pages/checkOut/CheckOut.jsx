import { useLocation } from "react-router";
import useAuth from "../../hooks/useAuth";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "../../Components/CheckOutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK_KEY);

const CheckoutPage = () => {
  const location = useLocation();
  const { cart } = useAuth();

 
  const discountedTotal = cart.reduce((acc, item) => {
    const finalPrice = item.discount
      ? item.price - (item.price * item.discount) / 100
      : item.price;
    return acc + finalPrice * item.quantity;
  }, 0);

  
  const totalPrice =
    location.state?.discountedTotal !== undefined
      ? location.state.discountedTotal
      : discountedTotal;

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
            <span className="text-green-600">${totalPrice.toFixed(2)}</span>
          </p>
        </div>

        <Elements stripe={stripePromise}>
          <CheckOutForm totalPrice={totalPrice} />
        </Elements>
      </div>
    </div>
  );
};

export default CheckoutPage;








