
import { IndianRupee, Home, CreditCard, MessageSquare, User, Calendar, Phone, Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface StudentUser {
  id: string;
  name: string;
  email: string;
  roomNumber: string;
  course: string;
  year: string;
}

interface StudentDashboardProps {
  user: StudentUser;
}

const StudentDashboard = ({ user }: StudentDashboardProps) => {
  const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-primary text-white p-6 rounded-lg">
        <h1 className="text-2xl font-bold">Welcome back, {user.name}!</h1>
        <p className="text-white/90">Room {user.roomNumber} • {user.course} • {user.year}</p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Monthly Fee</p>
                <p className="text-2xl font-bold flex items-center">
                  <IndianRupee className="h-5 w-5 mr-1" />
                  8,500
                </p>
              </div>
              <div className="h-12 w-12 bg-success/20 rounded-full flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-success" />
              </div>
            </div>
            <Badge className="mt-2 bg-success text-success-foreground">Paid for {currentMonth}</Badge>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Room Status</p>
                <p className="text-2xl font-bold">Active</p>
              </div>
              <div className="h-12 w-12 bg-primary/20 rounded-full flex items-center justify-center">
                <Home className="h-6 w-6 text-primary" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Room {user.roomNumber}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Complaints</p>
                <p className="text-2xl font-bold">2</p>
              </div>
              <div className="h-12 w-12 bg-warning/20 rounded-full flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-warning" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">1 Pending, 1 Resolved</p>
          </CardContent>
        </Card>
      </div>

      {/* Profile Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="mr-2 h-5 w-5" />
            Profile Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <p className="text-sm text-muted-foreground">{user.name}</p>
            </div>
            <div className="space-y-2">
              <Label>Room Number</Label>
              <p className="text-sm text-muted-foreground">{user.roomNumber}</p>
            </div>
            <div className="space-y-2">
              <Label>Course</Label>
              <p className="text-sm text-muted-foreground">{user.course}</p>
            </div>
            <div className="space-y-2">
              <Label>Academic Year</Label>
              <p className="text-sm text-muted-foreground">{user.year}</p>
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <p className="text-sm text-muted-foreground">+91 9876543210</p>
            </div>
          </div>
          <Button variant="outline" className="mt-4">Edit Profile</Button>
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCard className="mr-2 h-5 w-5" />
            Recent Payments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { month: 'December 2024', amount: 8500, status: 'paid', date: '2024-12-01' },
              { month: 'November 2024', amount: 8500, status: 'paid', date: '2024-11-01' },
              { month: 'October 2024', amount: 8500, status: 'paid', date: '2024-10-01' }
            ].map((payment, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{payment.month}</p>
                  <p className="text-sm text-muted-foreground">Paid on {payment.date}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center font-bold">
                    <IndianRupee className="h-4 w-4 mr-1" />
                    {payment.amount.toLocaleString()}
                  </div>
                  <Badge className="bg-success text-success-foreground">Paid</Badge>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4">View All Payments</Button>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Pay Monthly Fee</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">Next payment due: January 2025</p>
            <Button className="w-full bg-gradient-primary">
              <IndianRupee className="mr-2 h-4 w-4" />
              Pay ₹8,500
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Submit Complaint</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">Report any issues or maintenance requests</p>
            <Button variant="outline" className="w-full">
              <MessageSquare className="mr-2 h-4 w-4" />
              New Complaint
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const Label = ({ children }: { children: React.ReactNode }) => (
  <label className="text-sm font-medium">{children}</label>
);

export default StudentDashboard;
