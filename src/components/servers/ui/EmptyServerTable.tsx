
import {
  TableCell,
  TableRow,
} from "@/components/ui/table";

interface EmptyServerTableProps {
  colSpan: number;
  message?: string;
}

export const EmptyServerTable = ({ 
  colSpan, 
  message = "No servers found." 
}: EmptyServerTableProps) => {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} className="text-center h-32 text-muted-foreground">
        {message}
      </TableCell>
    </TableRow>
  );
};
