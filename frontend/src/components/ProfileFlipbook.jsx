import React from "react";

export default function ProfileFlipbook() {
    return (
        <section className="bg-gray-100 py-20 flex flex-col items-center">
            {/* Tiêu đề */}
            <div className="text-center mb-10">
                <h4 className="text-sm font-semibold uppercase tracking-wide text-sky-500">
                    ThaiHoangBuild
                </h4>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                    Hồ sơ năng lực
                </h2>
            </div>

            {/* Khung sách */}
            <div className="relative bg-gray-300 rounded-3xl shadow-2xl p-6 flex justify-center items-center w-[950px] max-w-full">

                {/* Flipbook embed */} {/*Nhúng flipbook từ trang web đã convert file pdf */}
                <iframe
                    src="https://online.fliphtml5.com/build2305/evxr/index.html"
                    className="w-full h-[700px] md:h-[800px] rounded-lg shadow-xl"
                    allowFullScreen
                ></iframe>

            </div>
        </section>
    );
}