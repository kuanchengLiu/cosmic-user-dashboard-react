
import { TableCell, TableRow } from "@/components/ui/table";
import { ServerStatusBadge } from "./ServerStatusBadge";
import { ServerLocation } from "./ServerLocation";
import { ServerActions } from "./ServerActions";
import { EnvironmentBadge } from "./EnvironmentBadge";
import { Server } from "../types/server.types";

interface ServerTableRowProps {
  server: Server;
  onDelete: (server: Server) => void;
  onEdit: (server: Server) => void;
}

export function ServerTableRow({ server, onDelete, onEdit }: ServerTableRowProps) {
  return (
    <TableRow>
      <TableCell className="font-medium">{server.name}</TableCell>
      <TableCell>{server.ipAddress}</TableCell>
      <TableCell>{server.type}</TableCell>
      <TableCell>
        <ServerStatusBadge status={server.status} />
      </TableCell>
      <TableCell>
        <ServerLocation locationValue={server.location} />
      </TableCell>
      <TableCell>
        <EnvironmentBadge environment={server.environment} />
      </TableCell>
      <TableCell className="text-sm text-muted-foreground">
        {server.lastUpdated}
      </TableCell>
      <TableCell>
        <ServerActions server={server} onDelete={onDelete} onEdit={onEdit} />
      </TableCell>
    </TableRow>
  );
}
