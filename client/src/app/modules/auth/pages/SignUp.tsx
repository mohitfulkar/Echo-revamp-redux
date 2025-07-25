import React, { useState } from "react";
import { Form, Input, Button, Typography } from "antd";
import { formFields } from "../models/signupForm.model";
import { resetFields } from "../service/FormService"; // adjust the path as needed
import { Link } from "react-router-dom";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser, verifyOtp } from "../features/authSlices"; // Adjust verifyOtp import
import type { AppDispatch } from "../../../store";
const { Title } = Typography;
import { showToast } from "../../../core/service/ToastService";

const SignUp: React.FC = () => {
  const [registerForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState<string>(""); // Track OTP input
  const [email, setEmail] = useState<string>(""); // Track OTP input
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const payload = await registerForm.validateFields(); // ✅ This is your payload
      const response = await dispatch(registerUser(payload));
      if (registerUser.fulfilled.match(response)) {
        setEmail(payload.email);
        setShowOtp(true); // Show OTP input
        showToast.success(response.payload.message);
        resetFields(registerForm); // Reset form fields
      }
    } catch (error) {
      message.error("OTP generation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtpHandler = async () => {
    try {
      if (!otp) {
        showToast.error("Please enter the OTP.");
        return;
      }

      const payload = { otp, email: email };
      const response = await dispatch(verifyOtp(payload));

      if (verifyOtp.fulfilled.match(response)) {
        showToast.success("OTP Verified!");
        showToast.success("Registration Sucessfull!");
        setShowOtp(false); // Hide OTP form
        navigate("/login"); // Redirect to login page
      } else {
        showToast.error("OTP verification failed. Please try again.");
      }
    } catch (error) {
      showToast.error("OTP verification failed. Please try again.");
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
            {!showOtp ? (
              <div>
                <Title level={2} className="!mb-6 !text-center">
                  Create Account
                </Title>
                <Form
                  form={registerForm}
                  name="register"
                  layout="vertical"
                  autoComplete="off"
                  requiredMark={false}
                >
                  {formFields.map((field) => (
                    <Form.Item
                      key={field.name}
                      name={field.name}
                      dependencies={field.dependencies}
                      rules={field.rules}
                      className="mb-4"
                    >
                      {field.type === "password" ? (
                        <Input.Password
                          prefix={field.prefix}
                          size="large"
                          placeholder={field.placeholder}
                          className="rounded-lg"
                        />
                      ) : (
                        <Input
                          prefix={field.prefix}
                          size="large"
                          placeholder={field.placeholder}
                          className="rounded-lg"
                        />
                      )}
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
                      Register
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            ) : (
              <div className="text-center mt-8">
                <Title level={3} className="mb-4">
                  OTP Verification
                </Title>
                <p className="mb-4">Please enter the OTP sent to your email.</p>

                <Title level={5}>OTP Input</Title>
                <Input
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                  placeholder="Enter OTP"
                  style={{ width: "100%", marginBottom: "16px" }}
                />

                <Form.Item>
                  <Button
                    type="primary"
                    size="large"
                    block
                    className="rounded-lg"
                    onClick={verifyOtpHandler}
                  >
                    Verify OTP
                  </Button>
                </Form.Item>
              </div>
            )}

            <p className="text-center mt-4">
              Already have an account?
              <Link to="/login" className="text-blue-500 hover:underline">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
