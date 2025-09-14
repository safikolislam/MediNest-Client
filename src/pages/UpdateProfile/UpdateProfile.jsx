import { useForm } from 'react-hook-form';
import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../Contexts/AuthContext';

const UpdateProfile = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { user, updateUserProfile } = useContext(AuthContext); 
  const [profilePic, setProfilePic] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const onSubmit = async (data) => {
    if (!user) {
      setMessage('No user is logged in.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      await updateUserProfile({
        displayName: data.name,
        photoURL: profilePic || user.photoURL,
      });

    
      setMessage('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

const handleImageUpload = async (e) => {
  const image = e.target.files[0];
  if (!image) return;

  const formData = new FormData();
  formData.append('file', image); // must be 'file', not 'image'
  formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

  try {
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/image/upload`;

    const res = await axios.post(cloudinaryUrl, formData);

    setProfilePic(res.data.secure_url);
    setMessage('Image uploaded successfully!');
  } catch (error) {
    console.error('Image upload failed:', error);
    setMessage('Image upload failed.');
  }
};


  return (
    <div className="mt-20 flex flex-col md:flex-row items-center justify-center gap-36 p-8">
      <div className="lg:w-[500px] bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>

          {message && <p className="text-center text-sm mb-4">{message}</p>}

          <fieldset className="mb-4">
            <label className="label mt-4">Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="input input-bordered w-full"
              placeholder="Full Name"
              defaultValue={user?.displayName || ''}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">Name is required</p>
            )}

            <label className="label mt-4">Upload Photo</label>
            <input
              type="file"
              accept="image/*"
              className="file-input file-input-bordered w-full"
              onChange={handleImageUpload}
            />

            {profilePic && (
              <div className="mt-4">
                <p className="text-sm">Preview:</p>
                <img
                  src={profilePic}
                  alt="Preview"
                  className="h-20 w-20 rounded-full object-cover border mt-2"
                />
              </div>
            )}
          </fieldset>

          <button
            type="submit"
            className="btn bg-green-600 text-white w-full mt-2"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;


































