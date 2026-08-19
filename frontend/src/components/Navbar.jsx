import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { MdEmail } from 'react-icons/md'
import { useSiteConfig } from '../hooks/useSiteConfig'

const NavItem = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      'px-3 py-2 rounded-md transition-colors whitespace-nowrap ' +
      (
        isActive
          ? 'bg-gradient-to-r from-[#2f6de1] to-[#1fc7d4] text-white'
          : 'text-gray-200 hover:bg-white/10 hover:text-white'
      )
    }
  >
    {children}
  </NavLink>
)

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  const {
    config,
    loading,
  } = useSiteConfig()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const logo = config?.logo || '/navbar/logocty.jpg'
  const phone = config?.hotline || ''
  const email = config?.email || ''
  const companyName = config?.companyName || 'THAIHOANG'

  return (
    <header
      className={`
        sticky top-0 z-40
        transition-all duration-300
        ${scrolled
          ? 'bg-black shadow-lg h-14'
          : 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 h-16'
        }
      `}
    >
      <div className="site-container flex items-center h-full min-w-0 text-white">

        {/* Logo + tên công ty */}
        <Link
          to="/"
          className="flex items-center gap-2 font-bold text-xl whitespace-nowrap shrink-0"
        >
          <img
            src={logo}
            alt={companyName}
            className={`
              w-auto transition-all duration-300
              ${scrolled ? 'h-8' : 'h-10'}
            `}
          />

          <span>{companyName}</span>
        </Link>

        {/* Menu */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2 ml-6 xl:ml-10 min-w-0">
          <NavItem to="/">Trang chủ</NavItem>
          <NavItem to="/about">Giới thiệu</NavItem>
          <NavItem to="/projects">Dự án</NavItem>
          <NavItem to="/products">Dịch vụ</NavItem>
          <NavItem to="/blog">Tư vấn</NavItem>
          <NavItem to="/contact">Liên hệ</NavItem>
        </nav>

        {/* Hotline + Email */}
        <div className="flex gap-2 items-center ml-auto pl-4 shrink-0">

          {phone && (
            <a
              href={`tel:${phone}`}
              className="bg-gradient-to-r from-[#2f6de1] to-[#1fc7d4] text-white flex items-center px-3 lg:px-4 py-2 rounded-lg whitespace-nowrap shadow-md"
            >
              Hotline: {phone}
            </a>
          )}

          {email && (
            <a
              href={`mailto:${email}`}
              className="hidden xl:flex bg-gradient-to-r from-[#2f6de1] to-[#1fc7d4] text-white items-center gap-2 px-3 lg:px-4 py-2 rounded-lg whitespace-nowrap"
            >
              <MdEmail className="text-lg" />
              <span>{email}</span>
            </a>
          )}

        </div>
      </div>
    </header>
  )
}