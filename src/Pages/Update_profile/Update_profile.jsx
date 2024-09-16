import React, { useEffect, useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import toast from 'react-hot-toast';
import useHostImage from '../../Hooks/useHostImage';
import { useNavigate } from 'react-router-dom';
import { ImSpinner3 } from 'react-icons/im';

const Update_profile = () => {
    const { user, loading, setLoading, setUser, updateUserProfile } = useAuth();
    const [imagePreview, setImagePreview] = useState(null)
    const navigate = useNavigate()

    const handleImageChange = (event) => {
        event.preventDefault();

        const file = event.target.files[0];
        if (file) {
            const image_url = URL.createObjectURL(file);

            setImagePreview(image_url);
        }
    }

    useEffect(() => {
        return () => {
            URL.revokeObjectURL(imagePreview)
        }
    }, [imagePreview])

    const handleUpdateProfileSubmit = async (event) => {
        event.preventDefault();

        const form = event.target;
        const name = form.name.value;
        const image = form.image.files[0];

        try {
            setLoading(true);

            const image_url = await useHostImage(image);

            await updateUserProfile(name, image_url);
            toast.success("Updating User Successful!")

            navigate('/my-profile')
            setLoading(false)
        } catch (error) {
            setLoading(false);
            console.log(error);
            toast.error(error.message)
        }
    }

    if (loading) {
        return <div className='flex items-center justify-center'>
            <span className="loading loading-dots loading-lg"></span>
        </div>
    }
    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Update Profile</h1>
            <form className="space-y-4" onSubmit={handleUpdateProfileSubmit}>
                <div className="flex items-center space-x-4 mb-4">
                    {/* Display current profile picture */}
                    <img
                        src={user?.photoURL}
                        alt="Current Profile"
                        className="w-24 h-24 rounded-full object-cover border border-gray-300"
                    />
                    <div className="flex flex-col">
                        <label className="text-gray-700 font-medium mb-2" htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name='name'
                            className="border border-gray-300 rounded-lg p-2"
                            placeholder="Enter your name"
                            defaultValue={user?.displayName}
                        />
                        <label className="text-gray-700 font-medium mt-4 mb-2" htmlFor="photoUrl">Profile Picture URL</label>
                        <input
                            readOnly
                            type="text"
                            id="photoUrl"
                            className="border border-gray-300 rounded-lg p-2"
                            placeholder="Enter photo URL"
                            defaultValue={user?.photoURL}
                        />
                        <label className="text-gray-700 font-medium mt-4 mb-2" htmlFor="photoFile">Upload New Photo</label>
                        <input
                            onChange={handleImageChange}
                            name='image'
                            type="file"
                            id="photoFile"
                            accept="image/*"
                            className="border border-gray-300 rounded-lg p-2"
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label className="text-gray-700 font-medium mb-2" htmlFor="preview">Preview</label>
                    <img
                        src={imagePreview || 'https://via.placeholder.com/100'}
                        alt="Preview"
                        className="w-24 h-24 rounded-full object-cover border border-gray-300"
                    />
                </div>
                <button
                    disabled={loading}
                    type="submit"
                    className="bg-blue-500 flex items-center justify-center text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
                >
                    {
                        loading ? <ImSpinner3 className='animate-spin' /> : 'Update Profile'
                    }
                </button>
            </form>
        </div>
    );
};

export default Update_profile;