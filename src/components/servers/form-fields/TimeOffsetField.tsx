
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { ServerFormValues } from "../utils/types";
import { getHelpText } from "../utils/validation";

interface TimeOffsetFieldProps {
  control: Control<ServerFormValues>;
  validationMessage?: string;
  handleFieldChange: (field: string, value: string) => void;
}

export const TimeOffsetField = ({ 
  control, 
  validationMessage, 
  handleFieldChange 
}: TimeOffsetFieldProps) => {
  return (
    <FormField
      control={control}
      name="timeOffset"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Time Offset*</FormLabel>
          <FormControl>
            <div className="space-y-1">
              <Input 
                {...field} 
                placeholder="UTC+08" 
                required 
                onBlur={(e) => handleFieldChange("timeOffset", e.target.value)}
                onChange={(e) => {
                  field.onChange(e);
                  handleFieldChange("timeOffset", e.target.value);
                }}
              />
              {validationMessage ? (
                <p className="text-sm text-red-500">{validationMessage}</p>
              ) : (
                <p className="text-xs text-gray-500">{getHelpText("timeOffset")}</p>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
