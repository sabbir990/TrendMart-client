import React from 'react'

export default function Section_head({heading, description}) {
  return (
    <div className='text-center font-poppins space-y-2'>
        <h1 className='text-bold text-2xl font-bold'>{heading}</h1>
        <p>{description}</p>
    </div>
  )
}
