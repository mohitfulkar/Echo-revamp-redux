import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { registerFields } from "../../constants/form.js";
import { commonClasses } from "../../constants/styleClass.js";
import { baseUrl } from "../../constants/env.js";
import { toast } from "react-toastify";
import { register, resetAuth } from "../../app/features/auth/authSlice.js";
import { useDispatch, useSelector } from "react-redux";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.auth);

  const initialFormState = registerFields.reduce((acc, field) => {
    acc[field.name] = "";
    return acc;
  }, {});
  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(register(formData));
  };
  useEffect(() => {
    if (success) {
      toast.success("Registration successful!");
      navigate("/login");
      dispatch(resetAuth());
    }
    if (error) {
      toast.error("Something went wrong");
    }
  }, [success, error, navigate]);

  const renderFormField = (field) => {
    return (
      <div
        key={field.name}
        className="flex items-center justify-between w-full space-x-8"
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
      <div className="bg-white p-8 rounded-lg shadow-lg ">
        <h2 className="text-2xl mb-6 text-center font-semibold">
          REGISTRATION
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {registerFields.map(renderFormField)}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300 "
          >
            Register
          </button>
        </form>

        <p className="text-center mt-4 text-gray-700">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
