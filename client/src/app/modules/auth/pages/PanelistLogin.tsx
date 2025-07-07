import React, { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../store";
import { loginPanelist, resetAuthState } from "../features/authSlices";
import CustomButton from "../../../core/components/CustomButton";
import { Form, Input, message } from "antd";
import { panelistFields } from "../models/signupForm.model";
import { showToast } from "../../../core/service/ToastService";
import { resetFields } from "../service/FormService";
import { setActiveModule } from "../../../core/features/navigationSlices";
import { useNavigate } from "react-router-dom";
import { useChoices } from "../../../core/hooks/useChoices";
import { renderFormField } from "../../../core/components/FormTemplate";
import { applyFieldOptions } from "../../../core/service/FormService";

const PanelistLogin: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>();
    const dispatch = useDispatch<AppDispatch>();
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const { items: categoryOptions } = useChoices('category'); // ✅ Hook used correctly
    const fieldOptionsMap: Record<string, any[]> = {
        categoryId: categoryOptions,
    };
    const dynamicFields = applyFieldOptions(panelistFields, fieldOptionsMap);

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            setSelectedCategory(values?.categoryId)

            if (!selectedCategory) {
                message.error("Please select both category and name.");
                return;
            }
            const payload = {
                categoryId: selectedCategory,
                email: values.email,
                password: values.password,
            };
            console.log('payload', payload)

            const response = await dispatch(loginPanelist(payload));
            if (loginPanelist.fulfilled.match(response)) {
                const { token, user } = response.payload.data;
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user));
                showToast.success(response.payload);
                resetFields(form);
                dispatch(setActiveModule("panelist"));
                localStorage.setItem("activeModule", "panelist");
                navigate("/panelist/dashboard");
                dispatch(resetAuthState());
            } else {
                showToast.error(response.payload || "");
            }
        } catch (err) {
            console.log("Form validation failed", err);
            showToast.error("Something went wrong!");
        }
    };

    return (
        <div className="h-screen bg-white px-6 md:px-24 py-12">
            <div className="flex flex-col md:flex-row h-full shadow-lg rounded-2xl overflow-hidden">
                {/* Left Side */}
                <div className="md:w-1/2 hidden md:flex bg-gradient-to-br from-blue-100 to-blue-300 justify-center items-center">
                    <h2 className="text-3xl font-semibold text-blue-900">
                        Welcome Back!
                    </h2>
                </div>

                {/* Right Side */}
                <div className="p-8 w-full md:w-1/2 text-center">
                    <p className="h4">Panelist Login</p>

                    <Form layout="vertical" form={form} className="mt-8 text-left">
                        {dynamicFields.map((field) => renderFormField(field))}
                        <CustomButton
                            label="LOGIN"
                            className="w-full"
                            type="primary"
                            onClick={handleSubmit}
                        />
                    </Form>

                </div>
            </div>
        </div>
    );
};

export default PanelistLogin;
