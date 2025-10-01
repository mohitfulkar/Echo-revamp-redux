type EnvConfig = {
  baseUrl: string;
  baseApi: string;
  authApi: string;
  userApi?: string;
  choiceApi?: string;
  categoryApi: string;
  expertiseApi: string;
  rsbApi: string;
  dashboardApi: string;
  designationApi?: string;
  voteApi?: string;
  pollApi?: string;
};

export const dev: EnvConfig = {
  baseUrl: import.meta.env.VITE_BASE_URL,
  baseApi: import.meta.env.VITE_API_BASE_URL,
  authApi: import.meta.env.VITE_AUTH_API,
  userApi: import.meta.env.VITE_USERS_API,
  choiceApi: import.meta.env.VITE_CHOICE_API,
  categoryApi: import.meta.env.VITE_CATEGORY_API,
  expertiseApi: import.meta.env.VITE_EXPERTISE_API,
  rsbApi: import.meta.env.VITE_RSB_API,
  dashboardApi: import.meta.env.VITE_DASHBOARD_API,
  designationApi: import.meta.env.VITE_DESIGNATION_API,
  voteApi: import.meta.env.VITE_VOTE_API,
  pollApi: import.meta.env.VITE_POLL_API,
};

const qa: EnvConfig = {
  baseUrl: import.meta.env.VITE_QA_BASE_URL,
  baseApi: import.meta.env.VITE_QA_API_BASE_URL,
  authApi: import.meta.env.VITE_QA_AUTH_API,
  categoryApi: import.meta.env.VITE_QA_CATEGORY_API,
  expertiseApi: import.meta.env.VITE_QA_EXPERTISE_API,
  rsbApi: import.meta.env.VITE_QA_RSB_API,
  dashboardApi: import.meta.env.VITE_QA_DASHBOARD_API,
  designationApi: import.meta.env.VITE_QA_DESIGNATION_API,
  voteApi: import.meta.env.VITE_QA_VOTE_API,
};

const prod: EnvConfig = {
  baseUrl: import.meta.env.VITE_PROD_BASE_URL,
  baseApi: import.meta.env.VITE_PROD_API_BASE_URL,
  authApi: import.meta.env.VITE_PROD_AUTH_API,
  categoryApi: import.meta.env.VITE_PROD_CATEGORY_API,
  expertiseApi: import.meta.env.VITE_PROD_EXPERTISE_API,
  rsbApi: import.meta.env.VITE_PROD_RSB_API,
  dashboardApi: import.meta.env.VITE_PROD_DASHBOARD_API,
  designationApi: import.meta.env.VITE_PROD_DESIGNATION_API,
  voteApi: import.meta.env.VITE_PROD_VOTE_API,
};

const currentEnv = (import.meta.env.VITE_ENV || "dev").toLowerCase();

export const environment: EnvConfig =
  currentEnv === "qa" ? qa : currentEnv === "prod" ? prod : dev;
