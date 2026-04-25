import React from "react";
import { Mail, Headphones, MapPin } from "lucide-react";
import { api } from "../api";

export default function ContactSection() {
    return (
        <section>
            {/* 🔹 Banner Liên hệ */}
            <div className="relative h-64 md:h-80 lg:h-96">
                <img
                    src="/banners/banner-contact.webp"
                    alt="Banner Liên hệ"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex flex-caol items-center justify-center text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-black mb-3">
                        Liên hệ
                    </h1>
                    <p className="text-black text-sm uppercase tracking-widest">
                        ThaiHoangBuild / <span className="underline">LIÊN HỆ</span>
                    </p>
                </div>
            </div>

            {/* 🔹 3 khối thông tin */}
            <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* --- 1. Tư vấn & Báo giá --- */}
                <div className="bg-white shadow-sm rounded-xl overflow-hidden border">
                    <img
                        src="/banners/avatar-contact.png"
                        alt="Tư vấn Báo giá"
                        className="w-full h-64 object-cover"
                    />
                    <div className="p-6 flex items-start gap-4">
                        <Mail className="w-8 h-8 text-blue-600" />
                        <div>
                            <h3 className="text-blue-600 font-semibold">
                                Tư vấn - Báo giá
                            </h3>
                            <p className="font-bold text-gray-900">
                                Zalo ThaiHoangBuild: https://zalo.me/2110708976353979339
                            </p>
                        </div>
                    </div>
                </div>

                {/* --- 2. Liên hệ --- */}
                <div className="bg-white shadow-sm rounded-xl overflow-hidden border">
                    <img
                        src="/banners/store-contact.jpg"
                        alt="Liên hệ"
                        className="w-full h-64 object-cover"
                    />

                    <div className="p-6 flex items-start gap-4">
                        <Headphones className="w-8 h-8 text-blue-600" />

                        <div>
                            <h3 className="text-blue-600 font-semibold">
                                Liên hệ
                            </h3>

                            <div className="font-bold text-gray-900 space-y-1">
                                <p>
                                    Số điện thoại của Huy:
                                    <a
                                        href="tel:0969131718"
                                        className="text-blue-600 ml-2 hover:underline"
                                    >
                                        0969.13.17.18
                                    </a>
                                </p>

                                <p>
                                    Số điện thoại của Hiếu:
                                    <a
                                        href="tel:0909516507"
                                        className="text-blue-600 ml-2 hover:underline"
                                    >
                                        0909.516.507
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- 3. Địa chỉ --- */}
                <div className="bg-white shadow-sm rounded-xl overflow-hidden border">
                    <img
                        src="/banners/team-contact.jpg"
                        alt="Địa chỉ"
                        className="w-full h-64 object-cover"
                    />
                    <div className="p-6 flex items-start gap-4">
                        <MapPin className="w-8 h-8 text-blue-600" />
                        <div>
                            <p className="font-bold text-gray-900">
                                206/7 Đ. Bình Tiên, Bình Tiên, Hồ Chí Minh 73120, Việt Nam
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 🔹 Form liên hệ */}
            <div className="bg-[#76A9C5] py-12 px-6 md:px-12 rounded-lg max-w-4xl mx-auto mb-16">
                <div className="text-center mb-8">
                    <h3 className="text-white uppercase text-sm tracking-widest">Liên hệ</h3>
                    <h2 className="text-3xl md:text-4xl font-bold text-white">
                        Sẵn sàng tư vấn!
                    </h2>
                </div>

                {/* ✅ Form gửi dữ liệu */}
                <form
                    onSubmit={async (e) => {
                        e.preventDefault();

                        const formData = {
                            name: e.target.name.value,
                            phone: e.target.phone.value,
                            email: e.target.email.value,
                            address: e.target.address.value,
                            message: e.target.message.value,
                        };

                        try {
                            const res = await api.post("/leads", formData);

                            if (res.status === 201 || res.status === 200) {
                                alert("✅ Gửi liên hệ thành công!");
                                e.target.reset();
                            } else {
                                alert("❌ Gửi thất bại. Vui lòng thử lại.");
                            }
                        } catch (err) {
                            console.error(err);
                            alert("❌ Có lỗi server hoặc mạng.");
                        }
                    }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    {/* Họ tên */}
                    <div>
                        <label className="block text-white mb-2">Họ tên</label>
                        <input
                            name="name"
                            type="text"
                            placeholder="*Họ tên"
                            required
                            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                    </div>

                    {/* Số điện thoại */}
                    <div>
                        <label className="block text-white mb-2">Số điện thoại</label>
                        <input
                            name="phone"
                            type="text"
                            placeholder="*Số điện thoại"
                            required
                            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-white mb-2">Email</label>
                        <input
                            name="email"
                            type="email"
                            placeholder="Email"
                            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                    </div>

                    {/* Địa chỉ */}
                    <div>
                        <label className="block text-white mb-2">Địa chỉ</label>
                        <input
                            name="address"
                            type="text"
                            placeholder="Địa chỉ"
                            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                    </div>

                    {/* Nội dung */}
                    <div className="md:col-span-2">
                        <label className="block text-white mb-2">Nội dung</label>
                        <textarea
                            name="message"
                            placeholder="Nội dung"
                            rows="4"
                            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        ></textarea>
                    </div>

                    {/* Nút gửi */}
                    <div className="md:col-span-2 flex justify-center">
                        <button
                            type="submit"
                            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-md transition-all duration-200"
                        >
                            Liên hệ
                        </button>
                    </div>
                </form>
            </div>

            {/* 🔹 Bản đồ Google Maps */}
            <div className="w-full h-[400px] mt-8">
                <iframe
                    title="Bản đồ công ty"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4486.418694775508!2d106.64045471112429!3d10.744165759742684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f3c3fa80891%3A0xb1c6ca8d3d648784!2zQ8OUTkcgVFkgVE5ISCBUSMOBSSBIT8OATkcgQlVJTEQ!5e1!3m2!1svi!2s!4v1777087294000!5m2!1svi!2s"
                    width="100%"
                    height="100%"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="border-0 w-full h-full"
                ></iframe>
            </div>
        </section>
    );
}
