import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { submitBtn } from "../../constants/styleClass.js";
import { toast } from "react-toastify";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ secret_key: "" });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const secret_key = import.meta.env.VITE_ADMIN_SECRET;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.secret_key === secret_key) { 
      navigate("/admin");
      toast.success("Admin Login Successful");
    } else {
      toast.error("Invali Secret Key");
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl mb-6 text-center font-semibold">Admin Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="password"
            className="w-full p-3 pl-3 border border-gray-300 rounded-sm"
            name="secret_key"
            placeholder="Enter Secret Key"
            onChange={handleChange}
            required
          />
          <button type="submit" className={submitBtn}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
