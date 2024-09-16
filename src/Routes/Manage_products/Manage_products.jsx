import React, { useState } from 'react'
import Top_section from '../../Components/Top_section/Top_section'
import useAxiosSecure from '../../Hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query';
import Manage_products_row from '../../Table_rows/Manage_products_row';
import Add_product_modal from '../../Modals/Add_product_modal/Add_product_modal';

export default function Manage_products() {
    let [isOpen, setIsOpen] = useState(false)
    const axiosSecure = useAxiosSecure();

    function open() {
        setIsOpen(true)
    }

    function close() {
        setIsOpen(false)
    }

    const { data: all_products = [], isLoading, refetch, isPending } = useQuery({
        queryKey: ['all_products'],
        queryFn: async () => {
            const token = localStorage.getItem('access_token');
            if (!token) return
            const { data } = await axiosSecure.get('/get-all-products-for-admin');
            return data;
        }
    })

    return (
        <div>
            <div>
                <Top_section heading={'Manage Products'} description={'Efficiently Oversee, Edit, and Organize Product Listings for Seamless Inventory Management'} />
            </div>
            <button onClick={open} className='btn btn-primary font-poppins text-white btn-block mt-4'>Add Product</button>
            <Add_product_modal isOpen={isOpen} close={close} refetch={refetch} />
            <table className='w-full mt-4 font-poppins'>
                <thead>
                    <tr className="bg-gray-200 text-gray-700">
                        <th className="px-4 py-2 text-left">Image</th>
                        <th className="px-4 py-2 text-left">Product Name</th>
                        <th className="px-4 py-2 text-left">Category</th>
                        <th className="px-4 py-2 text-left">Price</th>
                        <th className="px-4 py-2 text-left">Stock Status</th>
                        <th className="px-4 py-2 text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        all_products?.map((product, index) => {
                            return <Manage_products_row product={product} key={index} refetch={refetch} />
                        })
                    }
                </tbody>
            </table>
            {
                isLoading && <div className='flex items-center justify-center mt-4'>
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            }

            {
                isPending && <div className='flex items-center justify-center mt-4'>
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            }
        </div>
    )
}