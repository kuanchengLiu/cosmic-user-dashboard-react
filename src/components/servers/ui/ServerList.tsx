
import {
  Table,
  TableBody,
} from "@/components/ui/table";
import { Server } from "../types/server.types";
import { ServerTableHeader } from "./ServerTableHeader";
import { ServerTableRow } from "./ServerTableRow";
import { EmptyServerTable } from "./EmptyServerTable";

interface ServerListProps {
  servers: Server[];
  onDelete: (id: number) => void;
}

export const ServerList = ({ servers, onDelete }: ServerListProps) => {
  return (
    <div className="rounded-md border overflow-x-auto">
      <Table>
        <ServerTableHeader />
        <TableBody>
          {servers.length === 0 ? (
            <EmptyServerTable colSpan={13} />
          ) : (
            servers.map((server) => (
              <ServerTableRow 
                key={server.id} 
                server={server} 
                onDelete={onDelete} 
              />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
