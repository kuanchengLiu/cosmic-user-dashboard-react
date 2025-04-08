
import DashboardLayout from "@/components/layout/DashboardLayout";
import UserTable from "@/components/users/UserTable";

const Users = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Users</h1>
          <p className="text-muted-foreground">Manage user accounts and permissions.</p>
        </div>

        <UserTable />
      </div>
    </DashboardLayout>
  );
};

export default Users;
