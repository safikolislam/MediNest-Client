import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

// Toggle switch component
const ToggleSwitch = ({ on, onClick }) => (
  <div
    onClick={onClick}
    className={`relative w-12 h-6 rounded-full transition-colors duration-300 cursor-pointer ${
      on ? "bg-green-500" : "bg-gray-400"
    }`}
  >
    <div
      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-300 ${
        on ? "translate-x-6" : "translate-x-0"
      }`}
    />
  </div>
);

const BannerAds = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch all medicines (admin view)
  const { data: medicines = [], isLoading, isError, error } = useQuery({
    queryKey: ["medicines"],
    queryFn: async () => {
      const res = await axiosSecure.get("/medicines"); // Seller or admin endpoint
      return res.data || [];
    },
  });

  // Toggle slider mutation
  const toggleMutation = useMutation({
    mutationFn: async ({ id }) => {
      await axiosSecure.patch(`/medicines/${id}/toggle-slider`);
    },
    onMutate: async ({ id }) => {
      await queryClient.cancelQueries({ queryKey: ["medicines"] });
      const previousData = queryClient.getQueryData({ queryKey: ["medicines"] });

      queryClient.setQueryData({ queryKey: ["medicines"] }, (old = []) =>
        old.map((med) =>
          med._id === id ? { ...med, inSlider: !med.inSlider } : med
        )
      );

      return { previousData };
    },
    onError: (err, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData({ queryKey: ["medicines"] }, context.previousData);
      }
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["medicines"] }),
  });

  const handleToggle = (id) => toggleMutation.mutate({ id });

  if (isLoading) return <p className="p-8">Loading medicines...</p>;
  if (isError)
    return (
      <p className="p-8 text-red-500">{error?.message || "Something went wrong"}</p>
    );

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-extrabold mb-6 text-green-800 border-b pb-2">
        Manage Banner Advertisements
      </h2>

      {medicines.length === 0 ? (
        <p>No medicines available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto bg-white rounded-lg shadow">
            <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <tr>
                <th className="py-3 px-6 text-left">Image</th>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Description</th>
                <th className="py-3 px-6 text-left">Seller Emails</th>
                <th className="py-3 px-6 text-center">In Slider</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {medicines.map((med) => (
                <tr key={med._id} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-6">
                    <img
                      src={med.image || "/placeholder.png"}
                      alt={med.name || "Medicine"}
                      className="w-16 h-16 rounded object-cover"
                    />
                  </td>
                  <td className="py-3 px-6">{med.name || "-"}</td>
                  <td className="py-3 px-6">{med.description || "-"}</td>
                  <td className="py-3 px-6">
                    {med.sellerEmails && med.sellerEmails.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {med.sellerEmails.map((email, idx) => (
                          <span
                            key={idx}
                            className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                          >
                            {email}
                          </span>
                        ))}
                      </div>
                    ) : (
                      "Unknown"
                    )}
                  </td>
                  <td className="py-3 px-6 text-center">
                    <ToggleSwitch
                      on={!!med.inSlider}
                      onClick={() => handleToggle(med._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BannerAds;




































