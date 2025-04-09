
import { ServerApiPayload } from "../types/server.types";
import { ServerFormValues } from "../utils/types";

// API URLs for different environments
const API_URLS = {
  beta: "https://api-beta.example.com/servers",
  production: "https://api.example.com/servers"
};

// Convert our form values to the API payload format
export const mapFormToApiPayload = (formData: ServerFormValues): ServerApiPayload => {
  return {
    Servername: formData.name,
    BuildPlan: Array.isArray(formData.buildPlan) ? formData.buildPlan : formData.buildPlan.split(',').map(item => item.trim()),
    Site: formData.site,
    ServerType: formData.type,
    SiteDescription: "",
    SiteMaster: formData.siteMaster || "QATESTING2",
    IsMaster: (formData.isMaster || false).toString(),
    IPAddress: formData.ipAddress,
    TimeOffset: formData.timeOffset,
    PMfullname: formData.pmFullname,
    L2fullname: formData.l2Fullname,
    Location: formData.location,
    Status: "Offline" // Default status for new servers
  };
};

// Create a new server
export const createServer = async (serverData: ServerFormValues): Promise<any> => {
  const apiPayload = mapFormToApiPayload(serverData);
  const apiUrl = API_URLS[serverData.environment];

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(apiPayload),
    });

    if (!response.ok) {
      throw new Error(`Error creating server: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to create server:', error);
    throw error;
  }
};

// Update an existing server
export const updateServer = async (id: number, serverData: ServerFormValues): Promise<any> => {
  const apiPayload = mapFormToApiPayload(serverData);
  const apiUrl = `${API_URLS[serverData.environment]}/${id}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(apiPayload),
    });

    if (!response.ok) {
      throw new Error(`Error updating server: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to update server:', error);
    throw error;
  }
};

// Delete a server
export const deleteServer = async (id: number, environment: "beta" | "production"): Promise<void> => {
  const apiUrl = `${API_URLS[environment]}/${id}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error deleting server: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Failed to delete server:', error);
    throw error;
  }
};
