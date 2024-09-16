import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import Section_head from '../../Components/Section_head/Section_head'
import useAuth from '../../Hooks/useAuth'
import useAxiosCommon from '../../Hooks/useAxiosCommon';
import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {useState } from 'react';
import { TbFidgetSpinner } from "react-icons/tb";
import useRole from '../../Hooks/useRole';


export default function Add_comment_modal({ isOpen, close, item_name }) {
    const { user } = useAuth();
    const axiosCommon = useAxiosCommon();
    const [loading, setLoading] = useState(false)
    const {role} = useRole();

    const {mutateAsync : postComment} = useMutation({
        mutationFn : async(comment) => {
            const {data} = await axiosCommon.post('/post-comment', comment);
            return data;
        },

        onSuccess : () => {
            setLoading(false)
            close();
            toast.success("Added Your comment successfully!")
        }
    })

    const handleAddCommentSubmit = async(event) => {
        event.preventDefault();

        const form = event.target;
        const name = form?.name?.value;
        const avatar_url = user?.photoURL;
        const email = user?.email;
        const review = form?.review?.value;
        const rating = form.rating?.value;
        const date = new Date().toLocaleDateString();


        const comment = {
            name, avatar_url, email, review, rating, date, item_name
        }

        try{
            if(role !== 'user'){
                return toast.error('You must be an user before adding an comment!')
            }
            await postComment(comment)
        }catch(error){
            setLoading(false);
            console.log(error);
            toast.error(error.message)
        }
    }


    return (
        <>

            <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close} __demoMode>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="w-full max-w-md rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                        >
                            <DialogTitle as="h3" className="text-base/7 font-medium text-black">
                                <Section_head heading={'We Value Your Feedback – Share Your Experience Below!'} description={'This emphasizes the importance of user input while keeping the tone friendly and encouraging.'} />
                            </DialogTitle>
                            <form className='space-y-4' onSubmit={handleAddCommentSubmit}>
                                <div className="w-full mt-4">
                                    <input disabled className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" name='name' type='text' defaultValue={user?.displayName} placeholder="Your Name" />
                                </div>

                                <div className="mb-4">
                                    <label className="text-gray-700 font-medium mb-2" htmlFor="preview">profile Image URL</label>
                                    <img
                                        src={user?.photoURL || 'https://via.placeholder.com/100'}
                                        alt="Preview"
                                        className="w-24 h-24 rounded-full object-cover border border-gray-300"
                                    />
                                </div>
                                <div className="w-full mt-4">
                                    <input disabled className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" name='email' type='email' defaultValue={user?.email} placeholder="Email Address" aria-label="Email Address" />
                                </div>
                                <div className="w-full mt-4">
                                    <input required className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" name='review' type='text' placeholder="Your review" aria-label="Email Address" />
                                </div>
                                <div className="w-full mt-4">
                                    <input required className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" name='rating' type='number' min={0} max={5} placeholder="Rate this product" aria-label="Email Address" />
                                </div>

                                <button className='btn btn-block btn-accent text-black'>
                                    {
                                        loading ? <TbFidgetSpinner className='animate-spin' /> : 'Post Comment'
                                    }
                                </button>
                            </form>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    )
}
