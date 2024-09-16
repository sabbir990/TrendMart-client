import React, { useState } from 'react'
import Update_role_modal from '../Modals/Update_role_modal/Update_role_modal'

export default function Manage_user_row({ user, refetch }) {
    let [isOpen, setIsOpen] = useState(false)

    function open() {
        setIsOpen(true)
    }

    function close() {
        setIsOpen(false)
    }
    return (
        <tr key={user?.id} className="border-b">
            <td className="px-4 py-2">
                <img src={user?.photoURL} alt={user?.displayName} className="w-10 h-10 rounded-full" />
            </td>
            <td className="px-4 py-2">{user?.displayName}</td>
            <td className="px-4 py-2">{user?.email}</td>
            <td className="px-4 py-2">
                {user?.verified ? (
                    <span className="text-green-500">Yes</span>
                ) : (
                    <span className="text-red-500">No</span>
                )}
            </td>
            <td className="px-4 py-2 font-bold font-poppins">{user?.role}</td>
            <td className="px-4 py-2">
                <button onClick={open} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                    Update Role
                </button>
                <Update_role_modal isOpen={isOpen} close={close} email={user?.email} refetch={refetch} />
            </td>
        </tr>
    )
}
