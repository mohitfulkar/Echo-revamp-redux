import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginFields } from "../../constants/form";
import { commonClasses } from "../../constants/styleClass";
import { login } from "../../app/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { tokenService } from "./../../service/tokenService";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { success, error, token } = useSelector((state) => state.auth);
  const initialFormState = loginFields.reduce((acc, field) => {
    acc[field.name] = "";
    return acc;
  }, {});
  const [formData, setFormData] = useState(initialFormState);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(formData)); // just dispatch here
  };

  useEffect(() => {
    if (success && token) {
      toast.success("User Login Successfully!");
      localStorage.setItem("token", token);
      const userId = tokenService.extractItems(token).id;
      navigate(`/user/${userId}`);
    }
  }, [success, token, navigate]);

  const renderFormField = (field) => {
    return (
      <div
        key={field.name}
        className="flex items-center justify-between w-full"
      >
        <label htmlFor={field.name} className="w-1/3 text-gray-700 font-medium">
          {field.label}
        </label>
        <div className="w-2/3">
          <input
            type={field.type}
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
            placeholder={field.placeholder}
            required={field.required}
            className={commonClasses}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl mb-6 text-center font-semibold">LOGIN</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {loginFields.map(renderFormField)}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-4 text-gray-700">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
