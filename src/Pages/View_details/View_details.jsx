import React from 'react'
import { useParams } from 'react-router-dom'
import useAxiosCommon from '../../Hooks/useAxiosCommon';
import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import useRole from '../../Hooks/useRole';
import useAuth from '../../Hooks/useAuth';
import { Elements } from '@stripe/react-stripe-js';
import Checkout_forms from '../../Forms/Checkout_forms';
import { loadStripe } from '@stripe/stripe-js';
import Ratings_and_reviews from '../../Components/Ratings_&_reviews/Ratings_and_reviews';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

export default function View_details() {
    const { id } = useParams();
    const axiosCommon = useAxiosCommon();
    const { role } = useRole();
    const { user } = useAuth();

    const { data: packageData, isLoading, refetch } = useQuery({
        queryKey: ['packageData', id],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/single-product/${id}`);
            return data;
        }
    })

    const { mutateAsync: addToCart } = useMutation({
        mutationFn: async (product) => {
            const { data } = await axiosCommon.put('/add-to-cart', product);
            return data
        },

        onSuccess: () => {
            toast.success('Your product added to cart successfully!')
        }
    })

    const handleAddToCart = async () => {
        delete packageData?._id;
        const addedPackage = {
            packageData,
            email: user?.email
        }
        try {
            if (role !== 'user') {
                return toast.error("You must be an user to use cart!")
            }
            await addToCart(addedPackage)
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    if (isLoading) {
        return <div className='h-screen flex items-center justify-center'>
            <span className="loading loading-spinner loading-lg"></span>
        </div>
    }

    return (
        <div>
            <div
                className="min-h-screen bg-cover bg-center py-12 px-4"
                style={{ backgroundImage: `url(${packageData?.background_image_url})` }}
            >
                <div
                    className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-lg"
                    style={{ backgroundColor: packageData?.theme_color }}
                >
                    <h1 className="text-4xl font-bold text-white mb-4">{packageData?.headline}</h1>
                    <h2 className="text-2xl font-semibold text-gray-200 mb-6">{packageData?.subheadline}</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Featured Product Image */}
                        <div className="flex justify-center">
                            <img
                                src={packageData?.featured_product?.image_url}
                                alt={packageData?.featured_product?.name}
                                className="rounded-lg shadow-lg object-cover"
                            />
                        </div>

                        {/* Product and Promotion Information */}
                        <div className="text-gray-200">
                            <h3 className="text-3xl font-bold mb-4">{packageData?.featured_product?.name}</h3>
                            <p className="text-2xl font-semibold text-yellow-400 mb-4">
                                ${packageData?.featured_product?.price}
                            </p>

                            <div className="bg-yellow-500 text-black px-4 py-2 rounded-lg mb-4">
                                {packageData?.promotion}
                            </div>
                            <div className="bg-green-500 text-black px-4 py-2 rounded-lg mb-4">
                                {packageData?.seasonal_offer}
                            </div>
                            <p className="text-gray-300">
                                <strong>Valid Until:</strong> {packageData?.valid_until}
                            </p>

                            {/* Add to Cart Button */}
                            <div className="mt-8">
                                <button onClick={handleAddToCart} className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-200 transition duration-300">
                                    Add to Cart
                                </button>
                            </div>

                            <div className='mt-4'>
                                <Elements stripe={stripePromise}>
                                    <Checkout_forms stocks_visiblity={packageData?.stocks_visiblity} price={packageData?.featured_product?.price} packageData={packageData} refetch={refetch} />
                                </Elements>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Ratings_and_reviews item_name = {packageData?.featured_product?.name} />
        </div>
    )
}
