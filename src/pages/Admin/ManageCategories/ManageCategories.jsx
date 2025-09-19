import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import axios from 'axios';

const ManageCategories = () => {
  const { register, handleSubmit, reset } = useForm();
  const [modalOpen, setModalOpen] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const queryClient = useQueryClient();

  // Fetch categories
  const { data: categories = [], isLoading: isCategoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/categories`);
      return res.data;
    },
  });

  // Add category mutation
  const addCategoryMutation = useMutation({
    mutationFn: async (newCategory) => {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/categories`, newCategory);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['categories']);
      Swal.fire('Success!', 'Category added successfully.', 'success');
      reset();
      setUploadedImageUrl('');
      setModalOpen(false);
    },
    onError: (error) => {
      console.error('Add category error:', error);
      Swal.fire('Error!', 'Failed to add category.', 'error');
    },
  });

  // Delete category mutation
  const deleteCategoryMutation = useMutation({
    mutationFn: async (categoryId) => {
      const res = await axios.delete(`${import.meta.env.VITE_API_URL}/categories/${categoryId}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['categories']);
      Swal.fire('Deleted!', 'Category deleted successfully.', 'success');
    },
    onError: (error) => {
      console.error('Delete category error:', error);
      Swal.fire('Error!', 'Failed to delete category.', 'error');
    },
  });

  // Image upload
  const handleImageUpload = async (e) => {
    const imageFile = e.target.files[0];
    if (!imageFile) return;

    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/image/upload`,
        formData
      );
      setUploadedImageUrl(res.data.secure_url);
      Swal.fire('Success!', 'Image uploaded successfully.', 'success');
    } catch (error) {
      console.error('Image upload failed:', error);
      Swal.fire('Error!', 'Failed to upload image.', 'error');
    }
  };

  // Submit form
  const onSubmit = (data) => {
    if (!uploadedImageUrl) {
      Swal.fire('Warning!', 'Please upload an image before submitting.', 'warning');
      return;
    }

    const newCategory = {
      categoryName: data.categoryName,
      categoryImage: uploadedImageUrl,
    };
    addCategoryMutation.mutate(newCategory);
  };

  // Delete handler
  const handleDelete = (categoryId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCategoryMutation.mutate(categoryId);
      }
    });
  };

  if (isCategoriesLoading) return <p>Loading categories...</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Manage Categories</h2>
        <button
          onClick={() => {
            setModalOpen(true);
            reset();
            setUploadedImageUrl('');
          }}
          className="btn bg-green-500 text-white"
        >
          Add Category
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Category Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={category._id}>
                <td>{index + 1}</td>
                <td>
                  {category.categoryImage ? (
                    <img
                      src={category.categoryImage}
                      alt={category.categoryName}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 flex items-center justify-center text-gray-500">
                      No Image
                    </div>
                  )}
                </td>
                <td>{category.categoryName}</td>
                <td>
                  <button
                    onClick={() => handleDelete(category._id)}
                    className="btn btn-sm btn-error text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Category Modal */}
      {modalOpen && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Add New Category</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
              <input
                type="text"
                placeholder="Category Name"
                {...register('categoryName', { required: true })}
                className="input input-bordered w-full"
              />
              <input
                type="file"
                className="file-input file-input-bordered w-full"
                onChange={handleImageUpload}
              />
              <div className="modal-action">
                <button
                  type="submit"
                  className="btn bg-green-500 text-white"
                  disabled={addCategoryMutation.isLoading}
                >
                  {addCategoryMutation.isLoading ? 'Saving...' : 'Save'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setModalOpen(false);
                    reset();
                    setUploadedImageUrl('');
                  }}
                  className="btn btn-ghost"
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

export default ManageCategories;

















