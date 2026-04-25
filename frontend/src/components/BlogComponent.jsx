import React from "react";
import { motion } from "framer-motion";
import ServicesSection from "./ServicesSection";

export default function BlogComponent({
    posts,
    filteredPosts,
    categories,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory
}) {
    return (
        <div className="font-sans bg-gray-50 text-gray-800">
            {/* ===== Banner ===== */}
            <section className="relative h-[300px] md:h-[600px] flex items-center justify-center overflow-hidden mb-12 md:mb-18">
                <img
                    src="/banners/tuvan.jpg"
                    alt="Banner tư vấn"
                    className="absolute inset-0 w-full h-full object-cover brightness-75"
                />
                <div className="relative text-center z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-white text-4xl md:text-5xl font-bold mb-2"
                    >
                        Tư vấn & Chia sẻ
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="text-white text-lg"
                    >
                        Cập nhật kiến thức và kinh nghiệm thực tế trong xây dựng & thiết kế
                    </motion.p>
                </div>
            </section>

            {/* ===== Search & Category ===== */}
            <section className="container mx-auto px-4 py-16">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">

                    {/* Search */}
                    <div className="relative w-full md:w-1/3">
                        <motion.span
                            initial={{ opacity: 1, x: 0 }}
                            animate={{
                                opacity: searchTerm ? 0 : 1,
                                x: searchTerm ? -10 : 0,
                            }}
                            transition={{ duration: 0.3 }}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                        />

                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onFocus={(e) => e.target.placeholder = ""}
                            onBlur={(e) => e.target.placeholder = "Tìm bài viết..."}
                            placeholder="Tìm bài viết..."
                            className="w-full px-10 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Categories */}
                    <div className="flex flex-wrap gap-3 justify-center">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition ${selectedCategory === cat
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-200 hover:bg-gray-300"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== Featured Posts ===== */}
            <section className="container mx-auto px-4 pb-12 pt-6">
                <h2 className="text-2xl font-bold mb-8 text-center">Bài viết nổi bật</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    {posts.slice(0, 2).map((post, index) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className="relative rounded-2xl overflow-hidden shadow-lg group"
                        >
                            <img
                                src={post.cover}
                                alt={post.title}
                                className="w-full h-64 object-cover group-hover:scale-105 transition duration-500"
                            />
                            <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-5 text-white">
                                <h3 className="text-xl font-semibold">{post.title}</h3>
                                <p className="text-sm opacity-90">{post.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ===== Post List ===== */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 grid gap-8 md:grid-cols-3">
                    {filteredPosts.map((post, index) => (
                        <motion.article
                            key={post.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="bg-gray-50 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
                        >
                            <img
                                src={post.cover}
                                alt={post.title}
                                className="w-full h-56 object-cover"
                            />
                            <div className="p-5">
                                <p className="text-sm text-gray-500 mb-2">
                                    {post.date} • {post.category}
                                </p>
                                <h2 className="text-lg font-semibold mb-2 hover:text-blue-600 cursor-pointer">
                                    {post.title}
                                </h2>
                                <p className="text-gray-600 text-sm line-clamp-3">{post.desc}</p>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </section>

            {/* ===== FAQ (từ trang dịch vụ) ===== */}
            <div className="bg-gray-50 py-16">
                <ServicesSection />
            </div>

            {/* ===== Team ===== */}
            <section className="container mx-auto px-4 py-16 text-center">
                <h2 className="text-2xl font-bold mb-4">
                    Đội ngũ tư vấn của chúng tôi
                </h2>

                <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                    Với hơn 10 năm kinh nghiệm trong lĩnh vực xây dựng & thiết kế,
                    đội ngũ ThaiHoangBuild luôn sẵn sàng hỗ trợ khách hàng.
                </p>

                {[
                    {
                        img: "/team1.jpg",
                        name: "Mr. Huy",
                        role: "Giám đoc dự án",
                    },
                    {
                        img: "/team2.jpg",
                        name: "Mr. Hiếu",
                        role: "Giám đốc thi công",
                    },
                ].map((member, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                        className="inline-flex flex-col items-center mx-4"
                    >
                        {/* Avatar */}
                        <div className="w-40 h-40 rounded-full overflow-hidden shadow-md mb-4">
                            <img
                                src={member.img}
                                alt={member.name}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Name */}
                        <h3 className="font-semibold text-lg text-gray-800">
                            {member.name}
                        </h3>

                        {/* Role */}
                        <p className="text-sm text-gray-500">
                            {member.role}
                        </p>
                    </motion.div>
                ))}
            </section>

            {/* ===== Subscribe ===== */}
            <section className="bg-blue-600 text-white py-14 text-center">
                <h2 className="text-2xl font-bold mb-4">Đăng ký nhận tin tư vấn mới</h2>
                <p className="mb-6 opacity-90">
                    Nhập email để nhận bài viết hữu ích mỗi tuần
                </p>
                <div className="flex justify-center gap-2 max-w-md mx-auto">
                    <input
                        type="email"
                        placeholder="Nhập email..."
                        className="flex-grow px-4 py-2 rounded-l-full text-gray-800"
                    />
                    <button className="bg-white text-blue-600 px-6 py-2 rounded-r-full font-semibold hover:bg-gray-200">
                        Đăng ký
                    </button>
                </div>
            </section>
        </div>
    );
}