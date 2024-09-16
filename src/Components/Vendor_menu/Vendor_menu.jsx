import React from 'react'
import { GiJigsawBox } from "react-icons/gi";
import { GrAnalytics } from "react-icons/gr";
import { RiArrowGoBackLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

export default function Vendor_menu() {
    return (
        <div>
            <div className='font-bold font-poppins'>
                <div className='h-screen flex flex-col justify-between text-2xl'>
                    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 space-y-2 text-lg">
                        <li><Link to={'/dashboard/sales-analytics'}><GrAnalytics />Sales Analytics</Link></li>
                    </ul>
                    <ul className="menu bg-base-200 text-base-content w-80 p-4 text-lg">
                        <li><Link to={'/'}><RiArrowGoBackLine />Home</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
