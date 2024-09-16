import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import Top_section from '../../Components/Top_section/Top_section'
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

export default function Order_management_details_modal({ isOpen, close, _id }) {
    const axiosSecure = useAxiosSecure();

    const {data : payment_details} = useQuery({
        queryKey : ['payment_details', _id],
        queryFn : async() => {
            const {data} = await axiosSecure.get(`/payment-details/${_id}`);
            return data;
        }
    })

    return (
        <Dialog open={isOpen} as="div" className="relative z-10" onClose={close}>
            <div className="fixed inset-0 z-10 overflow-y-auto font-poppins">
                <div className="flex min-h-full items-center justify-center p-4">
                    <DialogPanel className="w-full max-w-lg rounded-xl bg-white p-6 shadow-lg">
                        <DialogTitle as="h3" className="text-lg font-semibold text-gray-900">
                            <Top_section
                                heading={'Order Details'}
                                description={'Review the complete order information, including items, pricing, and customer details.'}
                            />
                        </DialogTitle>
                        <div className="mt-4">
                            <h4 className="text-sm font-medium text-gray-700">Order ID:</h4>
                            <p className="text-sm text-gray-900">{payment_details?.transactionId}</p>
                        </div>
                        <div className="mt-4">
                            <h4 className="text-sm font-medium text-gray-700">Customer Name:</h4>
                            <p className="text-sm text-gray-900">{payment_details?.userName}</p>
                        </div>
                        <div className="mt-4">
                            <h4 className="text-sm font-medium text-gray-700">Total Price:</h4>
                            <p className="text-sm text-gray-900">${payment_details?.paid}</p>
                        </div>
                        <div className="mt-4">
                            <h4 className="text-sm font-medium text-gray-700">Order Status:</h4>
                            <p className="text-sm text-gray-900">{payment_details?.status}</p>
                        </div>
                        <div className="mt-4">
                            <h4 className="text-sm font-medium text-gray-700">Valid Until:</h4>
                            <p className="text-sm text-gray-900">{payment_details?.valid_until}</p>
                        </div>
                        <div className="mt-6">
                            <button className='btn btn-accent text-black btn-block' onClick={close}>Exit</button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}
