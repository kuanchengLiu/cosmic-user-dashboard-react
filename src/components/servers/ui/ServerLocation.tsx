
import { serverLocations } from "../utils/types";

interface ServerLocationProps {
  locationValue: string;
}

export const ServerLocation = ({ locationValue }: ServerLocationProps) => {
  const location = serverLocations.find(loc => loc.value === locationValue);
  return <span>{location ? location.label : locationValue}</span>;
};
