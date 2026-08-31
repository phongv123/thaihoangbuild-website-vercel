import React from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ZaloFloatingButton from "./components/ZaloFloatingButton";

import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import ContactPage from "./pages/ContactPage";
import Blog from "./pages/Blog";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/HomeProject/ProjectDetail";

import AdminLogin from "./pages/Admin/Login";
import AdminDashboard from "./pages/Admin/Dashboard";
import ProjectsAdmin from "./pages/Admin/Projects";
import ProductsAdmin from "./pages/Admin/Products";
import CategoriesAdmin from "./pages/Admin/Categories";
import SiteConfigAdmin from "./pages/Admin/SiteConfig";
import AdminModulePlaceholder from "./pages/Admin/AdminModulePlaceholder";
import HomeAdmin from "./pages/Admin/Home";

export default function App() {
  const location = useLocation();

  const isAdminPage =
    location.pathname.startsWith("/admin");

  const isLoggedIn =
    Boolean(localStorage.getItem("admin_token"));

  const protectedPage = (element) => {
    return isLoggedIn
      ? element
      : <Navigate to="/admin/login" replace />;
  };

  return (
    <div className="min-h-[100dvh] w-full flex flex-col">

      <ScrollToTop />

      {!isAdminPage && <Navbar />}

      <main className="flex-1 w-full min-w-0">

        <Routes>

          {/* ==================================================
              WEBSITE
          ================================================== */}

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/about"
            element={<About />}
          />

          <Route
            path="/projects"
            element={<Projects />}
          />

          <Route
            path="/projects/:id"
            element={<ProjectDetail />}
          />

          <Route
            path="/products"
            element={<Products />}
          />

          <Route
            path="/blog"
            element={<Blog />}
          />

          <Route
            path="/contact"
            element={<ContactPage />}
          />

          {/* ==================================================
              ADMIN LOGIN
          ================================================== */}

          <Route
            path="/admin/login"
            element={<AdminLogin />}
          />

          {/* ==================================================
              DASHBOARD
          ================================================== */}

          <Route
            path="/admin"
            element={protectedPage(
              <AdminDashboard />
            )}
          />

          {/* ==================================================
              1. TRANG CHỦ
          ================================================== */}

          <Route
            path="/admin/home/*"
            element={protectedPage(
              <HomeAdmin />
            )}
          />

          {/* ==================================================
              2. GIỚI THIỆU
          ================================================== */}

          <Route
            path="/admin/about/*"
            element={protectedPage(
              <AdminModulePlaceholder
                title="Giới thiệu"
                description="Quản lý từng khu vực của trang Giới thiệu."
              />
            )}
          />

          {/* ==================================================
              3. DỰ ÁN
          ================================================== */}

          <Route
            path="/admin/projects"
            element={protectedPage(
              <ProjectsAdmin />
            )}
          />

          <Route
            path="/admin/projects/banner"
            element={protectedPage(
              <AdminModulePlaceholder
                title="Banner dự án"
              />
            )}
          />

          <Route
            path="/admin/projects/list"
            element={protectedPage(
              <ProjectsAdmin />
            )}
          />

          {/* ==================================================
              DANH MỤC DỰ ÁN
          ================================================== */}

          <Route
            path="/admin/categories"
            element={protectedPage(
              <CategoriesAdmin />
            )}
          />

          {/* ==================================================
              4. DỊCH VỤ
          ================================================== */}

          <Route
            path="/admin/services/*"
            element={protectedPage(
              <AdminModulePlaceholder
                title="Dịch vụ"
                description="Quản lý từng khu vực của trang Dịch vụ."
              />
            )}
          />

          {/* Giữ route module cũ */}
          <Route
            path="/admin/products"
            element={protectedPage(
              <ProductsAdmin />
            )}
          />

          {/* ==================================================
              5. TƯ VẤN
          ================================================== */}

          <Route
            path="/admin/consulting/*"
            element={protectedPage(
              <AdminModulePlaceholder
                title="Tư vấn"
                description="Quản lý từng khu vực của trang Tư vấn."
              />
            )}
          />

          {/* ==================================================
              6. LIÊN HỆ
          ================================================== */}

          <Route
            path="/admin/contact/*"
            element={protectedPage(
              <AdminModulePlaceholder
                title="Liên hệ"
                description="Quản lý từng khu vực của trang Liên hệ."
              />
            )}
          />

          {/* ==================================================
              FOOTER
          ================================================== */}

          <Route
            path="/admin/footer/*"
            element={protectedPage(
              <AdminModulePlaceholder
                title="Footer"
                description="Quản lý nội dung Footer website."
              />
            )}
          />

          {/* ==================================================
              ROUTE CŨ
          ================================================== */}

          <Route
            path="/admin/site-config"
            element={
              <Navigate
                to="/admin/home/banner"
                replace
              />
            }
          />

          {/* ==================================================
              FALLBACK
          ================================================== */}

          <Route
            path="/admin/*"
            element={
              <Navigate
                to={
                  isLoggedIn
                    ? "/admin"
                    : "/admin/login"
                }
                replace
              />
            }
          />

        </Routes>

        {!isAdminPage && (
          <ZaloFloatingButton />
        )}

      </main>

      {!isAdminPage && <Footer />}

    </div>
  );
}