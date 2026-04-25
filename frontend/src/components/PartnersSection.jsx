import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const partners = [
    { img: "/partnersection/Chuỗi cửa hàng.jpg", alt: "Chuỗi cửa hàng" },
    { img: "/partnersection/Khách sạn MK TWO.jpg", alt: "Khách sạn MK TWO" },
    { img: "/partnersection/Nhà phố Bình Lọi.jpg", alt: "Nhà phố Bình Lọi" },
    { img: "/partnersection/Nhà Phố Cát Lái.jpg", alt: "Nhà Phố Cát Lái" },
    { img: "/partnersection/Nhà thép tiền chế - Hốc Môn.jpg", alt: "Nhà thép tiền chế - Hốc Môn" },
    { img: "/partnersection/Thi công hồ bơi.jpg", alt: "Thi công hồ bơi" },
    { img: "/partnersection/Thi công khách sạn.jpg", alt: "Thi công khách sạn" },
    { img: "/partnersection/Thi công nhà Phố Chú Diệu.jpg", alt: "Thi công nhà Phố Chú Diệu" },
    { img: "/partnersection/Thi công nhà Phố Nguyễn Duy Trinh.jpg", alt: "Thi công nhà Phố Nguyễn Duy Trinh" },


];

export default function PartnersSection() {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-6xl mx-auto text-center px-4">
                <p className="text-sky-700 font-semibold uppercase tracking-wide">Đối tác</p>
                <h2 className="text-3xl md:text-4xl font-bold text-sky-900 mb-8">
                    Khách hàng tiêu biểu
                </h2>

                <Swiper
                    modules={[Autoplay, Navigation, Pagination]}
                    spaceBetween={30}
                    slidesPerView={3}
                    loop={true}
                    autoplay={{ delay: 2500, disableOnInteraction: false }}
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
                                    src={partner.img}
                                    alt={partner.alt}
                                    className="h-20 w-auto object-contain hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
