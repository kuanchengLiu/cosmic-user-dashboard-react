
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { ServerFormValues } from "../utils/types";
import { getHelpText } from "../utils/validation";

interface SiteFieldProps {
  control: Control<ServerFormValues>;
  validationMessage?: string;
  handleFieldChange: (field: string, value: string) => void;
}

export const SiteField = ({ 
  control, 
  validationMessage, 
  handleFieldChange 
}: SiteFieldProps) => {
  return (
    <FormField
      control={control}
      name="site"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Site*</FormLabel>
          <FormControl>
            <div className="space-y-1">
              <Input 
                {...field} 
                placeholder="SiteLocation" 
                required 
                onBlur={(e) => handleFieldChange("site", e.target.value)}
                onChange={(e) => {
                  field.onChange(e);
                  handleFieldChange("site", e.target.value);
                }}
              />
              {validationMessage ? (
                <p className="text-sm text-red-500">{validationMessage}</p>
              ) : (
                <p className="text-xs text-gray-500">{getHelpText("site")}</p>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
