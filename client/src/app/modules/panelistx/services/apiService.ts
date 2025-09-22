import axios from "axios";
import {
  createUrl,
  createUrlByPathVariable,
  createUrlByPathVariableQueryParams,
  createUrlWithQueryParams,
} from "../../../core/utils/UrlBuilder";
import { environment } from "../../../core/environment/environment.local";

export const apiService = {
  create: async (parentKey: string, payload: any) => {
    const response = await axios.post(
      createUrl(environment.baseApi, parentKey),
      payload
    );
    return response.data;
  },
  createWithPathVariable: async (
    parentKey: string,
    pathSegments: string[] = [],
    payload?: any
  ) => {
    const response = await axios.post(
      createUrlByPathVariable(environment.baseApi, parentKey, pathSegments),
      payload
    );
    return response.data;
  },

  getAll: async (parentKey: string) => {
    const response = await axios.get(createUrl(environment.baseApi, parentKey));
    return response.data;
  },

  getAllByQueryParams: async (
    parentKey: string,
    queryParams?: Record<string, any>
  ) => {
    const response = await axios.get(
      createUrlWithQueryParams(environment.baseApi, parentKey, queryParams)
    );
    return response.data;
  },

  getAllByPathVariable: async (
    parentKey: string,
    pathSegments: string[] = []
  ) => {
    const response = await axios.get(
      createUrlByPathVariable(environment.baseApi, parentKey, pathSegments)
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
        environment.baseApi,
        parentKey,
        pathSegments,
        queryParams
      )
    );
    return response.data;
  },
};
