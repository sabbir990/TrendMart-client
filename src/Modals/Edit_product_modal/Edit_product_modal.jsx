import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import Top_section from '../../Components/Top_section/Top_section'
import toast from 'react-hot-toast';
import useHostImage from '../../Hooks/useHostImage';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { TbFidgetSpinner } from "react-icons/tb";
import { CiEdit } from "react-icons/ci";


export default function Edit_product_modal({ isOpen, close, refetch, _id }) {
    const [loading, setLoading] = useState(false);
    const axiosSecure = useAxiosSecure();
    const [image, setImage] = useState()

    const {data : update_in_que_product} = useQuery({
        queryKey : ['update_in_que_product', _id],
        queryFn : async() => {
            const {data} = await axiosSecure.get(`/update-in-que-product/${_id}`);
            setImage(data?.featured_product?.image_url);
            return data;
        }
    })

    const {mutateAsync : update_product} = useMutation({
        mutationFn : async(product) => {
            const {data} = await axiosSecure.patch(`/update-product/${_id}`, product);
            return data;
        },

        onSuccess : () => {
            toast.success("Update Done!");
            close();
            setLoading(false);
            refetch();
        }
    })

    const handleUpdateProductSubmit = async(event) =>{
        event.preventDefault();

        const form = event.target;
        const headline = form?.heading?.value;
        const subheadline = form?.sub_heading?.value;
        const name = form?.name?.value;
        const product_image = form?.image_url?.files[0];
        const price = form?.price?.value;
        const promotion = form?.promotion?.value;
        const seasonal_offer = form?.seasonal_offer?.value;
        const theme_color = form?.theme_color?.value;
        const valid_until = form?.valid_until?.value;
        const category = form?.category?.value;
        const stocks_visiblity = form?.stocks_visiblity?.value;

        try{
            setLoading(true)

            if(product_image){
                const image_url = await useHostImage(product_image);

                const product = {
                    headline, subheadline, featured_product : {
                        name, image_url, price, cta : 'Shop Now'
                    }, promotion, seasonal_offer, theme_color, valid_until, category, stocks_visiblity, background_image_url : image_url
                }

                return await update_product(product);

            }

            const product = {
                headline, subheadline, featured_product : {
                    name, image_url : image, price, cta : 'Shop Now'
                }, promotion, seasonal_offer, theme_color, valid_until, category, stocks_visiblity, background_image_url : image
            }

            await update_product(product);
            
        }catch(error){
            setLoading(false)
            console.log(error);
            toast.error(error.message);
        }
    }

    return (
        <>
            <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close} __demoMode>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="w-full max-w-md rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                        >
                            <DialogTitle as="h3" className="text-base/7 font-medium text-black">
                                <Top_section heading={'Edit Product Details'} description={'Update the product information and ensure all fields are accurate before saving.'} />
                            </DialogTitle>
                            <form className='font-poppins' onSubmit={handleUpdateProductSubmit}>
                                <div className="w-full mt-4">
                                    <input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" defaultValue={update_in_que_product?.headline} name='headline' type="text" placeholder="Product Headline" aria-label="Email Address" />
                                </div>
                                <div className="w-full mt-4">
                                    <input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" name="sub_headline" type='text' placeholder="Product Sub-headline" defaultValue={update_in_que_product?.subheadline} aria-label="Email Address" />
                                </div>
                                <div className="w-full mt-4">
                                    <input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" name="name" type='text' placeholder="Product name" defaultValue={update_in_que_product?.featured_product?.name} aria-label="Email Address" />
                                </div>
                                <div className="w-full mt-4">
                                    <input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" name="image_url" type='file' placeholder="Product Image" aria-label="Email Address" />
                                </div>
                                <img src={update_in_que_product?.featured_product?.image_url} alt={update_in_que_product?.featured_product?.name} className='w-32 rounded-md mt-4 border-2 border-gray-700 ml-4' />
                                <div className="w-full mt-4">
                                    <input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" defaultValue={update_in_que_product?.featured_product?.price} name="price" type='number' placeholder="Product Price" step={"any"} aria-label="Email Address" />
                                </div>
                                <div className="w-full mt-4">
                                    <input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" defaultValue={update_in_que_product?.promotion} name="promotion" type='text' placeholder="Product Promotion" aria-label="Email Address" />
                                </div>
                                <div className="w-full mt-4">
                                    <input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" name="seasonal_offer" type='text' placeholder="Seasonal Offer" defaultValue={update_in_que_product?.seasonal_offer} aria-label="Email Address" />
                                </div>
                                <div className="w-full mt-4">
                                    <input className="block w-full px-4 py-2 h-10 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" name="theme_color" type='color' placeholder="Theme Color" defaultValue={update_in_que_product?.theme_color} aria-label="Email Address" />
                                </div>
                                <p className='text-sm text-gray-500'>**This Theme color will be shown in the background of the product in details page</p>
                                <div className="w-full mt-4">
                                    <input className="block w-full px-4 py-2 h-10 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" name="valid_until" type='date' placeholder="Valid Until" defaultValue={update_in_que_product?.valid_until} aria-label="Email Address" />
                                </div>
                                <div className="w-full mt-4">
                                    <input className="block w-full px-4 py-2 h-10 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" name="category" type='text' placeholder="Category" defaultValue={update_in_que_product?.category} aria-label="Email Address" />
                                </div>
                                <div className="w-full mt-4">
                                    <input className="block w-full px-4 py-2 h-10 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" defaultValue={update_in_que_product?.stocks_visiblity} name="stocks_visiblity" type='text' placeholder="Stocks" aria-label="Email Address" />
                                </div>

                                <div className='mt-4'>
                                    <button type='submit' disabled={loading} className='btn btn-success text-white font-bold btn-block'><CiEdit size={24} />{loading ? <TbFidgetSpinner className='animate-spin' /> : 'Update!'}</button>
                                </div>
                            </form>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    )
}
