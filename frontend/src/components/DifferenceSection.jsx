// src/components/DifferenceSection.jsx
import React from "react";
import { FaPlay, FaUsers, FaBuilding, FaClock, FaCogs, FaHardHat, FaTasks } from "react-icons/fa";

export default function DifferenceSection() {
    return (
        <section className="bg-[#f8fafc] text-white py-16 mt-12 md:mt-16">
            <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center px-6">
                {/* LEFT - Image with Play Button */}
                <div className="relative flex justify-center items-center">
                    <img
                        src="/ansukhacbiet.png" // đổi ảnh 
                        alt="Công nhân"
                        className="rounded-lg shadow-lg w-full max-w-md object-cover"
                    />

                    {/* Play Button */}
                    <a
                        href="https://www.youtube.com/results?search_query=x%C3%A2y+nh%C3%A0+minecraft" // link YouTube 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute bottom-[-8px] left-4 bg-cyan-500 hover:bg-cyan-400 w-14 h-14 flex items-center justify-center rounded"
                    >
                        <FaPlay className="text-white text-xl ml-1" />
                    </a>
                </div>

                {/* RIGHT - Content */}
                <div>
                    <h4 className="text-sm font-semibold uppercase tracking-wide text-[#0ea5e9] mb-2">
                        Sự khác biệt về
                    </h4>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                        ThaiHoangBuild
                    </h2>

                    {/* 6 boxes */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-cyan-500 hover:bg-cyan-400 transition rounded p-4 flex flex-col items-center text-center">
                            <FaUsers className="text-white text-2xl mb-2" />
                            <p className="font-semibold text-white">Nhân Viên</p>
                            <span className="text-sm text-white opacity-90">Phòng ban:kiểm soát, kế toán, kỹ sư, đội ngũ thi công</span>
                        </div>

                        <div className="bg-cyan-500 hover:bg-cyan-400 transition rounded p-4 flex flex-col items-center text-center">
                            <FaBuilding className="text-white text-2xl mb-2" />
                            <p className="font-semibold text-white">10 Năm Kinh Nghiệm</p>
                            <span className="text-sm text-white opacity-90">Sữa chữa cải tạo, xây mới, thay đổi mô hình kinh doanh</span>
                        </div>

                        <div className="bg-cyan-500 hover:bg-cyan-400 transition rounded p-4 flex flex-col items-center text-center">
                            <FaClock className="text-white text-2xl mb-2" />
                            <p className="font-semibold text-white">Hỗ trợ 24/7</p>
                            <span className="text-sm text-white opacity-90">Phản hồi trong 2 giờ</span>
                        </div>

                        <div className="bg-cyan-500 hover:bg-cyan-400 transition rounded p-4 flex flex-col items-center text-center">
                            <FaCogs className="text-white text-2xl mb-2" />
                            <p className="font-semibold text-white">Chuyên nghiệp</p>
                            <span className="text-sm text-white opacity-90">Tối ưu công năng</span>
                        </div>

                        <div className="bg-cyan-500 hover:bg-cyan-400 transition rounded p-4 flex flex-col items-center text-center">
                            <FaHardHat className="text-white text-2xl mb-2" />
                            <p className="font-semibold text-white">Thi công</p>
                            <span className="text-sm text-white opacity-90">TPHCM & lân cận</span>
                        </div>

                        <div className="bg-cyan-500 hover:bg-cyan-400 transition rounded p-4 flex flex-col items-center text-center">
                            <FaTasks className="text-white text-2xl mb-2" />
                            <p className="font-semibold text-white">2000+ Hạng mục</p>
                            <span className="text-sm text-white opacity-90">Bàn giao trọn gói</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
