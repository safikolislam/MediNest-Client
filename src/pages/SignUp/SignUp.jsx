import { useForm } from 'react-hook-form';
import { Link } from 'react-router'; 
import SocialLogin from '../SocialLogin/SocialLogin';

import image from "../../assets/pharmacyImage.avif";
import { useState } from 'react';
import axios from 'axios';

import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import { saveUserInDb } from '../../api/utilitis';
import { toast } from 'react-toastify';


const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = useAuth();
    const [profilePic, setProfilePic] = useState('');

    const onSubmit = async (data) => {
        try {
            
            const result = await createUser(data.email, data.password);

          
            const userProfile = {
                displayName: data.username,
                photoURL: profilePic,
            };

            await updateUserProfile(userProfile);
               const userData = {
                          name:result?.user?.displayName,
                          email:result?.user?.email,
                          image:result?.user?.photoURL,
                         }
                         saveUserInDb(userData)
   
            Swal.fire({
                title: 'Success!',
                text: 'Successfully signed up ',
                icon: 'success',
                confirmButtonText: 'Okay',
            });

            console.log("User created:", result.user);
        } catch (error) {
            console.error(error);
            toast.error("Signup failed. Please try again.");
        }
    };

    const handleImageUpload = async (e) => {
        const imageFile = e.target.files[0];
        if (!imageFile) return;

        try {
            const formData = new FormData();
            formData.append('image', imageFile);

            const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`;
            const res = await axios.post(imageUploadUrl, formData);

            setProfilePic(res.data.data.url);
            toast.success("Image uploaded!");
        } catch (error) {
            console.error(error);
            toast.error("Image upload failed.");
        }
    };

    return (
        <div className="flex flex-col md:flex-row items-center justify-center gap-36 p-8 mt-10">
            <div className="lg:w-[500px] bg-white p-6 rounded-lg shadow-md">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h2 className="text-2xl font-semibold mb-4">Create An Account!</h2>
                    <fieldset className="mb-4">
                        <label className="label">Username</label>
                        <input
                            type="text"
                            {...register("username", { required: true })}
                            className="input input-bordered w-full"
                            placeholder="Username"
                        />
                        {errors.username && (
                            <p className="text-red-500 text-sm">Username is required</p>
                        )}

                        <label className="label mt-4">Email</label>
                        <input
                            type="email"
                            {...register("email", { required: true })}
                            className="input input-bordered w-full"
                            placeholder="Email"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm">Email is required</p>
                        )}

                        <label className="label mt-4">Password</label>
                        <input
                            type="password"
                            {...register("password", { required: true, minLength: 6 })}
                            className="input input-bordered w-full"
                            placeholder="Password"
                        />
                        {errors.password?.type === 'required' && (
                            <p className="text-red-500 text-sm">Password is required</p>
                        )}
                        {errors.password?.type === 'minLength' && (
                            <p className="text-red-500 text-sm">Password must be at least 6 characters long</p>
                        )}

                        <label className="label mt-4">Upload Photo</label>
                        <input
                            type="file"
                            className="file-input file-input-bordered w-full"
                            onChange={handleImageUpload}
                        />

                        <label className="label mt-4">Select Role</label>
                        <select
                            {...register("role", { required: true })}
                            className="select select-bordered w-full"
                        >
                            <option value="">Select role</option>
                            <option value="user">User</option>
                            <option value="seller">Seller</option>
                        </select>
                        {errors.role && (
                            <p className="text-red-500 text-sm">Role is required</p>
                        )}

                        <div className="mt-2">
                            <a className="link link-hover text-sm text-blue-600">Forgot password?</a>
                        </div>
                    </fieldset>

                    <p className="text-sm mb-2">
                        Already have an account?
                        <Link className="btn btn-link text-green-600 p-0 ml-1" to="/login">Login</Link>
                    </p>

                    <button type="submit" className="btn bg-green-600 text-white w-full mt-2">
                        SignUp
                    </button>

                    <div className="mt-4">
                        <SocialLogin />
                    </div>
                </form>
            </div>

            <div className="w-full md:w-1/2">
                <img
                    src={image}
                    alt="Sign Up Illustration"
                    className="w-[600px] h-auto object-cover rounded-lg"
                />
            </div>
        </div>
    );
};

export default SignUp;









