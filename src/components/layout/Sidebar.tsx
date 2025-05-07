
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
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth/AuthLayout";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { userRole, logout } = useAuth();

  // Base menu items for all users
  const baseMenuItems = [
    { path: "/", label: "Tableau de bord", icon: Home },
    { path: "/contacts", label: "Contacts", icon: Users },
    { path: "/deals", label: "Affaires", icon: Briefcase },
    { path: "/activities", label: "Activités", icon: Calendar },
    { path: "/settings", label: "Paramètres", icon: Settings },
  ];

  // Admin-only menu items
  const adminMenuItems = [
    { path: "/admin", label: "Administration", icon: UserCog },
  ];

  // Combine menu items based on user role
  const menuItems = userRole === "admin" 
    ? [...baseMenuItems, ...adminMenuItems] 
    : baseMenuItems;

  return (
    <div 
      className={cn(
        "h-screen bg-white border-r border-gray-200 transition-all duration-300 flex flex-col",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="p-4 flex justify-between items-center border-b border-gray-200">
        {!collapsed && (
          <h1 className="text-xl font-bold text-blue-600">MEILLEURE SANTE CRM</h1>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          className="ml-auto" 
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
                      ? "bg-blue-50 text-blue-600" 
                      : "text-gray-600 hover:bg-gray-100",
                    collapsed && "justify-center"
                  )}
                >
                  <item.icon size={20} className="flex-shrink-0" />
                  {!collapsed && <span className="ml-3">{item.label}</span>}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      {/* Logo Assurancia */}
      <div className="px-4 py-6 flex justify-center">
        <img 
          src="/lovable-uploads/24c926d0-e648-4212-a552-cbb7ef2891e6.png" 
          alt="Assurancia Courtage" 
          className={collapsed ? "w-12" : "w-36"}
        />
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
              {userRole === "admin" ? "AD" : "AG"}
            </div>
            {!collapsed && (
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">
                  {userRole === "admin" ? "Administrateur" : "Agent"}
                </p>
                <p className="text-xs text-gray-500">
                  {userRole === "admin" ? "Admin" : "Agent"}
                </p>
              </div>
            )}
          </div>

          <Button 
            variant="ghost" 
            size="icon" 
            onClick={logout}
            className="text-gray-600 hover:text-red-600"
            aria-label="Déconnexion"
            title="Déconnexion"
          >
            <LogOut size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
