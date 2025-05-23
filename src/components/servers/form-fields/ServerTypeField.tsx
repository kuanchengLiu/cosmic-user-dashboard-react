
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Control } from "react-hook-form";
import { ServerFormValues } from "../utils/types";
import { serverTypes } from "../utils/types";

interface ServerTypeFieldProps {
  control: Control<ServerFormValues>;
  validationMessage?: string;
  handleFieldChange?: (field: string, value: string) => void;
}

export const ServerTypeField = ({ 
  control, 
  validationMessage,
  handleFieldChange 
}: ServerTypeFieldProps) => {
  return (
    <FormField
      control={control}
      name="type"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Server Type*</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={(value) => {
                field.onChange(value);
                if (handleFieldChange) {
                  handleFieldChange('type', value);
                }
              }}
              defaultValue={field.value}
              className="flex flex-col space-y-1"
            >
              {serverTypes.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <RadioGroupItem value={type} id={type.replace(/\s+/g, '-').toLowerCase()} />
                  <label 
                    htmlFor={type.replace(/\s+/g, '-').toLowerCase()} 
                    className="text-sm font-medium leading-none cursor-pointer"
                  >
                    {type}
                  </label>
                </div>
              ))}
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
