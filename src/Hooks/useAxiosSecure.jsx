import axios from 'axios'
import useAuth from './useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const axiosSecure = axios.create({
  baseURL: 'https://trensmartserver.vercel.app'
})
export default function useAxiosSecure() {
  const {logOut, setLoading} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  axiosSecure.interceptors.request.use(function (config) {
    const token = localStorage.getItem('access_token');
    if(token){
      config.headers.authorization = `Bearer ${token}`
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

  axiosSecure.interceptors.response.use(function (response) {
    return response;
  }, async function (error) {
    const status = error?.status;
    if(status === 401 || status === 403){
      try{
        await logOut();

        navigate('/login', {
          state : location.pathname
        })

        toast.error("This is not your admin account. Go ahead with an admin account for this operation!")

        setLoading(false);
      }catch(err){
        console.log(err);
        toast.error(err.message)
      }
    }
    return Promise.reject(error);
  });

  return axiosSecure;
}
