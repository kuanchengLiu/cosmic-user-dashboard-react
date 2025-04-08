
import {
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { Server } from "../types/server.types";
import { ServerStatusBadge } from "./ServerStatusBadge";
import { EnvironmentBadge } from "./EnvironmentBadge";
import { ServerLocation } from "./ServerLocation";
import { ServerActions } from "./ServerActions";

interface ServerTableRowProps {
  server: Server;
  onDelete: (id: number) => void;
}

export const ServerTableRow = ({ server, onDelete }: ServerTableRowProps) => {
  return (
    <TableRow key={server.id}>
      <TableCell className="font-medium">{server.name}</TableCell>
      <TableCell>{server.ipAddress}</TableCell>
      <TableCell><ServerStatusBadge status={server.status} /></TableCell>
      <TableCell>{server.type}</TableCell>
      <TableCell>{server.buildPlan.join(", ")}</TableCell>
      <TableCell>{server.timeOffset}</TableCell>
      <TableCell>{server.pmFullname}</TableCell>
      <TableCell>{server.l2Fullname}</TableCell>
      <TableCell>{server.site}</TableCell>
      <TableCell><ServerLocation locationValue={server.location} /></TableCell>
      <TableCell><EnvironmentBadge environment={server.environment} /></TableCell>
      <TableCell>{server.lastUpdated}</TableCell>
      <TableCell>
        <ServerActions serverId={server.id} onDelete={onDelete} />
      </TableCell>
    </TableRow>
  );
};
