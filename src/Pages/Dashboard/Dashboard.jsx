import React from 'react';
import useRole from '../../Hooks/useRole';
import Admin_menu from '../../Components/Admin_menu/Admin_menu';
import { Outlet } from 'react-router-dom';
import Vendor_menu from '../../Components/Vendor_menu/Vendor_menu';

export default function Dashboard() {
  const { role } = useRole();

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Drawer for navigation */}
      <div className="drawer lg:drawer-open w-full lg:w-1/4 xl:w-1/5">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-side">
          {role === 'admin' ? <Admin_menu /> : role === 'vendor' ? <Vendor_menu /> : ''}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-grow p-4 lg:p-6 w-full lg:w-3/4 xl:w-4/5 ml-16">
        <Outlet />
      </div>
    </div>
  );
}
