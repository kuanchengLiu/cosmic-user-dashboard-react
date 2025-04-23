
import { MapPin } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export interface ServerLocationProps {
  locationValue: string;
}

const LOCATIONS_MAP: { [key: string]: string } = {
  "UNITEDSTATES": "United States",
  "GERMANY": "Germany",
  "JAPAN": "Japan",
  "SINGAPORE": "Singapore", 
  "CZECH REPUBLIC": "Czech Republic",
  // Add more mappings as needed
};

export function ServerLocation({ locationValue }: ServerLocationProps) {
  const isMobile = useIsMobile();
  
  // Format the location value for display
  const displayValue = LOCATIONS_MAP[locationValue] || locationValue;
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-1 md:gap-2">
            <MapPin className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground flex-shrink-0" />
            <span className={`${isMobile ? "text-xs truncate max-w-[80px]" : "truncate max-w-[120px]"}`}>
              {displayValue}
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p>{displayValue}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
