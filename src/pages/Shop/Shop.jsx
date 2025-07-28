import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const Shop = () => {
  const { data: medicines = [], isLoading } = useQuery({
    queryKey: ['medicines'],
    queryFn: async () => {
      const res = await fetch('http://localhost:3000/medicines');
      if (!res.ok) throw new Error('Failed to fetch medicines');
      return res.json();
    }
  });

  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleView = (medicine) => {
    setSelectedMedicine(medicine);
    setIsModalOpen(true);
  };

  const handleSelect = (medicine) => {
    setSelectedItems(prev => [...prev, medicine]);
    alert(`Selected: ${medicine.name}`);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMedicine(null);
  };

  if (isLoading) return <div className="p-6">Loading...</div>;

  return (
    <div className="flex p-6 min-h-screen gap-6">
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-4">All Medicines</h2>
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((med) => (
              <tr key={med.id} className="border-t">
                <td className="p-2 border">{med.name}</td>
                <td className="p-2 border">${parseFloat(med.price).toFixed(2)}</td>
                <td className="p-2 border space-x-2">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                    onClick={() => handleView(med)}
                  >
                    👁 View
                  </button>
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded"
                    onClick={() => handleSelect(med)}
                  >
                    ➕ Select
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && selectedMedicine && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
              onClick={closeModal}
            >
              ✖
            </button>
            <h3 className="text-xl font-semibold mb-2">{selectedMedicine.name}</h3>
            {selectedMedicine.image ? (
              <img
                src={selectedMedicine.image}
                alt={selectedMedicine.name}
                className="w-full h-40 object-cover mb-3 rounded"
              />
            ) : (
              <div className="w-full h-40 bg-gray-200 flex items-center justify-center mb-3 rounded">
                <span className="text-gray-500">No Image</span>
              </div>
            )}
            <p><strong>Price:</strong> ${parseFloat(selectedMedicine.price).toFixed(2)}</p>
            <p><strong>Description:</strong> {selectedMedicine.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;












