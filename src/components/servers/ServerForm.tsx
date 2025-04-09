
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IsMasterField } from "./form-fields/IsMasterField";
import { SiteMasterField } from "./form-fields/SiteMasterField";
import { createServer, updateServer } from "./services/serverApiService";

const ServerForm = ({ onClose, onSubmit, initialData, mode = "create" }: ServerFormProps) => {
  const { toast } = useToast();
  const [validationMessages, setValidationMessages] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState(initialData?.environment || "beta");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<ServerFormValues>({
    defaultValues: initialData || {
      name: "",
      ipAddress: "",
      buildPlan: [],
      timeOffset: "",
      pmFullname: "",
      l2Fullname: "",
      site: "",
      type: "Web Server",
      location: "",
      environment: "beta",
      siteMaster: "QATESTING2",
      isMaster: false,
      siteDescription: ""
    },
  });
  
  const handleFieldChange = (field: string, value: any) => {
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
  
  const handleSubmit = async (data: ServerFormValues) => {
    // Process buildPlan from string to array if it's a string
    const processedData = {
      ...data,
      buildPlan: Array.isArray(data.buildPlan) 
        ? data.buildPlan 
        : typeof data.buildPlan === 'string'
          ? data.buildPlan.split(',').map(item => item.trim()) 
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
    
    setIsSubmitting(true);
    
    try {
      // Call the API based on mode
      if (mode === "create") {
        await createServer(processedData);
        toast({
          title: "Server Created",
          description: `Server ${data.name} has been created successfully.`,
          variant: "default"
        });
      } else {
        // Assuming the id is passed as part of initialData
        if (initialData && 'id' in initialData) {
          await updateServer((initialData as any).id, processedData);
          toast({
            title: "Server Updated",
            description: `Server ${data.name} has been updated successfully.`,
            variant: "default"
          });
        }
      }
      
      // Call the onSubmit callback with the processed data
      onSubmit(processedData);
      onClose();
    } catch (error) {
      console.error("Operation failed:", error);
      toast({
        variant: "destructive",
        title: `Failed to ${mode === "create" ? "create" : "update"} server`,
        description: `An error occurred: ${error instanceof Error ? error.message : "Unknown error"}`
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    form.setValue("environment", value as "beta" | "production");
  };
  
  const formTitle = mode === "create" ? "Add New Server" : "Update Server";
  const submitButtonText = mode === "create" ? "Create Server" : "Update Server";
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">{formTitle}</h2>
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
                {/* We're removing the ServerEnvironmentField since the tabs now handle the environment selection */}

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
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <SiteMasterField 
                    control={form.control}
                    validationMessage={validationMessages.siteMaster}
                    handleFieldChange={handleFieldChange}
                  />
                  
                  <IsMasterField 
                    control={form.control}
                    handleFieldChange={handleFieldChange}
                  />
                </div>
                
                <div className="flex justify-end space-x-2 pt-4 border-t">
                  <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Processing..." : submitButtonText}
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
