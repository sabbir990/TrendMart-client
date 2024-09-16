import React, { useState } from 'react'
import Delete_product_modal from '../Modals/Delete_product_modal/Delete_product_modal';
import Edit_product_modal from '../Modals/Edit_product_modal/Edit_product_modal';

export default function Manage_products_row({ product, refetch }) {
    let [isDeleteOpen, setIsDeleteOpen] = useState(false)
    let [isEditOpen, setIsEditOpen] = useState(false);

    function delete_open() {
        setIsDeleteOpen(true)
    }

    function delete_close() {
        setIsDeleteOpen(false)
    }

    function edit_open(){
        setIsEditOpen(true);
    }

    function edit_close(){
        setIsEditOpen(false);
    }

    parseInt(product?.stocks_visiblity);
    parseInt(product?.featured_product?.price)
    return (
        <tr className="border-b font-poppins">
            <td className="px-4 py-2">
                <img src={product?.featured_product?.image_url} alt="Product 2" className="w-12 h-12 object-cover" />
            </td>
            <td className="px-4 py-2">{product?.featured_product?.name}</td>
            <td className="px-4 py-2">{product?.category}</td>
            <td className="px-4 py-2">${product?.featured_product?.price}</td>
            <td className="px-4 py-2">
                <span className={product?.stocks_visiblity > 0 ? 'text-black font-poppins font-bold' : 'text-red-500 font-bold'}>{product?.stocks_visiblity > 0 ? product?.stocks_visiblity : 'Out Of Stock'}</span>
            </td>
            <td className="px-4 py-2">
                <button onClick={edit_open} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                    Edit
                </button>
                <Edit_product_modal isOpen={isEditOpen} close={edit_close} refetch={refetch} _id={product?._id} />
                <button onClick={delete_open} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2">
                    Delete
                </button>
                <Delete_product_modal isOpen={isDeleteOpen} close={delete_close} _id={product?._id} refetch={refetch} />
            </td>
        </tr>
    )
}
