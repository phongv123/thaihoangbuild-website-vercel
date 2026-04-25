import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import logo from "/navbar/logocty.jpg";

const NavItem = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      "px-3 py-2 rounded-md transition-colors whitespace-nowrap " +
      (isActive
        ? "bg-gradient-to-r from-[#2f6de1] to-[#1fc7d4] text-white"
        : "text-gray-200 hover:bg-white/10 hover:text-white")
    }
  >
    {children}
  </NavLink>
);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${scrolled
        ? "bg-black shadow-lg h-14"
        : "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 h-16"
        }`}
    >
      <div className="container flex items-center h-full text-white">

        {/* LEFT: Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 font-bold text-xl whitespace-nowrap"
        >

          {/* Logo có thể co lại khi scroll để tiết kiệm không gian */}
          <img
            src={logo}
            alt="Thai Hoang Build"
            className={`w-auto transition-all duration-300 ${scrolled ? "h-8" : "h-10"
              }`}
          />
          <span>
            THAIHOANG<span className="bg-gradient-to-r from-[#2f6de1] to-[#1fc7d4] bg-clip-text text-transparent">
              BUILD
            </span>
          </span>
        </Link>

        {/* CENTER: Menu (đẩy ra xa logo) */}
        <nav className="hidden md:flex items-center gap-3 ml-12">
          <NavItem to="/">Trang chủ</NavItem>
          <NavItem to="/about">Giới thiệu</NavItem>
          <NavItem to="/projects">Dự án</NavItem>
          <NavItem to="/products">Dịch vụ</NavItem>
          <NavItem to="/blog">Tư vấn</NavItem>
          <NavItem to="/contact">Liên hệ</NavItem>
        </nav>

        {/* RIGHT: Hotline + Email */}
        <div className="flex gap-2 items-center ml-auto pl-6">
          <a
            href="tel:0969.13.17.18"
            className="bg-gradient-to-r from-[#2f6de1] to-[#1fc7d4]
           hover:from-[#275fd0] hover:to-[#18b7c2]
           text-white flex items-center px-4 py-2 rounded-lg whitespace-nowrap
           transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            Hotline: 0969.13.17.18
          </a>

          <a
            href="mailto:thaihoangbuild@gmail.com"
            className="bg-gradient-to-r from-[#2f6de1] to-[#1fc7d4]
           hover:from-[#275fd0] hover:to-[#18b7c2]
           text-white flex items-center px-4 py-2 rounded-lg whitespace-nowrap
           transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            <MdEmail className="text-lg" />
            <span>thaihoangbuild@gmail.com</span>
          </a>
        </div>

      </div>
    </header>
  );
}