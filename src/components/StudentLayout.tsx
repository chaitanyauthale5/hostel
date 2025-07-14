import { Home, CreditCard, MessageSquare, User, Menu, LogOut, ChevronLeft, ChevronRight, Bell } from "lucide-react";
import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import StudentNotifications from "./StudentNotifications";

const navigation = [
  { name: 'Dashboard', href: '/student', icon: Home },
  { name: 'Payments', href: '/student/payments', icon: CreditCard },
  { name: 'Complaints', href: '/student/complaints', icon: MessageSquare },
];

interface StudentLayoutProps {
  user: any;
  onLogout: () => void;
}

const StudentLayout = ({ user, onLogout }: StudentLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-dashboard">
      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 flex flex-col transition-all duration-300 ease-in-out",
        sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        sidebarCollapsed ? "w-16" : "w-64"
      )}>
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-card px-3 pb-4 shadow-strong bg-gradient-primary">
          <div className="flex h-16 shrink-0 items-center justify-between">
            <div className={cn("flex items-center space-x-3", sidebarCollapsed && "justify-center")}>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20">
                <Home className="h-6 w-6 text-white" />
              </div>
              {!sidebarCollapsed && (
                <div>
                  <h1 className="text-lg font-bold text-white">Student Portal</h1>
                  <p className="text-xs text-white/80">Room {user.roomNumber}</p>
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
              
              {/* Notification Icon */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative" 
                onClick={() => setNotificationsOpen(true)}
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-danger rounded-full"></span>
              </Button>
              
              {/* Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-3 hover:bg-muted/50">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-gradient-primary text-white">
                        {user.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden lg:block text-left">
                      <p className="text-sm font-medium text-foreground">{user.name}</p>
                      <p className="text-xs text-muted-foreground">Room {user.roomNumber}</p>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-card border shadow-lg">
                  <DropdownMenuItem 
                    onClick={() => navigate('/student/profile')}
                    className="cursor-pointer hover:bg-muted"
                  >
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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

      {/* Notifications Dialog */}
      <StudentNotifications 
        open={notificationsOpen} 
        onOpenChange={setNotificationsOpen} 
      />
    </div>
  );
};

export default StudentLayout;