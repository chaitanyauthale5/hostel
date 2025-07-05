import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Users, Search, Plus, Edit, Trash2, Eye, Phone, Mail, MapPin } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const AdminStudents = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder<'asc' | 'desc'>('asc');
  const [showAddForm, setShowAddForm] = useState(false);
  
  const [students, setStudents] = useState([
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
  ]);

  const [newStudent, setNewStudent] = useState({
    name: '',
    email: '',
    phone: '',
    roomNumber: '',
    course: '',
    year: '',
    guardianName: '',
    guardianPhone: ''
  });

  const filteredStudents = students
    .filter(student =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.roomNumber.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aValue = a[sortBy as keyof typeof a];
      const bValue = b[sortBy as keyof typeof b];
      const comparison = aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-success text-success-foreground';
      case 'pending': return 'bg-warning text-warning-foreground';
      case 'overdue': return 'bg-danger text-danger-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    const student = {
      id: students.length + 1,
      ...newStudent,
      feeStatus: 'pending',
      joinDate: new Date().toISOString().split('T')[0]
    };
    setStudents([...students, student]);
    setNewStudent({
      name: '', email: '', phone: '', roomNumber: '', course: '', year: '', guardianName: '', guardianPhone: ''
    });
    setShowAddForm(false);
    toast({
      title: "Student Added",
      description: "New student has been added successfully.",
    });
  };

  const handleEditStudent = (id: number) => {
    toast({
      title: "Edit Student",
      description: `Editing student with ID: ${id}`,
    });
  };

  const handleViewStudent = (id: number) => {
    toast({
      title: "View Student",
      description: `Viewing details for student ID: ${id}`,
    });
  };

  const handleDeleteStudent = (id: number) => {
    setStudents(students.filter(s => s.id !== id));
    toast({
      title: "Student Deleted",
      description: "Student has been removed from the system.",
    });
  };

  const totalStudents = students.length;
  const paidStudents = students.filter(s => s.feeStatus === 'paid').length;
  const pendingStudents = students.filter(s => s.feeStatus === 'pending').length;
  const overdueStudents = students.filter(s => s.feeStatus === 'overdue').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">
            Student Management
          </h1>
          <p className="text-muted-foreground">Manage all hostel students</p>
        </div>
        <Button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-primary hover:bg-primary-hover text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Student
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-2 border-primary/20 elegant-hover">
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
        
        <Card className="border-2 border-success/20 elegant-hover">
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

        <Card className="border-2 border-warning/20 elegant-hover">
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

        <Card className="border-2 border-danger/20 elegant-hover">
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

      {/* Search and Sort */}
      <Card className="border-2 border-secondary/20 elegant-hover">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search students by name, email, or room number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-primary/30"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSort('name')}
                className={sortBy === 'name' ? 'bg-primary text-white' : ''}
              >
                Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSort('roomNumber')}
                className={sortBy === 'roomNumber' ? 'bg-primary text-white' : ''}
              >
                Room {sortBy === 'roomNumber' && (sortOrder === 'asc' ? '↑' : '↓')}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSort('feeStatus')}
                className={sortBy === 'feeStatus' ? 'bg-primary text-white' : ''}
              >
                Status {sortBy === 'feeStatus' && (sortOrder === 'asc' ? '↑' : '↓')}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add Student Form */}
      {showAddForm && (
        <Card className="border-2 border-secondary/20 elegant-hover">
          <CardHeader className="bg-gradient-secondary rounded-t-lg">
            <CardTitle className="text-white">Add New Student</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleAddStudent} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={newStudent.name}
                    onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newStudent.email}
                    onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={newStudent.phone}
                    onChange={(e) => setNewStudent({...newStudent, phone: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="roomNumber">Room Number</Label>
                  <Input
                    id="roomNumber"
                    value={newStudent.roomNumber}
                    onChange={(e) => setNewStudent({...newStudent, roomNumber: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="course">Course</Label>
                  <Input
                    id="course"
                    value={newStudent.course}
                    onChange={(e) => setNewStudent({...newStudent, course: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Input
                    id="year"
                    value={newStudent.year}
                    onChange={(e) => setNewStudent({...newStudent, year: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="guardianName">Guardian Name</Label>
                  <Input
                    id="guardianName"
                    value={newStudent.guardianName}
                    onChange={(e) => setNewStudent({...newStudent, guardianName: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="guardianPhone">Guardian Phone</Label>
                  <Input
                    id="guardianPhone"
                    value={newStudent.guardianPhone}
                    onChange={(e) => setNewStudent({...newStudent, guardianPhone: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="flex space-x-2">
                <Button type="submit" className="bg-primary hover:bg-primary-hover text-white">
                  Add Student
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Students List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredStudents.map((student) => (
          <Card key={student.id} className="border-2 border-primary/20 elegant-hover">
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
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => handleViewStudent(student.id)}
                    className="border-primary text-primary hover:bg-primary/10"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => handleEditStudent(student.id)}
                    className="border-warning text-warning hover:bg-warning/10"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => handleDeleteStudent(student.id)}
                    className="border-danger text-danger hover:bg-danger/10"
                  >
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
