import { Form } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ServerFormProps } from "./utils/types";
import { ServerNameField } from "./form-fields/ServerNameField";
import { IpAddressField } from "./form-fields/IpAddressField";
import { BuildPlanField } from "./form-fields/BuildPlanField";
import { TimeOffsetField } from "./form-fields/TimeOffsetField";
import { SelectUserField } from "./form-fields/SelectUserField";
import { SiteField } from "./form-fields/SiteField";
import { ServerTypeField } from "./form-fields/ServerTypeField";
import { ServerLocationField } from "./form-fields/ServerLocationField";
import { IsMasterField } from "./form-fields/IsMasterField";
import { SiteMasterField } from "./form-fields/SiteMasterField";
import { ServerFormModal } from "./ui/ServerFormModal";
import { ServerFormActions } from "./ui/ServerFormActions";
import { useServerForm } from "./hooks/useServerForm";
import { ServerStatusField } from "./form-fields/ServerStatusField";

const ServerForm = ({ onClose, onSubmit, initialData, mode = "create" }: ServerFormProps) => {
  const {
    form,
    validationMessages,
    handleFieldChange,
    handleSubmit,
    isSubmitting,
    activeTab,
    handleTabChange,
    formTitle,
    submitButtonText
  } = useServerForm({ initialData, onClose, onSubmit, mode });
  
  return (
    <ServerFormModal title={formTitle} onClose={onClose}>
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="beta">Beta Server</TabsTrigger>
          <TabsTrigger value="production">Production Server</TabsTrigger>
        </TabsList>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
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
            
            <ServerStatusField 
              control={form.control}
              validationMessage={validationMessages.status}
              handleFieldChange={handleFieldChange}
            />
            
            <ServerFormActions 
              onClose={onClose} 
              isSubmitting={isSubmitting} 
              submitButtonText={submitButtonText} 
            />
          </form>
        </Form>
      </Tabs>
    </ServerFormModal>
  );
};

export default ServerForm;
