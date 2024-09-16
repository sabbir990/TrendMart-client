import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import useAxiosSecure from '../../Hooks/useAxiosSecure'
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function Update_role_modal({isOpen, close, email, refetch}) {
    const axiosSecure = useAxiosSecure();
    const [userRole, setUserRole] = useState()

    const {data : get_user_role, isLoading} = useQuery({
        queryKey : ['get_user_role', email],
        queryFn : async() => {
            const {data} = await axiosSecure.get(`/get-user-role/${email}`);
            setUserRole(data?.role)
            return data;
        }
    })

    const {mutateAsync : update_role} = useMutation({
        mutationFn : async() => {
            const {data} = await axiosSecure.patch(`/update-role/${email}`, {userRole});
            return data;
        },

        onSuccess : () => {
            toast.success("User role updated successfully!");
            close();
            refetch();
        }
    })

    const handleChangeUserRole = (event) => {
        const role = event.target.value;
        setUserRole(role);
    }

    const handleUpdateUserRole = async () => {
        try{
            await update_role()
        }catch(error){
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
              <DialogTitle as="h3" className="text-base/7 text-center font-poppins font-medium text-black">
                Update user's role
              </DialogTitle>
              <select name="role" onChange={handleChangeUserRole} defaultValue={get_user_role?.role} className='w-full rounded-md border-2 border-gray-300 outline-none text-center font-poppins py-2 mt-4'>
                <option value="user">User</option>
                <option value="vendor">Vendor</option>
                <option value="admin">Admin</option>
              </select>
              <div className="mt-4 flex justify-center space-x-2">
                <button className='btn btn-success text-white' onClick={handleUpdateUserRole}>Update</button>
                <button className='btn btn-error text-white' onClick={close}>Cancel</button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}
