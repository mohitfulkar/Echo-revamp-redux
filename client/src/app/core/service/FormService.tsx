import type { FieldConfig } from "../../modules/auth/models/signupForm.model";

/**
 * Prepares a FormData payload from an object.
 *
 * @param {Record<string, any>} data - The object containing values to send.
 * @returns {FormData} - FormData object ready for submission.
 */
export function prepareFormDataPayload(data: Record<string, any>): FormData {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
        // Skip empty, null, or undefined values
        if (
            value === undefined ||
            value === null ||
            (typeof value === 'string' && value.trim() === '')
        ) {
            return;
        }

        // Handle file arrays
        if (Array.isArray(value) && value[0]?.originFileObj) {
            value.forEach((fileItem) => {
                formData.append(key, fileItem.originFileObj);
            });
        }

        // Handle plain arrays (e.g., areaOfExpertise)
        else if (Array.isArray(value)) {
            value.forEach((v) => {
                if (v !== null && v !== undefined && v !== '') {
                    formData.append(`${key}[]`, v);
                }
            });
        }

        // Handle plain objects (stringify them)
        else if (typeof value === 'object' && !(value instanceof File)) {
            formData.append(key, JSON.stringify(value));
        }

        // Handle primitive values (string, number, boolean)
        else {
            formData.append(key, value);
        }
    });

    return formData;
}


export const applyFieldOptions = (
    fields: FieldConfig[],
    optionsMap: Record<string, any[]>
) => {
    return fields.map((field) => ({
        ...field,
        ...(optionsMap[field.name] ? { options: optionsMap[field.name] } : {})
    }));
};