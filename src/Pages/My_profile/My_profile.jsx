import React from 'react';
import useAuth from '../../Hooks/useAuth';
import useRole from '../../Hooks/useRole';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const My_profile = () => {
    const { user, loading, resetPassword, logOut, setUser } = useAuth();
    const { role } = useRole();
    const navigate = useNavigate();

    const handleResetPassword = async () => {
        try{
            await resetPassword(user?.email);

            toast.success("We've sent an email to you. Check it to reset your password!")
        }catch(error){
            console.log(error);
            toast.error(error.message)
        }
    }
    return (
        <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
            {!loading ? (
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                    <div className="flex flex-col items-center mb-4">
                        <img
                            className="w-24 h-24 rounded-full mb-3"
                            src={user?.photoURL || 'https://via.placeholder.com/150'}
                            alt={user?.displayName}
                        />
                        <h1 className="text-xl font-bold">{user?.displayName}</h1>
                        <p className="text-gray-500">{user?.email}</p>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <h2 className="text-lg font-semibold">Account Information</h2>
                            <p><span className="font-semibold">Email Verified:</span> {user?.emailVerified ? 'Yes' : 'No'}</p>
                            <p><span className="font-semibold">Phone Number:</span> {user?.phoneNumber || 'N/A'}</p>
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold">User Role</h2>
                            <p>{role && role}</p>
                        </div>
                        <div>
                            <p><span className="font-semibold">UID:</span> {user?.uid}</p>
                        </div>
                    </div>
                    <div className='mt-8 space-y-2'>
                        <Link to={'/update-profile'} className='w-full btn btn-primary'>Update Profile</Link>
                        <button onClick={handleResetPassword} className='w-full btn btn-secondary'>Change Password</button>
                        <button onClick={async() => {
                            try{
                                await logOut();
                                navigate('/');
                                setUser(null)
                                toast.success("Logging out successful!");
                            }catch(error){
                                console.log(error);
                                toast.error(error.message)
                            }
                        }} className='w-full btn btn-accent'>Log Out</button>
                    </div>
                </div>
            ) : <div className='flex items-center justify-center'>
                <span className="loading loading-spinner loading-lg"></span>
            </div>}
        </div>
    );
};

export default My_profile;
