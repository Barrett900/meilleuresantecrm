
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  Users, 
  Briefcase, 
  Calendar, 
  Settings, 
  ChevronLeft, 
  ChevronRight 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const menuItems = [
    { path: "/", label: "Tableau de bord", icon: Home },
    { path: "/contacts", label: "Contacts", icon: Users },
    { path: "/deals", label: "Affaires", icon: Briefcase },
    { path: "/activities", label: "Activités", icon: Calendar },
    { path: "/settings", label: "Paramètres", icon: Settings },
  ];

  return (
    <div 
      className={cn(
        "h-screen bg-white border-r border-gray-200 transition-all duration-300 flex flex-col",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="p-4 flex justify-between items-center border-b border-gray-200">
        {!collapsed && (
          <h1 className="text-xl font-bold text-blue-600">Zoho CRM</h1>
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
      
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
            JD
          </div>
          {!collapsed && (
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">Jean Dupont</p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
