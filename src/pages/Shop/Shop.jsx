import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useLocation } from "react-router";
import LoadingSpinner from "../../Components/LoadingSpinner";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { FcPrevious, FcNext } from "react-icons/fc";

function useUrlQuery() {
  return new URLSearchParams(useLocation().search);
}

const ITEMS_PER_PAGE = 6;

const Shop = () => {
  const query = useUrlQuery();
  const selectedCategory = query.get("category");

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

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

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

  // Filtering
  let filteredMedicines = selectedCategory
    ? medicines.filter((m) => m.category === selectedCategory)
    : medicines;

  if (searchTerm) {
    filteredMedicines = filteredMedicines.filter((m) =>
      m.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Sorting
  filteredMedicines = filteredMedicines.sort((a, b) => {
    if (sortOption === "priceLow") return a.price - b.price;
    if (sortOption === "priceHigh") return b.price - a.price;
    if (sortOption === "discount") return (b.discount || 0) - (a.discount || 0);
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(filteredMedicines.length / ITEMS_PER_PAGE);
  const paginatedMedicines = filteredMedicines.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="mt-15 flex flex-col p-6 min-h-screen gap-6 bg-gradient-to-b from-green-50 to-white">
      <h2 className="text-3xl font-bold mb-4 text-green-600">
        {selectedCategory ? `${selectedCategory} Medicines` : "All Medicines"}
      </h2>

      {/* Search + Sort */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search medicines..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded-xl px-4 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
        />
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
        >
          <option value="">Sort by</option>
          <option value="priceLow">Price: Low → High</option>
          <option value="priceHigh">Price: High → Low</option>
          <option value="discount">Discount: High → Low</option>
        </select>
      </div>

      {/* Medicines Table */}
      <div className="overflow-hidden rounded-xl shadow-lg border border-gray-200">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Price</th>
              <th className="p-3">Discount</th>
              <th className="p-3">Final Price</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedMedicines.map((med, index) => {
              const finalPrice = med.discount
                ? (med.price - (med.price * med.discount) / 100).toFixed(2)
                : med.price.toFixed(2);

              return (
                <tr
                  key={med._id || index}
                  className={`transition duration-200 ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-green-50`}
                >
                  <td className="p-3 border-t">
                    <img
                      className="h-12 w-12 object-cover rounded-md shadow-sm"
                      src={med.image}
                      alt={med.name}
                    />
                  </td>
                  <td className="p-3 border-t font-medium text-gray-800">{med.name}</td>
                  <td className="p-3 border-t text-gray-600">${med.price.toFixed(2)}</td>
                  <td className="p-3 border-t text-gray-600">
                    {med.discount ? (
                      <span className="text-red-500 font-semibold">{med.discount}%</span>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="p-3 border-t text-green-700 font-semibold">${finalPrice}</td>
                  <td className="p-3 border-t space-x-2">
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg shadow transition"
                      onClick={() => handleView(med)}
                    >
                      👁 View
                    </button>
                    <button
                      onClick={() => handleAddToCart(med)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg shadow transition"
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

      {/* Pagination - Previous / Next + Page number */}
      <div className="flex justify-center mt-6 gap-4 items-center">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`flex items-center gap-1 px-4 py-2 rounded-lg shadow border transition ${
            currentPage === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-700 hover:bg-green-100"
          }`}
        >
          <FcPrevious /> Previous
        </button>

        {/* Page number as text */}
        <span className="px-4 py-2 text-green-600 font-semibold">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`flex items-center gap-1 px-4 py-2 rounded-lg shadow border transition ${
            currentPage === totalPages
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-700 hover:bg-green-100"
          }`}
        >
          Next <FcNext />
        </button>
      </div>

      {/* Modal */}
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
              className="w-full h-44 object-cover mb-4 rounded-lg shadow"
            />
            <p className="text-gray-700 mb-2">
              <strong>Price:</strong> ${selectedMedicine.price.toFixed(2)}
            </p>
            {selectedMedicine.discount > 0 && (
              <p className="text-red-600 mb-2">
                <strong>Discount:</strong> {selectedMedicine.discount}%
              </p>
            )}
            <p className="text-green-700 mb-2 font-semibold">
              <strong>Final Price:</strong>{" "}
              {(
                selectedMedicine.price -
                (selectedMedicine.price * selectedMedicine.discount) / 100
              ).toFixed(2)}
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





