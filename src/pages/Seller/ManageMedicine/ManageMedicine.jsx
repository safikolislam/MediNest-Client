import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";

const ManageMedicines = () => {
  const { register, handleSubmit, reset } = useForm();
  const [modalOpen, setModalOpen] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

   const queryClient = useQueryClient();

 
  const { data: medicines = [], isLoading } = useQuery({
    queryKey: ['medicines'],
    queryFn: async () => {
      const res = await fetch('https://medinest-server-psi.vercel.app/medicines');
      return res.json();
    }
  });

 
   const mutation = useMutation({
     mutationFn: async (newMedicine) => {
       const res = await axios.post("https://medinest-server-psi.vercel.app/medicines", newMedicine);
       return res.data;
     },
     onSuccess: () => {
       queryClient.invalidateQueries(['medicines']); 
     },
   });

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    if (!image) return;

    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`,
        formData
      );
      setUploadedImageUrl(res.data.data.url);
    } catch (error) {
      console.error("Image upload failed:", error);
      alert("Failed to upload image");
    }
  };

  const onSubmit = async (data) => {
    if (!uploadedImageUrl) {
      alert("Please upload an image before submitting.");
      return;
    }

    const newMedicine = {
      ...data,
      price: parseFloat(data.price),
      discount: parseFloat(data.discount),
      image: uploadedImageUrl,
    };

    try {
      await mutation.mutateAsync(newMedicine);
      reset();
      setUploadedImageUrl("");
      setModalOpen(false);
    } catch (error) {
      alert("Failed to add medicine");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Manage Medicines</h2>
        <button onClick={() => setModalOpen(true)} className="btn bg-green-500">
          Add Medicine
        </button>
      </div>

      {isLoading ? (
        <p>Loading medicines...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Generic</th>
                <th>Category</th>
                <th>Company</th>
                <th>Mass</th>
                <th>Price</th>
                <th>Discount</th>
              </tr>
            </thead>
            <tbody>
              {medicines.map((med, index) => (
                <tr key={med._id || med.id}>
                  <td>{index + 1}</td>
                  <td>
                    <img src={med.image} alt="Medicine" className="w-12 h-12" />
                  </td>
                  <td>{med.name}</td>
                  <td>{med.generic}</td>
                  <td>{med.category}</td>
                  <td>{med.company}</td>
                  <td>{med.massUnit}</td>
                  <td>${med.price}</td>
                  <td>{med.discount}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modalOpen && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Add Medicine</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              <input
                type="text"
                placeholder="Item Name"
                {...register("name", { required: true })}
                className="input input-bordered w-full"
              />
              <input
                type="text"
                placeholder="Generic Name"
                {...register("generic", { required: true })}
                className="input input-bordered w-full"
              />
              <textarea
                placeholder="Short Description"
                {...register("description")}
                className="textarea textarea-bordered w-full"
              />
              <input
                type="file"
                className="file-input file-input-bordered w-full"
                onChange={handleImageUpload}
              />
              <select {...register("category")} className="select select-bordered w-full">
                <option value="Painkiller">Painkiller</option>
                <option value="Antibiotic">Antibiotic</option>
              </select>
              <select {...register("company")} className="select select-bordered w-full">
                <option value="Pfizer">Pfizer</option>
                <option value="Novartis">Novartis</option>
              </select>
              <select {...register("massUnit")} className="select select-bordered w-full">
                <option value="Mg">Mg</option>
                <option value="ML">ML</option>
              </select>
              <input
                type="number"
                placeholder="Per Unit Price"
                {...register("price", { required: true })}
                className="input input-bordered w-full"
              />
              <input
                type="number"
                placeholder="Discount %"
                defaultValue={0}
                {...register("discount")}
                className="input input-bordered w-full"
              />
              <div className="modal-action">
                <button type="submit" className="btn bg-green-500">
                  Save
                </button>
                <button
                  onClick={() => {
                    setModalOpen(false);
                    setUploadedImageUrl("");
                  }}
                  className="btn btn-ghost"
                  type="button"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ManageMedicines;




















