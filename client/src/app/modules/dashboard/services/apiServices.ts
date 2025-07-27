import axios from "axios";
import { DASHBOARD_API } from "../../../core/environment/environment.local";
import {
  createUrl,
  createUrlByPathVariable,
  createUrlByPathVariableQueryParams,
  createUrlWithQueryParams,
} from "../../../core/utils/UrlBuilder";

export const DashboardService = {
  getAll: async (endpoint: string, params?: any) => {
    const response = await axios.get(`${DASHBOARD_API}/${endpoint}`, params);
    return response.data;
  },

  getAlll: async (parentKey: string) => {
    const response = await axios.get(createUrl(DASHBOARD_API, parentKey));
    return response.data;
  },

  getAllByQueryParams: async (
    parentKey: string,
    queryParams?: Record<string, any>
  ) => {
    const response = await axios.get(
      createUrlWithQueryParams(DASHBOARD_API, parentKey, queryParams)
    );
    return response.data;
  },

  getAllByPathVariable: async (
    parentKey: string,
    pathSegments: string[] = []
  ) => {
    const response = await axios.get(
      createUrlByPathVariable(DASHBOARD_API, parentKey, pathSegments)
    );
    return response.data;
  },

  getAllByPathVariableQueryParams: async (
    parentKey: string,
    pathSegments: string[] = [],
    queryParams?: Record<string, any>
  ) => {
    const response = await axios.get(
      createUrlByPathVariableQueryParams(
        DASHBOARD_API,
        parentKey,
        pathSegments,
        queryParams
      )
    );
    return response.data;
  },
};
