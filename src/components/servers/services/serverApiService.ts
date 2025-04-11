
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

// Demo API calls
export const fetchServers = async (): Promise<Server[]> => {
  // Mock API call - in a real app, this would be a fetch to your API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: "WebServer001",
          ipAddress: "192.168.1.1",
          status: "online",
          type: "Web Server",
          lastUpdated: "2023-04-05T14:48:00.000Z",
          buildPlan: ["Plan A", "Plan B"],
          timeOffset: "UTC+0",
          pmFullname: "John Doe",
          l2Fullname: "Jane Smith",
          site: "US-East",
          location: "New York",
          environment: "beta",
          siteMaster: "QATESTING2",
          isMaster: true,
          siteDescription: "East Coast Data Center"
        },
        {
          id: 2,
          name: "DBServer001",
          ipAddress: "192.168.1.2",
          status: "maintenance",
          type: "Database Server",
          lastUpdated: "2023-04-04T10:30:00.000Z",
          buildPlan: ["Plan C"],
          timeOffset: "UTC+0",
          pmFullname: "Alice Johnson",
          l2Fullname: "Bob Brown",
          site: "US-West",
          location: "San Francisco",
          environment: "production",
          siteMaster: "PRODMASTER",
          isMaster: false,
          siteDescription: "West Coast Data Center"
        },
        {
          id: 3,
          name: "AppServer001",
          ipAddress: "192.168.1.3",
          status: "offline",
          type: "Application Server",
          lastUpdated: "2023-04-03T18:15:00.000Z",
          buildPlan: ["Plan A", "Plan D"],
          timeOffset: "UTC+1",
          pmFullname: "Charlie Wilson",
          l2Fullname: "Diana Miller",
          site: "EU-Central",
          location: "Berlin",
          environment: "beta",
          siteMaster: "EUMASTER",
          isMaster: false,
          siteDescription: "European Data Center"
        }
      ]);
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
