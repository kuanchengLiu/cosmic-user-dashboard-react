
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { X } from "lucide-react";

interface ServerFormProps {
  onClose: () => void;
  onSubmit: (data: ServerFormValues) => void;
}

export interface ServerFormValues {
  name: string;
  ipAddress: string;
  buildPlan: string[];
  timeOffset: string;
  pmFullname: string;
  l2Fullname: string;
  site: string;
  type: string;
}

const regexPatterns = {
  serverName: /^[a-zA-Z0-9_-]{3,}$/,
  buildPlan: /^([a-zA-Z0-9]+,)*[a-zA-Z0-9]+$/,
  ipAddress: /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)$/,
  timeOffset: /^UTC[+-][0-9]{2}$/,
  pmFullname: /^[a-zA-Z\s]{3,}$/,
  l2Fullname: /^[a-zA-Z\s]{3,}$/,
  site: /^[A-Za-z]+$/,
};

const userLevels = [
  "Admin",
  "Project Manager",
  "L2 Support",
  "DevOps",
  "Developer"
];

const ServerForm = ({ onClose, onSubmit }: ServerFormProps) => {
  const { toast } = useToast();
  const [validationMessages, setValidationMessages] = useState<Record<string, string>>({});
  
  const form = useForm<ServerFormValues>({
    defaultValues: {
      name: "",
      ipAddress: "",
      buildPlan: [],
      timeOffset: "",
      pmFullname: "",
      l2Fullname: "",
      site: "",
      type: "Web Server"
    },
  });
  
  const validateField = (field: string, value: string, pattern: RegExp): boolean => {
    if (!value) return true; // Empty is handled by required validation
    return pattern.test(value);
  };
  
  const getHelpText = (field: string): string => {
    switch (field) {
      case "name":
        return "At least 3 alphanumeric characters, underscores, or hyphens";
      case "ipAddress":
        return "Valid IPv4 address (e.g., 192.168.1.1)";
      case "buildPlan":
        return "Comma-separated alphanumeric values (e.g., plan1,plan2)";
      case "timeOffset":
        return "Format: UTC+/-XX (e.g., UTC+08)";
      case "pmFullname":
      case "l2Fullname":
        return "At least 3 alphabetic characters or spaces";
      case "site":
        return "Alphabetic characters only";
      default:
        return "";
    }
  };
  
  const handleFieldChange = (field: string, value: string) => {
    let pattern: RegExp | null = null;
    let message = "";
    
    switch (field) {
      case "name":
        pattern = regexPatterns.serverName;
        message = "Server name must have at least 3 alphanumeric characters, underscores or hyphens";
        break;
      case "ipAddress":
        pattern = regexPatterns.ipAddress;
        message = "Invalid IP address format";
        break;
      case "buildPlan":
        pattern = regexPatterns.buildPlan;
        message = "Build plan must be comma-separated alphanumeric values";
        break;
      case "timeOffset":
        pattern = regexPatterns.timeOffset;
        message = "Time offset must be in format UTC+/-XX";
        break;
      case "pmFullname":
        pattern = regexPatterns.pmFullname;
        message = "Project Manager name must have at least 3 alphabetic characters";
        break;
      case "l2Fullname":
        pattern = regexPatterns.l2Fullname;
        message = "L2 Support name must have at least 3 alphabetic characters";
        break;
      case "site":
        pattern = regexPatterns.site;
        message = "Site must contain only alphabetic characters";
        break;
    }
    
    if (pattern && value && !pattern.test(value)) {
      setValidationMessages(prev => ({ ...prev, [field]: message }));
    } else {
      setValidationMessages(prev => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };
  
  const handleSubmit = (data: ServerFormValues) => {
    // Process buildPlan from string to array
    const processedData = {
      ...data,
      buildPlan: data.buildPlan instanceof Array ? 
        data.buildPlan : 
        data.buildPlan.split(",").map(item => item.trim())
    };
    
    // Check for validation messages
    if (Object.keys(validationMessages).length > 0) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please fix the form errors before submitting."
      });
      return;
    }
    
    onSubmit(processedData);
    toast({
      title: "Server Created",
      description: `Server ${data.name} has been created successfully.`
    });
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Add New Server</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="p-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <FormField
                control={form.control}
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
                        {validationMessages.name ? (
                          <p className="text-sm text-red-500">{validationMessages.name}</p>
                        ) : (
                          <p className="text-xs text-gray-500">{getHelpText("name")}</p>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
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
                        {validationMessages.ipAddress ? (
                          <p className="text-sm text-red-500">{validationMessages.ipAddress}</p>
                        ) : (
                          <p className="text-xs text-gray-500">{getHelpText("ipAddress")}</p>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="buildPlan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Build Plan*</FormLabel>
                    <FormControl>
                      <div className="space-y-1">
                        <Input 
                          {...field} 
                          value={field.value instanceof Array ? field.value.join(",") : field.value}
                          placeholder="plan1,plan2,plan3" 
                          required 
                          onBlur={(e) => handleFieldChange("buildPlan", e.target.value)}
                          onChange={(e) => {
                            field.onChange(e.target.value);
                            handleFieldChange("buildPlan", e.target.value);
                          }}
                        />
                        {validationMessages.buildPlan ? (
                          <p className="text-sm text-red-500">{validationMessages.buildPlan}</p>
                        ) : (
                          <p className="text-xs text-gray-500">{getHelpText("buildPlan")}</p>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
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
                        {validationMessages.timeOffset ? (
                          <p className="text-sm text-red-500">{validationMessages.timeOffset}</p>
                        ) : (
                          <p className="text-xs text-gray-500">{getHelpText("timeOffset")}</p>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="pmFullname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Manager*</FormLabel>
                      <Select 
                        required
                        onValueChange={(value) => {
                          field.onChange(value);
                          handleFieldChange("pmFullname", value);
                        }}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select PM" />
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
                      {validationMessages.pmFullname && (
                        <p className="text-sm text-red-500">{validationMessages.pmFullname}</p>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="l2Fullname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>L2 Support*</FormLabel>
                      <Select 
                        required
                        onValueChange={(value) => {
                          field.onChange(value);
                          handleFieldChange("l2Fullname", value);
                        }}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select L2 Support" />
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
                      {validationMessages.l2Fullname && (
                        <p className="text-sm text-red-500">{validationMessages.l2Fullname}</p>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
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
                          {validationMessages.site ? (
                            <p className="text-sm text-red-500">{validationMessages.site}</p>
                          ) : (
                            <p className="text-xs text-gray-500">{getHelpText("site")}</p>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Server Type*</FormLabel>
                      <Select 
                        required
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Web Server">Web Server</SelectItem>
                          <SelectItem value="Database Server">Database Server</SelectItem>
                          <SelectItem value="File Server">File Server</SelectItem>
                          <SelectItem value="Backup Server">Backup Server</SelectItem>
                          <SelectItem value="Application Server">Application Server</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="flex justify-end space-x-2 pt-4 border-t">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit">
                  Create Server
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ServerForm;
