import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import type { ReactNode } from "react";

export interface FormValues {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface FieldConfig {
  name: keyof FormValues;
  placeholder: string;
  prefix: ReactNode;
  rules: any[];
  type?: "text" | "password";
  dependencies?: string[];
}

export const formFields: FieldConfig[] = [
  {
    name: "fullName",
    placeholder: "Full Name",
    prefix: <UserOutlined />,
    rules: [{ required: true, message: "Please enter your full name" }],
  },
  {
    name: "email",
    placeholder: "Email Address",
    prefix: <MailOutlined />,
    rules: [
      { required: true, message: "Please enter your email" },
      { type: "email", message: "Please enter a valid email address" },
    ],
  },
  {
    name: "password",
    placeholder: "Password",
    prefix: <LockOutlined />,
    type: "password",
    rules: [
      { required: true, message: "Please enter your password" },
      { min: 8, message: "Password must be at least 8 characters" },
    ],
  },
  {
    name: "confirmPassword",
    placeholder: "Confirm Password",
    prefix: <LockOutlined />,
    type: "password",
    dependencies: ["password"],
    rules: [
      { required: true, message: "Please confirm your password" },
      ({ getFieldValue }: any) => ({
        validator(_: any, value: string) {
          if (!value || getFieldValue("password") === value) {
            return Promise.resolve();
          }
          return Promise.reject(new Error("The two passwords do not match"));
        },
      }),
    ],
  },
];

export const loginFields: FieldConfig[] = [
  {
    name: "email",
    placeholder: "Email Address",
    prefix: <MailOutlined />,
    rules: [
      { required: true, message: "Please enter your email" },
      { type: "email", message: "Please enter a valid email address" },
    ],
  },
  {
    name: "password",
    placeholder: "Password",
    prefix: <LockOutlined />,
    type: "password",
    rules: [
      { required: true, message: "Please enter your password" },
      { min: 8, message: "Password must be at least 8 characters" },
    ],
  },
];
export const adminFields: FieldConfig[] = [
  {
    name: "password",
    placeholder: "Password",
    prefix: <LockOutlined />,
    type: "password",
    rules: [
      { required: true, message: "Please enter your password" },
      { min: 8, message: "Password must be at least 8 characters" },
    ],
  },
];
