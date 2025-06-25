import axios from "axios";
import {
  CATEGORY_API,
  EXPERTISE_API,
  RSB_API,
} from "../../../core/environment/environment.local";

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

export const rsbService = {
  create: async (parentKey: string, payload: any) => {
    const response = await axios.post(`${RSB_API}/${parentKey}`, payload);
    return response.data;
  },
  getAll: async (parentKey: string, params?: {}) => {
    const response = await axios.get(`${RSB_API}/${parentKey}`, {
      params: params || {},
    });
    return response.data;
  },
};
