import React from "react";
import { motion } from "framer-motion";
import { useSiteConfig } from "../hooks/useSiteConfig";
import DifferenceSection from "../components/DifferenceSection";
import PartnersSection from "../components/PartnersSection";
import ProfileFlipbook from "../components/ProfileFlipbook";

export default function About() {
    const { config, loading } = useSiteConfig();

    if (loading) {
        return (
            <div className="py-20 text-center">
                Đang tải...
            </div>
        );
    }

    return (
        <div className="about-page">

            {/* BANNER */}
            <div className="relative h-64 md:h-80 lg:h-96 mb-8">
                <img
                    src={config?.aboutPageBannerUrl || "/banner6.jpg"}
                    alt={config?.aboutPageBannerTitle || "Giới thiệu"}
                    className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <h1 className="text-3xl md:text-5xl font-bold text-white">
                        {config?.aboutPageBannerTitle || "Giới thiệu"}
                    </h1>
                </div>
            </div>

            {/* GIỚI THIỆU */}
            <section className="container mx-auto px-4 py-12 grid md:grid-cols-2 gap-8 items-center">

                {/* LEFT */}
                <div className="relative">
                    <img
                        src={
                            config?.aboutPageProfileImage ||
                            "/anhHosonangluc.jpg"
                        }
                        alt="Hồ sơ năng lực"
                        className="rounded-lg shadow-lg w-full"
                    />

                    <motion.img
                        src={
                            config?.aboutPageConstructionImage ||
                            "/anhdangxaydung.jpg"
                        }
                        alt="Công trình"
                        className="absolute top-6 -left-24 w-48 rounded-lg shadow-lg border-4 border-white"
                        animate={{ y: [0, -20, 0] }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />

                    <button className="absolute bottom-0 left-0 bg-orange-500 text-white px-6 py-3 font-semibold">
                        {config?.aboutPageProfileButtonText ||
                            "Hồ sơ năng lực"}
                    </button>
                </div>

                {/* RIGHT */}
                <div>
                    <h4 className="text-sm font-semibold text-blue-600 uppercase">
                        {config?.aboutPageEyebrow || "Giới thiệu chung"}
                    </h4>

                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        {config?.aboutPageTitle ||
                            config?.companyName ||
                            "CÔNG TY TNHH THÁI HOÀNG BUILD"}
                    </h2>

                    <p className="text-gray-600 mb-6">
                        {config?.aboutPageDescription ||
                            config?.aboutDescription ||
                            ""}
                    </p>

                    {/* DỊCH VỤ */}
                    {config?.aboutPageServices?.length > 0 && (
                        <div className="grid sm:grid-cols-2 gap-4 mb-6">
                            {config.aboutPageServices.map((service, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-2"
                                >
                                    <span className="text-green-600">✔</span>
                                    <span className="font-semibold">
                                        {service}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}

                    <a
                        href={
                            config?.aboutPageContactButtonUrl ||
                            "/contact"
                        }
                        className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 font-semibold rounded"
                    >
                        {config?.aboutPageContactButtonText || "Liên hệ"}
                    </a>
                </div>
            </section>

            {/* SỰ KHÁC BIỆT */}
            <DifferenceSection />

            {/* ĐỐI TÁC */}
            <PartnersSection />

            {/* HỒ SƠ NĂNG LỰC */}
            <ProfileFlipbook />
        </div>
    );
}