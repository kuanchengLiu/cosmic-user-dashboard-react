import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Loader } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ServerForm from "./ServerForm";
import { useServers } from "./hooks/useServers";
import { ServerSearch } from "./ui/ServerSearch";
import { ServerList } from "./ui/ServerList";
import { DeleteServerDialog } from "./ui/DeleteServerDialog";
import { Server } from "./types/server.types";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const ServerTable = () => {
  const [showForm, setShowForm] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [serverToDelete, setServerToDelete] = useState<Server | null>(null);
  
  // Create a ref for infinite scrolling
  const { ref, inView } = useInView();
  
  const { 
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
  } = useServers();
  
  // Fetch more data when scrolled to the bottom
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const confirmDelete = (server: Server) => {
    setServerToDelete(server);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (serverToDelete) {
      await handleDelete(serverToDelete.id);
      setDeleteDialogOpen(false);
    }
  };

  return (
    <div className="space-y-4">
      <Tabs 
        defaultValue="beta" 
        value={activeTab}
        onValueChange={(value: string) => setActiveTab(value as "beta" | "production")}
        className="w-full"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <TabsList className="w-full md:w-auto">
            <TabsTrigger value="beta">Beta Servers</TabsTrigger>
            <TabsTrigger value="production">Production Servers</TabsTrigger>
          </TabsList>
          
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full md:w-auto">
            <ServerSearch 
              searchTerm={searchTerm} 
              setSearchTerm={setSearchTerm} 
            />
            <Button 
              className="flex items-center gap-1 w-full md:w-auto"
              onClick={() => setShowForm(true)}
            >
              <Plus className="h-4 w-4" />
              Add Server
            </Button>
          </div>
        </div>

        <TabsContent value="beta" className="mt-4">
          <ServerList 
            servers={servers}
            onDelete={confirmDelete}
            onEdit={openEditModal}
            isLoading={isLoading}
          />
          {hasNextPage && (
            <div ref={ref} className="py-4 flex justify-center">
              {isFetchingNextPage ? (
                <div className="flex items-center gap-2">
                  <Loader className="h-4 w-4 animate-spin" />
                  <span>Loading more...</span>
                </div>
              ) : (
                <Button variant="outline" onClick={() => fetchNextPage()}>
                  Load More
                </Button>
              )}
            </div>
          )}
        </TabsContent>

        <TabsContent value="production" className="mt-4">
          <ServerList 
            servers={servers}
            onDelete={confirmDelete}
            onEdit={openEditModal}
            isLoading={isLoading}
          />
          {hasNextPage && (
            <div ref={ref} className="py-4 flex justify-center">
              {isFetchingNextPage ? (
                <div className="flex items-center gap-2">
                  <Loader className="h-4 w-4 animate-spin" />
                  <span>Loading more...</span>
                </div>
              ) : (
                <Button variant="outline" onClick={() => fetchNextPage()}>
                  Load More
                </Button>
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      {showForm && (
        <ServerForm 
          onClose={() => setShowForm(false)} 
          onSubmit={handleCreateServer}
          mode="create"
        />
      )}

      {isEditModalOpen && currentServer && (
        <ServerForm
          onClose={closeEditModal}
          onSubmit={(data) => handleUpdateServer(currentServer.id, data)}
          initialData={{
            ...currentServer,
            buildPlan: currentServer.buildPlan
          }}
          mode="update"
        />
      )}

      <DeleteServerDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        serverName={serverToDelete?.name || ""}
      />
    </div>
  );
};

export default ServerTable;
