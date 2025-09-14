import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import image from '../../assets/pharmacyImage.avif';

import Swal from 'sweetalert2';
import { saveUserInDb } from '../../api/utilitis';
import useAuth from '../../hooks/useAuth';
import { useState } from 'react';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signIn } = useAuth(); 

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = data => {
    console.log(data);
    signIn(data.email, data.password)
      .then(result => {
        const userData = {
          name: result?.user?.displayName,
          email: result?.user?.email,
          image: result?.user?.photoURL,
        }
        saveUserInDb(userData);
        Swal.fire({
          title: 'Success!',
          text: 'Successfully signed up',
          icon: 'success',
          confirmButtonText: 'Okay',
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="mt-30 flex flex-col md:flex-row items-center justify-center gap-36 p-8">

      <div className="lg:w-[500px] bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-2xl font-semibold mb-4">Login to Your Account</h2>

          <fieldset className="mb-4">
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input input-bordered w-full"
              placeholder="Email"
            />
            {errors.email?.type === 'required' && (
              <p className="text-red-500 text-sm">Email is required</p>
            )}

            <label className="label mt-4">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                {...register("password", { required: true, minLength: 6 })}
                className="input input-bordered w-full pr-10"
                placeholder="Password"
              />
              <span
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-500"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </span>
            </div>
            {errors.password?.type === 'required' && (
              <p className="text-red-500 text-sm">Password is required</p>
            )}
            {errors.password?.type === 'minLength' && (
              <p className="text-red-500 text-sm">Password must be at least 6 characters long</p>
            )}

            <div className="mt-2">
              <a className="link link-hover text-sm text-blue-600">Forgot password?</a>
            </div>
          </fieldset>

          <p className="text-sm mb-2">
            Don't have an account?
            <Link className="btn btn-link text-green-600 p-0 ml-1" to="/SignUp">SignUp</Link>
          </p>

          <button type="submit" className="btn bg-green-600 text-white w-full mt-2">
            Login
          </button>

          <div className="mt-4">
            <SocialLogin />
          </div>
        </form>
      </div>

      <div className="w-full md:w-1/2">
        <img
          src={image}
          alt="Login Illustration"
          className="w-[600px] h-auto object-cover rounded-lg"
        />
      </div>
    </div>
  );
};

export default Login;





