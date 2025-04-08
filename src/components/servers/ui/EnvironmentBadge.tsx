
import { Badge } from "@/components/ui/badge";
import { Server } from "../types/server.types";

interface EnvironmentBadgeProps {
  environment: Server["environment"];
}

export const EnvironmentBadge = ({ environment }: EnvironmentBadgeProps) => {
  switch (environment) {
    case "beta":
      return <Badge variant="outline" className="text-blue-600 border-blue-600">Beta</Badge>;
    case "production":
      return <Badge className="bg-purple-500">Production</Badge>;
    default:
      return null;
  }
};
