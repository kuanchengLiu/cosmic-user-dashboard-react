
import { MapPin } from "lucide-react";

export interface ServerLocationProps {
  locationValue: string;
}

export function ServerLocation({ locationValue }: ServerLocationProps) {
  return (
    <div className="flex items-center gap-2">
      <MapPin className="h-4 w-4 text-muted-foreground" />
      <span>{locationValue}</span>
    </div>
  );
}
