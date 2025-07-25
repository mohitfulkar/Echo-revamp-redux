import type { FieldConfig } from "../../../core/models/FormConfigs";

export const categoryFormFields: FieldConfig[] = [
    {
        name: "name",
        label: "Name",
        type: "text",
        placeholder: "Enter name",
        rules: [{ required: true, message: "Name is required" }],
    },
    {
        name: "description",
        label: "Description",
        type: "textarea",
        placeholder: "Enter description",
        rules: [{ required: false }],
    },
    {
        name: "status",
        label: "Status",
        placeholder: "Select status",
        type: "select",
        rules: [{ required: false }],
        options: ['ACTIVE', 'INACTIVE', 'EXPIRED', 'PENDING']

    },
];



