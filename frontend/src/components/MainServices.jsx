import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom";

import api from "../api";

export default function MainServices() {
    const navigate = useNavigate();

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProjects = async () => {
            try {
                const { data } = await api.get(
                    "/projects?featured=true&limit=8"
                );

                setProjects(data?.items || []);
            } catch (error) {
                console.error(
                    "Không thể tải dự án tiêu biểu:",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        loadProjects();
    }, []);

    // Không có dữ liệu thì không render section
    if (loading || projects.length === 0) {
        return null;
    }

    return (
        <section className="container my-20">

            <h2 className="text-3xl font-bold text-blue-800 mb-10">
                DỰ ÁN TIÊU BIỂU
            </h2>

            <Swiper
                modules={[Navigation, Pagination]}
                pagination={{ clickable: true }}
                navigation={projects.length > 1}
                spaceBetween={50}
                slidesPerView={1}
            >
                {projects.map((project) => (
                    <SwiperSlide key={project._id}>

                        <div className="grid md:grid-cols-2 gap-8 items-center">

                            {/* ẢNH */}
                            <img
                                src={
                                    project.cover ||
                                    "/placeholder.png"
                                }
                                alt={project.title}
                                className="rounded-lg shadow-lg object-cover w-full h-[400px]"
                            />

                            {/* NỘI DUNG */}
                            <div>

                                <h3 className="text-2xl font-semibold text-blue-800 mb-3">
                                    {project.title}
                                </h3>

                                <p className="text-gray-700 mb-5">
                                    {project.excerpt}
                                </p>

                                <button
                                    onClick={() =>
                                        navigate(
                                            `/projects/${project._id}`
                                        )
                                    }
                                    className="
                                        bg-gradient-to-r
                                        from-[#2f6de1]
                                        to-[#1fc7d4]
                                        hover:from-[#275fd0]
                                        hover:to-[#18b7c2]
                                        text-white
                                        px-5 py-2
                                        rounded-md
                                        font-semibold
                                        transition-all
                                        duration-300
                                        shadow-md
                                        hover:shadow-lg
                                        hover:-translate-y-0.5
                                    "
                                >
                                    XEM THÊM
                                </button>

                            </div>

                        </div>

                    </SwiperSlide>
                ))}
            </Swiper>

        </section>
    );
}