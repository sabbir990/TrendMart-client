import React from 'react'
import Top_section from '../../Components/Top_section/Top_section'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import useAuth from '../../Hooks/useAuth'
import toast from 'react-hot-toast'
import { CgSpinnerTwoAlt } from "react-icons/cg";
import { useMutation } from '@tanstack/react-query'
import useAxiosCommon from '../../Hooks/useAxiosCommon'

export default function Login_page() {
    const {login, setLoading, loading, googleLogin, facebookLogin} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosCommon = useAxiosCommon();

    const {mutateAsync} = useMutation({
        mutationFn : async (user) => {
            const {data} = await axiosCommon.put('/save-user', user);
            return data;
        }
    })

    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        
        const form = event.target;
        const user_email = form.user_email.value;
        const password = form.password.value;

        try{
            setLoading(true);

            await login(user_email, password);

            location.state !== null ? navigate(location.state) : navigate('/');

            toast.success('Login successful!');

            setLoading(false);
        }catch(error){
            setLoading(false);
            console.log(error);
            toast.error(error.message)
        }
    }

    const handleGoogleLogin = async() => {
        try{
            setLoading(true);

            const {user} = await googleLogin();
            
            const userData = {
                ...user,
                role : 'user'
            }

            await mutateAsync(userData);

            location.state !== null ? navigate(location.state) : navigate('/');

            setLoading(false);
        }catch(error){
            setLoading(false);
            console.log(error);
            toast.error(error.message)
        }
    }

    const handleFacebookLogin = async() => {
        try{
            setLoading(true);

            await facebookLogin();

            toast.success('Login Successful!');

            location.state ? navigate(location.state) : navigate('/')

            setLoading(true);
        }catch(error){
            setLoading(false);
            console.log(error);
            toast.error(error.message)
        }
    }

    return (
        <div className='bg-gray-100 py-8'>
            <div className="w-full max-w-sm p-6 m-auto mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
                <div className="flex justify-center mx-auto">
                    <Top_section heading={'Welcome Back to TrendMart'} description={'Log in to explore new adventures and manage your travel experiences'} />
                </div>

                <form className="mt-6" onSubmit={handleLoginSubmit}>
                    <div>
                        <label htmlFor="username" className="block text-sm text-gray-800 dark:text-gray-200">Username</label>
                        <input type="email" name='user_email' className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                    </div>

                    <div className="mt-4">
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm text-gray-800 dark:text-gray-200">Password</label>
                            <a href="#" className="text-xs text-gray-600 dark:text-gray-400 hover:underline">Forget Password?</a>
                        </div>

                        <input type="password" name='password' className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                    </div>

                    <div className="mt-6">
                        <button disabled={loading} className="w-full flex items-center justify-center px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                            {loading ? <CgSpinnerTwoAlt className='animate-spin' /> : 'Sign In'}
                        </button>
                    </div>
                </form>

                <div className="flex items-center justify-between mt-4">
                    <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/5"></span>

                    <a href="#" className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline">
                        or login with Social Media
                    </a>

                    <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/5"></span>
                </div>

                <div className="flex items-center mt-6 -mx-2">
                    <button onClick={handleGoogleLogin} type="button" className="flex items-center justify-center w-full px-6 py-2 mx-2 text-sm font-medium text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:bg-blue-400 focus:outline-none">
                        <svg className="w-4 h-4 mx-2 fill-current" viewBox="0 0 24 24">
                            <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z">
                            </path>
                        </svg>

                        <span className="hidden mx-2 sm:inline">Sign in with Google</span>
                    </button>

                    <button onClick={handleFacebookLogin} href="#" className="p-2 mx-2 text-sm font-medium text-gray-500 transition-colors duration-300 transform bg-gray-300 rounded-lg hover:bg-gray-200">
                        <svg className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.127V8.413c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.463.099 2.794.143v3.24h-1.918c-1.504 0-1.796.715-1.796 1.763v2.312h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.324V1.325C24 .593 23.407 0 22.675 0z" />
                        </svg>
                    </button>
                </div>

                <p className="mt-8 text-xs font-light text-center text-gray-400"> Don't have an account? <Link to={'/register'} href="#" className="font-medium text-gray-700 dark:text-gray-200 hover:underline">Create One</Link></p>
            </div>
        </div>
    )
}
