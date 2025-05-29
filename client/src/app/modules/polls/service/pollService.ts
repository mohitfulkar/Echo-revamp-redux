// services/authService.ts
import axios from "axios";
import { BASE_URL } from "../../../core/environment/environment.local";
import { POLL } from "../constants/dashboard.constants";
const POLL_URL = `${BASE_URL}/${POLL}`;

export const pollService = {
  create: async (parentKey: string, payload: any) => {
    const response = await axios.post(`${POLL_URL}/${parentKey}`, payload);
    return response.data;
  },
  getAll: async (parentKey: string, params?: {}) => {
    const response = await axios.get(`${POLL_URL}/${parentKey}`, {
      params: params || {}, // wrap `params` inside an object
    });
    return response.data;
  },
};
