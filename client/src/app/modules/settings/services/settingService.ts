import axios from "axios";
import { BASE_URL } from "../../../core/environment/environment.local";

const CATEGORY_API = `${BASE_URL}/category`;
const EXPERTISE_API = `${BASE_URL}/expertise`;
export const categoryService = {
  create: async (parentKey: string, payload: any) => {
    const response = await axios.post(`${CATEGORY_API}/${parentKey}`, payload);
    return response.data;
  },
  getAll: async (parentKey: string, params?: {}) => {
    const response = await axios.get(`${CATEGORY_API}/${parentKey}`, {
      params: params || {},
    });
    return response.data;
  },
};

export const expertiseService = {
  create: async (parentKey: string, payload: any) => {
    const response = await axios.post(`${EXPERTISE_API}/${parentKey}`, payload);
    return response.data;
  },
  getAll: async (parentKey: string, params?: {}) => {
    const response = await axios.get(`${EXPERTISE_API}/${parentKey}`, {
      params: params || {},
    });
    return response.data;
  },
};
