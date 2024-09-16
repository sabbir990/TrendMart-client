import React, { useState } from 'react'
import Add_comment_modal from '../../Modals/Add_comment_modal/Add_comment_modal'
import Section_head from '../Section_head/Section_head'
import useAxiosCommon from '../../Hooks/useAxiosCommon'
import { useQuery } from '@tanstack/react-query'
import Comment_card from '../Comment_card/Comment_card'

export default function Ratings_and_reviews({ item_name }) {
  let [isOpen, setIsOpen] = useState(false)
  const axiosCommon = useAxiosCommon();

  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }

  const { data: comments = [], refetch, isPending } = useQuery({
    queryKey: ['comments', item_name],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/get-comments/${item_name}`);
      return data
    }
  })

  console.log(comments)
  return (
    <div className='mt-8'>
      <Section_head heading={'Share Your Thoughts and Read What Others Are Saying!'} description={'This provides a welcoming invitation for users to both leave their comments and explore what others have shared.'} />
      <div className='flex items-center justify-between mt-8 mb-4'>
        <h3 className='font-bold text-xl underline'>Ratings & reviews({comments?.length})</h3>
        <button onClick={open} className='btn btn-primary'>Add Your Review</button>
      </div>
      <Add_comment_modal isOpen={isOpen} close={close} item_name={item_name} />
      <div className='space-y-4'>
        {
          comments?.map((comment, index) => {
            return <Comment_card comment={comment} key={index} />
          })
        }
      </div>
    </div>
  )
}
