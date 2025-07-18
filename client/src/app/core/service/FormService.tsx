import type { FieldConfig } from "../models/FormConfigs";

/**
 * Prepares a FormData payload from an object.
 *
 * @param {Record<string, any>} data - The object containing values to send.
 * @returns {FormData} - FormData object ready for submission.
 */
export function prepareFormDataPayload(data: Record<string, any>): FormData {
    const formData = new FormData();

    

    Object.entries(data).forEach(([key, value]) => {
        if (
            value === undefined ||
            value === null ||
            (typeof value === 'string' && value.trim() === '')
        ) {
            return;
        }

        console.log('data', data)

        if (Array.isArray(value)) {
            value.forEach((item) => {
                if (item?.originFileObj) {
                    // New file selected by user
                    formData.append(key, item.originFileObj);
                } else if (item?.url) {
                    // Prefilled file (already uploaded)
                    formData.append(`${key}[]`, JSON.stringify({ url: item.url }));
                } else if (typeof item === 'string') {
                    formData.append(`${key}[]`, item);
                } else if (typeof item === 'object') {
                    formData.append(`${key}[]`, JSON.stringify(item));
                }
            });
        }


        else if (typeof value === 'object' && !(value instanceof File)) {
            formData.append(key, JSON.stringify(value));
        }

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

export const getUpdatedPayload = <T extends Record<string, any>>(original: T, updated: T): Partial<T> => {
    const payload: Partial<T> = {};

    for (const key in updated) {
        if (updated[key] !== original[key]) {
            payload[key] = updated[key];
        }
    }

    return payload;
};



export const patchFilesData = (urls: string[] | string, field: string) => {
    if (!urls) return [];
    const arr = Array.isArray(urls) ? urls : [urls];
    return arr.map((url, idx) => ({
        uid: `${field}-${idx}`,
        name: url.split('/').pop() || `${field}-${idx}`,
        status: 'done',
        url,
    }));
};