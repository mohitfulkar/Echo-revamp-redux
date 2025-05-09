import { baseUrl } from "../constants/env.js";
import axios from "axios";
export const commanService = {
  create: async (parentKey, payload) => {
    try {
      const response = await axios.post(`${baseUrl}/${parentKey}`, payload);
      return response.data;
    } catch (error) {
      throw error.response?.data || "Something went wrong";
    }
  },
  delete: async (parentKey, id) => {
    try {
      const response = await axios.delete(`${baseUrl}/${parentKey}/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || "Something went wrong";
    }
  },
  getAll: async (parentKey, params = {}) => {
    try {
      const response = await axios.get(`${baseUrl}/${parentKey}`, {
        params, // Pass sorting and filtering parameters dynamically
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || "Something went wrong";
    }
  },
  update: async (parentKey, id, payload) => {
    try {
      const response = await axios.put(
        `${baseUrl}/${parentKey}/${id}`,
        payload
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || "Something went wrong";
    }
  },
};
