
import { MapPin } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export interface ServerLocationProps {
  locationValue: string;
}

export function ServerLocation({ locationValue }: ServerLocationProps) {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex items-center gap-1 md:gap-2">
      <MapPin className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground flex-shrink-0" />
      <span className={`${isMobile ? "text-xs truncate max-w-[80px]" : "truncate"}`} title={locationValue}>
        {locationValue}
      </span>
    </div>
  );
}
