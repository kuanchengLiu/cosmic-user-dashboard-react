
import { useState } from "react";
import { 
  Table, 
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; 
import { Edit, MoreVertical, Plus, Search, Trash2, UserPlus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { User, UserFormValues } from "../servers/types/server.types";

const roles = ["Admin", "L2", "L1", "Guest"];

interface UserDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: UserFormValues) => void;
  initialData?: User;
  mode: "create" | "update";
}

const UserDialog = ({ isOpen, onClose, onSubmit, initialData, mode }: UserDialogProps) => {
  const [formData, setFormData] = useState<UserFormValues>(initialData ? {
    name: initialData.name,
    email: initialData.email,
    role: initialData.role,
    mgrEmail: initialData.mgrEmail || "",
    status: initialData.status,
  } : {
    name: "",
    email: "",
    role: "L2",
    mgrEmail: "",
    status: "active"
  });

  const handleChange = (field: keyof UserFormValues, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const title = mode === "create" ? "Create New User" : "Update User";
  const buttonText = mode === "create" ? "Create User" : "Update User";

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Fill in the information below to {mode === "create" ? "create a new" : "update the"} user.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Role
              </Label>
              <Select 
                onValueChange={(value) => handleChange("role", value)} 
                defaultValue={formData.role}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map(role => (
                    <SelectItem key={role} value={role}>{role}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="mgrEmail" className="text-right">
                Manager Email
              </Label>
              <Input
                id="mgrEmail"
                type="email"
                value={formData.mgrEmail}
                onChange={(e) => handleChange("mgrEmail", e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">{buttonText}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const UserTable = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState("");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  
  // Sample data - in a real app, this would come from an API
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      role: "Admin",
      status: "active",
      lastActive: "2025-04-08 10:23:15",
      mgrEmail: "manager@example.com",
      createdBy: "System",
      createdDate: "2025-04-01 09:30:00"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "L2",
      status: "active",
      lastActive: "2025-04-08 09:45:22",
      mgrEmail: "manager@example.com",
      createdBy: "System",
      createdDate: "2025-04-02 11:15:30"
    },
    {
      id: 3,
      name: "Robert Johnson",
      email: "robert.johnson@example.com",
      role: "L1",
      status: "inactive",
      lastActive: "2025-04-06 16:30:45",
      mgrEmail: "manager@example.com",
      createdBy: "Admin",
      createdDate: "2025-04-03 14:45:00"
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.davis@example.com",
      role: "Guest",
      status: "active",
      lastActive: "2025-04-07 14:15:10",
      mgrEmail: "manager@example.com",
      createdBy: "Admin",
      createdDate: "2025-04-04 08:20:15"
    },
  ]);

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "Admin":
        return <Badge className="bg-purple-500">Admin</Badge>;
      case "L2":
        return <Badge variant="outline" className="text-blue-600 border-blue-600">L2</Badge>;
      case "L1":
        return <Badge variant="outline" className="text-green-600 border-green-600">L1</Badge>;
      case "Guest":
        return <Badge variant="secondary">Guest</Badge>;
      default:
        return <Badge variant="outline">{role}</Badge>;
    }
  };

  const getStatusBadge = (status: User["status"]) => {
    switch (status) {
      case "active":
        return <span className="flex items-center gap-1 text-green-600"><span className="h-2 w-2 rounded-full bg-green-600"></span>Active</span>;
      case "inactive":
        return <span className="flex items-center gap-1 text-gray-400"><span className="h-2 w-2 rounded-full bg-gray-400"></span>Inactive</span>;
      default:
        return null;
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteUser = (id: number) => {
    // In a real app, this would call an API
    setUsers(users.filter((user) => user.id !== id));
    toast({
      title: "User Deleted",
      description: "The user has been deleted successfully.",
    });
    setDeleteDialogOpen(false);
    setSelectedUser(null);
  };

  const handleCreateUser = (data: UserFormValues) => {
    // In a real app, this would call an API
    const newUser: User = {
      id: Math.max(...users.map(u => u.id)) + 1,
      name: data.name,
      email: data.email,
      role: data.role,
      status: data.status || "active",
      lastActive: new Date().toISOString().replace('T', ' ').substring(0, 19),
      mgrEmail: data.mgrEmail,
      createdBy: "Current User",
      createdDate: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };
    
    setUsers([...users, newUser]);
    setCreateDialogOpen(false);
    toast({
      title: "User Created",
      description: `User ${data.name} has been created successfully.`,
    });
  };

  const handleUpdateUser = (data: UserFormValues) => {
    // In a real app, this would call an API
    if (!selectedUser) return;
    
    setUsers(users.map(user => 
      user.id === selectedUser.id
        ? {
            ...user,
            name: data.name,
            email: data.email,
            role: data.role,
            status: data.status || user.status,
            mgrEmail: data.mgrEmail
          }
        : user
    ));
    
    setUpdateDialogOpen(false);
    setSelectedUser(null);
    toast({
      title: "User Updated",
      description: `User ${data.name} has been updated successfully.`,
    });
  };

  const openDeleteDialog = (user: User) => {
    setSelectedUser(user);
    setDeleteDialogOpen(true);
  };

  const openUpdateDialog = (user: User) => {
    setSelectedUser(user);
    setUpdateDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button 
          className="flex items-center gap-1 whitespace-nowrap"
          onClick={() => setCreateDialogOpen(true)}
        >
          <UserPlus className="h-4 w-4" />
          Add User
        </Button>
      </div>

      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              {!isMobile && <TableHead>Role</TableHead>}
              {!isMobile && <TableHead>Status</TableHead>}
              {!isMobile && <TableHead>Last Active</TableHead>}
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={isMobile ? 2 : 5} className="text-center h-32 text-muted-foreground">
                  No users found.
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="hidden sm:flex">
                        <AvatarImage src={user.avatarUrl} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}{user.name.split(' ')[1]?.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                        {isMobile && <div className="mt-1">{getRoleBadge(user.role)}</div>}
                      </div>
                    </div>
                  </TableCell>
                  {!isMobile && <TableCell>{getRoleBadge(user.role)}</TableCell>}
                  {!isMobile && <TableCell>{getStatusBadge(user.status)}</TableCell>}
                  {!isMobile && <TableCell>{user.lastActive}</TableCell>}
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="cursor-pointer"
                          onClick={() => openUpdateDialog(user)}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="cursor-pointer text-destructive focus:text-destructive"
                          onClick={() => openDeleteDialog(user)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Create User Dialog */}
      {createDialogOpen && (
        <UserDialog
          isOpen={createDialogOpen}
          onClose={() => setCreateDialogOpen(false)}
          onSubmit={handleCreateUser}
          mode="create"
        />
      )}

      {/* Update User Dialog */}
      {updateDialogOpen && selectedUser && (
        <UserDialog
          isOpen={updateDialogOpen}
          onClose={() => {
            setUpdateDialogOpen(false);
            setSelectedUser(null);
          }}
          onSubmit={handleUpdateUser}
          initialData={selectedUser}
          mode="update"
        />
      )}

      {/* Delete User Confirmation */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the user 
              {selectedUser ? ` "${selectedUser.name}"` : ""} and remove their data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setSelectedUser(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => selectedUser && handleDeleteUser(selectedUser.id)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default UserTable;
