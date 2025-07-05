
import { IndianRupee, Users, BedDouble, MessageSquare, TrendingUp, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const AdminDashboard = () => {
  const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">Overview of hostel operations for {currentMonth}</p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                <p className="text-2xl font-bold">248</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
            <div className="mt-2 flex items-center text-sm">
              <TrendingUp className="mr-1 h-3 w-3 text-success" />
              <span className="text-success">+12 this month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Occupancy Rate</p>
                <p className="text-2xl font-bold">92%</p>
              </div>
              <BedDouble className="h-8 w-8 text-success" />
            </div>
            <p className="text-sm text-muted-foreground mt-2">248 / 270 rooms occupied</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Monthly Revenue</p>
                <p className="text-2xl font-bold flex items-center">
                  <IndianRupee className="h-5 w-5 mr-1" />
                  21,08,000
                </p>
              </div>
              <div className="h-8 w-8 bg-success/20 rounded-full flex items-center justify-center">
                <IndianRupee className="h-4 w-4 text-success" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">248 payments received</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Complaints</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <MessageSquare className="h-8 w-8 text-warning" />
            </div>
            <p className="text-sm text-muted-foreground mt-2">3 urgent, 9 normal</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Check-ins</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Rajesh Kumar', room: 'A-205', date: '2 hours ago', course: 'Engineering' },
                { name: 'Priya Sharma', room: 'B-101', date: '5 hours ago', course: 'Medicine' },
                { name: 'Amit Singh', room: 'C-304', date: '1 day ago', course: 'Commerce' }
              ].map((student, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{student.name}</p>
                    <p className="text-sm text-muted-foreground">{student.course} • Room {student.room}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline">{student.date}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-success/10 rounded-lg">
                <div>
                  <p className="font-medium text-success">Paid</p>
                  <p className="text-sm text-muted-foreground">Current month fees</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">248 students</p>
                  <div className="flex items-center text-sm">
                    <IndianRupee className="h-3 w-3 mr-1" />
                    21,08,000
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center p-3 bg-warning/10 rounded-lg">
                <div>
                  <p className="font-medium text-warning">Pending</p>
                  <p className="text-sm text-muted-foreground">Due in 5 days</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">22 students</p>
                  <div className="flex items-center text-sm">
                    <IndianRupee className="h-3 w-3 mr-1" />
                    1,87,000
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center p-3 bg-danger/10 rounded-lg">
                <div>
                  <p className="font-medium text-danger">Overdue</p>
                  <p className="text-sm text-muted-foreground">Payment overdue</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">8 students</p>
                  <div className="flex items-center text-sm">
                    <IndianRupee className="h-3 w-3 mr-1" />
                    68,000
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Room Status Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Room Status Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="text-center p-4 bg-success/10 rounded-lg">
              <div className="text-2xl font-bold text-success">248</div>
              <div className="text-sm text-muted-foreground">Occupied</div>
            </div>
            <div className="text-center p-4 bg-primary/10 rounded-lg">
              <div className="text-2xl font-bold text-primary">22</div>
              <div className="text-sm text-muted-foreground">Available</div>
            </div>
            <div className="text-center p-4 bg-warning/10 rounded-lg">
              <div className="text-2xl font-bold text-warning">5</div>
              <div className="text-sm text-muted-foreground">Maintenance</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold">275</div>
              <div className="text-sm text-muted-foreground">Total Rooms</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
