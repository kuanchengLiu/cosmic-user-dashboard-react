
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Control } from "react-hook-form";
import { ServerFormValues } from "../utils/types";

interface IsMasterFieldProps {
  control: Control<ServerFormValues>;
  handleFieldChange?: (field: string, value: any) => void;
}

export const IsMasterField = ({ control, handleFieldChange }: IsMasterFieldProps) => {
  return (
    <FormField
      control={control}
      name="isMaster"
      render={({ field }) => (
        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <div className="space-y-0.5">
            <FormLabel>Is Master Server</FormLabel>
            <FormDescription>
              Designate this server as a master server
            </FormDescription>
          </div>
          <FormControl>
            <Switch
              checked={field.value}
              onCheckedChange={(checked) => {
                field.onChange(checked);
                if (handleFieldChange) {
                  handleFieldChange('isMaster', checked);
                }
              }}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};
