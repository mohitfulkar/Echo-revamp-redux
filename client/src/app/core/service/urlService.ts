import { useLocation } from "react-router-dom";

const location = useLocation();
export const getQueryParam = (key: string) => {
  return new URLSearchParams(location.search).get(key);
};
