
import { useState } from "react";
import { Building2, Users, UserCheck, GraduationCap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LoginProps {
  onLogin: (userType: 'student' | 'admin', userData: any) => void;
}

const Login = ({ onLogin }: LoginProps) => {
  const [userType, setUserType] = useState<'student' | 'admin'>('student');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock login - in real app, this would validate credentials
    const userData = {
      id: userType === 'admin' ? 'admin-1' : 'student-1',
      name: userType === 'admin' ? 'Admin User' : 'John Smith',
      email: formData.email,
      role: userType,
      ...(userType === 'student' && {
        roomNumber: 'A-101',
        course: 'Computer Science',
        year: '3rd Year'
      })
    };
    
    onLogin(userType, userData);
  };

  return (
    <div className="min-h-screen bg-gradient-dashboard flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-primary">
              <Building2 className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Student Hostel</h1>
          <p className="text-muted-foreground">Management System</p>
        </div>

        {/* User Type Selection */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant={userType === 'student' ? 'default' : 'outline'}
            onClick={() => setUserType('student')}
            className="h-16 flex-col"
          >
            <GraduationCap className="h-6 w-6 mb-1" />
            Student
          </Button>
          <Button
            variant={userType === 'admin' ? 'default' : 'outline'}
            onClick={() => setUserType('admin')}
            className="h-16 flex-col"
          >
            <UserCheck className="h-6 w-6 mb-1" />
            Admin
          </Button>
        </div>

        {/* Login Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center">
              {userType === 'student' ? 'Student Login' : 'Admin Login'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-gradient-primary">
                Login as {userType === 'student' ? 'Student' : 'Admin'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Demo Credentials */}
        <Card className="bg-muted/50">
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground">
              <p className="font-medium mb-2">Demo Credentials:</p>
              <p><strong>Student:</strong> student@hostel.edu / password</p>
              <p><strong>Admin:</strong> admin@hostel.edu / password</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
