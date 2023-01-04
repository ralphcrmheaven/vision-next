import React, { useState } from 'react'
import { EffectCoverflow, Pagination, Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper-bundle.css'
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "@/assets/scss/style.scss";
import "swiper/css/navigation";

export default function PlanSwiper() {

    return (
        <div>
        <div className="relative">
            <Swiper
                effect="coverflow"
                slides-per-view="3"
                grabCursor={true}
                centeredSlides={true}
                navigation={true}
                slidesPerView="auto"
                loop={true}
                pagination={true}
                className="mySwiper"
            />
            <slot></slot>
        </div>
        </div>

    )
}