
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import StudentLayout from "./components/StudentLayout";
import AdminLayout from "./components/AdminLayout";
import StudentDashboard from "./components/StudentDashboard";
import AdminDashboard from "./components/AdminDashboard";

const queryClient = new QueryClient();

const App = () => {
  const [user, setUser] = useState<any>(null);

  const handleLogin = (userType: 'student' | 'admin', userData: any) => {
    setUser({ ...userData, type: userType });
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Login onLogin={handleLogin} />
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {user.type === 'student' ? (
              <Route path="/" element={<StudentLayout user={user} onLogout={handleLogout} />}>
                <Route index element={<Navigate to="/student" replace />} />
                <Route path="student" element={<StudentDashboard user={user} />} />
                <Route path="student/profile" element={<div className="text-center py-12"><h2 className="text-2xl font-bold">Profile Management Coming Soon</h2></div>} />
                <Route path="student/payments" element={<div className="text-center py-12"><h2 className="text-2xl font-bold">Payment History Coming Soon</h2></div>} />
                <Route path="student/complaints" element={<div className="text-center py-12"><h2 className="text-2xl font-bold">Complaint System Coming Soon</h2></div>} />
                <Route path="*" element={<Navigate to="/student" replace />} />
              </Route>
            ) : (
              <Route path="/" element={<AdminLayout user={user} onLogout={handleLogout} />}>
                <Route index element={<Navigate to="/admin" replace />} />
                <Route path="admin" element={<AdminDashboard />} />
                <Route path="admin/students" element={<div className="text-center py-12"><h2 className="text-2xl font-bold">Student Management Coming Soon</h2></div>} />
                <Route path="admin/rooms" element={<div className="text-center py-12"><h2 className="text-2xl font-bold">Room Management Coming Soon</h2></div>} />
                <Route path="admin/payments" element={<div className="text-center py-12"><h2 className="text-2xl font-bold">Payment Management Coming Soon</h2></div>} />
                <Route path="admin/complaints" element={<div className="text-center py-12"><h2 className="text-2xl font-bold">Complaint Management Coming Soon</h2></div>} />
                <Route path="admin/reports" element={<div className="text-center py-12"><h2 className="text-2xl font-bold">Reports Coming Soon</h2></div>} />
                <Route path="admin/settings" element={<div className="text-center py-12"><h2 className="text-2xl font-bold">Settings Coming Soon</h2></div>} />
                <Route path="*" element={<Navigate to="/admin" replace />} />
              </Route>
            )}
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
