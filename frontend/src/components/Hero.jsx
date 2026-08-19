import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import {
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
} from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import Banner from './Banner'
import { useSiteConfig } from '../hooks/useSiteConfig'
import { useCmsList } from '../hooks/useCmsList'

export default function Hero() {
  const { config } = useSiteConfig()

  const {
    items: banners,
    loading,
  } = useCmsList('/banners')

  if (loading) {
    return (
      <section className="hero relative h-[95vh] bg-gray-900">
        <div className="h-full flex items-center justify-center text-white">
          Đang tải...
        </div>
      </section>
    )
  }

  if (!banners.length) {
    return (
      <section className="hero relative h-[95vh] bg-gray-900">
        <div className="h-full flex items-center justify-center text-white text-center px-6">
          <div>
            <h1 className="text-3xl font-bold">
              {config?.heroTitle || 'Thai Hoang Build'}
            </h1>

            {config?.heroSubtitle && (
              <p className="mt-3">
                {config.heroSubtitle}
              </p>
            )}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="hero relative h-[95vh]">
      <Swiper
        modules={[
          Autoplay,
          EffectFade,
          Navigation,
          Pagination,
        ]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        effect="fade"
        navigation={banners.length > 1}
        pagination={
          banners.length > 1
            ? { clickable: true }
            : false
        }
        loop={banners.length > 1}
        className="h-full"
      >
        {banners.map((slide) => (
          <SwiperSlide key={slide._id}>
            <div
              className="h-[95vh] bg-cover bg-center flex items-center justify-center"
              style={{
                backgroundImage: `url(${slide.coverImage})`,
              }}
            >
              <Banner
                title={slide.title}
                desc={slide.subtitle}
                btn1={slide.buttonText}
                btnUrl={slide.buttonUrl}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}