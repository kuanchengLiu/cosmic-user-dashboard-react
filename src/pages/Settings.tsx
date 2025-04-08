
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { useToast } from "@/components/ui/toast";

const Settings = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveGeneral = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Success",
        description: "General settings have been saved.",
      });
    }, 1000);
  };

  const handleSaveSecurity = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Success",
        description: "Security settings have been saved.",
      });
    }, 1000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your application settings.</p>
        </div>

        <Tabs defaultValue="general" className="w-full space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Manage your account and application preferences.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="appName">Application Name</Label>
                  <Input id="appName" defaultValue="Admin Portal" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Admin Email</Label>
                  <Input id="email" type="email" defaultValue="admin@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timeZone">Default Timezone</Label>
                  <Input id="timeZone" defaultValue="UTC" />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="notifications" defaultChecked />
                  <Label htmlFor="notifications">Enable Email Notifications</Label>
                </div>
              </CardContent>
              <CardFooter>
                <Button disabled={isLoading} onClick={handleSaveGeneral}>
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your security preferences and authentication settings.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Current Password</Label>
                  <Input id="password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="twoFactor" />
                  <Label htmlFor="twoFactor">Enable Two-Factor Authentication</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="ssoIntegration" defaultChecked />
                  <Label htmlFor="ssoIntegration">Enable SSO Integration</Label>
                </div>
              </CardContent>
              <CardFooter>
                <Button disabled={isLoading} onClick={handleSaveSecurity}>
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
