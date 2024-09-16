import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import Section_head from '../../Components/Section_head/Section_head'
import useAxiosSecure from '../../Hooks/useAxiosSecure'
import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { TbFidgetSpinner } from "react-icons/tb";

export default function Update_order_status_modal({ isOpen, close, _id, refetch }) {
    const axiosSecure = useAxiosSecure();
    const [status, setStatus] = useState();
    const [loading, setLoading] = useState(false)

    const { data: order_status } = useQuery({
        queryKey: ['order_status', _id],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/get-status/${_id}`);
            setStatus(data?.status);
            return data
        }
    })

    const { mutateAsync: updateStatus } = useMutation({
        mutationFn: async (newStatus = status) => {
            const { data } = await axiosSecure.patch(`/update-status/${_id}`, { newStatus });
            return data;
        },

        onSuccess: () => {
            refetch();
            toast.success("Updated Status successfully!");
            close();
            setLoading(false);
        }
    })

    const handleOrderStatus = async (event) => {
        setStatus(event.target.value)
    }

    const handleUpdateStatus = async () => {
        try {
            setLoading(true);

            await updateStatus(status);
        } catch (error) {
            setLoading(false);
            console.log(error);
            toast.error(error.message)
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
                            <DialogTitle as="h3" className="font-medium text-black">
                                <Section_head heading={'Update Order Status'} description={'Modify the status of the order to reflect its current state. Ensure all updates are accurate and reflect the order’s progress.'} />
                            </DialogTitle>
                            <select onChange={handleOrderStatus} defaultValue={status} name="order_status" className='mt-4 w-full py-2 font-poppins text-center rounded-md border-2 border-gray-300 outline-none'>
                                <option value="processing">Processing</option>
                                <option value="shipping">Shipping</option>
                                <option value="delivered">Delivered</option>
                            </select>
                            <div className="mt-4 font-poppins flex justify-center space-x-4">
                                <button disabled={loading} className='btn btn-success text-black' onClick={handleUpdateStatus}>{loading ? <TbFidgetSpinner className='animate-spin' /> : 'Change Status!'}</button>
                                <button className='btn btn-error text-black' onClick={close}>Cancel!</button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    )
}
