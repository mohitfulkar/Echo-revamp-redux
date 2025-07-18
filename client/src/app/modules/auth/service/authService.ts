// services/authService.ts
import axios from "axios";
import { BASE_URL } from "../../../core/environment/environment.local";
const AUTH_URL = `${BASE_URL}/auth`;

export const authService = {
  create: async (parentKey: string, payload: any) => {
    const response = await axios.post(`${AUTH_URL}/${parentKey}`, payload);
    return response.data;
  },
};
