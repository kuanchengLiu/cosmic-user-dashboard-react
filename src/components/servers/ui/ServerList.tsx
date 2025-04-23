
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ServerTableRow } from "./ServerTableRow";
import { EmptyServerTable } from "./EmptyServerTable";
import { Server } from "../types/server.types";
import { useIsMobile } from "@/hooks/use-mobile";
import { Loader } from "lucide-react";

interface ServerListProps {
  servers: Server[];
  onDelete: (server: Server) => void;
  onEdit: (server: Server) => void;
  isLoading?: boolean;
}

export function ServerList({ servers, onDelete, onEdit, isLoading = false }: ServerListProps) {
  const isMobile = useIsMobile();
  
  if (isLoading && servers.length === 0) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader className="h-6 w-6 animate-spin mr-2" />
        <p>Loading servers...</p>
      </div>
    );
  }
  
  if (servers.length === 0) {
    return <EmptyServerTable colSpan={isMobile ? 4 : 8} />;
  }

  return (
    <div className="rounded-md border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-medium">Name</TableHead>
            {!isMobile && <TableHead className="font-medium">IP Address</TableHead>}
            <TableHead className="font-medium">Type</TableHead>
            <TableHead className="font-medium">Status</TableHead>
            {!isMobile && <TableHead className="font-medium">Location</TableHead>}
            {!isMobile && <TableHead className="font-medium">Environment</TableHead>}
            {!isMobile && <TableHead className="font-medium">Last Updated</TableHead>}
            <TableHead className="w-[80px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {servers.map((server) => (
            <ServerTableRow
              key={server.id}
              server={server}
              onDelete={onDelete}
              onEdit={onEdit}
              isMobile={isMobile}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
