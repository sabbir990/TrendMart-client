import React from 'react'
import useAuth from '../../Hooks/useAuth'
import useRole from '../../Hooks/useRole';
import { Navigate, useLocation } from 'react-router-dom';

export default function Vendor_route({ children }) {
    const { user, loading, logOut } = useAuth();
    const { role, isLoading } = useRole();
    const location = useLocation();

    if (loading || isLoading) {
        return <div className='flex items-center justify-center h-screen'>
            <span className="loading loading-spinner loading-lg"></span>
        </div>
    }

    if (!!user && role === 'vendor') {
        return children
    }

    logOut()
    return <Navigate to={'/login'} state={location?.pathname} />
}
