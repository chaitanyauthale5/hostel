
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare, Search, Clock, CheckCircle, AlertTriangle, Calendar, User, Reply } from "lucide-react";
import { useState } from "react";

const AdminComplaints = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedComplaint, setSelectedComplaint] = useState<number | null>(null);
  const [response, setResponse] = useState('');
  const [newStatus, setNewStatus] = useState('');
  
  const complaints = [
    {
      id: 1,
      title: 'AC not working in room',
      category: 'Maintenance',
      priority: 'High',
      status: 'in-progress',
      studentName: 'John Smith',
      roomNumber: 'A-101',
      date: '2024-01-15',
      description: 'The AC unit in my room has stopped working completely. It was working fine yesterday but today it won\'t turn on at all.',
      response: 'Technician assigned. Will be fixed by tomorrow.',
      responseDate: '2024-01-16',
      assignedTo: 'Maintenance Team'
    },
    {
      id: 2,
      title: 'Wifi connectivity issues',
      category: 'Technical',
      priority: 'Medium',
      status: 'resolved',
      studentName: 'Priya Sharma',
      roomNumber: 'B-205',
      date: '2024-01-10',
      description: 'Internet connection is very slow in the evening hours. Speed drops significantly after 6 PM.',
      response: 'Router upgraded. Speed improved significantly. Please test and confirm.',
      responseDate: '2024-01-12',
      assignedTo: 'IT Team'
    },
    {
      id: 3,
      title: 'Hot water not available',
      category: 'Utilities',
      priority: 'Medium',
      status: 'pending',
      studentName: 'Ahmed Khan',
      roomNumber: 'C-304',
      date: '2024-01-20',
      description: 'No hot water available in the morning hours for the past 3 days. This is affecting daily routine.',
      response: null,
      responseDate: null,
      assignedTo: null
    },
    {
      id: 4,
      title: 'Broken window latch',
      category: 'Maintenance',
      priority: 'Low',
      status: 'pending',
      studentName: 'Sneha Patel',
      roomNumber: 'A-102',
      date: '2024-01-22',
      description: 'The window latch in my room is broken. Window doesn\'t close properly which is a security concern.',
      response: null,
      responseDate: null,
      assignedTo: null
    }
  ];

  const filteredComplaints = complaints.filter(complaint =>
    complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    complaint.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    complaint.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    complaint.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'bg-success text-success-foreground';
      case 'in-progress': return 'bg-warning text-warning-foreground';
      case 'pending': return 'bg-danger text-danger-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved': return <CheckCircle className="h-4 w-4" />;
      case 'in-progress': return <Clock className="h-4 w-4" />;
      case 'pending': return <AlertTriangle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-danger text-danger-foreground';
      case 'Medium': return 'bg-warning text-warning-foreground';
      case 'Low': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const totalComplaints = complaints.length;
  const pendingComplaints = complaints.filter(c => c.status === 'pending').length;
  const inProgressComplaints = complaints.filter(c => c.status === 'in-progress').length;
  const resolvedComplaints = complaints.filter(c => c.status === 'resolved').length;

  const handleRespond = (complaintId: number) => {
    console.log('Responding to complaint:', complaintId, response, newStatus);
    setSelectedComplaint(null);
    setResponse('');
    setNewStatus('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Complaint Management
        </h1>
        <p className="text-muted-foreground">Manage and resolve student complaints</p>
      </div>

      {/* Complaint Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-2 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold text-primary">{totalComplaints}</p>
                <p className="text-sm text-muted-foreground">Total Complaints</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-2 border-danger/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-8 w-8 text-danger" />
              <div>
                <p className="text-2xl font-bold text-danger">{pendingComplaints}</p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-warning/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-8 w-8 text-warning" />
              <div>
                <p className="text-2xl font-bold text-warning">{inProgressComplaints}</p>
                <p className="text-sm text-muted-foreground">In Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-success/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-8 w-8 text-success" />
              <div>
                <p className="text-2xl font-bold text-success">{resolvedComplaints}</p>
                <p className="text-sm text-muted-foreground">Resolved</p>
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
              placeholder="Search complaints by title, student name, room number, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-primary/30"
            />
          </div>
        </CardContent>
      </Card>

      {/* Complaints List */}
      <div className="space-y-4">
        {filteredComplaints.map((complaint) => (
          <Card key={complaint.id} className="border-2 border-primary/20">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-primary">
                      <MessageSquare className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{complaint.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {complaint.studentName}
                        </div>
                        <span>Room {complaint.roomNumber}</span>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {complaint.date}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="border-secondary text-secondary">
                      {complaint.category}
                    </Badge>
                    <Badge className={getPriorityColor(complaint.priority)}>
                      {complaint.priority}
                    </Badge>
                    <Badge className={getStatusColor(complaint.status)}>
                      {getStatusIcon(complaint.status)}
                      <span className="ml-1 capitalize">{complaint.status.replace('-', ' ')}</span>
                    </Badge>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-2">Complaint Description:</h4>
                  <p className="text-sm bg-muted/30 p-3 rounded-lg">{complaint.description}</p>
                </div>

                {complaint.response && (
                  <div className="bg-success/10 p-3 rounded-lg">
                    <h4 className="font-medium text-sm text-success mb-2">Admin Response:</h4>
                    <p className="text-sm">{complaint.response}</p>
                    <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                      <span>Response Date: {complaint.responseDate}</span>
                      {complaint.assignedTo && <span>Assigned to: {complaint.assignedTo}</span>}
                    </div>
                  </div>
                )}

                <div className="flex space-x-2 pt-2">
                  <Button
                    size="sm"
                    onClick={() => setSelectedComplaint(complaint.id)}
                    className="rainbow-bg text-white hover:opacity-90"
                  >
                    <Reply className="h-4 w-4 mr-1" />
                    {complaint.response ? 'Update Response' : 'Respond'}
                  </Button>
                </div>

                {/* Response Form */}
                {selectedComplaint === complaint.id && (
                  <div className="border-t pt-4 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Update Status</label>
                        <Select value={newStatus} onValueChange={setNewStatus}>
                          <SelectTrigger className="border-primary/30">
                            <SelectValue placeholder="Select new status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="in-progress">In Progress</SelectItem>
                            <SelectItem value="resolved">Resolved</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Response Message</label>
                      <Textarea
                        value={response}
                        onChange={(e) => setResponse(e.target.value)}
                        placeholder="Enter your response to the student..."
                        className="border-secondary/30"
                        rows={3}
                      />
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => handleRespond(complaint.id)}
                        className="bg-success text-success-foreground hover:bg-success/90"
                      >
                        Send Response
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSelectedComplaint(null);
                          setResponse('');
                          setNewStatus('');
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminComplaints;
