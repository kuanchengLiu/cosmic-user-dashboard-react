
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ServerForm from "./ServerForm";
import { useServers } from "./hooks/useServers";
import { ServerSearch } from "./ui/ServerSearch";
import { ServerList } from "./ui/ServerList";
import { filterServers } from "./utils/filterServers";
import { DeleteServerDialog } from "./ui/DeleteServerDialog";
import { Server } from "./types/server.types";

const ServerTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "beta" | "production">("all");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [serverToDelete, setServerToDelete] = useState<Server | null>(null);
  
  const { 
    servers, 
    handleDelete, 
    handleCreateServer,
    handleUpdateServer,
    isEditModalOpen,
    currentServer,
    openEditModal,
    closeEditModal
  } = useServers();
  
  const filteredServers = filterServers(servers, activeTab, searchTerm);

  const confirmDelete = (server: Server) => {
    setServerToDelete(server);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (serverToDelete) {
      await handleDelete(serverToDelete.id);
    }
  };

  return (
    <div className="space-y-4">
      <Tabs 
        defaultValue="all" 
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as "all" | "beta" | "production")}
        className="w-full"
      >
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="all">All Servers</TabsTrigger>
            <TabsTrigger value="beta">Beta Servers</TabsTrigger>
            <TabsTrigger value="production">Production Servers</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-4">
            <ServerSearch 
              searchTerm={searchTerm} 
              setSearchTerm={setSearchTerm} 
            />
            <Button 
              className="flex items-center gap-1"
              onClick={() => setShowForm(true)}
            >
              <Plus className="h-4 w-4" />
              Add Server
            </Button>
          </div>
        </div>

        <TabsContent value="all" className="mt-4">
          <ServerList 
            servers={filteredServers} 
            onDelete={confirmDelete}
            onEdit={openEditModal}
          />
        </TabsContent>

        <TabsContent value="beta" className="mt-4">
          <ServerList 
            servers={filteredServers} 
            onDelete={confirmDelete}
            onEdit={openEditModal}
          />
        </TabsContent>

        <TabsContent value="production" className="mt-4">
          <ServerList 
            servers={filteredServers} 
            onDelete={confirmDelete}
            onEdit={openEditModal}
          />
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
