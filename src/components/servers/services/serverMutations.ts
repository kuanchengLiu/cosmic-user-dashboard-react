
import { Server, ServerFormValues, ServerApiPayload } from "../types/server.types";
import { getApiUrl } from "./apiConfig";

export const createServer = async (data: ServerFormValues): Promise<Server> => {
  const apiUrl = getApiUrl(data.environment);
  const payload = mapFormToApiPayload(data, "Create");
  
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Failed to create server');
  }

  return response.json();
};

export const updateServer = async (id: number, data: ServerFormValues): Promise<Server> => {
  const apiUrl = getApiUrl(data.environment);
  const payload = mapFormToApiPayload(data, "Update");
  
  const response = await fetch(`${apiUrl}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Failed to update server');
  }

  return response.json();
};

export const deleteServer = async (id: number, environment: "beta" | "production" = "beta"): Promise<void> => {
  const apiUrl = getApiUrl(environment);
  
  const payload = {
    documentType: "Server",
    actionType: "Delete",
    properties: {
      Servername: `Server-${id}`
    }
  };
  
  const response = await fetch(`${apiUrl}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Failed to delete server');
  }
};

export const fetchServer = async (id: number, environment: "beta" | "production" = "beta"): Promise<Server> => {
  const apiUrl = getApiUrl(environment);
  
  const payload = {
    documentType: "Server",
    actionType: "Read",
    properties: {
      Servername: `Server-${id}`
    }
  };
  
  const response = await fetch(`${apiUrl}/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch server');
  }

  return response.json();
};

const mapFormToApiPayload = (data: ServerFormValues, actionType: "Create" | "Update" | "Delete" | "Read"): ServerApiPayload => {
  const buildPlanArray = Array.isArray(data.buildPlan) 
    ? data.buildPlan 
    : typeof data.buildPlan === 'string'
      ? data.buildPlan.split(',').map(item => item.trim())
      : [];
  
  if (actionType === "Delete" || actionType === "Read") {
    return {
      documentType: "Server",
      actionType: actionType,
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
      Status: data.status || "online",
      LastUpdateDt: new Date().toISOString()
    }
  };
};
