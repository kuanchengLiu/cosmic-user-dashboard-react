
import { Badge } from "@/components/ui/badge";
import { Server } from "../types/server.types";

interface ServerStatusBadgeProps {
  status: Server["status"];
}

export const ServerStatusBadge = ({ status }: ServerStatusBadgeProps) => {
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
