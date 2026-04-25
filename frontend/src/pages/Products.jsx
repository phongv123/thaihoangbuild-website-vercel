import React from "react";
import Hero from "../components/Hero";
import ServicesSection from "../components/ServicesSection";
import ExtraInfoProductsPages from "../components/ExtraInfoProductsPages";
import BeforeAfterCustom from "../components/BeforeAfterCustom";


export default function Products() {
    const slides = [
        {
            image: "/nentoibanner.jpg",
            title: "Dịch vụ",
            desc: "Khám phá các dịch vụ thiết kế và thi công chuyên nghiệp.",
            btn1: "Xem dự án",
            btn2: "Liên hệ tư vấn",
        },
    ];

    return (
        <div>
            {/* Hero banner chỉ với 1 slide */}
            <Hero slides={slides} />

            {/* Phần so sánh ảnh trước – sau */}
            {/* <ServicesSection /> câu hỏi thường gặp(đã đem qua blogcomponent) */}
            <ExtraInfoProductsPages />{/* Các dịch vụ cốt lõi của ThaiHoangBuild */}
            <BeforeAfterCustom /> {/* ảnh trước – sau */}
        </div>
    );
}
