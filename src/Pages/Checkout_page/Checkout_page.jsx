import React from 'react'
import { useParams } from 'react-router-dom'
import useAxiosCommon from '../../Hooks/useAxiosCommon';
import { useMutation, useQuery } from '@tanstack/react-query';
import Section_head from '../../Components/Section_head/Section_head';
import toast from 'react-hot-toast';
import useAuth from '../../Hooks/useAuth';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Checkout_forms from '../../Forms/Checkout_forms';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function Checkout_page() {
  const { id } = useParams();
  const axiosCommon = useAxiosCommon();

  const { data: checkoutItem, isLoading, refetch } = useQuery({
    queryKey: ['checkoutItem', id],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/checkout-item/${id}`);
      return data;
    }
  })
  delete checkoutItem?.email;

  const item = {
    headline : checkoutItem?.packageData?.headline,
    subheadline : checkoutItem?.packageData?.subheadline,
    featured_product : {
      name : checkoutItem?.packageData?.featured_product?.name,
      image_url : checkoutItem?.packageData?.featured_product?.image_url,
      price : checkoutItem?.packageData?.featured_product?.price,
      cta : checkoutItem?.packageData?.featured_product?.cta,
    },
    promotion : checkoutItem?.packageData?.promotion,
    seasonal_offer : checkoutItem?.packageData?.seasonal_offer,
    theme_color : checkoutItem?.packageData?.theme_color,
    background_image_url : checkoutItem?.packageData?.background_image_url,
    valid_until : checkoutItem?.packageData?.valid_until,
    category : checkoutItem?.packageData?.category
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <Section_head heading={'Checkout'} description={'Review your order before finalizing the purchase.'} />
      </div>

      {/* Checkout Item Details */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="md:flex">
          {/* Product Image */}
          <div className="w-full md:w-1/2">
            <img
              className="w-full h-64 object-cover rounded-lg"
              src={checkoutItem?.packageData?.featured_product?.image_url}
              alt={checkoutItem?.packageData?.featured_product?.name}
            />
          </div>

          {/* Product Information */}
          <div className="w-full md:w-1/2 md:pl-6 mt-6 md:mt-0">
            <h2 className="text-2xl font-bold text-gray-800">{checkoutItem?.packageData?.featured_product?.name}</h2>
            <p className="text-gray-500 mt-2">{checkoutItem?.packageData?.category}</p>
            <p className="text-gray-600 mt-4">{checkoutItem?.packageData?.subheadline}</p>

            {/* Price and Validity */}
            <div className="flex justify-between items-center mt-6">
              <div>
                <p className="text-lg font-semibold text-gray-700">Price: ${checkoutItem?.packageData?.featured_product?.price}</p>
                <p className="text-sm text-gray-500">Valid Until: {checkoutItem?.packageData?.valid_until}</p>
              </div>
            </div>

            <div className='mt-4'>
              <div className="bg-yellow-500 text-black px-4 py-2 rounded-lg mb-4">
                {checkoutItem?.packageData?.promotion}
              </div>
              <div className="bg-green-500 text-black px-4 py-2 rounded-lg mb-4">
                {checkoutItem?.packageData?.seasonal_offer}
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h2>
        <div className="flex justify-between mb-2">
          <p className="text-gray-600">Subtotal:</p>
          <p className="font-semibold text-gray-800">${checkoutItem?.packageData?.featured_product?.price}</p>
        </div>
        <div className="flex justify-between mb-2">
          <p className="text-gray-600">Shipping:</p>
          <p className="font-semibold text-gray-800">Free</p>
        </div>
        <div className="flex justify-between border-t pt-2 mt-2">
          <p className="text-lg font-semibold text-gray-800">Total:</p>
          <p className="text-lg font-semibold text-gray-800">${checkoutItem?.packageData?.featured_product?.price}</p>
        </div>

        {/* Checkout Button */}
        <div>
          <Elements stripe={stripePromise}>
            <Checkout_forms stocks_visiblity={checkoutItem?.packageData?.stocks_visiblity} price={checkoutItem?.packageData?.featured_product?.price} packageData={item} refetch={refetch} />
          </Elements>
        </div>
      </div>
    </div>
  )
}
