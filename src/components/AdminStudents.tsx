
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Users, Search, Plus, Edit, Trash2, Eye, Phone, Mail, MapPin } from "lucide-react";
import { useState } from "react";

const AdminStudents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const students = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john@example.com',
      phone: '+91 9876543210',
      roomNumber: 'A-101',
      course: 'Computer Science',
      year: '3rd Year',
      feeStatus: 'paid',
      joinDate: '2023-08-15',
      guardianName: 'Robert Smith',
      guardianPhone: '+91 9876543211'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      email: 'priya@example.com',
      phone: '+91 9876543212',
      roomNumber: 'B-205',
      course: 'Mechanical Engineering',
      year: '2nd Year',
      feeStatus: 'pending',
      joinDate: '2023-08-20',
      guardianName: 'Raj Sharma',
      guardianPhone: '+91 9876543213'
    },
    {
      id: 3,
      name: 'Ahmed Khan',
      email: 'ahmed@example.com',
      phone: '+91 9876543214',
      roomNumber: 'C-304',
      course: 'Electrical Engineering',
      year: '4th Year',
      feeStatus: 'overdue',
      joinDate: '2022-08-10',
      guardianName: 'Mohammed Khan',
      guardianPhone: '+91 9876543215'
    },
    {
      id: 4,
      name: 'Sneha Patel',
      email: 'sneha@example.com',
      phone: '+91 9876543216',
      roomNumber: 'A-102',
      course: 'Civil Engineering',
      year: '1st Year',
      feeStatus: 'paid',
      joinDate: '2024-08-01',
      guardianName: 'Kishore Patel',
      guardianPhone: '+91 9876543217'
    }
  ];

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.roomNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-success text-success-foreground';
      case 'pending': return 'bg-warning text-warning-foreground';
      case 'overdue': return 'bg-danger text-danger-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const totalStudents = students.length;
  const paidStudents = students.filter(s => s.feeStatus === 'paid').length;
  const pendingStudents = students.filter(s => s.feeStatus === 'pending').length;
  const overdueStudents = students.filter(s => s.feeStatus === 'overdue').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Student Management
          </h1>
          <p className="text-muted-foreground">Manage all hostel students</p>
        </div>
        <Button className="rainbow-bg text-white hover:opacity-90">
          <Plus className="h-4 w-4 mr-2" />
          Add Student
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-2 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold text-primary">{totalStudents}</p>
                <p className="text-sm text-muted-foreground">Total Students</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-2 border-success/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-success" />
              <div>
                <p className="text-2xl font-bold text-success">{paidStudents}</p>
                <p className="text-sm text-muted-foreground">Fees Paid</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-warning/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-warning" />
              <div>
                <p className="text-2xl font-bold text-warning">{pendingStudents}</p>
                <p className="text-sm text-muted-foreground">Fees Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-danger/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-danger" />
              <div>
                <p className="text-2xl font-bold text-danger">{overdueStudents}</p>
                <p className="text-sm text-muted-foreground">Fees Overdue</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="border-2 border-secondary/20">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search students by name, email, or room number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-primary/30"
            />
          </div>
        </CardContent>
      </Card>

      {/* Students List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredStudents.map((student) => (
          <Card key={student.id} className="border-2 border-primary/20">
            <CardHeader className="bg-gradient-primary rounded-t-lg">
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">{student.name}</CardTitle>
                <Badge className={getStatusColor(student.feeStatus)}>
                  {student.feeStatus}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-secondary" />
                    <span>Room {student.roomNumber}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">{student.course}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-primary" />
                    <span>{student.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-success" />
                    <span>{student.phone}</span>
                  </div>
                </div>

                <div className="text-sm">
                  <p className="text-muted-foreground">Guardian: {student.guardianName}</p>
                  <p className="text-muted-foreground">Contact: {student.guardianPhone}</p>
                </div>

                <div className="flex space-x-2 pt-2">
                  <Button size="sm" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button size="sm" variant="outline" className="border-warning text-warning hover:bg-warning/10">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline" className="border-danger text-danger hover:bg-danger/10">
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminStudents;
