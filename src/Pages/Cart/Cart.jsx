import React from 'react'
import useAuth from '../../Hooks/useAuth'
import useAxiosCommon from '../../Hooks/useAxiosCommon';
import { useQuery } from '@tanstack/react-query';
import Section_head from '../../Components/Section_head/Section_head';
import Cart_item_row from '../../Table_rows/Cart_item_row';

export default function Cart() {
    const { user } = useAuth();
    const axiosCommon = useAxiosCommon();

    const { data: cartItems = [], isLoading, refetch } = useQuery({
        queryKey: ['cartItems', user?.email],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/cart-items/${user?.email}`);
            return data;
        }
    })

    return (
        <div>
            <div>
                <Section_head heading={'Your Shopping Cart'} description={'Review your selections and get ready to complete your purchase. Your favorite items are just a step away!'} />
            </div>
            <div className='flex items-center justify-center mt-8 flex-col'>
                <table>
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="p-3 text-left">Image</th>
                            <th className="p-3 text-left">Name</th>
                            <th className="p-3 text-left">Category</th>
                            <th className="p-3 text-left">Price</th>
                            <th className="p-3 text-left">Valid Until</th>
                            <th className="p-3 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cartItems?.map((item, index) => {
                                return <Cart_item_row key={index} item={item} refetch={refetch} />
                            })
                        }
                    </tbody>

                </table>
                <div className='flex items-center justify-center'>
                    {
                        cartItems?.length < 1 && <p className='mt-8 font-bold'>No items added yet!</p>
                    }
                </div>
                <div className='flex items-center justify-center'>
                    {
                        isLoading && <span className="loading loading-spinner loading-lg"></span>
                    }
                </div>
            </div>
        </div>
    )
}
