// services/authService.ts
import axios from "axios";
const API_URL = "http://localhost:3000/api/auth";

export const authService = {
  create: async (parentKey: string, payload: any) => {
    const response = await axios.post(`${API_URL}/${parentKey}`, payload);
    return response.data;
  },
};
