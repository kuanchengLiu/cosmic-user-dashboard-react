
import { Server } from "../types/server.types";
import { serverLocations } from "./types";

export const getLocationLabel = (locationValue: string): string => {
  const location = serverLocations.find(loc => loc.value === locationValue);
  return location ? location.label : locationValue;
};

export const filterServers = (
  servers: Server[],
  activeTab: "all" | "beta" | "production",
  searchTerm: string
): Server[] => {
  return servers.filter(
    (server) => {
      // First filter by the active tab
      if (activeTab !== "all" && server.environment !== activeTab) {
        return false;
      }
      
      // Then filter by search term
      return server.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        server.ipAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
        server.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        server.site.toLowerCase().includes(searchTerm.toLowerCase()) ||
        server.pmFullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        server.l2Fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        getLocationLabel(server.location).toLowerCase().includes(searchTerm.toLowerCase());
    }
  );
};
