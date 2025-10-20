import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";

const LatestProducts = () => {
  const axiosSecure = useAxiosSecure();
  const { user, cart, setCart } = useAuth();

  const { data: latestProducts = [], isLoading, isError, error } = useQuery({
    queryKey: ["latestProducts"],
    queryFn: async () => {
      const res = await axiosSecure.get("/medicines/latest");
      return res.data.slice(0, 6);
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  const handleAddToCart = (product) => {
    if (!user) {
      toast.error("You need to be logged in to add items to the cart.");
      return;
    }

    const price = Number(product.price) || 0;
    const discount = Number(product.discount) || 0;
    const finalPrice = discount > 0 ? price - (price * discount) / 100 : price;

    const existingItem = cart.find((item) => item._id === product._id);

    if (existingItem) {
      const newCart = cart.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCart(newCart);
      toast.info(`Increased quantity of ${product.name}.`);
    } else {
      const newItem = {
        _id: product._id,
        name: product.name,
        price: parseFloat(finalPrice.toFixed(2)),
        discount,
        quantity: 1,
      };
      setCart([...cart, newItem]);
      toast.success(`${product.name} added to cart at a discounted price!`);
    }
  };

  if (isLoading)
    return <p className="text-center py-20">Loading latest products...</p>;

  if (isError)
    return (
      <div className="text-center py-10 max-w-7xl mx-auto px-4">
        <div className="text-red-600 font-semibold p-6 border-2 border-red-300 bg-red-50 rounded-xl">
          {error?.message || "Failed to load products."}
        </div>
      </div>
    );

  if (latestProducts.length === 0)
    return (
      <div className="text-center py-20 text-gray-500 max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4">No Latest Products Available</h2>
        <p>The server returned no latest product data.</p>
      </div>
    );

  return (
    <div data-aos="fade-up" data-aos-duration="1000"  className="container mx-auto px-4 py-12 max-w-[1600px] font-sans">
      <h2 className="text-4xl font-extrabold text-center mb-12 text-green-400   pb-3  mx-auto">
        Latest Arrivals 
      </h2>

      <div
        className="grid grid-cols-1 gap-6 
                   sm:grid-cols-3 sm:gap-8 
                   lg:grid-cols-4 lg:gap-6"
      >
        {latestProducts.map((product) => {
          const price = Number(product.price) || 0;
          const discount = Number(product.discount) || 0;
          const finalPrice = discount > 0 ? price - (price * discount) / 100 : price;

          return (
            <div
              key={product._id}
              className="bg-white rounded-xl shadow-xl border border-gray-100 transition-all duration-300 overflow-hidden flex flex-col hover:shadow-2xl hover:border-green-300"
            >
              <div className="h-40 w-full overflow-hidden bg-gray-50 relative">
                <img
                  src={product.image || "https://placehold.co/300x200/94A3B8/FFFFFF?text=Product"}
                  alt={product.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://placehold.co/300x200/94A3B8/FFFFFF?text=Image+Missing";
                  }}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                {discount > 0 && (
                  <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md transform -rotate-3">
                    -{discount}%
                  </span>
                )}
              </div>

              <div className="p-4 flex flex-col flex-grow">
                <span className="text-xs font-medium text-gray-500 mb-1">{product.category || "Health"}</span>
                <h3 className="text-lg font-bold text-black mb-3 line-clamp-2 min-h-[56px]">{product.name || "Untitled Medicine"}</h3>

                <div className="mt-auto pt-2">
                  {discount > 0 && <p className="text-sm text-gray-400 line-through">${price.toFixed(2)}</p>}
                  {discount === 0 && <div className="h-5"></div>}
                  <p className="text-2xl font-extrabold text-green-600">${finalPrice.toFixed(2)}</p>
                </div>

                <button
                  onClick={() => handleAddToCart(product)}
                  className="mt-4 w-full bg-green-600 text-white py-3 rounded-lg text-sm font-bold shadow-lg shadow-green-200 hover:bg-green-700 transition-colors duration-300 transform hover:scale-[1.01] flex items-center justify-center space-x-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <path d="M16 10a4 4 0 0 1-8 0"></path>
                  </svg>
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LatestProducts;










