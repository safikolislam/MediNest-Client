import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import LoadingSpinner from "../../Components/LoadingSpinner";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const Shop = () => {
  const { data: medicines = [], isLoading } = useQuery({
    queryKey: ["medicines"],
    queryFn: async () => {
      const res = await fetch("https://medinest-server-psi.vercel.app/medicines");
      return res.json();
    },
  });

  const { addToCart, user } = useAuth();
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleView = (medicine) => {
    setSelectedMedicine(medicine);
    setIsModalOpen(true);
  };

  const handleAddToCart = (medicine) => {
    if (!user) {
      toast.error("You must be logged in to add items to the cart");
      return;
    }
    addToCart(medicine);
    toast.success(`${medicine.name} added to cart 🛒`);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMedicine(null);
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="flex p-6 min-h-screen gap-6 bg-gray-50 mt-5">
      <div className="flex-1">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">All Medicines</h2>
        <div className="overflow-hidden rounded-lg shadow-lg">
          <table className="w-full border border-gray-200">
            <thead>
              <tr className="bg-gradient-to-r from-green-500 to-blue-500 text-white text-left">
                <th className="p-3">Image</th>
                <th className="p-3">Name</th>
                <th className="p-3">Price</th>
                <th className="p-3">Discount</th>
                <th className="p-3">Final Price</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {medicines.map((med, index) => {
                const finalPrice = med.discount
                  ? (med.price - (med.price * med.discount) / 100).toFixed(2)
                  : med.price.toFixed(2);

                return (
                  <tr
                    key={index}
                    className={`transition duration-200 ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-green-50`}
                  >
                    <td className="p-3 border-t font-medium text-gray-700">
                      <img
                        className="h-12 w-12 object-cover rounded"
                        src={med.image}
                        alt={med.name}
                      />
                    </td>
                    <td className="p-3 border-t font-medium text-gray-700">{med.name}</td>
                    <td className="p-3 border-t text-gray-600">${med.price.toFixed(2)}</td>
                    <td className="p-3 border-t text-gray-600">
                      {med.discount ? `${med.discount}%` : "—"}
                    </td>
                    <td className="p-3 border-t text-gray-600">${finalPrice}</td>
                    <td className="p-3 border-t space-x-2">
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg shadow-sm transition"
                        onClick={() => handleView(med)}
                      >
                        👁 View
                      </button>
                      <button
                        onClick={() => handleAddToCart(med)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg shadow-sm transition"
                      >
                        ➕ Select
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && selectedMedicine && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-96 relative animate-fadeIn">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
              onClick={closeModal}
            >
              ✖
            </button>
            <h3 className="text-2xl font-semibold mb-3 text-gray-800">
              {selectedMedicine.name}
            </h3>
            <img
              src={selectedMedicine.image}
              alt={selectedMedicine.name}
              className="w-full h-44 object-cover mb-4 rounded-lg"
            />
            <p className="text-gray-700 mb-2">
              <strong>Price:</strong> ${selectedMedicine.price.toFixed(2)}
            </p>
            {selectedMedicine.discount > 0 && (
              <p className="text-red-600 mb-2">
                <strong>Discount:</strong> {selectedMedicine.discount}%
              </p>
            )}
            <p className="text-green-700 mb-2">
              <strong>Final Price:</strong>{" "}
              ${(selectedMedicine.price - (selectedMedicine.price * selectedMedicine.discount) / 100).toFixed(2)}
            </p>
            <p className="text-gray-600">
              <strong>Description:</strong>{" "}
              {selectedMedicine.description || "No description available."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
