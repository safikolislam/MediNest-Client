import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import toast from "react-hot-toast";


const Store = () => {
  const { cart, setCart, removeFromCart, clearCart, totalPrice } = useAuth();
  const navigate = useNavigate();

  const updateQuantity = async (_id, newQuantity) => {
    const item = cart.find((i) => i._id === _id);
    if (!item) return;
    if (newQuantity < 1) return;

    setCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem._id === _id ? { ...cartItem, quantity: newQuantity } : cartItem
      )
    );

    try {
      const status = newQuantity > item.quantity ? "increase" : "decrease";
      const quantityToUpdate = Math.abs(newQuantity - item.quantity);

      await axios.patch(
        `${import.meta.env.VITE_API_URL}/quantity-update/${_id}`,
        {
          quantityToUpdate,
          status,
        }
      );
    } catch (error) {
      console.error("Error updating backend quantity:", error);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h2 className="text-4xl font-bold mb-6 mt-20 text-center text-gray-800">
        🛒 Your Cart
      </h2>
     
 {cart.length === 0 ? (
  <div className="text-center mt-10">
    <p className="text-gray-500 text-lg mb-4">
      Your cart is empty
    </p>
    <button
      onClick={() => navigate("/shop")}
      className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition"
    >
      🛍️ Go to Shop
    </button>
  </div>
         
      ) : (
        <div className="max-w-4xl mx-auto">
          <ul className="space-y-4">
            {cart.map((item) => (
              <li
                key={item._id}
                className="p-4 bg-white rounded-xl shadow-md flex flex-col md:flex-row md:justify-between items-start md:items-center hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex-1 w-full">
                  <p className="font-semibold text-lg text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Company: {item.company}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Price: ${parseFloat(item.price).toFixed(2)} per unit
                  </p>
                  <p className="text-sm font-semibold text-green-600 mt-1">
                    Subtotal: ${(item.price * item.quantity).toFixed(2)}
                  </p>

                  <div className="flex items-center space-x-2 mt-3 bg-gray-100 p-1 rounded-lg w-max">
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="px-3 py-1 bg-gray-300 rounded-lg hover:bg-gray-400 transition disabled:opacity-50"
                    >
                      -
                    </button>

                    <span className="px-3 font-semibold">{item.quantity}</span>

                    <button
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      className="px-3 py-1 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
                    >
                      +
                    </button>
                  </div>

             <button
  className="mt-3 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
  onClick={() => {
    removeFromCart(item._id);
    toast.success("Item removed from cart!");
  }}
>
  ❌ Remove
</button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col md:flex-row md:justify-between items-center bg-white p-6 rounded-xl shadow-md">
            <p className="text-xl font-bold text-gray-800">
              Total: ${totalPrice.toFixed(2)}
            </p>

            <div className="flex space-x-4 mt-4 md:mt-0">
              <button
                className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-lg transition"
                onClick={clearCart}
              >
                🗑️ Clear All
              </button>
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition"
                onClick={() => navigate("/checkout")}
              >
                ✅ Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Store;







































































































































































