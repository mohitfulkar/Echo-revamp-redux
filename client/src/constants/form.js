export const registerFields = [
  {
    name: "fname",
    type: "text",
    label: "First Name",
    placeholder: "Enter First name",
    required: true,
  },
  {
    name: "lname",
    type: "text",
    label: "Last Name",
    placeholder: "Enter Last name",
    required: true,
  },
  {
    name: "email",
    type: "email",
    label: "Email",
    placeholder: "Enter your email",
    required: true,
  },
  {
    name: "password",
    type: "password",
    label: "Password",
    placeholder: "Enter your password",
    required: true,
  },
];

export const loginFields = [
  {
    name: "email",
    type: "email",
    label: "Email",
    placeholder: "Enter Email",
    required: true,
  },
  {
    name: "password",
    type: "password",
    label: "Password",
    placeholder: "Enter Password",
    required: true,
  },
];

export const panelistLoginFields = [
  {
    name: "fullName",
    type: "select",
    label: "Panelist",
    placeholder: "Select Panelist",
    required: true,
  },
  {
    name: "secretKey",
    type: "password",
    label: "Secret Key",
    placeholder: "Enter Secret Key",
    required: true,
  },
];

export const pollFields = [
  {
    name: "subject",
    type: "text",
    label: "Poll Subject",
    placeholder: "Enter poll subject",
    required: true,
  },
  {
    name: "desc",
    type: "textarea",
    label: "Description",
    placeholder: "Enter poll description",
    required: true,
  },
  {
    name: "pollQuestion",
    type: "text",
    label: "Poll Question",
    placeholder: "Enter poll question",
    required: true,
  },
 
];

export const addPanelistFields = [
  {
    name: "fullName",
    type: "text",
    label: "Full Name",
    placeholder: "Enter Full Name",
    required: true,
  },
  {
    name: "phone",
    type: "text",
    label: "Phone Number",
    placeholder: "Enter Phone Number",
    required: true,
  },
  {
    name: "email",
    type: "email",
    label: "Email Address",
    placeholder: "Enter Email Address",
    required: true,
  },
  {
    name: "service",
    type: "text",
    label: "Service",
    placeholder: "Enter Service Name ",
  },
  {
    name: "contribution",
    type: "textarea",
    label: "Contribution",
    placeholder: "Enter Contribution (comma seperated)",
  },
  {
    name: "topicOfInterest",
    type: "textarea",
    label: "Topic of Interest",
    placeholder: "Enter Topic of Interest (comma seperated)",
  },
  {
    name: "secretKey",
    type: "password",
    label: "Secret Key",
    placeholder: "Enter Secret Key",
  },
  {
    name: "x",
    type: "text",
    label: "Twitter/X",
    placeholder: "Enter Twitter/X Profile",
  },
  {
    name: "facebook",
    type: "text",
    label: "Facebook",
    placeholder: "Enter Facebook Profile",
  },
  {
    name: "instagram",
    type: "text",
    label: "Instagram",
    placeholder: "Enter Instagram Profile",
  },
  {
    name: "photo",
    type: "file",
    label: "Photo",
    placeholder: "Upload Photo",
    accept: "image/*",
    required: true,
  },
];
