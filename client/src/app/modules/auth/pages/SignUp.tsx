import React, { useState } from "react";
import { Form, Input, Button, Typography } from "antd";
import { formFields } from "../config/signupForm.model";
import { onSubmit } from "../service/FormService"; // adjust the path as needed
import { Link } from "react-router-dom";

const { Title } = Typography;

const SignUp: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState<string>("");

  const onChange = (text: string) => {
    console.log("OTP onChange:", text);
    setOtp(text);
  };

  const onInput = (value: string[]) => {
    console.log("OTP onInput:", value.join(""));
  };

  const sharedProps = {
    onChange,
    onInput,
  };

  const handleSubmit = () => {
    onSubmit(
      form,
      (data) => {
        // resetFields(form);
      },
      setLoading
    );
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
              Create Account
            </Title>
            <Form
              form={form}
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

            {/* OTP Verification Section */}
            <div className="text-center mt-8">
              <Title level={3} className="mb-4">
                OTP Verification
              </Title>
              <p className="mb-4">Please enter the OTP sent to your email.</p>

              {/* OTP Input */}
              <Title level={5}>OTP Input</Title>
              <Input.OTP
                formatter={(str) => str.toUpperCase()}
                length={6}
                separator={<span>-</span>}
                mask="🔒"
                {...sharedProps}
                style={{ width: "100%", marginBottom: "16px" }}
              />

              <Form.Item>
                <Button
                  type="primary"
                  size="large"
                  block
                  className="rounded-lg"
                >
                  Verify OTP
                </Button>
              </Form.Item>
            </div>

            <p className="text-center mt-4">
              Already have an account?{" "}
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
