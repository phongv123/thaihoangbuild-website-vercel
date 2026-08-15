import React, { useEffect, useState } from "react";
import api from "../../api";
import AdminLayout from "../../components/admin/AdminLayout";
import { useNavigate } from "react-router-dom";

export default function CategoriesAdmin() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [q, setQ] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");

  // 🟦 Headers dùng cho tất cả request
  const headers = {
    Authorization: "Bearer " + (localStorage.getItem("admin_token") || ""),
  };

  const handleAuthError = (err) => {
    if (err?.response?.status === 401) {
      localStorage.removeItem("admin_token");
      alert("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.");
      navigate("/admin/login");
      return true;
    }
    return false;
  };

  const fetchItems = async () => {
    try {
      setLoading(true);
      console.log("admin_token:", localStorage.getItem("admin_token"));
      const { data } = await api.get("/admin/categories", { headers });
      setItems(data || []);
    } catch (err) {
      console.error(err);
      if (handleAuthError(err)) return;
      alert("Lấy categories thất bại.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const save = async () => {
    if (!name.trim()) return alert("Nhập tên category.");
    try {
      setLoading(true);
      await api.post("/admin/categories", { name: name.trim() }, { headers });
      setName("");
      fetchItems();
    } catch (err) {
      console.error(err);
      if (handleAuthError(err)) return;
      alert("Thêm category thất bại.");
    } finally {
      setLoading(false);
    }
  };

  const del = async (id) => {
    if (!confirm("Bạn có chắc muốn xóa category này?")) return;
    try {
      setLoading(true);
      await api.delete("/admin/categories/" + id, { headers });
      fetchItems();
    } catch (err) {
      console.error(err);
      if (handleAuthError(err)) return;
      alert("Xóa thất bại.");
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (it) => {
    setEditingId(it._id);
    setEditingName(it.name);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingName("");
  };

  const saveEdit = async () => {
    if (!editingName.trim()) return alert("Tên không được rỗng.");
    try {
      setLoading(true);
      await api.put(
        "/admin/categories/" + editingId,
        { name: editingName.trim() },
        { headers }
      );
      cancelEdit();
      fetchItems();
    } catch (err) {
      console.error(err);
      if (handleAuthError(err)) return;
      alert("Cập nhật thất bại.");
    } finally {
      setLoading(false);
    }
  };

  const filtered = items.filter((it) => {
    if (!q.trim()) return true;
    return (it.name || "").toLowerCase().includes(q.toLowerCase());
  });

  return (
    <AdminLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Quản lý Categories</h2>
          <div className="text-sm text-gray-500">
            {loading ? "Đang xử lý..." : `${items.length} mục`}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex gap-3">
            <input
              className="flex-1 border rounded p-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="Thêm category mới"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button
              className="btn bg-black text-white px-4 rounded"
              onClick={save}
              disabled={loading}
            >
              Thêm
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <input
            placeholder="Tìm category..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="border rounded p-2 w-72"
          />
        </div>

        <ul className="grid grid-cols-1 gap-2">
          {filtered.map((it) => (
            <li
              key={it._id}
              className="bg-white rounded-lg shadow p-3 flex items-center justify-between"
            >
              <div className="flex-1">
                {editingId === it._id ? (
                  <input
                    className="w-full border rounded p-2"
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                  />
                ) : (
                  <span className="font-medium">{it.name}</span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {editingId === it._id ? (
                  <>
                    <button
                      className="text-sm px-3 py-1 rounded bg-sky-500 text-white"
                      onClick={saveEdit}
                      disabled={loading}
                    >
                      Lưu
                    </button>
                    <button
                      className="text-sm px-3 py-1 rounded border"
                      onClick={cancelEdit}
                      disabled={loading}
                    >
                      Hủy
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="text-sm px-3 py-1 rounded border"
                      onClick={() => startEdit(it)}
                    >
                      Sửa
                    </button>
                    <button
                      className="text-sm px-3 py-1 rounded bg-red-50 text-red-600"
                      onClick={() => del(it._id)}
                      disabled={loading}
                    >
                      Xóa
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>

        {filtered.length === 0 && (
          <div className="text-center text-gray-500 py-6">
            Không có category.
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
