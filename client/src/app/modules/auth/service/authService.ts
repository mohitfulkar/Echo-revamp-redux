// services/authService.ts
import axios from "axios";
import { environment } from "../../../core/environment/environment.local";

export const authService = {
  create: async (parentKey: string, payload: any) => {
    const response = await axios.post(
      `${environment.authApi}/${parentKey}`,
      payload
    );
    return response.data;
  },
};
