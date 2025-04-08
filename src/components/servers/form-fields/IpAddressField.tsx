
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { ServerFormValues } from "../utils/types";
import { getHelpText } from "../utils/validation";

interface IpAddressFieldProps {
  control: Control<ServerFormValues>;
  validationMessage?: string;
  handleFieldChange: (field: string, value: string) => void;
}

export const IpAddressField = ({ 
  control, 
  validationMessage, 
  handleFieldChange 
}: IpAddressFieldProps) => {
  return (
    <FormField
      control={control}
      name="ipAddress"
      render={({ field }) => (
        <FormItem>
          <FormLabel>IP Address*</FormLabel>
          <FormControl>
            <div className="space-y-1">
              <Input 
                {...field} 
                placeholder="192.168.1.1" 
                required 
                onBlur={(e) => handleFieldChange("ipAddress", e.target.value)}
                onChange={(e) => {
                  field.onChange(e);
                  handleFieldChange("ipAddress", e.target.value);
                }}
              />
              {validationMessage ? (
                <p className="text-sm text-red-500">{validationMessage}</p>
              ) : (
                <p className="text-xs text-gray-500">{getHelpText("ipAddress")}</p>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
