import React from 'react'
import Section_head from '../Section_head/Section_head'
import useAxiosCommon from '../../Hooks/useAxiosCommon'
import { useQuery } from '@tanstack/react-query';
import Product_card from '../Product_card/Product_card';
import { Link } from 'react-router-dom';

export default function Product_showcase() {
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
            <div className='mt-16'>
                <Section_head heading={'Discover Our Top Picks'} description={'Explore the Best in Fashion, Electronics, and More—Handpicked Just for You!'} />
            </div>
            <div className='mt-8 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6'>
                {
                    allProducts?.slice(0, 3)?.map((product, index) => {
                        return <Product_card product={product} key={index} />
                    })
                }
            </div>
            {allProducts?.length > 3 && <div className='flex items-center justify-center mt-6'>
                <Link className='btn btn-warning' to={'/shop'}>View All</Link>
            </div>}
        </div>
    )
}
