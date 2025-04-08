
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Server, 
  Users, 
  Settings, 
  LogOut, 
  Menu, 
  X 
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const navigationItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      name: "Servers",
      icon: Server,
      path: "/servers",
    },
    {
      name: "Users",
      icon: Users,
      path: "/users",
    },
    {
      name: "Settings",
      icon: Settings,
      path: "/settings",
    },
  ];

  const NavItem = ({ item }: { item: typeof navigationItems[0] }) => {
    const isActive = location.pathname === item.path;
    return (
      <Link to={item.path}>
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start gap-2 px-3 mb-1",
            isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
          )}
        >
          <item.icon className="h-5 w-5" />
          <span>{item.name}</span>
        </Button>
      </Link>
    );
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden text-primary bg-background"
        onClick={toggleSidebar}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/80 lg:hidden",
          isOpen ? "block" : "hidden"
        )}
        onClick={toggleSidebar}
      />

      <div
        className={cn(
          "flex flex-col fixed inset-y-0 left-0 z-40 w-64 bg-sidebar transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          className
        )}
      >
        <div className="p-6">
          <h2 className="text-xl font-bold text-sidebar-foreground">AdminPortal</h2>
        </div>

        <div className="flex-1 px-3">
          <nav className="space-y-1">
            {navigationItems.map((item) => (
              <NavItem key={item.name} item={item} />
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-sidebar-border">
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
            onClick={() => {
              // Implement logout functionality
              window.location.href = "/login";
            }}
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
