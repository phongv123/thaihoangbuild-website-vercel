import React, { useState } from "react";

export default function ZaloFloatingButton() {
    const [hover, setHover] = useState(false);

    return (
        <div
            className="fixed bottom-6 right-6 z-50 flex flex-col items-end"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            {/* Bong bóng text */}
            {hover && (
                <div className="mb-2 px-3 py-2 bg-white text-gray-800 rounded-lg shadow-md border text-sm animate-fadeIn">
                    💬 Liên hệ ngay qua Zalo
                </div>
            )}

            {/* Nút Zalo */}
            <a
                href="https://zalo.me/2110708976353979339" // thay bằng link Zalo OA hoặc số điện thoại công ty
                target="_blank"
                rel="noopener noreferrer"
                className="relative"
            >
                {/* Hiệu ứng nhấp nháy (pulse) */}
                <span className="absolute inset-0 rounded-full bg-blue-400 opacity-40 animate-ping"></span>

                {/* Icon chính */}
                <img
                    src="/zalo-icon.png"
                    alt="Zalo"
                    className="w-14 h-14 rounded-full shadow-lg hover:scale-110 transition-transform duration-200 relative"
                />
            </a>
        </div>
    );
}
