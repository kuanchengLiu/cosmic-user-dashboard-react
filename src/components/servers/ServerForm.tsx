import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { X } from "lucide-react";
import { ServerFormProps, ServerFormValues } from "./utils/types";
import { validateField } from "./utils/validation";
import { ServerNameField } from "./form-fields/ServerNameField";
import { IpAddressField } from "./form-fields/IpAddressField";
import { BuildPlanField } from "./form-fields/BuildPlanField";
import { TimeOffsetField } from "./form-fields/TimeOffsetField";
import { SelectUserField } from "./form-fields/SelectUserField";
import { SiteField } from "./form-fields/SiteField";
import { ServerTypeField } from "./form-fields/ServerTypeField";
import { ServerLocationField } from "./form-fields/ServerLocationField";
import { ServerEnvironmentField } from "./form-fields/ServerEnvironmentField";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ServerForm = ({ onClose, onSubmit }: ServerFormProps) => {
  const { toast } = useToast();
  const [validationMessages, setValidationMessages] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState("beta");
  
  const form = useForm<ServerFormValues>({
    defaultValues: {
      name: "",
      ipAddress: "",
      buildPlan: [],
      timeOffset: "",
      pmFullname: "",
      l2Fullname: "",
      site: "",
      type: "Web Server",
      location: "",
      environment: "beta"
    },
  });
  
  const handleFieldChange = (field: string, value: string) => {
    const validation = validateField(field, value);
    
    if (!validation.isValid) {
      setValidationMessages(prev => ({ ...prev, [field]: validation.message }));
    } else {
      setValidationMessages(prev => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };
  
  const handleSubmit = (data: ServerFormValues) => {
    // Process buildPlan from string to array if it's a string
    const processedData = {
      ...data,
      buildPlan: Array.isArray(data.buildPlan) 
        ? data.buildPlan 
        : typeof data.buildPlan === 'string'
          ? data.buildPlan.split(",").map(item => item.trim()) 
          : []
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
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    form.setValue("environment", value as "beta" | "production");
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
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="beta">Beta Server</TabsTrigger>
              <TabsTrigger value="production">Production Server</TabsTrigger>
            </TabsList>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <ServerEnvironmentField 
                  control={form.control}
                  validationMessage={validationMessages.environment}
                  handleFieldChange={handleFieldChange}
                />

                <ServerNameField 
                  control={form.control} 
                  validationMessage={validationMessages.name}
                  handleFieldChange={handleFieldChange}
                />
                
                <IpAddressField 
                  control={form.control} 
                  validationMessage={validationMessages.ipAddress}
                  handleFieldChange={handleFieldChange}
                />
                
                <BuildPlanField 
                  control={form.control} 
                  validationMessage={validationMessages.buildPlan}
                  handleFieldChange={handleFieldChange}
                />
                
                <TimeOffsetField 
                  control={form.control} 
                  validationMessage={validationMessages.timeOffset}
                  handleFieldChange={handleFieldChange}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <SelectUserField 
                    control={form.control} 
                    name="pmFullname"
                    label="Project Manager"
                    placeholder="Select PM"
                    validationMessage={validationMessages.pmFullname}
                    handleFieldChange={handleFieldChange}
                  />
                  
                  <SelectUserField 
                    control={form.control} 
                    name="l2Fullname"
                    label="L2 Support"
                    placeholder="Select L2 Support"
                    validationMessage={validationMessages.l2Fullname}
                    handleFieldChange={handleFieldChange}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <SiteField 
                    control={form.control} 
                    validationMessage={validationMessages.site}
                    handleFieldChange={handleFieldChange}
                  />
                  
                  <ServerLocationField 
                    control={form.control}
                    validationMessage={validationMessages.location}
                    handleFieldChange={handleFieldChange}
                  />
                </div>
                
                <ServerTypeField 
                  control={form.control}
                  validationMessage={validationMessages.type}
                  handleFieldChange={handleFieldChange}
                />
                
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
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ServerForm;
