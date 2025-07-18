import {
    UserOutlined,
    MailOutlined,
    PhoneOutlined,
    SolutionOutlined,
    StarOutlined,
    LockOutlined,
    FileImageOutlined,
    LinkedinOutlined,
    TwitterOutlined,
    GithubOutlined,
    GlobalOutlined,
    FileTextOutlined,
    LinkOutlined,
    TrophyOutlined,
    CalendarOutlined,
    ClusterOutlined,
    AppstoreAddOutlined,
    TagsOutlined,
    UserSwitchOutlined
} from '@ant-design/icons';
import type { FieldConfig } from '../../../core/models/FormConfigs';

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
        name: "areaOfExpertise",
        label: "Area of Expertise",
        type: "textarea",
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
        name: "image",
        label: "Profile Image",
        type: "upload",
        placeholder: "Upload image",
        prefix: <FileImageOutlined />,
        rules: [{ required: true, message: "Please upload a image" }],
    },
];

export const personalDetailsFormFields: FieldConfig[] = [
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
        name: "password",
        label: "Password",
        type: "password",
        placeholder: "Enter a secure password",
        prefix: <LockOutlined />,
        rules: [{ required: true, message: "Please enter your password" }],
    },
]


export const socialMediaFormFields: FieldConfig[] = [
    {
        name: "linkedIn",
        label: "LinkedIn",
        type: "text",
        prefix: <LinkedinOutlined />,
        placeholder: "LinkedIn profile link",
    },
    {
        name: "twitter",
        label: "Twitter",
        type: "text",
        prefix: <TwitterOutlined />,
        placeholder: "Twitter profile link",
    },
    {
        name: "github",
        label: "GitHub",
        type: "text",
        prefix: <GithubOutlined />,
        placeholder: "GitHub profile link",
    },
    {
        name: "website",
        label: "Website",
        type: "text",
        prefix: <GlobalOutlined />,
        placeholder: "Personal website link",
    },
    {
        name: "otherSocialMedia",
        label: "Other",
        type: "text",
        prefix: <GlobalOutlined />,
        placeholder: "Other Social Media link",
    },

]

export const professionFormFields: FieldConfig[] = [
    {
        name: "occupation",
        label: "Occupation",
        type: "text",
        placeholder: "Enter your occupation",
        prefix: <SolutionOutlined />,
        rules: [{ required: true, message: "Please enter your occupation" }],
    },
    {
        name: "expertise",
        label: "Area of Expertise",
        type: "multi-select", // or "checkbox-group"
        placeholder: "Select expertise areas",
        rules: [{ required: true, message: "Please select at least one expertise" }],
        options: [], // you can customize
    },
    {
        name: "experience",
        label: "Years of Experience",
        type: "number",
        placeholder: "Enter number of years",
        prefix: <CalendarOutlined />,
        rules: [{ required: true, message: "Please enter your experience in years" }],
    }

]

export const contributionFormFields: FieldConfig[] = [
    {
        name: "contribution",
        label: "Contribution Summary",
        type: "textarea",
        placeholder: "Describe your contributions in the field",
        prefix: <FileTextOutlined />,
        rules: [{ required: true, message: "Please enter your contribution summary" }],
    },
    {
        name: "publications",
        label: "Publications / Blogs",
        type: "text",
        placeholder: "Enter links to your publications or blogs",
        prefix: <LinkOutlined />,
        rules: [{ required: false }],
    },
    {
        name: "awards",
        label: "Awards / Recognitions",
        type: "textarea",
        placeholder: "List any awards or recognitions you've received",
        prefix: <TrophyOutlined />,
        rules: [{ required: false }],
    },

]


export const designationFormFields: FieldConfig[] = [
    {
        name: "category",
        label: "Assign Category",
        type: "select",
        placeholder: "Select category to assign",
        prefix: <ClusterOutlined />,
        rules: [{ required: true, message: "Please select a category" }],
        options: []
    },
    {
        name: "rsb",
        label: "Area of Responsibility",
        type: "multi-select",
        placeholder: "Select specific areas (optional)",
        prefix: <AppstoreAddOutlined />,
        rules: [],
        options: [], // example values

    },
    {
        name: "designation",
        label: "Designation Title",
        type: "select",
        placeholder: "e.g. Subject Matter Expert, Lead Reviewer",
        prefix: <TagsOutlined />,
        rules: [{ required: true, message: "Please enter designation title" }],
        options: [], // example values
    },
    {
        name: "assignedBy",
        label: "Assigned By",
        type: "select",
        placeholder: "Enter name of assigning admin",
        prefix: <UserSwitchOutlined />,
        rules: [{ required: true, message: "Please specify who assigned this role" }],
        options: ["Content Review", "Survey Approval", "Research Contribution", "Mentoring"], // example values

    },
];


export const uploadFormFields: FieldConfig[] = [
    {
        name: "identityProof",
        label: "Identity Proof (Passport, Driver's License, etc.)",
        type: "upload",
        accept: ".pdf,.jpg,.jpeg,.png",
        maxFileSizeMB: 5,
        multiple: true,
        rules: [{ required: true, message: "Please upload your identity proof." }],
        placeholder: "Upload PDF or image file",
    },
    {
        name: "certification",
        label: "Cerfications",
        type: "upload",
        accept: ".pdf,.jpg,.jpeg,.png",
        maxFileSizeMB: 5,
        multiple: true,
        rules: [{ required: false, message: "Please upload your cerfication" }],
        placeholder: "Upload PDF or image file",
    },
    {
        name: "resume",
        label: "Resume / CV",
        type: "upload",
        accept: ".pdf,.doc,.docx",
        maxFileSizeMB: 10,
        rules: [{ required: false }],
        placeholder: "Upload your resume",
    },
    {
        name: "photo",
        label: "Recent Photograph",
        type: "upload",
        accept: ".jpg,.jpeg,.png",
        maxFileSizeMB: 2,
        rules: [{ required: true, message: "Please upload your recent photo." }],
        placeholder: "Upload image file",
    },
]


