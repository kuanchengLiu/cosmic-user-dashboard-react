
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
  isMobile?: boolean;
}

export function ServerTableRow({ server, onDelete, onEdit, isMobile = false }: ServerTableRowProps) {
  return (
    <TableRow>
      <TableCell className="font-medium">
        <div>
          {server.name}
          {isMobile && (
            <div className="text-xs text-muted-foreground mt-1">
              {server.ipAddress}
            </div>
          )}
        </div>
      </TableCell>
      {!isMobile && <TableCell>{server.ipAddress}</TableCell>}
      <TableCell>{server.type}</TableCell>
      <TableCell>
        <ServerStatusBadge status={server.status} />
        {isMobile && (
          <div className="mt-1">
            <EnvironmentBadge environment={server.environment} />
          </div>
        )}
      </TableCell>
      {!isMobile && (
        <TableCell>
          <ServerLocation locationValue={server.location} />
        </TableCell>
      )}
      {!isMobile && (
        <TableCell>
          <EnvironmentBadge environment={server.environment} />
        </TableCell>
      )}
      {!isMobile && (
        <TableCell className="text-sm text-muted-foreground">
          {server.lastUpdated}
        </TableCell>
      )}
      <TableCell>
        <ServerActions server={server} onDelete={onDelete} onEdit={onEdit} />
      </TableCell>
    </TableRow>
  );
}
