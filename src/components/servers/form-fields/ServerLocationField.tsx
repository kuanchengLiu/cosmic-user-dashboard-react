
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Control } from "react-hook-form";
import { ServerFormValues, serverLocations } from "../utils/types";

interface ServerLocationFieldProps {
  control: Control<ServerFormValues>;
  validationMessage?: string;
  handleFieldChange?: (field: string, value: string) => void;
}

export const ServerLocationField = ({ 
  control, 
  validationMessage,
  handleFieldChange 
}: ServerLocationFieldProps) => {
  return (
    <FormField
      control={control}
      name="location"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Location*</FormLabel>
          <Select 
            required
            onValueChange={(value) => {
              field.onChange(value);
              if (handleFieldChange) {
                handleFieldChange('location', value);
              }
            }}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {serverLocations.map((location) => (
                <SelectItem key={location.value} value={location.value}>
                  {location.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {validationMessage ? (
            <div className="text-sm font-medium text-destructive">{validationMessage}</div>
          ) : (
            <FormMessage />
          )}
        </FormItem>
      )}
    />
  );
};
