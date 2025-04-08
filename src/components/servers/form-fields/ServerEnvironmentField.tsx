
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Control } from "react-hook-form";
import { ServerFormValues } from "../utils/types";

interface ServerEnvironmentFieldProps {
  control: Control<ServerFormValues>;
  validationMessage?: string;
  handleFieldChange?: (field: string, value: string) => void;
}

export const ServerEnvironmentField = ({ 
  control, 
  validationMessage,
  handleFieldChange 
}: ServerEnvironmentFieldProps) => {
  return (
    <FormField
      control={control}
      name="environment"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Environment*</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={(value) => {
                field.onChange(value);
                if (handleFieldChange) {
                  handleFieldChange('environment', value);
                }
              }}
              defaultValue={field.value}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="beta" id="beta" />
                <label htmlFor="beta" className="text-sm font-medium leading-none cursor-pointer">
                  Beta
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="production" id="production" />
                <label htmlFor="production" className="text-sm font-medium leading-none cursor-pointer">
                  Production
                </label>
              </div>
            </RadioGroup>
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
