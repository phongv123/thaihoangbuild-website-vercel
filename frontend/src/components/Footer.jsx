import React from "react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useSiteConfig } from "../hooks/useSiteConfig";

export default function Footer() {
  const { config } = useSiteConfig();

  return (
    <footer className="mt-16 bg-gray-900 text-gray-300">
      <div className="container mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">
        {/* Công ty */}
        <div>
          <h4 className="text-lg font-bold text-white mb-3">
            {config?.companyName || "CÔNG TY TNHH THÁI HOÀNG BUILD"}
          </h4>
          <p className="text-sm mb-2">
            {config?.slogan || "Xây Niềm Tin - Dựng Uy Tín"}
          </p>
          <p className="flex items-center text-sm">
            <Clock className="w-4 h-4 mr-2 text-indigo-400" />
            {config?.workingHours || "8:00 - 18:00 (Thứ 2 - Chủ Nhật)"}
          </p>
        </div>

        {/* Danh mục */}
        <div>
          <h4 className="text-lg font-bold text-white mb-3">Lĩnh vực</h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Xây dựng trọn gói</li>
            <li className="hover:text-white cursor-pointer">Thiết kế & Thi công</li>
            <li className="hover:text-white cursor-pointer">Cải tạo & sửa chữa</li>
          </ul>
        </div>

        {/* Liên hệ */}
        <div>
          <h4 className="text-lg font-bold text-white mb-3">Liên hệ</h4>
          <p className="flex items-start text-sm mb-2">
            <MapPin className="w-4 h-4 mr-2 text-indigo-400 mt-0.5" />
            {config?.address || "Số 128 Đường Phạm Văn Thuận, P. Tân Tiến, TP. Biên Hòa, Đồng Nai"}
          </p>
          <p className="flex items-center text-sm mb-2">
            <Mail className="w-4 h-4 mr-2 text-indigo-400" />
            {config?.email || "contact@thaihoangbuild.com"}
          </p>
          <p className="flex items-center text-sm mb-2">
            <Phone className="w-4 h-4 mr-2 text-indigo-400" />
            Hotline: {config?.hotline || "0942 888 888"}
          </p>
          <p className="flex items-center text-sm mb-2">
            <Phone className="w-4 h-4 mr-2 text-indigo-400" />
            Zalo: {config?.zaloNumber || "0942 888 888"}
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="text-center text-xs py-4 bg-gray-800 text-gray-400">
        © 2026 ThaiHoangBuild. All rights reserved.
      </div>
    </footer>
  );
}