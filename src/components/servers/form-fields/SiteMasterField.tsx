
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { ServerFormValues } from "../utils/types";

interface SiteMasterFieldProps {
  control: Control<ServerFormValues>;
  validationMessage?: string;
  handleFieldChange?: (field: string, value: string) => void;
}

export const SiteMasterField = ({ 
  control, 
  validationMessage,
  handleFieldChange 
}: SiteMasterFieldProps) => {
  return (
    <FormField
      control={control}
      name="siteMaster"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Site Master</FormLabel>
          <FormControl>
            <Input 
              placeholder="Enter site master name"
              {...field}
              onChange={(e) => {
                field.onChange(e);
                if (handleFieldChange) {
                  handleFieldChange('siteMaster', e.target.value);
                }
              }}
            />
          </FormControl>
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
