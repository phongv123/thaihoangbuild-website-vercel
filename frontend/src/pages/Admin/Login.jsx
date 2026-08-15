import React, { useState } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const onLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/admin/login", { password: pass });
      const token = res.data.token;

      localStorage.setItem("admin_token", token);
      navigate("/admin");
    } catch (err) {
      alert("Sai mật khẩu admin");
    }
  };

  return (
    <div className="container py-10">
      <div className="max-w-md mx-auto card p-6">
        <h2 className="text-xl font-bold mb-4">Đăng nhập Admin</h2>
        <form onSubmit={onLogin} className="space-y-3">
          <input
            className="w-full border p-2 rounded"
            placeholder="Mật khẩu admin"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          <button className="btn bg-black text-white">Đăng nhập</button>
        </form>
      </div>
    </div>
  );
}
