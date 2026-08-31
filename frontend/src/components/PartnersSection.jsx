import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useSiteConfig } from "../hooks/useSiteConfig";

export default function PartnersSection() {
    const { config } = useSiteConfig();

    const partners = config?.partners || [];

    return (
        <section className="py-16 bg-white">
            <div className="max-w-6xl mx-auto text-center px-4">

                <p className="text-sky-700 font-semibold uppercase tracking-wide">
                    {config?.partnersEyebrow || "Đối tác"}
                </p>

                <h2 className="text-3xl md:text-4xl font-bold text-sky-900 mb-8">
                    {config?.partnersTitle || "Khách hàng tiêu biểu"}
                </h2>

                {partners.length > 0 && (
                    <Swiper
                        modules={[Autoplay, Navigation, Pagination]}
                        spaceBetween={30}
                        slidesPerView={3}
                        loop={partners.length > 3}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        navigation={true}
                        pagination={{ clickable: true }}
                        breakpoints={{
                            640: { slidesPerView: 3 },
                            1024: { slidesPerView: 5 },
                        }}
                        className="pb-10"
                    >
                        {partners.map((partner, index) => (
                            <SwiperSlide key={index}>
                                <div className="flex justify-center">
                                    <img
                                        src={partner.imageUrl}
                                        alt={partner.alt || "Đối tác"}
                                        className="h-20 w-auto object-contain hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </div>
        </section>
    );
}