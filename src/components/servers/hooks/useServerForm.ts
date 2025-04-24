import { useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { ServerFormValues, serverStatuses } from "../utils/types";
import { validateField } from "../utils/validation";
import { createServer, updateServer } from "../services/serverApiService";

interface UseServerFormProps {
  initialData?: ServerFormValues;
  onClose: () => void;
  onSubmit: (data: ServerFormValues) => void;
  mode: "create" | "update";
}

export function useServerForm({ 
  initialData, 
  onClose, 
  onSubmit, 
  mode 
}: UseServerFormProps) {
  const { toast } = useToast();
  const [validationMessages, setValidationMessages] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState<"beta" | "production">(initialData?.environment || "beta");
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
      siteDescription: "",
      status: "online"
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

  const handleTabChange = (value: string) => {
    setActiveTab(value as "beta" | "production");
    form.setValue("environment", value as "beta" | "production");
  };
  
  const handleSubmit = async (data: ServerFormValues) => {
    const processedData = {
      ...data,
      buildPlan: Array.isArray(data.buildPlan) 
        ? data.buildPlan 
        : data.buildPlan
          ? data.buildPlan.split(',').map(item => item.trim())
          : []
    };
    
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
      if (mode === "create") {
        await createServer(processedData);
        toast({
          title: "Server Created",
          description: `Server ${data.name} has been created successfully.`,
          variant: "default"
        });
      } else {
        if (initialData && 'id' in initialData) {
          await updateServer((initialData as any).id, processedData);
          toast({
            title: "Server Updated",
            description: `Server ${data.name} has been updated successfully.`,
            variant: "default"
          });
        }
      }
      
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

  const formTitle = mode === "create" ? "Add New Server" : "Update Server";
  const submitButtonText = mode === "create" ? "Create Server" : "Update Server";
  
  return {
    form,
    validationMessages,
    handleFieldChange,
    handleSubmit,
    isSubmitting,
    activeTab,
    handleTabChange,
    formTitle,
    submitButtonText
  };
}
