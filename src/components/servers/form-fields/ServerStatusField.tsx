
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Control } from "react-hook-form";
import { ServerFormValues, serverStatuses } from "../utils/types";

interface ServerStatusFieldProps {
  control: Control<ServerFormValues>;
  validationMessage?: string;
  handleFieldChange: (field: string, value: any) => void;
}

export function ServerStatusField({
  control,
  validationMessage,
  handleFieldChange
}: ServerStatusFieldProps) {
  return (
    <FormField
      control={control}
      name="status"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Server Status</FormLabel>
          <Select
            onValueChange={(value) => {
              field.onChange(value);
              handleFieldChange("status", value);
            }}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {serverStatuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
}
