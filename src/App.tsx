
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
import StudentProfile from "./components/StudentProfile";
import StudentPayments from "./components/StudentPayments";
import StudentComplaints from "./components/StudentComplaints";
import AdminStudents from "./components/AdminStudents";
import AdminRooms from "./components/AdminRooms";
import AdminPayments from "./components/AdminPayments";
import AdminComplaints from "./components/AdminComplaints";
import AdminReports from "./components/AdminReports";
import AdminSettings from "./components/AdminSettings";
import QRPayment from "./components/QRPayment";

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
                <Route path="student/profile" element={<StudentProfile user={user} />} />
                <Route path="student/payments" element={<StudentPayments user={user} />} />
                <Route path="student/complaints" element={<StudentComplaints user={user} />} />
                <Route path="student/qr-payment" element={<QRPayment user={user} />} />
                <Route path="*" element={<Navigate to="/student" replace />} />
              </Route>
            ) : (
              <Route path="/" element={<AdminLayout user={user} onLogout={handleLogout} />}>
                <Route index element={<Navigate to="/admin" replace />} />
                <Route path="admin" element={<AdminDashboard />} />
                <Route path="admin/students" element={<AdminStudents />} />
                <Route path="admin/rooms" element={<AdminRooms />} />
                <Route path="admin/payments" element={<AdminPayments />} />
                <Route path="admin/complaints" element={<AdminComplaints />} />
                <Route path="admin/reports" element={<AdminReports />} />
                <Route path="admin/settings" element={<AdminSettings />} />
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
