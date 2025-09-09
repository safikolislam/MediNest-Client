import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import useAuth from "./useAuth";


export const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth();

  useEffect(() => {
    
    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("access-token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

   
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (res) => res,
      async (error) => {
        const status = error.response?.status;

       
        if ((status === 401 || status === 403) && localStorage.getItem("access-token")) {
          console.warn("Unauthorized request - logging out");
          await logOut();
          navigate("/login");
        }

        return Promise.reject(error);
      }
    );


    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;




  