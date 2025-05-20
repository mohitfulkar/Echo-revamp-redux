import React, { useState } from "react";
import { Form, Input, Button, Typography } from "antd";
import { loginFields } from "../models/signupForm.model";
import { resetFields } from "../service/FormService";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser, resetAuthState } from "../features/authSlices";
import type { AppDispatch } from "../../../store";
import { showToast } from "../../../core/service/ToastService";
import { setActiveModule } from "../../../core/features/navigationSlices";

const { Title } = Typography;

const Login: React.FC = () => {
  const [loginForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const payload = await loginForm.validateFields();
      const response = await dispatch(loginUser(payload));
      if (loginUser.fulfilled.match(response)) {
        const { token, user } = response.payload.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        showToast.success(response.payload.message);
        resetFields(loginForm);
        dispatch(setActiveModule("voter"));
        localStorage.setItem("activeModule", "voter");
        navigate("/dashboard");
        dispatch(resetAuthState());
      } else {
        showToast.error(
          response.payload || "An error occurred. Please try again."
        );
      }
    } catch (error) {
      showToast.error("Login failed. Please try again.");
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
              Login
            </Title>
            <Form
              form={loginForm}
              name="login"
              layout="vertical"
              autoComplete="off"
              requiredMark={false}
            >
              {loginFields.map((field) => (
                <Form.Item
                  key={field.name}
                  name={field.name}
                  dependencies={field.dependencies}
                  rules={field.rules}
                  className="mb-4"
                >
                  <Input
                    placeholder={field.placeholder}
                    type={field.type || "text"}
                  />
                </Form.Item>
              ))}

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
              <Form.Item className="text-center">
                Don't have an account?{" "}
                <Link to="/register" className="text-blue-500">
                  Register here
                </Link>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
