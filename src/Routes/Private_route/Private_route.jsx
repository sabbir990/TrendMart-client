import React from 'react'
import useAuth from '../../Hooks/useAuth'
import { Navigate, useLocation } from 'react-router-dom';

export default function Private_route({ children }) {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div className='flex items-center justify-center h-screen'>
            <span className="loading loading-spinner loading-lg"></span>
        </div>
    }

    if (user) {
        return children
    }

    return <Navigate to={'/login'} state={location.state} />
}
