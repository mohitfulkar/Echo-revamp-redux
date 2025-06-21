import { UserOutlined, MailOutlined, LockOutlined, PhoneOutlined, SolutionOutlined, StarOutlined, FileImageOutlined } from "@ant-design/icons";
import type { ReactNode } from "react";

export interface FormValues {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export interface FieldConfig {
  name: string;
  placeholder: string;
  prefix?: ReactNode;
  rules?: any[];
  type?: "select" | "password" | "text" | "multi-select" | "textarea" | "number" | "upload";
  dependencies?: string[];
  optionsKey?: string;
  label?: string;
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
export const superPLoginFields: FieldConfig[] = [
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



export const panelistFields: FieldConfig[] = [
  {
    name: "categoryId",
    type: "select",
    label: "Select Your Category",
    placeholder: "Select the Category",
    optionsKey: "items",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Email Address",
    prefix: <MailOutlined />,
    type: "text",
    rules: [
      { required: true, message: "Please enter your email" },
      { type: "email", message: "Please enter a valid email address" },
    ],
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Password",
    prefix: <LockOutlined />,
    type: "password",
    rules: [{ required: true, message: "Please enter your password" }],
  },
];


export const superPanelistFields: FieldConfig[] = [
  {
    name: "name",
    label: "Full Name",
    type: "text",
    placeholder: "Enter your full name",
    prefix: <UserOutlined />,
    rules: [{ required: true, message: "Please enter your name" }],
  },
  {
    name: "email",
    label: "Email",
    type: "text",
    placeholder: "Enter your email",
    prefix: <MailOutlined />,
    rules: [
      { required: true, message: "Please enter your email" },
      { type: "email", message: "Invalid email format" },
    ],
  },
  {
    name: "contactNumber",
    label: "Contact Number",
    type: "text",
    placeholder: "Enter contact number",
    prefix: <PhoneOutlined />,
    rules: [{ required: true, message: "Please enter your contact number" }],
  },
  {
    name: "occupation",
    label: "Occupation",
    type: "text",
    placeholder: "Enter your occupation",
    prefix: <SolutionOutlined />,
    rules: [{ required: true, message: "Please enter your occupation" }],
  },
  {
    name: "areaOfExpertise",
    label: "Area of Expertise",
    type: "text",
    placeholder: "Enter areas (e.g., AI, Education)",
    optionsKey: "expertiseOptions",
    rules: [{ required: true, message: "Please enter at least one area" }],
  },
  {
    name: "contributionSummary",
    label: "Contribution Summary",
    type: "textarea",
    placeholder: "Describe your contributions",
    rules: [{ required: true, message: "Please describe your contribution" }],
  },
  {
    name: "excellenceRating",
    label: "Excellence Rating",
    type: "number",
    placeholder: "Rate from 0 to 10",
    prefix: <StarOutlined />,
    rules: [
      { required: false },
      {
        type: "number",
        min: 0,
        max: 10,
        message: "Rating must be between 0 and 10",
      },
    ],
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
    prefix: <LockOutlined />,
    rules: [{ required: true, message: "Please enter a password" }],
  },
  {
    name: "image",
    label: "Profile Image",
    type: "upload",
    placeholder: "Upload image",
    prefix: <FileImageOutlined />,
    rules: [{ required: true, message: "Please upload a image" }],
  },
];