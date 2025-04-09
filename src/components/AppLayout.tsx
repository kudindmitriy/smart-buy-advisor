
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { MessageSquare, History, MapPin, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  
  const navigationItems = [
    { name: "Chat", path: "/chat", icon: MessageSquare },
    { name: "History", path: "/history", icon: History },
    { name: "Store Map", path: "/stores", icon: MapPin },
  ];
  
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-app-background">
      {/* Sidebar for desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 p-4">
        <div className="flex items-center mb-8 mt-2">
          <div className="w-10 h-10 bg-app-accent rounded-lg flex items-center justify-center text-white font-bold text-xl">
            SC
          </div>
          <h1 className="ml-3 text-xl font-semibold">Shop Consultant</h1>
        </div>
        
        <nav className="flex-1 space-y-2">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.path;
            const ItemIcon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center px-4 py-3 rounded-lg transition-colors",
                  isActive
                    ? "bg-app-accent-light text-app-accent font-medium"
                    : "text-app-text-light hover:bg-gray-100"
                )}
              >
                <ItemIcon className={cn("h-5 w-5 mr-3", isActive ? "text-app-accent" : "")} />
                {item.name}
              </Link>
            );
          })}
        </nav>
        
        <div className="border-t border-gray-200 pt-4 mt-4">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              {user?.name.charAt(0)}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full flex items-center justify-center"
            onClick={logout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>
      
      {/* Mobile header */}
      <header className="md:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-app-accent rounded-md flex items-center justify-center text-white font-bold text-sm">
            SC
          </div>
          <h1 className="ml-2 text-lg font-semibold">Shop Consultant</h1>
        </div>
        <div className="flex items-center">
          <span className="text-sm font-medium mr-2">{user?.name}</span>
          <Button variant="ghost" size="icon" onClick={logout}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-1 flex flex-col">{children}</main>
      
      {/* Mobile navigation */}
      <nav className="md:hidden flex items-center justify-around bg-white border-t border-gray-200 py-2">
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.path;
          const ItemIcon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center p-2 rounded",
                isActive ? "text-app-accent" : "text-app-text-light"
              )}
            >
              <ItemIcon className="h-5 w-5" />
              <span className="text-xs mt-1">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
