
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface ServerSearchProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

export const ServerSearch = ({ searchTerm, setSearchTerm }: ServerSearchProps) => {
  return (
    <div className="relative w-72">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search servers..."
        className="pl-8"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};
