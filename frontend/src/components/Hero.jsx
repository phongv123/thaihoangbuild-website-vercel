import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Banner from "./Banner";
import { useSiteConfig } from "../hooks/useSiteConfig"; // 1. Import hook vào

export default function Hero({ slides }) {
  // 2. Gọi hook để lấy dữ liệu mới nhất từ CMS
  const { config } = useSiteConfig();

  const defaultSlides = [
    { image: "/banner_home/1.jpg" },
    { image: "/banner_home/2.jpg" },
    { image: "/banner_home/3.jpg" },
    { image: "/banner_home/4.jpg" },
    { image: "/banner_home/5.jpg" },
    { image: "/banner_home/6.jpg" },
  ];

  const data = slides && slides.length ? slides : defaultSlides;

  return (
    <section className="hero relative h-[95vh]">
      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        effect="fade"
        navigation={data.length > 1}
        pagination={data.length > 1 ? { clickable: true } : false}
        loop={data.length > 1}
        className="h-full"
      >
        {data.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="h-[95vh] bg-cover bg-center flex items-center justify-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* 3. Truyền dữ liệu thật từ CMS qua Banner */}
              <Banner
                title={config?.heroTitle}
                desc={config?.heroSubtitle}
                btn1={config?.heroButtonText}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}