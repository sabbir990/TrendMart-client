import React from 'react'
import Top_section from '../../Components/Top_section/Top_section'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import useAuth from '../../Hooks/useAuth'
import useHostImage from '../../Hooks/useHostImage';
import toast from 'react-hot-toast';
import { CgSpinnerTwoAlt } from "react-icons/cg";
import useAxiosCommon from '../../Hooks/useAxiosCommon';
import { useMutation } from '@tanstack/react-query';


export default function Register() {
    const { createUser, updateUserProfile, loading, setLoading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosCommon = useAxiosCommon();

    const {mutateAsync} = useMutation({
        mutationFn : async(user) => {
            const {data} = await axiosCommon.put('/save-user', user);
            return data
        }
    })

    const handleRegisterSubmit = async (event) => {
        event.preventDefault();

        const form = event.target;
        const user_name = form.user_name.value;
        const user_image = form.user_image.files[0];
        const role = form.user_role.value;
        const user_email = form.user_email.value;
        const password = form.password.value;
        const confirm_password = form.confirm_password.value;

        if (password !== confirm_password) {
            return toast.error("Your password and confirm password must be same");
        }

        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(password)) {
            return toast.error("Your password must have an uppercase, a lowercase, a number, a special character and at least 6 characters in it!")
        }

        try {
            setLoading(true);
            const image_url = await useHostImage(user_image);

            const {user} = await createUser(user_email, password);
            await updateUserProfile(user_name, image_url);

            const userData = {
                ...user,
                role
            }

            await mutateAsync(userData);

            toast.success('Creating user Successful!')

            location.state !== null ? navigate(location.state) : navigate('/')
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error)
            toast.error(error.message)
        }
    }
    return (
        <div className='py-8'>
            <section className="bg-white dark:bg-gray-900">
                <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
                    <form className="w-full max-w-md" onSubmit={handleRegisterSubmit}>
                        <div className="flex justify-center mx-auto">
                            <Top_section heading={'Join TrendMart Today'} description={'Create an account to access the latest trends and exclusive deals'} />
                        </div>

                        <div className="relative flex items-center mt-8">
                            <span className="absolute">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </span>

                            <input type="text" required name='user_name' className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Username" />
                        </div>

                        <input type="file" name='user_image' className='p-3 rounded-lg border-2 border-gray-300 border-dashed w-full mt-6' />

                        <select name="user_role" className='p-3 rounded-lg border-2 border-gray-300 border-dashed w-full mt-6'>
                            <option value="user">User</option>
                            <option value="vendor">Vendor</option>
                        </select>

                        <div className="relative flex items-center mt-6">
                            <span className="absolute">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </span>

                            <input type="email" required name='user_email' className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Email address" />
                        </div>

                        <div className="relative flex items-center mt-4">
                            <span className="absolute">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </span>

                            <input required type="password" name='password' className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Password" />
                        </div>

                        <div className="relative flex items-center mt-4">
                            <span className="absolute">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </span>

                            <input required type="password" name='confirm_password' className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Confirm Password" />
                        </div>

                        <div className="mt-6">
                            <button
                                disabled={loading}
                                type="submit"
                                className="w-full bg-blue-500 flex justify-center items-center text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                            >

                                {
                                    loading ? <CgSpinnerTwoAlt className='animate-spin' /> : 'Register'
                                }
                            </button>

                            <div className="mt-6 text-center ">
                                <Link to={'/login'} href="#" className="text-sm text-blue-500 hover:underline dark:text-blue-400">
                                    Already have an account?
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    )
}
