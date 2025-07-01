import axios from "axios";
import { DASHBOARD_API } from "../../../core/environment/environment.local";

export const DashboardService = {
  getAll: async (endpoint: string, params?: any) => {
    const response = await axios.get(`${DASHBOARD_API}/${endpoint}`, params);
    return response.data;
  },
};
