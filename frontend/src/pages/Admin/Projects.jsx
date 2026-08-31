import React, { useEffect, useState } from "react";
import api from "../../api";
import AdminLayout from "../../components/admin/AdminLayout";

const emptyForm = {
  title: "",
  excerpt: "",
  cover: "",
  category: "",
  featuredHome: false,
  homeOrder: 0,
};

export default function ProjectsAdmin() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState(emptyForm);

  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const headers = {
    Authorization:
      "Bearer " + (localStorage.getItem("admin_token") || ""),
  };

  const fetchItems = async () => {
    try {
      setLoading(true);

      const { data } = await api.get(
        "/admin/projects",
        { headers }
      );

      setItems(data || []);
    } catch (error) {
      console.error(error);
      alert("Không thể tải danh sách dự án.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data } = await api.get("/categories");

      setCategories(
        Array.isArray(data)
          ? data
          : data?.items || []
      );
    } catch (error) {
      console.error(error);
      alert("Không thể tải danh mục.");
    }
  };

  useEffect(() => {
    fetchItems();
    fetchCategories();
  }, []);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const save = async () => {
    try {
      setLoading(true);

      const payload = {
        title: form.title,
        excerpt: form.excerpt,
        cover: form.cover,

        // Không gửi "" lên MongoDB
        ...(form.category
          ? { category: form.category }
          : {}),

        featuredHome: Boolean(form.featuredHome),
        homeOrder: Number(form.homeOrder) || 0,
      };

      if (editingId) {
        await api.put(
          `/admin/projects/${editingId}`,
          payload,
          { headers }
        );
      } else {
        await api.post(
          "/admin/projects",
          payload,
          { headers }
        );
      }

      alert(
        editingId
          ? "Đã cập nhật dự án."
          : "Đã thêm dự án."
      );

      resetForm();
      await fetchItems();
    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        "Lưu dự án thất bại."
      );
    } finally {
      setLoading(false);
    }
  };

  const del = async (id) => {
    if (!confirm("Xóa dự án này?")) return;

    try {
      await api.delete(
        "/admin/projects/" + id,
        { headers }
      );

      await fetchItems();
    } catch (error) {
      console.error(error);
      alert("Xóa dự án thất bại.");
    }
  };

  const startEdit = (item) => {
    setForm({
      title: item.title || "",
      excerpt: item.excerpt || "",
      cover: item.cover || "",

      category:
        item.category?._id ||
        item.category ||
        "",

      featuredHome: Boolean(item.featuredHome),

      homeOrder:
        item.homeOrder ?? 0,
    });

    setEditingId(item._id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">

        {/* HEADER */}
        <div className="flex items-center justify-between">

          <h2 className="text-2xl font-semibold">
            Dự án
          </h2>

          <div className="text-sm text-gray-500">
            {loading
              ? "Đang tải..."
              : `${items.length} dự án`}
          </div>

        </div>

        {/* FORM */}
        <div className="bg-white rounded-lg shadow p-6">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <div className="md:col-span-2 space-y-3">

              {/* TÊN */}
              <input
                className="w-full border rounded p-3"
                placeholder="Tên dự án"
                value={form.title}
                onChange={(e) =>
                  setForm({
                    ...form,
                    title: e.target.value,
                  })
                }
              />

              {/* MÔ TẢ */}
              <textarea
                className="w-full border rounded p-3 h-28 resize-none"
                placeholder="Mô tả ngắn"
                value={form.excerpt}
                onChange={(e) =>
                  setForm({
                    ...form,
                    excerpt: e.target.value,
                  })
                }
              />

              {/* COVER */}
              <input
                className="w-full border rounded p-3"
                placeholder="Cover URL"
                value={form.cover}
                onChange={(e) =>
                  setForm({
                    ...form,
                    cover: e.target.value,
                  })
                }
              />

              {/* CATEGORY */}
              <select
                className="w-full border rounded p-3 bg-white"
                value={form.category}
                onChange={(e) =>
                  setForm({
                    ...form,
                    category: e.target.value,
                  })
                }
              >
                <option value="">
                  -- Chọn danh mục --
                </option>

                {categories.map((category) => (
                  <option
                    key={category._id}
                    value={category._id}
                  >
                    {category.name}
                  </option>
                ))}
              </select>

              {/* DỰ ÁN TIÊU BIỂU */}
              <div className="border rounded-lg p-4 bg-gray-50">

                <label className="flex items-center gap-3">

                  <input
                    type="checkbox"
                    checked={form.featuredHome}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        featuredHome:
                          e.target.checked,
                      })
                    }
                  />

                  <span className="font-medium">
                    Hiển thị ở "Dự án tiêu biểu"
                    trên Trang chủ
                  </span>

                </label>

                {form.featuredHome && (
                  <div className="mt-3">

                    <label className="block text-sm font-medium mb-2">
                      Thứ tự trên Trang chủ
                    </label>

                    <input
                      type="number"
                      min="0"
                      className="w-full border rounded p-3"
                      value={form.homeOrder}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          homeOrder:
                            e.target.value,
                        })
                      }
                    />

                  </div>
                )}

              </div>

              {/* BUTTON */}
              <div className="flex gap-3">

                <button
                  type="button"
                  className="bg-black text-white px-5 py-2 rounded hover:opacity-95 disabled:opacity-50"
                  onClick={save}
                  disabled={loading}
                >
                  {editingId
                    ? "Lưu thay đổi"
                    : "Thêm dự án"}
                </button>

                <button
                  type="button"
                  className="border px-5 py-2 rounded hover:bg-gray-50"
                  onClick={resetForm}
                >
                  Hủy
                </button>

              </div>

            </div>

            {/* PREVIEW */}
            <div className="flex flex-col items-center justify-center">

              <div className="w-full h-40 bg-gray-50 rounded overflow-hidden border">

                {form.cover ? (
                  <img
                    src={form.cover}
                    alt="cover preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        "/placeholder.png";
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    Chưa có ảnh
                  </div>
                )}

              </div>

              <div className="text-xs text-gray-500 mt-2">
                Ảnh đại diện dự án
              </div>

            </div>

          </div>

        </div>

        {/* LIST */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          {items.map((item) => (

            <div
              key={item._id}
              className="bg-white rounded-lg shadow overflow-hidden"
            >

              <div className="h-44 bg-gray-100">

                <img
                  src={
                    item.cover ||
                    "/placeholder.png"
                  }
                  alt={item.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src =
                      "/placeholder.png";
                  }}
                />

              </div>

              <div className="p-4">

                <div className="flex items-start justify-between gap-3">

                  <h3 className="font-semibold text-lg">
                    {item.title}
                  </h3>

                  {item.featuredHome && (
                    <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 whitespace-nowrap">
                      Trang chủ
                    </span>
                  )}

                </div>

                <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                  {item.excerpt}
                </p>

                <div className="flex items-center justify-between mt-4">

                  <div className="text-xs text-gray-500">
                    {item.category?.name ||
                      "Chưa phân loại"}
                  </div>

                  <div className="flex gap-2">

                    <button
                      type="button"
                      className="text-sm px-3 py-1 rounded border hover:bg-gray-50"
                      onClick={() =>
                        startEdit(item)
                      }
                    >
                      Sửa
                    </button>

                    <button
                      type="button"
                      className="text-sm px-3 py-1 rounded bg-red-50 text-red-600 hover:bg-red-100"
                      onClick={() =>
                        del(item._id)
                      }
                    >
                      Xóa
                    </button>

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>
    </AdminLayout>
  );
}