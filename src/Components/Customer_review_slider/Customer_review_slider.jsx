import React from 'react'
import Rating from 'react-rating';
import '@fortawesome/fontawesome-free/css/all.min.css';


export default function Customer_review_slider({ review }) {
    return (
        <div className='text-center py-10 space-y-4'>
            <div className='flex items-center justify-center flex-col'>
                <img
                    src={review?.avatar_url || 'https://via.placeholder.com/100'}
                    alt="Preview"
                    className="w-24 h-24 rounded-full object-cover border border-gray-300"
                />
                <h3 className='font-bold'>{review?.name}</h3>
                <p className='text-sm text-gray-500'>{review?.email}</p>
            </div>
            <Rating
                initialRating={review.rating}
                emptySymbol="far fa-star"
                fullSymbol="fas fa-star"
                fractions={2}
                readonly
            />
            <p>{review?.review}</p>
        </div>
    )
}
