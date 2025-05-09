import React, { useEffect, useState } from "react";
import { panelistLoginFields } from "../../constants/form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPanelists } from "../../app/features/panelist/panelistSlices";
import { panelistLogin, resetAuth } from "../../app/features/auth/authSlice";
import { TOKEN } from "../../constants/env.js";
import { tokenService } from "../../service/tokenService.js";
import { toast } from "react-toastify";

const PanelistLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { success, error, token } = useSelector((state) => state.auth);
  const { panelists } = useSelector((state) => state.panelist);

  const fullName = panelists?.data?.map((item) => item.fullName) || [];

  const initialFormState = panelistLoginFields.reduce((acc, field) => {
    acc[field.name] = "";
    return acc;
  }, {});
  const [formData, setFormData] = useState(initialFormState);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(panelistLogin(formData)); // Ensure action completes before checking success
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("panelist_token");
    if (storedToken) {
      const panelistId = tokenService.extractItems(storedToken)?.id;
      if (panelistId) {
        navigate(`/panelist/${panelistId}`, { replace: true });
        dispatch(resetAuth());
      }
    }
  }, [navigate]);
  useEffect(() => {
    if (success && token) {
      const extractedData = tokenService.extractItems(token);
      const panelistId = extractedData?.id || null;

      if (!panelistId) {
        toast.error("Invalid panelist data. Please try again.");
        return;
      }

      // Store token safely
      if (!localStorage.getItem("panelist_token")) {
        console.log("Storing panelist token...");
        localStorage.setItem("panelist_token", token);
      }

      toast.success("Login successful!");
      navigate(`/panelist/${panelistId}`, { replace: true });
    }

    if (error) {
      const errorMessage =
        typeof error === "string" ? error : error.message || "Login failed";
      toast.error(errorMessage);
      console.error("Error Details:", error);
    }
  }, [success, token, error, navigate]);

  useEffect(() => {
    dispatch(getPanelists()); // Ensure params are passed
  }, [dispatch]);

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
          {field.type === "select" ? (
            <select
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              required={field.required}
              className="w-full p-2 border border-gray-300 rounded-lg"
            >
              <option value="">Select a Panelist</option>
              {fullName.map((name, index) => (
                <option key={index} value={name}>
                  {name}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              required={field.required}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          )}
        </div>
      </div>
    );
  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl mb-6 text-center font-semibold">
          Panlist Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {panelistLoginFields.map(renderFormField)}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default PanelistLogin;
