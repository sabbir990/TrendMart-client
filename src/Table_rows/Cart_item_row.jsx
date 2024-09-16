import React from 'react';
import toast from 'react-hot-toast';
import useAxiosCommon from '../Hooks/useAxiosCommon';
import { useMutation } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

export default function Cart_item_row({ item, refetch }) {
    const axiosCommon = useAxiosCommon();

    const { mutateAsync: deleteCartItem } = useMutation({
        mutationFn: async (_id) => {
            const { data } = await axiosCommon.delete(`/delete-cart-item/${_id}`);
            return data;
        },

        onSuccess : () => {
            refetch();
        }
    })

    const handleCartItemDelete = async (_id) => {
        try {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then(async(result) => {
                if (result.isConfirmed) {
                    await deleteCartItem(_id);
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                }
            });
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }
    return (
        <tr className="border-b">
            <td className="p-3">
                <img
                    src={item?.packageData?.featured_product?.image_url || 'https://via.placeholder.com/100'}
                    alt={item?.packageData?.featured_product?.name}
                    className="w-20 h-20 object-cover"
                />
            </td>
            <td className="p-3">{item?.packageData?.featured_product?.name}</td>
            <td className="p-3">{item?.packageData?.category}</td>
            <td className="p-3">${item?.packageData?.featured_product?.price}</td>
            <td className="p-3">{item?.packageData?.valid_until}</td>
            <td className="p-3 space-x-4">
                <button onClick={() => handleCartItemDelete(item?._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                    Remove
                </button>
                <Link to={`/checkout/${item?._id}`} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                    Checkout
                </Link>
            </td>
        </tr>
    );
}
