
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  Users, 
  Briefcase, 
  Calendar, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  UserCog,
  LogOut,
  Clock,
  MessageCircle,
  List
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth/AuthLayout";

// Define the interface for menu items
interface MenuItem {
  path: string;
  label: string;
  icon: React.ElementType;
  badge?: number; // Make badge optional
}

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [appointmentCount, setAppointmentCount] = useState(2); // Mock data
  const location = useLocation();
  const { userRole, logout } = useAuth();

  // Base menu items for all users
  const baseMenuItems: MenuItem[] = [
    { path: "/", label: "Tableau de bord", icon: Home },
    { path: "/contacts", label: "Contacts", icon: Users },
    { 
      path: "/appointments", 
      label: "RDV pris", 
      icon: List,
      badge: appointmentCount 
    },
    { path: "/deals", label: "Affaires", icon: Briefcase },
    { path: "/activities", label: "Activités", icon: Calendar },
    { path: "/time-tracking", label: "Pointage", icon: Clock },
    { path: "/messages", label: "Messages", icon: MessageCircle },
    { path: "/settings", label: "Paramètres", icon: Settings },
  ];

  // Admin-only menu items
  const adminMenuItems: MenuItem[] = [
    { path: "/admin", label: "Administration", icon: UserCog },
    { path: "/time-management", label: "Gestion du temps", icon: Clock },
  ];

  // Combine menu items based on user role
  const menuItems = userRole === "admin" 
    ? [...baseMenuItems, ...adminMenuItems] 
    : baseMenuItems;

  return (
    <div 
      className={cn(
        "h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="p-4 flex justify-between items-center border-b border-sidebar-border">
        {!collapsed && (
          <h1 className="text-xl font-bold text-white">MEILLEURE SANTE CRM</h1>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          className="ml-auto text-white hover:bg-sidebar-accent" 
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link to={item.path}>
                <div 
                  className={cn(
                    "flex items-center p-3 rounded-md transition-colors",
                    location.pathname === item.path 
                      ? "bg-sidebar-accent text-white" 
                      : "text-gray-100 hover:bg-sidebar-accent/70",
                    collapsed && "justify-center"
                  )}
                >
                  <item.icon size={20} className="flex-shrink-0" />
                  {!collapsed && (
                    <>
                      <span className="ml-3 flex-1">{item.label}</span>
                      {item.badge && (
                        <span className="bg-primary text-white text-xs font-medium px-2 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                  {collapsed && item.badge && (
                    <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-primary text-white text-xs font-medium px-1.5 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      {/* Logout button - Moved up and made more visible */}
      <div className="p-4 border-t border-sidebar-border mt-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center text-white font-medium">
              {userRole === "admin" ? "AD" : "AG"}
            </div>
            {!collapsed && (
              <div className="ml-3">
                <p className="text-sm font-medium text-white">
                  {userRole === "admin" ? "Administrateur" : "Agent"}
                </p>
                <p className="text-xs text-gray-300">
                  {userRole === "admin" ? "Admin" : "Agent"}
                </p>
              </div>
            )}
          </div>

          <Button 
            variant="ghost" 
            size="icon" 
            onClick={logout}
            className="text-white hover:text-red-300 hover:bg-sidebar-accent"
            aria-label="Déconnexion"
            title="Déconnexion"
          >
            <LogOut size={20} />
          </Button>
        </div>
      </div>
      
      {/* Logo Assurancia - Moved up */}
      <div className="px-4 py-3 flex flex-col items-center">
        <img 
          src="/lovable-uploads/24c926d0-e648-4212-a552-cbb7ef2891e6.png" 
          alt="Assurancia Courtage" 
          className={collapsed ? "w-12" : "w-36"}
        />
        {!collapsed && (
          <p className="text-white font-medium text-center mt-1">ASSURANCIA</p>
        )}
      </div>
    </div>
  );
};

export default Sidebar;

