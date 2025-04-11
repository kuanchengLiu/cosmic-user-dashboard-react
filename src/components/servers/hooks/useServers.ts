import { useState } from "react";
import { Server } from "../types/server.types";
import { ServerFormValues } from "../utils/types";
import { createServer, deleteServer, updateServer } from "../services/serverApiService";
import { useToast } from "@/hooks/use-toast";

export const useServers = () => {
  const { toast } = useToast();
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
      environment: "production",
      siteMaster: "QATESTING2",
      isMaster: true
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
      environment: "beta",
      siteMaster: "QATESTING2",
      isMaster: false
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
      environment: "beta",
      siteMaster: "QATESTING2",
      isMaster: false
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
      environment: "production",
      siteMaster: "QATESTING2",
      isMaster: false
    },
  ]);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentServer, setCurrentServer] = useState<Server | null>(null);

  const handleDelete = async (id: number) => {
    try {
      const serverToDelete = servers.find(server => server.id === id);
      if (!serverToDelete) return;

      await deleteServer(id);
      setServers(servers.filter((server) => server.id !== id));
      
      toast({
        title: "Server Deleted",
        description: `Server has been deleted successfully.`,
      });
    } catch (error) {
      console.error("Failed to delete server:", error);
      toast({
        variant: "destructive",
        title: "Delete Failed",
        description: `Failed to delete server: ${error instanceof Error ? error.message : "Unknown error"}`
      });
    }
  };
  
  const handleCreateServer = async (serverData: ServerFormValues) => {
    try {
      // In a real app, the API would return the created server with its ID
      // Here we're simulating that by generating an ID
      const newServer: Server = {
        id: servers.length > 0 ? Math.max(...servers.map(s => s.id)) + 1 : 1,
        name: serverData.name,
        ipAddress: serverData.ipAddress,
        status: "offline", // Default status for new servers
        type: serverData.type,
        lastUpdated: new Date().toISOString().replace('T', ' ').substring(0, 19),
        buildPlan: Array.isArray(serverData.buildPlan) 
          ? serverData.buildPlan 
          : typeof serverData.buildPlan === 'string'
            ? serverData.buildPlan.split(',').map(item => item.trim())
            : [],
        timeOffset: serverData.timeOffset,
        pmFullname: serverData.pmFullname,
        l2Fullname: serverData.l2Fullname,
        site: serverData.site,
        location: serverData.location,
        environment: serverData.environment,
        siteMaster: serverData.siteMaster,
        isMaster: serverData.isMaster
      };
      
      await createServer(serverData);
      setServers([...servers, newServer]);
    } catch (error) {
      console.error("Failed to create server:", error);
      throw error; // Let the form component handle the error
    }
  };

  const handleUpdateServer = async (serverId: number, serverData: ServerFormValues) => {
    try {
      await updateServer(serverId, serverData);
      
      // Update the server in the local state
      setServers(servers.map(server => 
        server.id === serverId 
          ? {
              ...server,
              name: serverData.name,
              ipAddress: serverData.ipAddress,
              type: serverData.type,
              buildPlan: Array.isArray(serverData.buildPlan) 
                ? serverData.buildPlan 
                : typeof serverData.buildPlan === 'string'
                  ? serverData.buildPlan.split(',').map(item => item.trim())
                  : [],
              timeOffset: serverData.timeOffset,
              pmFullname: serverData.pmFullname,
              l2Fullname: serverData.l2Fullname,
              site: serverData.site,
              location: serverData.location,
              environment: serverData.environment,
              siteMaster: serverData.siteMaster,
              isMaster: serverData.isMaster,
              lastUpdated: new Date().toISOString().replace('T', ' ').substring(0, 19),
            }
          : server
      ));
      
      setIsEditModalOpen(false);
      setCurrentServer(null);
    } catch (error) {
      console.error("Failed to update server:", error);
      throw error;
    }
  };

  const openEditModal = (server: Server) => {
    setCurrentServer(server);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setCurrentServer(null);
  };

  return {
    servers,
    handleDelete,
    handleCreateServer,
    handleUpdateServer,
    isEditModalOpen,
    currentServer,
    openEditModal,
    closeEditModal
  };
};
