
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ServerForm from "./ServerForm";
import { useServers } from "./hooks/useServers";
import { ServerSearch } from "./ui/ServerSearch";
import { ServerList } from "./ui/ServerList";
import { filterServers } from "./utils/filterServers";

const ServerTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "beta" | "production">("all");
  
  const { servers, handleDelete, handleCreateServer } = useServers();
  
  const filteredServers = filterServers(servers, activeTab, searchTerm);

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
          <ServerList servers={filteredServers} onDelete={handleDelete} />
        </TabsContent>

        <TabsContent value="beta" className="mt-4">
          <ServerList 
            servers={filteredServers} 
            onDelete={handleDelete} 
          />
        </TabsContent>

        <TabsContent value="production" className="mt-4">
          <ServerList 
            servers={filteredServers} 
            onDelete={handleDelete} 
          />
        </TabsContent>
      </Tabs>
      
      {showForm && (
        <ServerForm 
          onClose={() => setShowForm(false)} 
          onSubmit={handleCreateServer}
        />
      )}
    </div>
  );
};

export default ServerTable;
