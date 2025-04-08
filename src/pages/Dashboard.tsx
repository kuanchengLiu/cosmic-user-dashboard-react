
import DashboardLayout from "@/components/layout/DashboardLayout";
import { 
  Server, 
  Users, 
  Activity, 
  Clock 
} from "lucide-react";
import StatsCard from "@/components/dashboard/StatsCard";
import ActivityChart from "@/components/dashboard/ActivityChart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

const Dashboard = () => {
  const isMobile = useIsMobile();

  // Sample data for the chart
  const activityData = [
    { name: "Day 1", value: 45 },
    { name: "Day 2", value: 52 },
    { name: "Day 3", value: 48 },
    { name: "Day 4", value: 61 },
    { name: "Day 5", value: 55 },
    { name: "Day 6", value: 67 },
    { name: "Day 7", value: 62 },
  ];

  // Sample data for recent activities
  const recentActivities = [
    { id: 1, action: "User added", user: "John Doe", time: "10 minutes ago" },
    { id: 2, action: "Server restarted", user: "System", time: "1 hour ago" },
    { id: 3, action: "Database backup", user: "System", time: "3 hours ago" },
    { id: 4, action: "User updated", user: "Jane Smith", time: "5 hours ago" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back to your admin portal.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Servers"
            value="12"
            icon={<Server className="h-5 w-5" />}
            trend={{ value: 8, positive: true }}
            description="from last month"
          />
          <StatsCard
            title="Total Users"
            value="248"
            icon={<Users className="h-5 w-5" />}
            trend={{ value: 12, positive: true }}
            description="from last month"
          />
          <StatsCard
            title="Active Sessions"
            value="32"
            icon={<Activity className="h-5 w-5" />}
            description="currently active"
          />
          <StatsCard
            title="Uptime"
            value="99.9%"
            icon={<Clock className="h-5 w-5" />}
            description="last 30 days"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <ActivityChart title="System Activity" data={activityData} />
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest actions on the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex justify-between border-b pb-3 last:border-0">
                    <div>
                      <div className="font-medium">{activity.action}</div>
                      <div className="text-sm text-muted-foreground">by {activity.user}</div>
                    </div>
                    <div className="text-sm text-muted-foreground">{activity.time}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
