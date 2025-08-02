import axios from "axios";
import { BASE_URL } from "../../../core/environment/environment.local";
import {
  createUrl,
  createUrlByPathVariable,
  createUrlByPathVariableQueryParams,
  createUrlWithQueryParams,
} from "../../../core/utils/UrlBuilder";

export const apiService = {
  create: async (parentKey: string, payload: any) => {
    const response = await axios.post(createUrl(BASE_URL, parentKey), payload);
    return response.data;
  },
  createWithPathVariable: async (
    parentKey: string,
    pathSegments: string[] = [],
    payload?: any
  ) => {
    const response = await axios.post(
      createUrlByPathVariable(BASE_URL, parentKey, pathSegments),
      payload
    );
    return response.data;
  },

  getAll: async (parentKey: string) => {
    const response = await axios.get(createUrl(BASE_URL, parentKey));
    return response.data;
  },

  getAllByQueryParams: async (
    parentKey: string,
    queryParams?: Record<string, any>
  ) => {
    const response = await axios.get(
      createUrlWithQueryParams(BASE_URL, parentKey, queryParams)
    );
    return response.data;
  },

  getAllByPathVariable: async (
    parentKey: string,
    pathSegments: string[] = []
  ) => {
    const response = await axios.get(
      createUrlByPathVariable(BASE_URL, parentKey, pathSegments)
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
        BASE_URL,
        parentKey,
        pathSegments,
        queryParams
      )
    );
    return response.data;
  },
};
