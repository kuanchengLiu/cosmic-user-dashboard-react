
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

interface ServerListProps {
  servers: Server[];
  onDelete: (server: Server) => void;
  onEdit: (server: Server) => void;
}

export function ServerList({ servers, onDelete, onEdit }: ServerListProps) {
  if (servers.length === 0) {
    return <EmptyServerTable />;
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>IP Address</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Environment</TableHead>
            <TableHead>Last Updated</TableHead>
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
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
