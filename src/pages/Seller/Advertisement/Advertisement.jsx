import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

// --- Modal ---
const AddAdModal = ({ isOpen, onClose, onAddAd, medicines }) => {
  const [medicineId, setMedicineId] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!medicineId || !image || !description) return alert("All fields required!");
    onAddAd({ medicineId, adImage: image, adDescription: description });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-bold">Request Advertisement</h2>

        <select
          value={medicineId}
          onChange={(e) => setMedicineId(e.target.value)}
          className="w-full border rounded p-2"
          required
        >
          <option value="">-- Select Medicine --</option>
          {medicines.map((m) => (
            <option key={m._id} value={m._id}>
              {m.name}
            </option>
          ))}
        </select>

        <input
          type="url"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Image URL"
          className="w-full border rounded p-2"
          required
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Short description..."
          className="w-full border rounded p-2"
          required
        />

        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="bg-gray-300 px-3 py-1 rounded">
            Cancel
          </button>
          <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

// --- Main Component ---
const Advertisement = () => {
  const [open, setOpen] = useState(false);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: medicines = [], isLoading, isError } = useQuery({
    queryKey: ["medicines"],
    queryFn: async () => (await axiosSecure.get("/seller-medicines-for-ads")).data,
  });

  const mutation = useMutation({
    mutationFn: (data) => axiosSecure.post("/request-advertisement", data),
    onSuccess: () => {
      queryClient.invalidateQueries(["medicines"]);
      alert("Advertisement request submitted!");
    },
    onError: () => alert("Failed to submit request."),
  });

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (isError) return <p className="text-center text-red-500">Failed to load medicines.</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Advertisement Dashboard</h1>
        <button
          onClick={() => setOpen(true)}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Advertise
        </button>
      </div>

      <div className="bg-white shadow rounded p-4">
        {medicines.length === 0 ? (
          <p className="text-center text-gray-500">No medicines found.</p>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2">Image</th>
                <th className="p-2">Name</th>
                <th className="p-2">Ad Status</th>
              </tr>
            </thead>
            <tbody>
              {medicines.map((m) => (
                <tr key={m._id} className="border-t">
                  <td className="p-2">
                    <img
                      src={m.image}
                      alt={m.name}
                      className="h-12 w-12 rounded object-cover"
                      onError={(e) =>
                        (e.currentTarget.src =
                          "https://placehold.co/48x48/E2E8F0/1A202C?text=No+Img")
                      }
                    />
                  </td>
                  <td className="p-2">{m.name}</td>
                  <td className="p-2">
                    {m.advertisementRequest?.status === "pending"
                      ? "Pending"
                      : m.inSlider
                      ? "In Slider"
                      : "Not in Slider"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <AddAdModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onAddAd={mutation.mutate}
        medicines={medicines}
      />
    </div>
  );
};

export default Advertisement;

