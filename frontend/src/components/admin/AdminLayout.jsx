import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  ShoppingBag,
  Tags,
  Settings,
  LogOut,
} from "lucide-react";

export default function AdminLayout({ children }) {
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("admin_token");
    window.location.href = "/admin/login";
  };

  const menu = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Projects",
      path: "/admin/projects",
      icon: FolderKanban,
    },
    {
      name: "Products",
      path: "/admin/products",
      icon: ShoppingBag,
    },
    {
      name: "Categories",
      path: "/admin/categories",
      icon: Tags,
    },
    {
      name: "Thông tin Website",
      path: "/admin/site-config",
      icon: Settings,
    },
  ];

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* SIDEBAR */}

      <aside className="w-64 bg-white shadow-lg px-4 py-6 fixed left-0 top-0 bottom-0">

        <h2 className="text-xl font-bold mb-6 px-2">
          Admin Panel
        </h2>

        <nav className="space-y-1">

          {menu.map((item) => {

            const Icon = item.icon;

            const active =
              item.path === "/admin"
                ? location.pathname === "/admin"
                : location.pathname.startsWith(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center gap-3
                  px-3 py-2
                  rounded-lg
                  transition
                  ${active
                    ? "bg-blue-500 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                  }
                `}
              >

                <Icon size={18} />

                {item.name}

              </Link>
            );
          })}

          <button
            onClick={logout}
            className="
              flex items-center gap-3
              px-3 py-2
              mt-4
              text-red-500
              hover:bg-red-50
              rounded-lg
              w-full
            "
          >

            <LogOut size={18} />

            Logout

          </button>

        </nav>

      </aside>

      {/* MAIN */}

      <div className="flex-1 ml-64">

        <div className="w-full bg-white shadow px-6 py-4">

          <h1 className="text-xl font-semibold">

            {menu.find((m) =>
              m.path === "/admin"
                ? location.pathname === "/admin"
                : location.pathname.startsWith(m.path)
            )?.name || "Admin Panel"}

          </h1>

        </div>

        <main className="p-6">
          {children}
        </main>

      </div>

    </div>
  );
}