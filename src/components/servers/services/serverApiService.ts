import { Server, ServerApiPayload, ServerFormValues } from "../types/server.types";

// For demo purposes, I'll keep the API mock and add production/beta URLs
const BETA_API_URL = "https://beta-api.example.com/servers";
const PRODUCTION_API_URL = "https://api.example.com/servers";

const getApiUrl = (environment: "beta" | "production" = "beta") => {
  return environment === "beta" ? BETA_API_URL : PRODUCTION_API_URL;
};

// Helper to convert form values to API format
const mapFormToApiPayload = (data: ServerFormValues, actionType: "Create" | "Update" | "Delete"): ServerApiPayload => {
  const buildPlanArray = Array.isArray(data.buildPlan) 
    ? data.buildPlan 
    : typeof data.buildPlan === 'string'
      ? data.buildPlan.split(',').map(item => item.trim())
      : [];
  
  // For Delete action, we only need the Servername
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
      Status: "Online", // Default to online for new servers
      LastUpdateDt: new Date().toISOString()
    }
  };
};

// New interface for pagination and search params
export interface ServerQueryParams {
  page: number;
  limit: number;
  search?: string;
  environment: "beta" | "production";
}

// New interface for paginated response
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// Demo API calls with pagination and search
export const fetchServers = async (params: ServerQueryParams): Promise<PaginatedResponse<Server>> => {
  const { page, limit, search, environment } = params;
  const apiUrl = getApiUrl(environment);
  
  // In a real app, this would be a GET request with query parameters
  console.log(`GET ${apiUrl}?page=${page}&limit=${limit}${search ? `&search=${search}` : ''}`);
  
  // Mock data for demonstration
  return new Promise((resolve) => {
    setTimeout(() => {
      // Generate mock servers based on page, limit, and search
      const mockServers: Server[] = [];
      const totalServers = 120; // Mock total number of servers
      const startIndex = (page - 1) * limit;
      const endIndex = Math.min(startIndex + limit, totalServers);
      
      for (let i = startIndex; i < endIndex; i++) {
        const serverNumber = i + 1;
        const serverName = `Server-${serverNumber}`;
        
        // If search is provided, only include servers that match the search term
        if (search && !serverName.toLowerCase().includes(search.toLowerCase())) {
          continue;
        }
        
        mockServers.push({
          id: serverNumber,
          name: serverName,
          ipAddress: `192.168.1.${serverNumber % 255}`,
          status: i % 3 === 0 ? "online" : i % 3 === 1 ? "offline" : "maintenance",
          type: i % 2 === 0 ? "Web Server" : "Database Server",
          lastUpdated: new Date().toISOString(),
          buildPlan: [`Plan-${serverNumber % 3 + 1}`],
          timeOffset: "UTC+0",
          pmFullname: "Project Manager",
          l2Fullname: "L2 Support",
          site: `Site-${String.fromCharCode(65 + (i % 26))}`,
          location: i % 4 === 0 ? "UNITEDSTATES" : i % 4 === 1 ? "GERMANY" : i % 4 === 2 ? "JAPAN" : "SINGAPORE",
          environment: i % 2 === 0 ? "beta" : "production",
          siteMaster: "QATESTING2",
          isMaster: i % 5 === 0
        });
      }
      
      resolve({
        data: mockServers,
        total: totalServers,
        page,
        limit,
        hasMore: endIndex < totalServers
      });
    }, 500);
  });
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
