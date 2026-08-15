import React, { useState } from "react";
import api from "../api";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });

  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setStatus(null);

    try {
      await api.post("/leads", form);

      setStatus("✅ Gửi thành công! Chúng tôi sẽ liên hệ sớm.");
      setForm({
        name: "",
        email: "",
        phone: "",
        address: "",
        message: "",
      });
    } catch (error) {
      setStatus("❌ Gửi thất bại. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="card p-6 space-y-4 bg-white rounded-xl shadow">

      <h3 className="text-lg font-semibold">Đăng ký báo giá</h3>

      {status && (
        <div className="text-sm bg-gray-100 p-2 rounded">{status}</div>
      )}

      <input
        className="w-full border rounded-lg p-2"
        placeholder="Tên của bạn"
        value={form.name}
        onChange={(e) => handleChange("name", e.target.value)}
      />

      <input
        className="w-full border rounded-lg p-2"
        placeholder="Địa chỉ"
        value={form.address}
        onChange={(e) => handleChange("address", e.target.value)}
      />

      <input
        className="w-full border rounded-lg p-2"
        placeholder="Email"
        value={form.email}
        onChange={(e) => handleChange("email", e.target.value)}
      />

      <input
        className="w-full border rounded-lg p-2"
        placeholder="Điện thoại"
        value={form.phone}
        onChange={(e) => handleChange("phone", e.target.value)}
      />

      <textarea
        className="w-full border rounded-lg p-2"
        rows="4"
        placeholder="Yêu cầu"
        value={form.message}
        onChange={(e) => handleChange("message", e.target.value)}
      />

      <button
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400
             hover:from-blue-700 hover:via-blue-600 hover:to-cyan-500
             text-white py-3 rounded-lg flex items-center justify-center gap-2
             transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5
             disabled:opacity-60"
      >
        {loading ? (
          <>
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            Đang gửi...
          </>
        ) : (
          "Gửi yêu cầu"
        )}
      </button>

    </form>
  );
}