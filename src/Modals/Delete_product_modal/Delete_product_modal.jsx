import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import Section_head from '../../Components/Section_head/Section_head'
import useAxiosSecure from '../../Hooks/useAxiosSecure'
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { TbFidgetSpinner } from "react-icons/tb";

export default function Delete_product_modal({isOpen, close, _id, refetch}) {
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(false)

    const {mutateAsync : delete_product} = useMutation({
        mutationFn : async() => {
            const {data} = await axiosSecure.delete(`/delete-product/${_id}`);
            return data
        },

        onSuccess : () => {
            close();
            setLoading(false)
            toast.success("Product deleted Successfully!");
            refetch();
        }
    })

    const handleDeleteProduct = async() => {
        try{
            setLoading(true)

            await delete_product();
        }catch(error){
            setLoading(false)
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
                <Section_head heading={'Confirm Product Deletion'} description={'Are you sure you want to delete this product? This action cannot be undone.'} />
              </DialogTitle>
              <div className='flex items-center justify-center space-x-4 mt-4'>
                <button className='btn btn-error text-white font-poppins' onClick={handleDeleteProduct} disabled={loading}>{loading ? <TbFidgetSpinner className='animate-spin' /> : 'Delete it!'}</button>
                <button className='btn btn-success text-white font-poppins' onClick={close}>Cancel</button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}
