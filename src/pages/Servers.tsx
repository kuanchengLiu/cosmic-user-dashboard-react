
import DashboardLayout from "@/components/layout/DashboardLayout";
import ServerTable from "@/components/servers/ServerTable";

const Servers = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Servers</h1>
          <p className="text-muted-foreground">Manage your server infrastructure.</p>
        </div>

        <ServerTable />
      </div>
    </DashboardLayout>
  );
};

export default Servers;
