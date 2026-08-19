import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from "./components/ScrollToTop";


import Home from './pages/Home';
import Products from './pages/Products';
import About from "./pages/About";
import ContactPage from "./pages/ContactPage";
import Blog from "./pages/Blog";
import ProjectDetail from "./pages/HomeProject/ProjectDetail";

import AdminLogin from './pages/Admin/Login';
import AdminDashboard from './pages/Admin/Dashboard';
import ProjectsAdmin from './pages/Admin/Projects';
import ProductsAdmin from './pages/Admin/Products';
import CategoriesAdmin from './pages/Admin/Categories';
import Projects from './pages/Projects';
import ZaloFloatingButton from "./components/ZaloFloatingButton";
import SiteConfigAdmin from "./pages/Admin/SiteConfig";



export default function App() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <div className="min-h-[100dvh] w-full flex flex-col">
      <ScrollToTop />

      {/* Chỉ render Navbar/Footer nếu KHÔNG phải trang admin */}
      {!isAdminPage && <Navbar />}

      <main className="flex-1 w-full min-w-0">
        <Routes>
          {/* User routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/products" element={<Products />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />

          {/* Admin routes */}
          <Route path="/admin/login" element={<AdminLogin />} />

          <Route
            path="/admin"
            element={
              localStorage.getItem('admin_token')
                ? <AdminDashboard />
                : <Navigate to="/admin/login" />
            }
          />

          <Route path="/admin/categories" element={<CategoriesAdmin />} />
          <Route path="/admin/products" element={<ProductsAdmin />} />
          <Route path="/admin/projects" element={<ProjectsAdmin />} />
          <Route
            path="/admin/site-config"
            element={<SiteConfigAdmin />}
          />
        </Routes>

        {/* Ẩn nút Zalo trong admin */}
        {!isAdminPage && <ZaloFloatingButton />}
      </main>

      {!isAdminPage && <Footer />}
    </div>
  );
}


