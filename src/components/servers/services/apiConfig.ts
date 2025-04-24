
const BETA_API_URL = "https://beta-api.example.com/servers";
const PRODUCTION_API_URL = "https://api.example.com/servers";

export const getApiUrl = (environment: "beta" | "production" = "beta") => {
  return environment === "beta" ? BETA_API_URL : PRODUCTION_API_URL;
};

export interface ServerQueryParams {
  page: number;
  limit: number;
  search?: string;
  environment: "beta" | "production";
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}
