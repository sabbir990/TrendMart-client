import React from 'react'
import { Link } from 'react-router-dom'
import { FaChartBar } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaBoxOpen } from "react-icons/fa6";
import { MdOutlinePayments } from "react-icons/md";
import { RiArrowGoBackLine } from "react-icons/ri";


export default function Admin_menu() {
    return (
        <div className='font-bold font-poppins'>
            <div className='h-screen flex flex-col justify-between text-2xl'>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 space-y-2 text-lg">
                    <li><Link to={'/dashboard/dashboard-overview'}><FaChartBar />Dashboard Overview</Link></li>
                    <li><Link to={'/dashboard/manage-users'}><FaUsers />Manage Users</Link></li>
                    <li><Link to={'/dashboard/manage-products'}><FaBoxOpen />Manage Products</Link></li>
                    <li><Link to={'/dashboard/order-management'}><MdOutlinePayments />Order Management</Link></li>
                </ul>
                <ul className="menu bg-base-200 text-base-content w-80 p-4 text-lg">
                    <li><Link to={'/'}><RiArrowGoBackLine />Home</Link></li>
                </ul>
            </div>
        </div>
    )
}
