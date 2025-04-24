import { Server, ServerApiPayload, ServerFormValues } from "../types/server.types";

const BETA_API_URL = "https://beta-api.example.com/servers";
const PRODUCTION_API_URL = "https://api.example.com/servers";

const getApiUrl = (environment: "beta" | "production" = "beta") => {
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

export const fetchServers = async (params: ServerQueryParams): Promise<PaginatedResponse<Server>> => {
  const { page, limit, search, environment } = params;
  const apiUrl = getApiUrl(environment);
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...(search && { search })
  });

  const response = await fetch(`${apiUrl}?${queryParams}`);
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

export const createServer = async (data: ServerFormValues): Promise<Server> => {
  const apiUrl = getApiUrl(data.environment);
  const payload = mapFormToApiPayload(data, "Create");
  
  // In a real app, this would be a POST to your API
  console.log(`POST ${apiUrl}`, payload);
  
  // Mock successful response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: Math.floor(Math.random() * 1000) + 4, // Generate random ID
        name: data.name,
        ipAddress: data.ipAddress,
        status: "online",
        type: data.type,
        lastUpdated: new Date().toISOString(),
        buildPlan: Array.isArray(data.buildPlan) ? data.buildPlan : typeof data.buildPlan === 'string' ? data.buildPlan.split(',').map(item => item.trim()) : [],
        timeOffset: data.timeOffset,
        pmFullname: data.pmFullname,
        l2Fullname: data.l2Fullname,
        site: data.site,
        location: data.location,
        environment: data.environment,
        siteMaster: data.siteMaster,
        isMaster: data.isMaster,
        siteDescription: data.siteDescription
      });
    }, 500);
  });
};

export const updateServer = async (id: number, data: ServerFormValues): Promise<Server> => {
  const apiUrl = getApiUrl(data.environment);
  const payload = mapFormToApiPayload(data, "Update");
  
  // In a real app, this would be a PUT to your API
  console.log(`PUT ${apiUrl}/${id}`, payload);
  
  // Mock successful response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id,
        name: data.name,
        ipAddress: data.ipAddress,
        status: "online", // Assume we're not changing status here
        type: data.type,
        lastUpdated: new Date().toISOString(),
        buildPlan: Array.isArray(data.buildPlan) ? data.buildPlan : typeof data.buildPlan === 'string' ? data.buildPlan.split(',').map(item => item.trim()) : [],
        timeOffset: data.timeOffset,
        pmFullname: data.pmFullname,
        l2Fullname: data.l2Fullname,
        site: data.site,
        location: data.location,
        environment: data.environment,
        siteMaster: data.siteMaster,
        isMaster: data.isMaster,
        siteDescription: data.siteDescription
      });
    }, 500);
  });
};

export const deleteServer = async (id: number, environment: "beta" | "production" = "beta"): Promise<void> => {
  const apiUrl = getApiUrl(environment);
  
  // For the delete endpoint, we're using a simpler payload
  const payload = {
    documentType: "Server",
    actionType: "Delete",
    properties: {
      Servername: `Server-${id}` // In a real application, you would need the actual server name
    }
  };
  
  // In a real app, this would be a DELETE to your API
  console.log(`DELETE ${apiUrl}/${id}`, payload);
  
  // Mock successful response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
};

const mapFormToApiPayload = (data: ServerFormValues, actionType: "Create" | "Update" | "Delete"): ServerApiPayload => {
  const buildPlanArray = Array.isArray(data.buildPlan) 
    ? data.buildPlan 
    : typeof data.buildPlan === 'string'
      ? data.buildPlan.split(',').map(item => item.trim())
      : [];
  
  if (actionType === "Delete") {
    return {
      documentType: "Server",
      actionType: "Delete",
      properties: {
        Servername: data.name,
        BuildPlan: [],
        Site: "",
        ServerType: "",
        SiteDescription: "",
        SiteMaster: "",
        IsMaster: "",
        IPAddress: "",
        TimeOffset: "",
        PMfullname: "",
        L2fullname: "",
        Location: "",
        Status: ""
      }
    };
  }
      
  return {
    documentType: "Server",
    actionType: actionType,
    properties: {
      Servername: data.name,
      BuildPlan: buildPlanArray,
      Site: data.site,
      ServerType: data.type,
      SiteDescription: data.siteDescription || "",
      SiteMaster: data.siteMaster || "",
      IsMaster: data.isMaster ? "true" : "false",
      IPAddress: data.ipAddress,
      TimeOffset: data.timeOffset,
      PMfullname: data.pmFullname,
      L2fullname: data.l2Fullname,
      Location: data.location,
      Status: "Online",
      LastUpdateDt: new Date().toISOString()
    }
  };
};
