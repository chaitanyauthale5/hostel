import { Building2, Users, Calendar, DollarSign, BedDouble, UserCheck, Clock, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<any>;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  status?: "success" | "warning" | "danger";
}

const StatsCard = ({ title, value, icon: Icon, trend, status }: StatsCardProps) => (
  <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-medium">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {trend && (
        <div className={`flex items-center text-xs ${trend.isPositive ? 'text-success' : 'text-danger'}`}>
          <TrendingUp className={`mr-1 h-3 w-3 ${!trend.isPositive && 'rotate-180'}`} />
          {trend.value}
        </div>
      )}
      {status && (
        <div className="absolute top-2 right-2">
          <Badge variant={status === 'success' ? 'default' : status === 'warning' ? 'secondary' : 'destructive'} />
        </div>
      )}
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const stats = [
    {
      title: "Total Rooms",
      value: 150,
      icon: BedDouble,
      trend: { value: "+2 this month", isPositive: true }
    },
    {
      title: "Occupied Rooms",
      value: 128,
      icon: UserCheck,
      trend: { value: "+12% from last month", isPositive: true }
    },
    {
      title: "Total Guests",
      value: 234,
      icon: Users,
      trend: { value: "+8% from last month", isPositive: true }
    },
    {
      title: "Monthly Revenue",
      value: "$24,680",
      icon: DollarSign,
      trend: { value: "+15% from last month", isPositive: true }
    },
    {
      title: "Check-ins Today",
      value: 8,
      icon: Calendar,
      trend: { value: "3 pending", isPositive: false }
    },
    {
      title: "Average Stay",
      value: "12 days",
      icon: Clock,
      trend: { value: "+2 days from avg", isPositive: true }
    }
  ];

  const recentActivities = [
    { type: "check-in", guest: "John Smith", room: "A-101", time: "10:30 AM" },
    { type: "check-out", guest: "Sarah Wilson", room: "B-205", time: "11:15 AM" },
    { type: "booking", guest: "Mike Johnson", room: "C-303", time: "2:45 PM" },
    { type: "payment", guest: "Emma Davis", amount: "$450", time: "3:20 PM" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening at your hostel today.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className="bg-success text-success-foreground">
            85% Occupancy
          </Badge>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between border-b pb-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'check-in' ? 'bg-success' : 
                    activity.type === 'check-out' ? 'bg-warning' :
                    activity.type === 'booking' ? 'bg-primary' : 'bg-secondary'
                  }`} />
                  <div>
                    <p className="text-sm font-medium">
                      {activity.type === 'check-in' && `${activity.guest} checked into ${activity.room}`}
                      {activity.type === 'check-out' && `${activity.guest} checked out from ${activity.room}`}
                      {activity.type === 'booking' && `New booking: ${activity.guest} reserved ${activity.room}`}
                      {activity.type === 'payment' && `Payment received from ${activity.guest}: ${activity.amount}`}
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <button className="w-full p-3 text-left rounded-lg border hover:bg-accent transition-colors">
              <div className="flex items-center space-x-3">
                <UserCheck className="h-5 w-5 text-primary" />
                <span className="font-medium">New Guest Check-in</span>
              </div>
            </button>
            <button className="w-full p-3 text-left rounded-lg border hover:bg-accent transition-colors">
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-secondary" />
                <span className="font-medium">Create Booking</span>
              </div>
            </button>
            <button className="w-full p-3 text-left rounded-lg border hover:bg-accent transition-colors">
              <div className="flex items-center space-x-3">
                <Building2 className="h-5 w-5 text-success" />
                <span className="font-medium">Room Management</span>
              </div>
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;