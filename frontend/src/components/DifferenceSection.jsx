import React from "react";
import {
    FaPlay,
    FaUsers,
    FaBuilding,
    FaClock,
    FaCogs,
    FaHardHat,
    FaTasks,
} from "react-icons/fa";
import { useSiteConfig } from "../hooks/useSiteConfig";

const icons = {
    users: FaUsers,
    building: FaBuilding,
    clock: FaClock,
    cogs: FaCogs,
    hardhat: FaHardHat,
    tasks: FaTasks,
};

export default function DifferenceSection() {
    const { config } = useSiteConfig();

    const items = config?.differenceItems || [];

    return (
        <section className="bg-[#f8fafc] py-16 mt-12 md:mt-16">
            <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center px-6">

                {/* IMAGE */}
                <div className="relative flex justify-center items-center">
                    <img
                        src={
                            config?.differenceImageUrl ||
                            "/ansukhacbiet.png"
                        }
                        alt={config?.differenceTitle || "Sự khác biệt"}
                        className="rounded-lg shadow-lg w-full max-w-md object-cover"
                    />

                    {config?.differenceVideoUrl && (
                        <a
                            href={config.differenceVideoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute bottom-[-8px] left-4 bg-cyan-500 hover:bg-cyan-400 w-14 h-14 flex items-center justify-center rounded"
                        >
                            <FaPlay className="text-white text-xl ml-1" />
                        </a>
                    )}
                </div>

                {/* CONTENT */}
                <div>
                    <h4 className="text-sm font-semibold uppercase tracking-wide text-[#0ea5e9] mb-2">
                        {config?.differenceEyebrow || "Sự khác biệt về"}
                    </h4>

                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                        {config?.differenceTitle || "ThaiHoangBuild"}
                    </h2>

                    <div className="grid grid-cols-2 gap-4">
                        {items.map((item, index) => {
                            const Icon =
                                icons[item.icon] || FaTasks;

                            return (
                                <div
                                    key={index}
                                    className="bg-cyan-500 hover:bg-cyan-400 transition rounded p-4 flex flex-col items-center text-center"
                                >
                                    <Icon className="text-white text-2xl mb-2" />

                                    <p className="font-semibold text-white">
                                        {item.title}
                                    </p>

                                    <span className="text-sm text-white opacity-90">
                                        {item.description}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}