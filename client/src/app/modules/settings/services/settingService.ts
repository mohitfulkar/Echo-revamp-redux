import axios from "axios";
import { environment } from "../../../core/environment/environment.local";

export const categoryService = {
  create: async (parentKey: string, payload: any) => {
    const response = await axios.post(
      `${environment.categoryApi}/${parentKey}`,
      payload
    );
    return response.data;
  },
  getAll: async (parentKey: string, params?: {}) => {
    const response = await axios.get(
      `${environment.categoryApi}/${parentKey}`,
      {
        params: params || {},
      }
    );
    return response.data;
  },
  update: async (parentKey: string, id: string, payload: any) => {
    const response = await axios.put(
      `${environment.categoryApi}/${parentKey}/${id}`,
      payload
    );
    return response.data;
  },
  updateBase: async (id: string, payload: any) => {
    const response = await axios.put(
      `${environment.categoryApi}/${id}`,
      payload
    );
    return response.data;
  },
  delete: async (parentKey: string, id: string) => {
    const response = await axios.delete(
      `${environment.categoryApi}/${parentKey}/${id}`
    );
    return response.data;
  },
};

export const expertiseService = {
  create: async (parentKey: string, payload: any) => {
    const response = await axios.post(
      `${environment.expertiseApi}/${parentKey}`,
      payload
    );
    return response.data;
  },
  getAll: async (parentKey: string, params?: {}) => {
    const response = await axios.get(
      `${environment.expertiseApi}/${parentKey}`,
      {
        params: params || {},
      }
    );
    return response.data;
  },

  updateBase: async (id: string, payload: any) => {
    const response = await axios.put(
      `${environment.expertiseApi}/${id}`,
      payload
    );
    return response.data;
  },

  delete: async (parentKey: string, id: string) => {
    const response = await axios.delete(
      `${environment.expertiseApi}/${parentKey}/${id}`
    );
    return response.data;
  },
};

export const rsbService = {
  create: async (parentKey: string, payload: any) => {
    const response = await axios.post(
      `${environment.rsbApi}/${parentKey}`,
      payload
    );
    return response.data;
  },
  getAll: async (parentKey: string, params?: {}) => {
    const response = await axios.get(`${environment.rsbApi}/${parentKey}`, {
      params: params || {},
    });
    return response.data;
  },

  updateBase: async (id: string, payload: any) => {
    const response = await axios.put(`${environment.rsbApi}/${id}`, payload);
    return response.data;
  },

  delete: async (parentKey: string, id: string) => {
    const response = await axios.delete(
      `${environment.rsbApi}/${parentKey}/${id}`
    );
    return response.data;
  },
};

export const designationService = {
  create: async (parentKey: string, payload: any) => {
    const response = await axios.post(
      `${environment.designationApi}/${parentKey}`,
      payload
    );
    return response.data;
  },
  getAll: async (parentKey: string, params?: {}) => {
    const response = await axios.get(
      `${environment.designationApi}/${parentKey}`,
      {
        params: params || {},
      }
    );
    return response.data;
  },

  updateBase: async (id: string, payload: any) => {
    const response = await axios.put(
      `${environment.designationApi}/${id}`,
      payload
    );
    return response.data;
  },

  delete: async (parentKey: string, id: string) => {
    const response = await axios.delete(
      `${environment.designationApi}/${parentKey}/${id}`
    );
    return response.data;
  },
};
