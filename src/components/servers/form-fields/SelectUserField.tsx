
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Control } from "react-hook-form";
import { ServerFormValues } from "../utils/types";
import { userLevels } from "../utils/types";

interface SelectUserFieldProps {
  control: Control<ServerFormValues>;
  name: "pmFullname" | "l2Fullname";
  label: string;
  placeholder: string;
  validationMessage?: string;
  handleFieldChange: (field: string, value: string) => void;
}

export const SelectUserField = ({ 
  control, 
  name,
  label,
  placeholder,
  validationMessage, 
  handleFieldChange 
}: SelectUserFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}*</FormLabel>
          <Select 
            required
            onValueChange={(value) => {
              field.onChange(value);
              handleFieldChange(name, value);
            }}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {userLevels.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {validationMessage && (
            <p className="text-sm text-red-500">{validationMessage}</p>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
