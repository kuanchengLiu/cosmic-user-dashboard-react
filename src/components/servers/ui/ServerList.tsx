
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

interface ServerListProps {
  servers: Server[];
  onDelete: (server: Server) => void;
  onEdit: (server: Server) => void;
}

export function ServerList({ servers, onDelete, onEdit }: ServerListProps) {
  const isMobile = useIsMobile();
  
  if (servers.length === 0) {
    return <EmptyServerTable colSpan={isMobile ? 4 : 8} />;
  }

  return (
    <div className="rounded-md border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            {!isMobile && <TableHead>IP Address</TableHead>}
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            {!isMobile && <TableHead>Location</TableHead>}
            {!isMobile && <TableHead>Environment</TableHead>}
            {!isMobile && <TableHead>Last Updated</TableHead>}
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
