import { buildSearchParams } from "./QueryParamsBuilder";



export const createUrl = (baseUrl: string, parentKey: string): string => {
  const cleanBase = baseUrl.replace(/\/+$/, ""); // remove trailing slashes
  const cleanParentKey = parentKey.replace(/^\/+|\/+$/g, ""); // trim slashes from both ends
  return `${cleanBase}/${encodeURIComponent(cleanParentKey)}`;
};

export const createUrlWithQueryParams = (
  baseUrl: string,
  parentKey: string,
  queryParams?: Record<string, any>
): string => {
  const cleanBase = baseUrl.replace(/\/+$/, ""); // remove trailing slashes
  const cleanParentKey = parentKey.replace(/^\/+|\/+$/g, ""); // remove leading/trailing slashes

  const fullPath = `${cleanBase}/${encodeURIComponent(cleanParentKey)}`;

  if (!queryParams || Object.keys(queryParams).length === 0) {
    return fullPath;
  }
  return `${fullPath}?${buildSearchParams(queryParams).toString()}`;
};


export const createUrlByPathVariable = (
  baseUrl: string,
  parentKey: string,
  pathSegments: string[] = []
): string => {
  const cleanedSegments = pathSegments
    .filter((segment) => typeof segment === "string" && segment.trim() !== "")
    .map((segment) =>
      encodeURIComponent(segment.trim().replace(/^\/+|\/+$/g, ""))
    );

  return [baseUrl.replace(/\/+$/, ""), parentKey, ...cleanedSegments]
    .filter(Boolean)
    .join("/");
};

// helpers/urlBuilder.ts

export const createUrlByPathVariableQueryParams = (
  baseUrl: string,
  parentKey: string,
  pathSegments: string[] = [],
  queryParams?: Record<string, any>
): string => {
  // Clean and encode each segment
  const cleanSegments = pathSegments
    .filter((s): s is string => typeof s === "string" && s.trim() !== "")
    .map((s) => encodeURIComponent(s.trim().replace(/^\/+|\/+$/g, "")));

  // Join full path
  const fullPath = [
    baseUrl.replace(/\/+$/, ""),
    parentKey,
    ...cleanSegments,
  ].join("/");

  // Handle query parameters
  if (!queryParams || Object.keys(queryParams).length === 0) {
    return fullPath;
  }

  return `${fullPath}?${buildSearchParams(queryParams).toString()}`;
};
