import axios from "axios";
import { environment } from "../../../core/environment/environment.local";

export const pollService = {
  create: async (parentKey: string, payload: any) => {
    const response = await axios.post(
      `${environment.voteApi}/${parentKey}`,
      payload
    );
    return response.data;
  },
  getAll: async (parentKey: string, params?: {}) => {
    const response = await axios.get(`${environment.voteApi}/${parentKey}`, {
      params: params || {},
    });
    return response.data;
  },
  getStats: async (parentKey: string, params?: {}) => {
    const response = await axios.get(`${environment.voteApi}/${parentKey}`, {
      params: params || {},
    });
    return response.data;
  },
};
