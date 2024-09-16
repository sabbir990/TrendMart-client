import React from 'react'
import Top_section from '../../Components/Top_section/Top_section'
import useAuth from '../../Hooks/useAuth'
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Manage_user_row from '../../Table_rows/Manage_user_row';

export default function Manage_users() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: all_users = [], refetch, isLoading, isPending } = useQuery({
    queryKey: ['all_users', user?.email],
    queryFn: async () => {
      const token = localStorage.getItem('access_token');
      if (!token) return;
      const { data } = await axiosSecure.get(`/get-all-users`);
      return data;
    }
  });

  return (
    <div className='container mx-auto p-4'>
      <div>
        <Top_section
          heading={'Manage Users'}
          description={'View, Edit, and Manage User Roles and Permissions Efficiently'}
        />
      </div>

      <div className='mt-10 overflow-x-auto'>
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="px-4 py-2 text-left">Image</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Verified</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {
              all_users?.filter(current_user => current_user?.email !== user?.email)?.map((user, index) => {
                return <Manage_user_row user={user} key={index} refetch={refetch} />
              })
            }
          </tbody>
        </table>
        {
          isLoading && <div className='flex items-center justify-center mt-10'>
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        }

        {
          isPending && <div className='flex items-center justify-center mt-10'>
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        }
      </div>
    </div>
  )
}
