import React from 'react'
import useAxiosCommon from '../../Hooks/useAxiosCommon'
import { useQuery } from '@tanstack/react-query';
import Banner_item from '../Banner_item/Banner_item';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

export default function Banner() {
    const axiosCommon = useAxiosCommon();

    const { data: bannerItems = [], isLoading } = useQuery({
        queryKey: ['bannerItems'],
        queryFn: async () => {
            const { data } = await axiosCommon.get('/banner-items');
            return data
        }
    })
    
    return (
        <div><Swiper
            pagination={{
                dynamicBullets: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
        >
            {
                bannerItems?.map((item, index) => {
                    return <SwiperSlide key={index}>
                        <Banner_item item={item} />
                    </SwiperSlide>
                })
            }
        </Swiper></div>
    )
}
