
import { useState } from "react";
import { Server } from "../types/server.types";
import { ServerFormValues } from "../utils/types";

export const useServers = () => {
  // Sample data - in a real app, this would come from an API
  const [servers, setServers] = useState<Server[]>([
    {
      id: 1,
      name: "Web Server 01",
      ipAddress: "192.168.1.101",
      status: "online",
      type: "Web Server",
      lastUpdated: "2025-04-08 09:30:45",
      buildPlan: ["deploy", "test"],
      timeOffset: "UTC+08",
      pmFullname: "Project Manager",
      l2Fullname: "L2 Support",
      site: "SiteA",
      location: "UNITEDSTATES",
      environment: "production"
    },
    {
      id: 2,
      name: "Database Server 01",
      ipAddress: "192.168.1.102",
      status: "online",
      type: "Database Server",
      lastUpdated: "2025-04-08 08:45:12",
      buildPlan: ["backup", "restore"],
      timeOffset: "UTC+08",
      pmFullname: "Project Manager",
      l2Fullname: "L2 Support",
      site: "SiteB",
      location: "GERMANY",
      environment: "beta"
    },
    {
      id: 3,
      name: "File Server 01",
      ipAddress: "192.168.1.103",
      status: "maintenance",
      type: "File Server",
      lastUpdated: "2025-04-07 23:15:30",
      buildPlan: ["sync", "backup"],
      timeOffset: "UTC+08",
      pmFullname: "Project Manager",
      l2Fullname: "L2 Support",
      site: "SiteA",
      location: "JAPAN",
      environment: "beta"
    },
    {
      id: 4,
      name: "Backup Server 01",
      ipAddress: "192.168.1.104",
      status: "offline",
      type: "Backup Server",
      lastUpdated: "2025-04-08 02:10:18",
      buildPlan: ["backup", "archive"],
      timeOffset: "UTC+08",
      pmFullname: "Project Manager",
      l2Fullname: "L2 Support",
      site: "SiteC",
      location: "SINGAPORE",
      environment: "production"
    },
  ]);

  const handleDelete = (id: number) => {
    setServers(servers.filter((server) => server.id !== id));
  };
  
  const handleCreateServer = (serverData: ServerFormValues) => {
    const newServer: Server = {
      id: servers.length > 0 ? Math.max(...servers.map(s => s.id)) + 1 : 1,
      name: serverData.name,
      ipAddress: serverData.ipAddress,
      status: "offline", // Default status for new servers
      type: serverData.type,
      lastUpdated: new Date().toISOString().replace('T', ' ').substring(0, 19),
      buildPlan: serverData.buildPlan,
      timeOffset: serverData.timeOffset,
      pmFullname: serverData.pmFullname,
      l2Fullname: serverData.l2Fullname,
      site: serverData.site,
      location: serverData.location,
      environment: serverData.environment
    };
    
    setServers([...servers, newServer]);
  };

  return {
    servers,
    handleDelete,
    handleCreateServer,
  };
};
