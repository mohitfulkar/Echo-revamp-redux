import axios from "axios";
import { environment } from "../../../core/environment/environment.local";

export const userService = {
  create: async (parentKey: string, payload: any) => {
    const response = await axios.post(
      `${environment.userApi}/${parentKey}`,
      payload
    );
    return response.data;
  },
  getAll: async (parentKey: string, params?: {}) => {
    const response = await axios.get(`${environment.userApi}/${parentKey}`, {
      params: params || {},
    });
    return response.data;
  },
  getStats: async (parentKey: string, params?: {}) => {
    const response = await axios.get(`${environment.userApi}/${parentKey}`, {
      params: params || {},
    });
    return response.data;
  },

  getItemById: async (parentKey: string, id: string, params?: any) => {
    const response = await axios.get(
      `${environment.userApi}/${parentKey}/${id}`,
      {
        params: params || {},
      }
    );
    return response.data;
  },
  update: async (parentKey: string, id: string, payload?: any) => {
    const response = await axios.put(
      `${environment.userApi}/${parentKey}/${id}`,
      payload
    );
    return response.data;
  },
};
