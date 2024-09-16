import React from 'react'
import Logo from '../Logo/Logo'

export default function Top_section({heading, description}) {
  return (
    <div className='text-center font-poppins space-y-2'>
        <Logo />
        <h1 className='text-bold text-2xl font-bold'>{heading}</h1>
        <p>{description}</p>
    </div>
  )
}
