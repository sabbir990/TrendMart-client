import React from 'react'
import Section_head from '../Section_head/Section_head'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import useAxiosCommon from '../../Hooks/useAxiosCommon';
import { useQuery } from '@tanstack/react-query';
import Customer_review_slider from '../Customer_review_slider/Customer_review_slider';

export default function Customer_review() {
    const axiosCommon = useAxiosCommon();

    const { data: allReviews = [], isLoading } = useQuery({
        queryKey: ['allReviews'],
        queryFn: async () => {
            const { data } = await axiosCommon.get('/all-reviews');
            return data
        }
    })

    return (
        <div>
            <div className='mt-16'>
                <Section_head heading={'What Our Customers Are Saying'} description={'Hear directly from our satisfied customers about their favorite TrendMart products. Read their reviews and see why they love shopping with us!'} />
            </div>
            <div className='mt-8'>
                <Swiper
                    pagination={{
                        dynamicBullets: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper"
                >
                    {
                        allReviews?.map((review, index) => {
                            return <SwiperSlide key={index}>
                                <Customer_review_slider review={review} />
                            </SwiperSlide>
                        })
                    }
                </Swiper>
            </div>
        </div>
    )
}
