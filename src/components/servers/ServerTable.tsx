
import { useState } from "react";
import { 
  Table, 
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, MoreVertical, Plus, Search, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ServerForm, { ServerFormValues } from "./ServerForm";

interface Server {
  id: number;
  name: string;
  ipAddress: string;
  status: "online" | "offline" | "maintenance";
  type: string;
  lastUpdated: string;
  buildPlan: string[];
  timeOffset: string;
  pmFullname: string;
  l2Fullname: string;
  site: string;
}

const ServerTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  
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
    },
  ]);

  const getStatusBadge = (status: Server["status"]) => {
    switch (status) {
      case "online":
        return <Badge className="bg-green-500">Online</Badge>;
      case "offline":
        return <Badge variant="destructive">Offline</Badge>;
      case "maintenance":
        return <Badge variant="outline" className="text-yellow-600 border-yellow-600">Maintenance</Badge>;
      default:
        return null;
    }
  };

  const filteredServers = servers.filter(
    (server) =>
      server.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      server.ipAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      server.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      server.site.toLowerCase().includes(searchTerm.toLowerCase()) ||
      server.pmFullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      server.l2Fullname.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    };
    
    setServers([...servers, newServer]);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <div className="relative w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search servers..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button 
          className="flex items-center gap-1"
          onClick={() => setShowForm(true)}
        >
          <Plus className="h-4 w-4" />
          Add Server
        </Button>
      </div>

      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>IP Address</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Build Plan</TableHead>
              <TableHead>Time Offset</TableHead>
              <TableHead>Project Manager</TableHead>
              <TableHead>L2 Support</TableHead>
              <TableHead>Site</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredServers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={11} className="text-center h-32 text-muted-foreground">
                  No servers found.
                </TableCell>
              </TableRow>
            ) : (
              filteredServers.map((server) => (
                <TableRow key={server.id}>
                  <TableCell className="font-medium">{server.name}</TableCell>
                  <TableCell>{server.ipAddress}</TableCell>
                  <TableCell>{getStatusBadge(server.status)}</TableCell>
                  <TableCell>{server.type}</TableCell>
                  <TableCell>{server.buildPlan.join(", ")}</TableCell>
                  <TableCell>{server.timeOffset}</TableCell>
                  <TableCell>{server.pmFullname}</TableCell>
                  <TableCell>{server.l2Fullname}</TableCell>
                  <TableCell>{server.site}</TableCell>
                  <TableCell>{server.lastUpdated}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer">
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="cursor-pointer text-destructive focus:text-destructive"
                          onClick={() => handleDelete(server.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
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
