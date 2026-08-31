import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  House,
  Info,
  FolderKanban,
  Wrench,
  Newspaper,
  Phone,
  ChevronDown,
  ChevronRight,
  PanelBottom,
  LogOut,
} from "lucide-react";

export default function AdminLayout({ children }) {
  const location = useLocation();

  const isPathActive = (path) => {
    return (
      location.pathname === path ||
      location.pathname.startsWith(`${path}/`)
    );
  };

  const [openMenus, setOpenMenus] = useState({
    home: isPathActive("/admin/home"),
    about: isPathActive("/admin/about"),
    projects: isPathActive("/admin/projects"),
    services: isPathActive("/admin/services"),
    consulting: isPathActive("/admin/consulting"),
    contact: isPathActive("/admin/contact"),
    footer: isPathActive("/admin/footer"),
  });

  useEffect(() => {
    setOpenMenus((prev) => ({
      ...prev,

      home: isPathActive("/admin/home")
        ? true
        : prev.home,

      about: isPathActive("/admin/about")
        ? true
        : prev.about,

      projects: isPathActive("/admin/projects")
        ? true
        : prev.projects,

      services: isPathActive("/admin/services")
        ? true
        : prev.services,

      consulting: isPathActive("/admin/consulting")
        ? true
        : prev.consulting,

      contact: isPathActive("/admin/contact")
        ? true
        : prev.contact,

      footer: isPathActive("/admin/footer")
        ? true
        : prev.footer,
    }));
  }, [location.pathname]);

  const toggleMenu = (name) => {
    setOpenMenus((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const logout = () => {
    localStorage.removeItem("admin_token");
    window.location.href = "/admin/login";
  };

  const parentClass = (active) => `
    w-full
    flex items-center justify-between
    px-3 py-2.5
    rounded-lg
    transition
    text-left
    ${active
      ? "bg-blue-50 text-blue-700"
      : "text-gray-700 hover:bg-gray-100"
    }
  `;

  const childClass = (active) => `
    block
    ml-9
    px-3 py-2
    rounded-lg
    text-sm
    transition
    ${active
      ? "bg-blue-500 text-white"
      : "text-gray-600 hover:bg-gray-100"
    }
  `;

  const ChildLink = ({ label, to }) => (
    <Link
      to={to}
      className={childClass(location.pathname === to)}
    >
      {label}
    </Link>
  );

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* =========================
          SIDEBAR
      ========================== */}

      <aside className="
        w-80
        bg-white
        shadow-lg
        px-4
        py-6
        fixed
        left-0
        top-0
        bottom-0
        overflow-y-auto
      ">

        <h2 className="text-xl font-bold mb-6 px-2">
          Admin Panel
        </h2>

        <nav className="space-y-2">

          {/* =========================
              DASHBOARD
          ========================== */}

          <Link
            to="/admin"
            className={`
              flex items-center gap-3
              px-3 py-2.5
              rounded-lg
              transition
              ${location.pathname === "/admin"
                ? "bg-blue-500 text-white"
                : "text-gray-700 hover:bg-gray-100"
              }
            `}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </Link>

          {/* =========================
              1. TRANG CHỦ
          ========================== */}

          <div>

            <button
              type="button"
              onClick={() => toggleMenu("home")}
              className={parentClass(
                isPathActive("/admin/home")
              )}
            >
              <span className="flex items-center gap-3">
                <House size={18} />
                Trang chủ
              </span>

              {openMenus.home ? (
                <ChevronDown size={17} />
              ) : (
                <ChevronRight size={17} />
              )}
            </button>

            {openMenus.home && (
              <div className="mt-1 space-y-1">

                <ChildLink
                  label="Banner trang chủ"
                  to="/admin/home/banner"
                />

                <ChildLink
                  label="Dự án thiết kế"
                  to="/admin/home/design-projects"
                />

                <ChildLink
                  label="Quy trình thực hiện"
                  to="/admin/home/process"
                />

                <ChildLink
                  label="Dự án tiêu biểu"
                  to="/admin/home/featured-projects"
                />


                <ChildLink
                  label="Giới thiệu"
                  to="/admin/home/about"
                />

                <ChildLink
                  label="Báo giá"
                  to="/admin/home/quote"
                />

                <ChildLink
                  label="Liên hệ nhanh"
                  to="/admin/home/quick-contact"
                />

              </div>
            )}
          </div>

          {/* =========================
              2. GIỚI THIỆU
          ========================== */}

          <div>

            <button
              type="button"
              onClick={() => toggleMenu("about")}
              className={parentClass(
                isPathActive("/admin/about")
              )}
            >
              <span className="flex items-center gap-3">
                <Info size={18} />
                Giới thiệu
              </span>

              {openMenus.about ? (
                <ChevronDown size={17} />
              ) : (
                <ChevronRight size={17} />
              )}
            </button>

            {openMenus.about && (
              <div className="mt-1 space-y-1">

                <ChildLink
                  label="Banner"
                  to="/admin/about/banner"
                />

                <ChildLink
                  label="Nội dung giới thiệu"
                  to="/admin/about/content"
                />

                <ChildLink
                  label="Sự khác biệt"
                  to="/admin/about/difference"
                />

                <ChildLink
                  label="Đối tác"
                  to="/admin/about/partners"
                />

                <ChildLink
                  label="Hồ sơ năng lực"
                  to="/admin/about/profile"
                />

              </div>
            )}
          </div>

          {/* =========================
              3. DỰ ÁN
          ========================== */}

          <div>

            <button
              type="button"
              onClick={() => toggleMenu("projects")}
              className={parentClass(
                isPathActive("/admin/projects")
              )}
            >
              <span className="flex items-center gap-3">
                <FolderKanban size={18} />
                Dự án
              </span>

              {openMenus.projects ? (
                <ChevronDown size={17} />
              ) : (
                <ChevronRight size={17} />
              )}
            </button>

            {openMenus.projects && (
              <div className="mt-1 space-y-1">

                <ChildLink
                  label="Banner"
                  to="/admin/projects/banner"
                />

                <ChildLink
                  label="Danh sách dự án"
                  to="/admin/projects/list"
                />

              </div>
            )}
          </div>

          {/* =========================
              4. DỊCH VỤ
          ========================== */}

          <div>

            <button
              type="button"
              onClick={() => toggleMenu("services")}
              className={parentClass(
                isPathActive("/admin/services")
              )}
            >
              <span className="flex items-center gap-3">
                <Wrench size={18} />
                Dịch vụ
              </span>

              {openMenus.services ? (
                <ChevronDown size={17} />
              ) : (
                <ChevronRight size={17} />
              )}
            </button>

            {openMenus.services && (
              <div className="mt-1 space-y-1">

                <ChildLink
                  label="Banner"
                  to="/admin/services/banner"
                />

                <ChildLink
                  label="Dịch vụ cốt lõi"
                  to="/admin/services/core"
                />

                <ChildLink
                  label="Trước và sau"
                  to="/admin/services/before-after"
                />

              </div>
            )}
          </div>

          {/* =========================
              5. TƯ VẤN
          ========================== */}

          <div>

            <button
              type="button"
              onClick={() => toggleMenu("consulting")}
              className={parentClass(
                isPathActive("/admin/consulting")
              )}
            >
              <span className="flex items-center gap-3">
                <Newspaper size={18} />
                Tư vấn
              </span>

              {openMenus.consulting ? (
                <ChevronDown size={17} />
              ) : (
                <ChevronRight size={17} />
              )}
            </button>

            {openMenus.consulting && (
              <div className="mt-1 space-y-1">

                <ChildLink
                  label="Tìm kiếm & danh mục"
                  to="/admin/consulting/search"
                />

                <ChildLink
                  label="Bài viết"
                  to="/admin/consulting/posts"
                />

                <ChildLink
                  label="Câu hỏi thường gặp"
                  to="/admin/consulting/faq"
                />

              </div>
            )}
          </div>

          {/* =========================
              6. LIÊN HỆ
          ========================== */}

          <div>

            <button
              type="button"
              onClick={() => toggleMenu("contact")}
              className={parentClass(
                isPathActive("/admin/contact")
              )}
            >
              <span className="flex items-center gap-3">
                <Phone size={18} />
                Liên hệ
              </span>

              {openMenus.contact ? (
                <ChevronDown size={17} />
              ) : (
                <ChevronRight size={17} />
              )}
            </button>

            {openMenus.contact && (
              <div className="mt-1 space-y-1">

                <ChildLink
                  label="Thông tin liên hệ"
                  to="/admin/contact/info"
                />

                <ChildLink
                  label="Tư vấn · Báo giá"
                  to="/admin/contact/quote"
                />

                <ChildLink
                  label="Form liên hệ"
                  to="/admin/contact/form"
                />

                <ChildLink
                  label="Bản đồ"
                  to="/admin/contact/map"
                />

              </div>
            )}
          </div>

          {/* =========================
              FOOTER
          ========================== */}

          <div>

            <button
              type="button"
              onClick={() => toggleMenu("footer")}
              className={parentClass(
                isPathActive("/admin/footer")
              )}
            >
              <span className="flex items-center gap-3">
                <PanelBottom size={18} />
                Footer
              </span>

              {openMenus.footer ? (
                <ChevronDown size={17} />
              ) : (
                <ChevronRight size={17} />
              )}
            </button>

            {openMenus.footer && (
              <div className="mt-1 space-y-1">

                <ChildLink
                  label="Thông tin công ty"
                  to="/admin/footer/company"
                />

                <ChildLink
                  label="Lĩnh vực"
                  to="/admin/footer/fields"
                />

                <ChildLink
                  label="Liên hệ"
                  to="/admin/footer/contact"
                />

                <ChildLink
                  label="Bản quyền"
                  to="/admin/footer/copyright"
                />

              </div>
            )}
          </div>

          {/* =========================
              LOGOUT
          ========================== */}

          <button
            type="button"
            onClick={logout}
            className="
              flex items-center gap-3
              px-3 py-2.5
              mt-5
              text-red-500
              hover:bg-red-50
              rounded-lg
              w-full
              transition
            "
          >
            <LogOut size={18} />
            Đăng xuất
          </button>

        </nav>

      </aside>

      {/* =========================
          MAIN
      ========================== */}

      <div className="flex-1 ml-80">

        <div className="w-full bg-white shadow px-6 py-4">

          <h1 className="text-xl font-semibold">

            {location.pathname === "/admin"
              ? "Dashboard"
              : location.pathname.startsWith("/admin/home")
                ? "Trang chủ"
                : location.pathname.startsWith("/admin/about")
                  ? "Giới thiệu"
                  : location.pathname.startsWith("/admin/projects")
                    ? "Dự án"
                    : location.pathname.startsWith("/admin/services")
                      ? "Dịch vụ"
                      : location.pathname.startsWith("/admin/consulting")
                        ? "Tư vấn"
                        : location.pathname.startsWith("/admin/contact")
                          ? "Liên hệ"
                          : location.pathname.startsWith("/admin/footer")
                            ? "Footer"
                            : "Admin Panel"}

          </h1>

        </div>

        <main className="p-6">
          {children}
        </main>

      </div>

    </div>
  );
}