import React, { useEffect, useState } from "react";
import api from "../../api";
import AdminLayout from "../../components/admin/AdminLayout";

export default function ProductsAdmin() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ title: "", excerpt: "", price: 0, cover: "", category: "" });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [q, setQ] = useState("");

  const headers = { Authorization: "Bearer " + (localStorage.getItem("admin_token") || "") };

  const fetchItems = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/admin/products", { headers });
      setItems(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const resetForm = () => {
    setForm({ title: "", excerpt: "", price: 0, cover: "", category: "" });
    setEditingId(null);
  };

  const save = async () => {
    try {
      setLoading(true);
      if (editingId) {
        await api.put(`/admin/products/${editingId}`, form, { headers });
      } else {
        await api.post("/admin/products", form, { headers });
      }
      resetForm();
      await fetchItems();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const del = async (id) => {
    if (!confirm("Xóa sản phẩm này?")) return;
    try {
      await api.delete("/admin/products/" + id, { headers });
      fetchItems();
    } catch (err) {
      console.error(err);
    }
  };

  const startEdit = (it) => {
    setForm({
      title: it.title || "",
      excerpt: it.excerpt || "",
      price: it.price || 0,
      cover: it.cover || "",
      category: it.category || "",
    });
    setEditingId(it._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filtered = items.filter((it) => {
    if (!q) return true;
    return (it.title || "").toLowerCase().includes(q.toLowerCase()) || (it.excerpt || "").toLowerCase().includes(q.toLowerCase());
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Quản lý Sản phẩm</h2>
          <div className="text-sm text-gray-500">{loading ? "Đang tải..." : `${items.length} sản phẩm`}</div>
        </div>

        {/* Form card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 space-y-3">
              <input
                className="w-full border rounded p-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
                placeholder="Tiêu đề"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
              <textarea
                className="w-full border rounded p-3 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-sky-500"
                placeholder="Mô tả ngắn"
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  className="w-full border rounded p-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="Giá (VNĐ)"
                  value={form.price}
                  type="number"
                  onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                />
                <input
                  className="w-full border rounded p-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="Category"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                />
              </div>

              <input
                className="w-full border rounded p-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
                placeholder="Cover URL (ví dụ: /images/product.jpg)"
                value={form.cover}
                onChange={(e) => setForm({ ...form, cover: e.target.value })}
              />

              <div className="flex gap-3">
                <button className="btn bg-black text-white px-5 py-2 rounded hover:opacity-95" onClick={save}>
                  {editingId ? "Lưu thay đổi" : "Thêm sản phẩm"}
                </button>
                <button className="btn border px-5 py-2 rounded hover:bg-gray-50" onClick={resetForm}>
                  Hủy
                </button>
              </div>
            </div>

            {/* Preview */}
            <div className="flex flex-col items-center justify-center">
              <div className="w-full h-40 bg-gray-50 rounded overflow-hidden border">
                {form.cover ? (
                  <img
                    src={form.cover}
                    alt="cover preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.png";
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">Chưa có ảnh</div>
                )}
              </div>
              <div className="text-xs text-gray-500 mt-2">Preview cover</div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="flex items-center justify-between">
          <input
            placeholder="Tìm theo tên hoặc mô tả..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="border rounded p-2 w-80"
          />
        </div>

        {/* Grid / List of products */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((it) => (
            <div key={it._id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gray-100 overflow-hidden">
                <img
                  src={it.cover || "/placeholder.png"}
                  alt={it.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.png";
                  }}
                />
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-lg">{it.title}</h3>
                    <div className="text-sm text-gray-500 mt-1">{it.category || "Chưa phân loại"}</div>
                    <p className="text-sm text-gray-600 mt-2 line-clamp-3">{it.excerpt}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold">{Number(it.price).toLocaleString()}₫</div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="text-xs text-gray-400">{new Date(it.createdAt || it._createdAt || Date.now()).toLocaleDateString()}</div>
                  <div className="flex gap-2">
                    <button className="text-sm px-3 py-1 rounded border hover:bg-gray-50" onClick={() => startEdit(it)}>
                      Sửa
                    </button>
                    <button className="text-sm px-3 py-1 rounded bg-red-50 text-red-600 hover:bg-red-100" onClick={() => del(it._id)}>
                      Xóa
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center text-gray-500 py-10">Không có sản phẩm phù hợp.</div>
        )}
      </div>
    </AdminLayout>
  );
}
