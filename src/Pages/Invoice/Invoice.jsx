import React from 'react'
import { Link, useParams } from 'react-router-dom'
import useAxiosCommon from '../../Hooks/useAxiosCommon';
import { useQuery } from '@tanstack/react-query';

export default function Invoice() {
    const { id } = useParams();
    const axiosCommon = useAxiosCommon();

    const { data: paidInformation, isLoading } = useQuery({
        queryKey: ['paidInformation', id],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/get-paid-information/${id}`);
            return data;
        }
    })

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg my-10">
            {/* Invoice Header */}
            <div className="flex justify-between items-center border-b pb-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-700">Invoice</h1>
                    <p className="text-gray-500">Invoice ID: {paidInformation?.transactionId}</p>
                </div>
                <div className="text-right">
                    <p className="text-gray-500">{paidInformation?.valid_until}</p>
                </div>
            </div>

            {/* Customer Information */}
            <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-700">Bill To:</h2>
                <p>{paidInformation?.userName}</p>
                <p>{paidInformation?.userEmail}</p>
            </div>

            {/* Invoice Items */}
            <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Invoice Details</h2>
                <table className="min-w-full bg-white">
                    <thead>
                        <tr className="border-b">
                            <th className="text-left p-2 text-gray-600">Item</th>
                            <th className="text-left p-2 text-gray-600">Image</th>
                            <th className="text-right p-2 text-gray-600">Category</th>
                            <th className="text-right p-2 text-gray-600">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b">
                            <td className="p-2">{paidInformation?.featured_product?.name}</td>
                            <td className="text-center p-2">
                                <img
                                    src={paidInformation?.featured_product?.image_url}
                                    alt={paidInformation?.featured_product?.name}
                                    className="w-16 h-16 object-cover rounded"
                                />
                            </td>
                            <td className="text-right p-2">{paidInformation?.featured_product?.category}</td>
                            <td className="text-right p-2">${paidInformation?.featured_product?.price}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Total Amount */}
            <div className="text-right">
                <p className="text-xl font-bold text-gray-700">Total: ${paidInformation?.paid}</p>
            </div>

            {/* Buttons */}
            <div className="flex justify-between mt-8">
                <Link to="/" className="btn btn-primary">
                    Home
                </Link>
                <button onClick={() => window.print()} className="btn btn-secondary">
                    Print Invoice
                </button>
            </div>

            {/* Footer */}
            <div className="mt-10 text-center text-gray-500 text-sm">
                <p>Thank you for your business!</p>
                <p>If you have any questions, please contact us at support@trendmart.com</p>
            </div>
        </div>
    )
}
