import '../Components/Css/CheckOutForm.css'
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router';

const CheckOutForm = ({ totalPrice }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const { user, cart,setCart } = useAuth();

  useEffect(() => {
    if (totalPrice > 0) {
      setProcessing(true);
      setCardError(null);

      axios
        .post(`${import.meta.env.VITE_API_URL}/create-payment-intent`, {
          totalPrice,
        })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        })
        .catch((error) => {
          console.error("Error fetching client secret:", error);
          setCardError("Failed to initialize payment. Please try again.");
          toast.error("Could not connect to payment server.");
        })
        .finally(() => {
          setProcessing(false);
        });
    } else {
      setClientSecret("");
    }
  }, [totalPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      console.log("Stripe.js not loaded or no client secret.");
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) return;

    setProcessing(true);
    setCardError(null);

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card,
          billing_details: {
            name: user?.displayName,
            email: user?.email,
          },
        },
      }
    );

    if (error) {
      console.error("[stripe_error]", error);
      setCardError(error.message);
      toast.error(error.message || "An unexpected error occurred.");
      setProcessing(false);
    } else if (paymentIntent.status === "succeeded") {
     
      const orderData = {
        userName: user?.displayName,
        userEmail: user?.email,
        transactionId: paymentIntent.id,
        totalPrice,
        cart, 
      };

      axios.post(`${import.meta.env.VITE_API_URL}/save-order`, orderData)
        .then((res) => {
          if (res.data.insertedId) {
            toast.success("Payment successful and order saved!");
            localStorage.removeItem('cart');
            setCart([])
            navigate("/invoice", { state: { orderData, cart } });
          }
        })
        .catch((error) => {
          console.error("Error saving order:", error);
          toast.error("Payment was successful, but the order could not be saved.");
        });

      setProcessing(false);
    } else {
      setCardError(`Payment status: ${paymentIntent.status}`);
      setProcessing(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto p-4 rounded-lg shadow-sm"
    >
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Card Details
      </label>
      <div className="p-3 rounded-md bg-white">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: { color: "#9e2146" },
            },
          }}
        />
      </div>

      {cardError && (
        <p className="text-red-600 text-sm mt-2">{cardError}</p>
      )}

      <button
        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-md mt-5 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
        type="submit"
        disabled={!stripe || processing}
      >
        {processing ? "Processing..." : `Pay $${Number(totalPrice || 0).toFixed(2)}`}
      </button>
    </form>
  );
};

export default CheckOutForm;







