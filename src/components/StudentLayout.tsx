
import { Building2, Home, CreditCard, MessageSquare, User, GraduationCap, Menu } from "lucide-react";
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: 'Dashboard', href: '/student', icon: Home },
  { name: 'Profile', href: '/student/profile', icon: User },
  { name: 'Payments', href: '/student/payments', icon: CreditCard },
  { name: 'Complaints', href: '/student/complaints', icon: MessageSquare },
];

interface StudentLayoutProps {
  user: any;
  onLogout: () => void;
}

const StudentLayout = ({ user, onLogout }: StudentLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-dashboard">
      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 flex w-64 flex-col transition-transform duration-300 ease-in-out",
        sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-card px-6 pb-4 shadow-strong rainbow-bg">
          <div className="flex h-16 shrink-0 items-center">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">Student Portal</h1>
                <p className="text-xs text-white/80">Room {user.roomNumber}</p>
              </div>
            </div>
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
                              : "text-white/80 hover:text-white hover:bg-white/10"
                          )
                        }
                      >
                        <item.icon className="h-5 w-5 shrink-0" />
                        {item.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="md:pl-64">
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
                <div className="flex h-8 w-8 items-center justify-center rounded-full rainbow-bg">
                  <GraduationCap className="h-4 w-4 text-white" />
                </div>
                <div className="hidden lg:block">
                  <p className="text-sm font-medium text-foreground">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.course}</p>
                </div>
                <button
                  onClick={onLogout}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Logout
                </button>
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

export default StudentLayout;
