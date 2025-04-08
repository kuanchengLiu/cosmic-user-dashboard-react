
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/30 p-4">
      <Card className="max-w-3xl w-full">
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-center">Admin Portal</CardTitle>
          <CardDescription className="text-center text-lg">
            Comprehensive management solution for your servers and users
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Server Management</h3>
              <p className="text-muted-foreground">Monitor and manage your server infrastructure with ease.</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">User Management</h3>
              <p className="text-muted-foreground">Control user access and roles across your organization.</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Real-time Analytics</h3>
              <p className="text-muted-foreground">View system activity and performance metrics in real-time.</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Security Integration</h3>
              <p className="text-muted-foreground">Enterprise-grade security with SSO integration.</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <div className="flex gap-4">
            <Link to="/login">
              <Button className="flex items-center gap-1">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Index;
