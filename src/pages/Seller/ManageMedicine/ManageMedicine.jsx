import React, { useState } from "react";
import { useForm } from "react-hook-form";

const ManageMedicines = () => {
  const { register, handleSubmit, reset } = useForm();
  const [medicines, setMedicines] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const onSubmit = (data) => {
    const newMedicine = {
      id: Date.now(),
      ...data,
      image: URL.createObjectURL(data.image[0]),
    };
    setMedicines((prev) => [...prev, newMedicine]);
    reset();
    setModalOpen(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Manage Medicines</h2>
        <button
          onClick={() => setModalOpen(true)}
          className="btn btn-primary"
        >
          Add Medicine
        </button>
      </div>

    
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
              <tr key={med.id}>
                <td>{index + 1}</td>
                <td>
                  <img src={med.image} alt="img" className="w-12 h-12" />
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
                {...register("image", { required: true })}
                className="file-input file-input-bordered w-full"
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
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
                <button
                  onClick={() => setModalOpen(false)}
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
