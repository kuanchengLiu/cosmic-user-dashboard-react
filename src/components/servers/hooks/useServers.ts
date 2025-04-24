import { useState } from "react";
import { Server } from "../types/server.types";
import { ServerFormValues } from "../utils/types";
import { createServer, deleteServer, fetchServers, updateServer } from "../services/serverApiService";
import { useToast } from "@/hooks/use-toast";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useServers = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"beta" | "production">("beta");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentServer, setCurrentServer] = useState<Server | null>(null);

  // Use Tanstack's useInfiniteQuery for pagination
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch
  } = useInfiniteQuery({
    queryKey: ["servers", activeTab, searchTerm],
    queryFn: async ({ pageParam = 1 }) => {
      const params = {
        page: pageParam,
        limit: 10,
        search: searchTerm || undefined,
        environment: activeTab
      };
      return fetchServers(params);
    },
    getNextPageParam: (lastPage) => lastPage.hasMore ? lastPage.page + 1 : undefined,
    initialPageParam: 1,
  });

  // Flatten the server data from all pages
  const servers: Server[] = data?.pages.flatMap(page => 
    page.data.map(server => ({
      ...server,
      // Set default status if it's null
      status: server.status || "online"
    }))
  ) || [];

  const handleDelete = async (id: number) => {
    try {
      const serverToDelete = servers.find(server => server.id === id);
      if (!serverToDelete) return;

      await deleteServer(id, serverToDelete.environment);
      
      // Refetch the data after deletion
      refetch();
      
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
      await createServer(serverData);
      
      // Refetch the data after creation
      refetch();
      
      toast({
        title: "Server Created",
        description: `Server has been created successfully.`,
      });
    } catch (error) {
      console.error("Failed to create server:", error);
      throw error; // Let the form component handle the error
    }
  };

  const handleUpdateServer = async (serverId: number, serverData: ServerFormValues) => {
    try {
      await updateServer(serverId, serverData);
      
      // Refetch the data after update
      refetch();
      
      toast({
        title: "Server Updated",
        description: `Server has been updated successfully.`,
      });
      
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
    closeEditModal,
    searchTerm,
    setSearchTerm,
    activeTab,
    setActiveTab,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError
  };
};
