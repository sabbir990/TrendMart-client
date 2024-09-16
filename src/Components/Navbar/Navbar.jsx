import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import toast from 'react-hot-toast';
import useRole from '../../Hooks/useRole';
import Logo from '../Logo/Logo';

export default function Navbar() {
    const { user, setUser, logOut, loading, setLoading } = useAuth();
    const { role } = useRole();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsDropdownOpen(prevState => !prevState);
    };

    const closeDropdown = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', closeDropdown);
        return () => document.removeEventListener('mousedown', closeDropdown);
    }, []);

    const links = (
        <>
            <li><NavLink to={'/'}>Home</NavLink></li>
            <li><NavLink to={'/shop'}>Shop</NavLink></li>
            {role === 'user' && <li><NavLink to={'/cart'}>Your Cart</NavLink></li>}
            {!user && <li><NavLink to={'/login'}>Login</NavLink></li>}
        </>
    );

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <Logo />
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end">
                {user && (
                    <div className="relative" ref={dropdownRef}>
                        <button
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost btn-circle avatar"
                            onClick={toggleDropdown}
                        >
                            <div className="w-10 rounded-full">
                                <img
                                    alt="User Profile"
                                    src={user?.photoURL || 'https://via.placeholder.com/100'}
                                    className="object-cover w-full h-full rounded-full"
                                />
                            </div>
                        </button>
                        <ul
                            tabIndex={0}
                            className={`menu menu-sm w-auto dropdown-content bg-base-100 rounded-box z-10 mt-3 p-2 shadow absolute right-0 transition-transform duration-300 ease-in-out transform ${isDropdownOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
                        >
                            <p className='text-center mb-4 font-bold underline'>{user?.email}</p>
                            <li>
                                <NavLink to={'/my-profile'}>Your Profile</NavLink>
                            </li>
                            {role !== 'user' && (
                                <li>
                                    <NavLink to={'/dashboard'}>Dashboard</NavLink>
                                </li>
                            )}
                            <li>
                                <button
                                    onClick={async () => {
                                        try {
                                            setLoading(true);
                                            await logOut();
                                            setUser(null);
                                            toast.success('Logged out successfully');
                                        } catch (error) {
                                            setLoading(false);
                                            console.error(error);
                                            toast.error('Logout failed');
                                        }
                                    }}
                                    className="w-full text-left px-4 py-2 hover:bg-gray-200"
                                >
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}
