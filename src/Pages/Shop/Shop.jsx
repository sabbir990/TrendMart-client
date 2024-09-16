import React from 'react'
import Section_head from '../../Components/Section_head/Section_head'
import useAxiosCommon from '../../Hooks/useAxiosCommon'
import { useQuery } from '@tanstack/react-query';
import Product_card from '../../Components/Product_card/Product_card';

export default function Shop() {
  const axiosCommon = useAxiosCommon();

  const { data: allProducts = [], isLoading } = useQuery({
    queryKey: ['allProducts'],
    queryFn: async () => {
      const { data } = await axiosCommon.get('/all-products');
      return data;
    }
  })

  return (
    <div>
      <div className='mt-8'>
        <Section_head heading={'Discover Your Perfect Style'} description={'Explore our curated selection of top-rated products and find the latest trends to elevate your shopping experience.'} />
      </div>
      {
        isLoading && <div className='h-screen flex items-center justify-center'>
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      }
      <div className='mt-8 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4'>
        {
          allProducts?.map((product, index) => {
            return <Product_card product={product} key={index} />
          })
        }
      </div>
    </div>
  )
}
