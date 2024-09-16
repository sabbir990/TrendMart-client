import React, { useState } from 'react'
import Order_management_details_modal from '../Modals/Order_management_details_modal/Order_management_details_modal'
import Update_order_status_modal from '../Modals/Update_order_status_modal/Update_order_status_modal'
import toast from 'react-hot-toast'

export default function Order_management_row({ order, refetch }) {
    let [isOrderOpen, setIsOrderOpen] = useState(false)
    let [isUpdateStatusOpen, setIsUpdateStatusOpen] = useState(false)

    function update_open() {
        if(order?.status === 'delivered'){
            return toast.error("This order is already delivered!")
        }
        setIsUpdateStatusOpen(true)
    }

    function update_close() {
        setIsUpdateStatusOpen(false)
    }

    function order_open() {
        setIsOrderOpen(true)
    }

    function order_close() {
        setIsOrderOpen(false)
    }
    return (
        <tr className="text-gray-700 dark:text-gray-300">
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium">{order?.transactionId?.slice(0, 15)}..</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium">{order?.userName}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium">${order?.paid}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 text-xs font-semibold leading-tight ${order?.status === 'processing' ? 'text-red-700 bg-red-100' : order?.status === 'shipping' ? 'text-yellow-700 bg-yellow-100' : order?.status === 'delivered' ? 'text-green-700 bg-green-100' : ''} rounded-full`}>
                    {order?.status}
                </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm">{order?.valid_until}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <button onClick={order_open} className="px-4 py-2 text-sm font-medium text-blue-500 bg-transparent rounded-lg hover:underline">
                    View
                </button>
                <Order_management_details_modal isOpen={isOrderOpen} close={order_close} _id={order?._id} />
                <button onClick={update_open} className="ml-2 px-4 py-2 text-sm font-medium text-green-500 bg-transparent rounded-lg hover:underline">
                    Update Status
                </button>
                <Update_order_status_modal isOpen={isUpdateStatusOpen} close={update_close} _id={order?._id} refetch={refetch} />
            </td>
        </tr>
    )
}
