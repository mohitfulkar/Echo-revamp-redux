import axios from "axios";
import { BASE_URL } from "../../../core/environment/environment.local";
const USERS_URL = `${BASE_URL}/users`;

export const userService = {
  create: async (parentKey: string, payload: any) => {
    const response = await axios.post(`${USERS_URL}/${parentKey}`, payload);
    return response.data;
  },
  getAll: async (parentKey: string, params?: {}) => {
    const response = await axios.get(`${USERS_URL}/${parentKey}`, {
      params: params || {},
    });
    return response.data;
  },
  getStats: async (parentKey: string, params?: {}) => {
    const response = await axios.get(`${BASE_URL}/${parentKey}`, {
      params: params || {},
    });
    return response.data;
  },

  getItemById: async (parentKey: string, id: string, params?: any) => {
    const response = await axios.get(`${USERS_URL}/${parentKey}/${id}`, {
      params: params || {},
    });
    return response.data;
  },
  update: async (parentKey: string, id: string, payload?: any) => {
    const response = await axios.put(
      `${USERS_URL}/${parentKey}/${id}`,
      payload
    );
    return response.data;
  },
};
