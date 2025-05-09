import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addPanelistFields } from "../../../constants/form.js";
import AdminLayout from "../AdminLayout";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addPanelist } from "../../../app/features/panelist/panelistSlices.js";

const AddPanelist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { success } = useSelector((state) => state.panelist);
  const [file, setFile] = useState(null); // To handle file uploads
  const initialFormState = addPanelistFields.reduce((acc, field) => {
    acc[field.name] = "";
    return acc;
  }, {});
  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setFile(files[0]); // Store the first file

      setFormData({
        ...formData,
        [name]: files[0] ? files[0].name : "",
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSubmit = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSubmit.append(key, formData[key]);
      });
      if (file) {
        formDataToSubmit.append("photo", file);
      }
      dispatch(addPanelist(formDataToSubmit));
      if (success) {
        toast.success("Panelist Added successfully");
        setFormData(null);
        setFile(null);
        navigate("/panelist-history");
      }
    } catch (error) {
      console.error("Error adding panelist:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const renderFormField = (field) => {
    return (
      <div key={field.name} className="col-span-1">
        <label htmlFor={field.name} className="text-gray-700 font-medium">
          {field.label}
        </label>
        <div className="block">
          {field.type === "select" ? (
            <select
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              required={field.required}
              className="w-full p-2 border border-gray-300 rounded-lg"
            >
              {field.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : field.type === "textarea" ? (
            <textarea
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              required={field.required}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          ) : field.type === "radio" ? (
            <div className="flex space-x-4">
              {field.options.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center space-x-2"
                >
                  <input
                    type="radio"
                    name={field.name}
                    value={option.value}
                    checked={formData[field.name] === option.value}
                    onChange={handleChange}
                    required={field.required}
                    className="cursor-pointer"
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          ) : field.type === "file" ? (
            <input
              type="file"
              name={field.name}
              onChange={handleChange}
              accept={field.accept || "image/*"} // Default to image/* if not provided
              multiple
              required={field.required}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
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
    <AdminLayout>
      <div className="p-6 bg-white shadow-md rounded-lg">
        <form className="grid grid-cols-3 gap-8" onSubmit={handleSubmit}>
          {addPanelistFields.map(renderFormField)}
          <div className="col-span-3">
            <button
              type="submit"
              className="bg-blue-600 text-white px-12 py-2 float-right rounded-lg  mt-4"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AddPanelist;
