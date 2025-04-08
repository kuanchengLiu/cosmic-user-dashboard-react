
import {
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const ServerTableHeader = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>Name</TableHead>
        <TableHead>IP Address</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Type</TableHead>
        <TableHead>Build Plan</TableHead>
        <TableHead>Time Offset</TableHead>
        <TableHead>Project Manager</TableHead>
        <TableHead>L2 Support</TableHead>
        <TableHead>Site</TableHead>
        <TableHead>Location</TableHead>
        <TableHead>Environment</TableHead>
        <TableHead>Last Updated</TableHead>
        <TableHead className="w-[50px]"></TableHead>
      </TableRow>
    </TableHeader>
  );
};
