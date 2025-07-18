import axios from "axios";
import {
  CATEGORY_API,
  DESIGNATION_API,
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
  update: async (parentKey: string, id: string, payload: any) => {
    const response = await axios.put(
      `${CATEGORY_API}/${parentKey}/${id}`,
      payload
    );
    return response.data;
  },
  updateBase: async (id: string, payload: any) => {
    const response = await axios.put(`${CATEGORY_API}/${id}`, payload);
    return response.data;
  },
  delete: async (parentKey: string, id: string) => {
    const response = await axios.delete(`${CATEGORY_API}/${parentKey}/${id}`);
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

  updateBase: async (id: string, payload: any) => {
    const response = await axios.put(`${EXPERTISE_API}/${id}`, payload);
    return response.data;
  },

  delete: async (parentKey: string, id: string) => {
    const response = await axios.delete(`${EXPERTISE_API}/${parentKey}/${id}`);
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

  updateBase: async (id: string, payload: any) => {
    const response = await axios.put(`${RSB_API}/${id}`, payload);
    return response.data;
  },

  delete: async (parentKey: string, id: string) => {
    const response = await axios.delete(`${RSB_API}/${parentKey}/${id}`);
    return response.data;
  },
};

export const designationService = {
  create: async (parentKey: string, payload: any) => {
    const response = await axios.post(
      `${DESIGNATION_API}/${parentKey}`,
      payload
    );
    return response.data;
  },
  getAll: async (parentKey: string, params?: {}) => {
    const response = await axios.get(`${DESIGNATION_API}/${parentKey}`, {
      params: params || {},
    });
    return response.data;
  },

  updateBase: async (id: string, payload: any) => {
    const response = await axios.put(`${DESIGNATION_API}/${id}`, payload);
    return response.data;
  },

  delete: async (parentKey: string, id: string) => {
    const response = await axios.delete(
      `${DESIGNATION_API}/${parentKey}/${id}`
    );
    return response.data;
  },
};
