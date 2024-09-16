import React from 'react'
import useAuth from './useAuth'
import useAxiosCommon from './useAxiosCommon';
import { useQuery } from '@tanstack/react-query';

export default function useRole() {
    const {user} = useAuth();
    const axiosCommon = useAxiosCommon();

    const {data : specifiedUser, isLoading} = useQuery({
        queryKey : ['specifiedUser', user?.email],
        queryFn : async() => {
            const {data} = await axiosCommon.get(`/get-specified-user/${user?.email}`);
            return data;
        }
    })

    const {role = ''} = specifiedUser || {};
  return {role, isLoading}
}
