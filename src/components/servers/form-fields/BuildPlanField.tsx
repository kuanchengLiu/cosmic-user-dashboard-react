
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { ServerFormValues } from "../utils/types";
import { getHelpText } from "../utils/validation";

interface BuildPlanFieldProps {
  control: Control<ServerFormValues>;
  validationMessage?: string;
  handleFieldChange: (field: string, value: string) => void;
}

export const BuildPlanField = ({ 
  control, 
  validationMessage, 
  handleFieldChange 
}: BuildPlanFieldProps) => {
  return (
    <FormField
      control={control}
      name="buildPlan"
      render={({ field }) => {
        // Convert the value to string for display
        const displayValue = Array.isArray(field.value) 
          ? field.value.join(",") 
          : typeof field.value === 'string' 
            ? field.value 
            : "";
            
        return (
          <FormItem>
            <FormLabel>Build Plan*</FormLabel>
            <FormControl>
              <div className="space-y-1">
                <Input 
                  value={displayValue}
                  placeholder="plan1,plan2,plan3" 
                  required 
                  onBlur={(e) => handleFieldChange("buildPlan", e.target.value)}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    handleFieldChange("buildPlan", e.target.value);
                  }}
                />
                {validationMessage ? (
                  <p className="text-sm text-red-500">{validationMessage}</p>
                ) : (
                  <p className="text-xs text-gray-500">{getHelpText("buildPlan")}</p>
                )}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
