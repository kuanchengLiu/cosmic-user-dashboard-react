
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

interface ServerSearchProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

export const ServerSearch = ({ searchTerm, setSearchTerm }: ServerSearchProps) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  
  // Debounce search to avoid excessive API calls
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchTerm(localSearchTerm);
    }, 300);
    
    return () => {
      clearTimeout(handler);
    };
  }, [localSearchTerm, setSearchTerm]);
  
  return (
    <div className="relative w-full md:w-72">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search servers..."
        className="pl-8"
        value={localSearchTerm}
        onChange={(e) => setLocalSearchTerm(e.target.value)}
      />
    </div>
  );
};
