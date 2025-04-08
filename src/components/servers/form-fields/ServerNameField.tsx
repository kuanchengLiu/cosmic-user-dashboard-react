
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { ServerFormValues } from "../utils/types";
import { getHelpText } from "../utils/validation";

interface ServerNameFieldProps {
  control: Control<ServerFormValues>;
  validationMessage?: string;
  handleFieldChange: (field: string, value: string) => void;
}

export const ServerNameField = ({ 
  control, 
  validationMessage, 
  handleFieldChange 
}: ServerNameFieldProps) => {
  return (
    <FormField
      control={control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Server Name*</FormLabel>
          <FormControl>
            <div className="space-y-1">
              <Input 
                {...field} 
                placeholder="Enter server name" 
                required 
                onBlur={(e) => handleFieldChange("name", e.target.value)}
                onChange={(e) => {
                  field.onChange(e);
                  handleFieldChange("name", e.target.value);
                }}
              />
              {validationMessage ? (
                <p className="text-sm text-red-500">{validationMessage}</p>
              ) : (
                <p className="text-xs text-gray-500">{getHelpText("name")}</p>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
