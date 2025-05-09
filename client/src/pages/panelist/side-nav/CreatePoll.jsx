import React, { useEffect, useState } from "react";
import PanelistLayout from "../PanelistLayout";
import { pollFields } from "../../../constants/form";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { commonClasses } from "../../../constants/styleClass";
import { IoMdAddCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { createPoll } from "../../../app/features/poll/pollSlice";
import { toast } from "react-toastify";
import { getPanelistsById } from "../../../app/features/panelist/panelistSlices";

const CreatePoll = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { panelist } = useSelector((state) => state.panelist);
  const { success } = useSelector((state) => state.poll);
  const fullName = panelist?.data?.fullName;

  const { id } = useParams();
  // Initial form state for poll fields
  const initialFormState = pollFields.reduce((acc, field) => {
    acc[field.name] = "";
    return acc;
  }, {});

  // State for poll options
  const [options, setOptions] = useState([""]); // Start with one empty option
  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    dispatch(getPanelistsById(id));
  }, [dispatch]);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  // Add a new option field
  const addOption = () => {
    setOptions([...options, ""]); // Add an empty string for a new option
  };

  // Delete an option field
  const deleteOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index); // Remove the option at the specified index
    setOptions(newOptions);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const pollData = {
      createdBy: id,
      created_by_name: fullName,
      ...formData,
      options: options
        .filter((option) => option.trim() !== "") // Remove empty options
        .map((option) => ({ name: option, voteCount: 0 })), // Each option should be an object
    };
    try {
      const response = await dispatch(createPoll(pollData)).unwrap();
      if (success) {
        toast.success(response.message);
        navigate(`/panelist/${id}/vote-count`);
      }
    } catch (error) {
      console.error("Poll Creation Failed:", error);
      toast.error(response.error);
    }
  };

  // Render poll fields
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
    <PanelistLayout>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl mb-6 text-center font-semibold">
            Create Poll
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Render poll fields */}
            {pollFields.map(renderFormField)}

            {/* Render poll options */}
            <p className="p">Add Option</p>
            {options.map((option, index) => (
              <div key={index} className="flex">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder={`Option ${index + 1}`}
                  required
                  className={`${commonClasses} w-5/7`}
                />
                <div className="w-2/7 text-2xl space-x-2 ml-2">
                  {/* Add button for the last option only */}
                  {index === options.length - 1 && (
                    <button type="button" onClick={addOption}>
                      <IoMdAddCircle className="text-green-500" />
                    </button>
                  )}
                  {/* Delete button for all options except the first one */}
                  {options.length > 1 && (
                    <button type="button" onClick={() => deleteOption(index)}>
                      <MdDelete className="text-red-500" />
                    </button>
                  )}
                </div>
              </div>
            ))}

            {/* Submit button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </PanelistLayout>
  );
};

export default CreatePoll;
