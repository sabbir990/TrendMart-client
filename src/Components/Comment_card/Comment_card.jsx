import React, { useState } from 'react'
import Rating from 'react-rating';
import '@fortawesome/fontawesome-free/css/all.min.css';


export default function Comment_card({ comment }) {
    return (
        <div className='bg-slate-200 rounded-lg p-4'>
            <img className={'w-12 rounded-full'} src={comment?.avatar_url} alt={comment?.name} />
            <h1 className='font-bold text-xl'>{comment?.name}</h1>
            <p className='text-gray-500 font-sm'>{comment?.email}</p>
            <Rating
                initialRating={comment?.rating}
                emptySymbol="far fa-star"
                fullSymbol="fas fa-star"
                fractions={2}
                readonly
            />
            <p>Review : {comment?.review}</p>
        </div>
    )
}
