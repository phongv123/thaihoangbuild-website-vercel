import React from "react";
import { useSiteConfig } from "../hooks/useSiteConfig";

export default function ProfileFlipbook() {
    const { config } = useSiteConfig();

    return (
        <section className="bg-gray-100 py-20 flex flex-col items-center">

            <div className="text-center mb-10">
                <h4 className="text-sm font-semibold uppercase tracking-wide text-sky-500">
                    {config?.profileEyebrow || "ThaiHoangBuild"}
                </h4>

                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                    {config?.profileTitle || "Hồ sơ năng lực"}
                </h2>
            </div>

            <div className="relative bg-gray-300 rounded-3xl shadow-2xl p-6 flex justify-center items-center w-[950px] max-w-full">
                <iframe
                    src={
                        config?.profileFlipbookUrl ||
                        "https://online.fliphtml5.com/build2305/evxr/index.html"
                    }
                    className="w-full h-[700px] md:h-[800px] rounded-lg shadow-xl"
                    allowFullScreen
                    title="Hồ sơ năng lực Thai Hoang Build"
                />
            </div>
        </section>
    );
}