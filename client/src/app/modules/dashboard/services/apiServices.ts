import axios from "axios";
import { environment } from "../../../core/environment/environment.local";
import {
  createUrl,
  createUrlByPathVariable,
  createUrlByPathVariableQueryParams,
  createUrlWithQueryParams,
} from "../../../core/utils/UrlBuilder";

export const DashboardService = {
  getAll: async (endpoint: string, params?: any) => {
    const response = await axios.get(
      `${environment.dashboardApi}/${endpoint}`,
      params
    );
    return response.data;
  },

  getAlll: async (parentKey: string) => {
    const response = await axios.get(
      createUrl(environment.dashboardApi, parentKey)
    );
    return response.data;
  },

  getAllByQueryParams: async (
    parentKey: string,
    queryParams?: Record<string, any>
  ) => {
    const response = await axios.get(
      createUrlWithQueryParams(environment.dashboardApi, parentKey, queryParams)
    );
    return response.data;
  },

  getAllByPathVariable: async (
    parentKey: string,
    pathSegments: string[] = []
  ) => {
    const response = await axios.get(
      createUrlByPathVariable(environment.dashboardApi, parentKey, pathSegments)
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
        environment.dashboardApi,
        parentKey,
        pathSegments,
        queryParams
      )
    );
    return response.data;
  },
};
