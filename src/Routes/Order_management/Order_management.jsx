import React from 'react'
import Top_section from '../../Components/Top_section/Top_section'
import useAxiosSecure from '../../Hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query';
import Order_management_row from '../../Table_rows/Order_management_row';

export default function Order_management() {
    const axiosSecure = useAxiosSecure();
    const token = localStorage.getItem('access_token')

    const {data : all_orders, isLoading, refetch} = useQuery({
        queryKey : ['all_orders', token],
        queryFn : async() => {
            if(!token) return;
            const {data} = await axiosSecure.get('/all-orders');
            return data;
        }
    })

    return (
        <div>
            <div>
                <Top_section heading={"Order Management"} description={'Track, manage, and update customer orders efficiently in one place.'} />
            </div>
            <div className="overflow-x-auto mt-4 font-poppins mr-4">
                <table className="min-w-full table-auto">
                    <thead className="bg-gray-200 dark:bg-gray-700">
                        <tr>
                            <th className="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase dark:text-gray-400">
                                Order ID
                            </th>
                            <th className="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase dark:text-gray-400">
                                Customer Name
                            </th>
                            <th className="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase dark:text-gray-400">
                                Total Price
                            </th>
                            <th className="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase dark:text-gray-400">
                                Order Status
                            </th>
                            <th className="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase dark:text-gray-400">
                                Valid Until
                            </th>
                            <th className="px-6 py-3 text-xs font-bold text-center text-gray-700 uppercase dark:text-gray-400">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            all_orders?.map((order, index) => {
                                return <Order_management_row order={order} key={index} refetch={refetch} />
                            })
                        }
                    </tbody>
                </table>
            </div>

        </div>
    )
}
