
import { Server } from "../types/server.types";
import { getApiUrl, ServerQueryParams, PaginatedResponse } from "./apiConfig";

export const fetchServers = async (params: ServerQueryParams): Promise<PaginatedResponse<Server>> => {
  const { page, limit, search, environment } = params;
  const apiUrl = getApiUrl(environment);
  
  // Now using POST method with parameters in the request body instead of URL query params
  const payload = {
    documentType: "Server",
    actionType: "List",
    properties: {
      page: page,
      limit: limit,
      search: search || ""
    }
  };

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch servers');
  }

  const data = await response.json();
  return {
    data: data.servers.map((server: any) => ({
      ...server,
      status: server.status || "online" // Set default status if null
    })),
    total: data.total,
    page,
    limit,
    hasMore: page * limit < data.total
  };
};
