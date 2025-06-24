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
        name: "isActive",
        label: "Is Active",
        type: "switch", // ✅ updated from "slider" to "switch"
        rules: [{ required: false }],
    },
];



