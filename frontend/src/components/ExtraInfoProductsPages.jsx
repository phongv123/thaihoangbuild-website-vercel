import { FaCheckCircle, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

export default function ExtraInfoProductsPages() {
    const steps = [
        "Khảo sát thực tế",
        "Đặt nền móng vững chắc",
        "Bàn giao chuẩn chỉ",
    ];

    const items = [
        {
            title: "Xây mới trọn gói",
            desc: "Đặc biệt tối ưu công năng cho mô hình nhà phố, gác lửng hiện đại.",
        },
        {
            title: "Cải tạo & Đại tu",
            desc: "Nâng cấp, hô biến nhà cũ thành không gian sống hiện đại.",
        },
        {
            title: "Thi công nội thất",
            desc: "Tỉ mỉ trong từng chi tiết, đề cao tính công năng.",
        },
    ];

    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">

                {/* LEFT CONTENT */}
                <div>
                    {/* Dòng mô tả */}
                    <p className="text-gray-700 mb-4 font-medium">
                        Mọi công trình đều được chăm chút kỹ lưỡng qua từng giai đoạn
                    </p>

                    {/* Quy trình */}
                    <div className="flex flex-wrap items-center gap-3 mb-10 text-gray-800 font-medium">
                        {steps.map((step, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <span>{step}</span>
                                {index < steps.length - 1 && (
                                    <FaArrowRight className="text-sky-500" />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10">
                        Các dịch vụ cốt lõi của ThaiHoangBuild
                    </h2>

                    {/* Services */}
                    <div className="grid md:grid-cols-1 gap-6">
                        {items.map((item, index) => (
                            <motion.div
                                key={index}
                                whileHover={{
                                    y: -8,
                                    scale: 1.03,
                                }}
                                transition={{ duration: 0.3 }}
                                className="bg-white rounded-xl shadow-md p-6"
                            >
                                <FaCheckCircle className="text-green-500 text-3xl mb-4" />

                                <h3 className="font-semibold text-lg text-gray-800 mb-2">
                                    {item.title}
                                </h3>

                                <p className="text-gray-600 text-sm">
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* RIGHT IMAGE */}
                <div className="relative">
                    {/* ảnh chính */}
                    <motion.div
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.4 }}
                        className="overflow-hidden rounded-2xl shadow-2xl relative z-10"
                    >
                        <img
                            src="/extrainfoproductspages/extra-info-service.png"
                            alt="Dịch vụ ThaiHoangBuild"
                            className="w-full h-[650px] object-cover transition duration-500"
                        />
                    </motion.div>

                    {/* khối nền decor */}
                    <motion.div
                        animate={{
                            y: [0, -12, 0],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                        }}
                        className="absolute top-[8%] bottom-[8%] right-[-50px] w-[180px] 
                        bg-sky-500 opacity-90 rounded-2xl -skew-x-[15deg] z-0"
                    />
                </div>

            </div>
        </section>
    );
}