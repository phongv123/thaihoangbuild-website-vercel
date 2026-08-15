import React, { useEffect, useState } from "react";
import api from "../../api";
import AdminLayout from "../../components/admin/AdminLayout";

export default function ProjectsAdmin() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    cover: "",
    category: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const headers = { Authorization: "Bearer " + (localStorage.getItem("admin_token") || "") };

  const fetchItems = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/admin/projects", { headers });
      setItems(data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const resetForm = () => {
    setForm({ title: "", excerpt: "", cover: "", category: "" });
    setEditingId(null);
  };

  const save = async () => {
    try {
      setLoading(true);
      if (editingId) {
        await api.put(`/admin/projects/${editingId}`, form, { headers });
      } else {
        await api.post("/admin/projects", form, { headers });
      }
      resetForm();
      fetchItems();
    } finally {
      setLoading(false);
    }
  };

  const del = async (id) => {
    if (!confirm("Xóa dự án này?")) return;
    await api.delete("/admin/projects/" + id, { headers });
    fetchItems();
  };

  const startEdit = (it) => {
    setForm({ title: it.title || "", excerpt: it.excerpt || "", cover: it.cover || "", category: it.category || "" });
    setEditingId(it._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Quản lý Dự án</h2>
          <div className="text-sm text-gray-500">{loading ? "Đang tải..." : `${items.length} dự án`}</div>
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
              <input
                className="w-full border rounded p-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
                placeholder="Cover URL (ví dụ: /images/cover.jpg)"
                value={form.cover}
                onChange={(e) => setForm({ ...form, cover: e.target.value })}
              />
              <input
                className="w-full border rounded p-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
                placeholder="Category"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              />
              <div className="flex gap-3">
                <button
                  className="btn bg-black text-white px-5 py-2 rounded hover:opacity-95"
                  onClick={save}
                >
                  {editingId ? "Lưu thay đổi" : "Thêm dự án"}
                </button>
                <button
                  className="btn border px-5 py-2 rounded hover:bg-gray-50"
                  onClick={resetForm}
                >
                  Hủy
                </button>
              </div>
            </div>

            {/* Preview */}
            <div className="flex flex-col items-center justify-center">
              <div className="w-full h-40 bg-gray-50 rounded overflow-hidden border">
                {form.cover ? (
                  // image preview
                  // eslint-disable-next-line jsx-a11y/img-redundant-alt
                  <img src={form.cover} alt="cover preview" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.src = '/placeholder.png' }} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    Chưa có ảnh
                  </div>
                )}
              </div>
              <div className="text-xs text-gray-500 mt-2">Preview cover</div>
            </div>
          </div>
        </div>

        {/* Grid / List of projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((it) => (
            <div key={it._id} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="h-44 bg-gray-100">
                <img
                  src={it.cover || "/placeholder.png"}
                  alt={it.title}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.src = "/placeholder.png"; }}
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg">{it.title}</h3>
                <p className="text-sm text-gray-600 mt-2 line-clamp-3">{it.excerpt}</p>
                <div className="flex items-center justify-between mt-4">
                  <div className="text-xs text-gray-500">{it.category || "Chưa phân loại"}</div>
                  <div className="flex gap-2">
                    <button
                      className="text-sm px-3 py-1 rounded border hover:bg-gray-50"
                      onClick={() => startEdit(it)}
                    >
                      Sửa
                    </button>
                    <button
                      className="text-sm px-3 py-1 rounded bg-red-50 text-red-600 hover:bg-red-100"
                      onClick={() => del(it._id)}
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