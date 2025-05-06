
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoginPage from "./LoginPage";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<"admin" | "agent" | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Check if user is authenticated on component mount
  useEffect(() => {
    const savedAuth = localStorage.getItem("auth");
    if (savedAuth) {
      const authData = JSON.parse(savedAuth);
      setIsAuthenticated(true);
      setUserRole(authData.role);
    }
  }, []);

  // Handle login
  const handleLogin = (email: string, password: string) => {
    // Mock authentication - in a real app, this would call your backend
    if (email === "admin@meilleure-sante.com" && password === "admin123") {
      const authData = { email, role: "admin" };
      localStorage.setItem("auth", JSON.stringify(authData));
      setIsAuthenticated(true);
      setUserRole("admin");
      navigate("/");
    } else if (email === "agent@meilleure-sante.com" && password === "agent123") {
      const authData = { email, role: "agent" };
      localStorage.setItem("auth", JSON.stringify(authData));
      setIsAuthenticated(true);
      setUserRole("agent");
      navigate("/");
    } else {
      return "Email ou mot de passe incorrect";
    }
    return null;
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("auth");
    setIsAuthenticated(false);
    setUserRole(null);
    navigate("/");
  };

  // Check if user is allowed to access admin pages
  useEffect(() => {
    if (isAuthenticated && location.pathname === "/admin" && userRole !== "admin") {
      navigate("/");
    }
  }, [isAuthenticated, location.pathname, navigate, userRole]);

  // If not authenticated, show login page
  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  // Pass auth context to the app
  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create auth context
import { createContext, useContext } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: "admin" | "agent" | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  userRole: null,
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export default AuthLayout;
