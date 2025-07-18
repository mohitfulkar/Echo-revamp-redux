import React, { useState } from "react";
import { Form, Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetAuthState, loginSuperPanelist } from "../features/authSlices";
import type { AppDispatch } from "../../../store";
import { showToast } from "../../../core/service/ToastService";
import { setActiveModule } from "../../../core/features/navigationSlices";
import { resetFields } from "../service/FormService";
import { superPLoginFields } from "../models/signupForm.model";
import { renderFormField } from "../../../core/components/FormTemplate";
const { Title } = Typography;
const SuperPanelistLogin: React.FC = () => {
    const [loginForm] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const values = await loginForm.validateFields(); // { password: '...' }
            const response = await dispatch(loginSuperPanelist(values));
            if (loginSuperPanelist.fulfilled.match(response)) {
                const { user } = response.payload;
                localStorage.setItem("user", JSON.stringify(user));
                showToast.success("Super Panelist login successful!");
                resetFields(loginForm);
                navigate("/super-panelist/dashboard");
                localStorage.setItem("activeModule", "superP");
                dispatch(setActiveModule("superP"))
                dispatch(resetAuthState())
            } else {
                showToast.error(response.payload || "Login failed. Please try again.");
            }
        } catch (error) {
            showToast.error("Validation failed. Please check credentials.");
        } finally {
            setLoading(false);
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

                {/* Right Side - Form */}
                <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-8">
                    <div className="w-full max-w-md">
                        <Title level={2} className="!mb-6 !text-center">
                            Super Panelist Login
                        </Title>
                        <Form
                            form={loginForm}
                            name="login"
                            layout="vertical"
                            autoComplete="off"
                            requiredMark={false}
                        >    {superPLoginFields.map((field) => renderFormField(field))}
                            <Form.Item>
                                <Button
                                    type="primary"
                                    onClick={handleSubmit}
                                    size="large"
                                    block
                                    loading={loading}
                                    className="rounded-lg"
                                >
                                    Login
                                </Button>
                            </Form.Item>

                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SuperPanelistLogin