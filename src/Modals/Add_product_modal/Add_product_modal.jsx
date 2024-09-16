import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import Top_section from '../../Components/Top_section/Top_section'
import { MdAddBusiness } from "react-icons/md";
import toast from 'react-hot-toast';
import useHostImage from '../../Hooks/useHostImage';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { TbFidgetSpinner } from "react-icons/tb";


export default function Add_product_modal({ isOpen, close, refetch }) {
    const [loading, setLoading] = useState(false);
    const axiosSecure = useAxiosSecure();

    const {mutateAsync : add_product} = useMutation({
        mutationFn : async(product) => {
            const {data} = await axiosSecure.post('/add-product', product);
            return data;
        },

        onSuccess : () => {
            close();
            setLoading(false)
            toast.success("Your Product is Added!")
            refetch();
        }
    })

    const handleAddProductSubmit = async(event) => {
        event.preventDefault();

        const form = event.target;
        const headline = form?.headline?.value;
        const subheadline = form?.sub_headline?.value;
        const name = form?.name?.value;
        const product_image = form?.image_url?.files[0];
        const price = form?.price?.value;
        const cta = 'Shop Now';
        const promotion = form?.promotion?.value;
        const seasonal_offer = form?.seasonal_offer?.value;
        const theme_color = form?.theme_color?.value;
        const valid_until = form?.valid_until?.value;
        const category = form?.category?.value;
        const stocks_visiblity = form?.stocks_visiblity?.value;

        try{
            setLoading(true)
            const image_url = await useHostImage(product_image);

            const product = {
                headline, subheadline, featured_product : {
                    name, image_url, price, cta
                }, promotion, seasonal_offer, theme_color, valid_until, category, stocks_visiblity, background_image_url : image_url
            }

            await add_product(product);


        }catch(error){
            setLoading(false);
            console.log(error);
            toast.error(error.message);
        }

        // console.log(heading, sub_heading, name, product_image, price, cta, promotion, seasonal_offer, theme_color, valid_until, category, stocks_visiblity);
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
                                <Top_section heading={'Add New Product'} description={'Fill in the details below to add a new product to your inventory.'} />
                            </DialogTitle>
                            <form className='font-poppins' onSubmit={handleAddProductSubmit}>
                                <div className="w-full mt-4">
                                    <input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" name='headline' type="text" placeholder="Product Headline" aria-label="Email Address" />
                                </div>
                                <div className="w-full mt-4">
                                    <input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" name="sub_headline" type='text' placeholder="Product Sub-headline" aria-label="Email Address" />
                                </div>
                                <div className="w-full mt-4">
                                    <input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" name="name" type='text' placeholder="Product name" aria-label="Email Address" />
                                </div>
                                <div className="w-full mt-4">
                                    <input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" name="image_url" type='file' placeholder="Product Image" aria-label="Email Address" />
                                </div>
                                <div className="w-full mt-4">
                                    <input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" name="price" type='number' placeholder="Product Price" aria-label="Email Address" />
                                </div>
                                <div className="w-full mt-4">
                                    <input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" name="promotion" type='text' placeholder="Product Promotion" aria-label="Email Address" />
                                </div>
                                <div className="w-full mt-4">
                                    <input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" name="seasonal_offer" type='text' placeholder="Seasonal Offer" aria-label="Email Address" />
                                </div>
                                <div className="w-full mt-4">
                                    <input className="block w-full px-4 py-2 h-10 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" name="theme_color" type='color' placeholder="Theme Color" aria-label="Email Address" />
                                </div>
                                <p className='text-sm text-gray-500'>**This Theme color will be shown in the background of the product in details page</p>
                                <div className="w-full mt-4">
                                    <input className="block w-full px-4 py-2 h-10 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" name="valid_until" type='date' placeholder="Valid Until" aria-label="Email Address" />
                                </div>
                                <div className="w-full mt-4">
                                    <input className="block w-full px-4 py-2 h-10 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" name="category" type='text' placeholder="Category" aria-label="Email Address" />
                                </div>
                                <div className="w-full mt-4">
                                    <input className="block w-full px-4 py-2 h-10 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" name="stocks_visiblity" type='text' placeholder="Stocks" aria-label="Email Address" />
                                </div>

                                <div className='mt-4'>
                                    <button type='submit' disabled={loading} className='btn btn-success text-white font-bold btn-block'><MdAddBusiness size={24} />{loading ? <TbFidgetSpinner className='animate-spin' /> : 'Insert'}</button>
                                </div>
                            </form>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    )
}
