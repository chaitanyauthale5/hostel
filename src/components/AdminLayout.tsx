import { Building2, Users, BedDouble, IndianRupee, Settings, BarChart3, MessageSquare, FileText, UserCheck, Menu, Shield, ChevronLeft, ChevronRight, LogOut, QrCode } from "lucide-react";
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: BarChart3 },
  { name: 'Students', href: '/admin/students', icon: Users },
  { name: 'Rooms', href: '/admin/rooms', icon: BedDouble },
  { name: 'Payments', href: '/admin/payments', icon: IndianRupee },
  { name: 'Complaints', href: '/admin/complaints', icon: MessageSquare },
  { name: 'Reports', href: '/admin/reports', icon: FileText },
  { name: 'QR Management', href: '/admin/qr-management', icon: QrCode },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

interface AdminLayoutProps {
  user: any;
  onLogout: () => void;
}

const AdminLayout = ({ user, onLogout }: AdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-dashboard">
      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 flex flex-col transition-all duration-300 ease-in-out",
        sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        sidebarCollapsed ? "w-16" : "w-64"
      )}>
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-card px-3 pb-4 shadow-strong bg-gradient-secondary">
          <div className="flex h-16 shrink-0 items-center justify-between">
            <div className={cn("flex items-center space-x-3", sidebarCollapsed && "justify-center")}>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20">
                <Settings className="h-6 w-6 text-white" />
              </div>
              {!sidebarCollapsed && (
                <div>
                  <h1 className="text-lg font-bold text-white">Admin Panel</h1>
                  <p className="text-xs text-white/80">Management System</p>
                </div>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden md:flex text-white hover:bg-white/10"
            >
              {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          </div>
          
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <NavLink
                        to={item.href}
                        className={({ isActive }) =>
                          cn(
                            "group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold transition-all duration-200",
                            isActive
                              ? "bg-white/20 text-white shadow-medium backdrop-blur-sm"
                              : "text-white/80 hover:text-white hover:bg-white/10",
                            sidebarCollapsed && "justify-center"
                          )
                        }
                        title={sidebarCollapsed ? item.name : undefined}
                      >
                        <item.icon className="h-5 w-5 shrink-0" />
                        {!sidebarCollapsed && item.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </li>
              
              {/* Logout at bottom */}
              <li className="mt-auto">
                <button
                  onClick={onLogout}
                  className={cn(
                    "group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold transition-all duration-200 w-full text-white/80 hover:text-white hover:bg-white/10",
                    sidebarCollapsed && "justify-center"
                  )}
                  title={sidebarCollapsed ? "Logout" : undefined}
                >
                  <LogOut className="h-5 w-5 shrink-0" />
                  {!sidebarCollapsed && "Logout"}
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className={cn("transition-all duration-300", sidebarCollapsed ? "md:pl-16" : "md:pl-64")}>
        {/* Top bar */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-border bg-card px-4 shadow-soft sm:gap-x-6 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="relative flex flex-1"></div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-border" />
              
              <div className="flex items-center space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-primary">
                  <Shield className="h-4 w-4 text-white" />
                </div>
                <div className="hidden lg:block">
                  <p className="text-sm font-medium text-foreground">Administrator</p>
                  <p className="text-xs text-muted-foreground">Full Access</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <main className="py-6 px-4 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;
