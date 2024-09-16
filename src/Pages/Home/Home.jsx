import React from 'react'
import Banner from '../../Components/Banner/Banner'
import Product_showcase from '../../Components/Product_showcase/Product_showcase'
import Customer_review from '../../Components/Customer_review/Customer_review'

export default function Home() {
  return (
    <div>
      <Banner />
      <Product_showcase />
      <Customer_review />
    </div>
  )
}
