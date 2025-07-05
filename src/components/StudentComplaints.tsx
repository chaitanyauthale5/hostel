
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare, Plus, Clock, CheckCircle, AlertTriangle, Calendar, FileText } from "lucide-react";
import { useState } from "react";

interface StudentComplaintsProps {
  user: any;
}

const StudentComplaints = ({ user }: StudentComplaintsProps) => {
  const [showForm, setShowForm] = useState(false);
  const [complaint, setComplaint] = useState({
    title: '',
    category: '',
    priority: '',
    description: ''
  });

  const complaints = [
    {
      id: 1,
      title: 'AC not working in room',
      category: 'Maintenance',
      priority: 'High',
      status: 'in-progress',
      date: '2024-01-15',
      description: 'The AC unit in my room has stopped working completely.',
      response: 'Technician assigned. Will be fixed by tomorrow.',
      responseDate: '2024-01-16'
    },
    {
      id: 2,
      title: 'Wifi connectivity issues',
      category: 'Technical',
      priority: 'Medium',
      status: 'resolved',
      date: '2024-01-10',
      description: 'Internet connection is very slow in the evening hours.',
      response: 'Router upgraded. Speed improved significantly.',
      responseDate: '2024-01-12'
    },
    {
      id: 3,
      title: 'Hot water not available',
      category: 'Utilities',
      priority: 'Medium',
      status: 'pending',
      date: '2024-01-20',
      description: 'No hot water in the morning hours for the past 3 days.',
      response: null,
      responseDate: null
    }
  ];

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New complaint:', complaint);
    setComplaint({ title: '', category: '', priority: '', description: '' });
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            My Complaints
          </h1>
          <p className="text-muted-foreground">Submit and track your hostel complaints</p>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="rainbow-bg text-white hover:opacity-90"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Complaint
        </Button>
      </div>

      {/* Complaint Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-2 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold text-primary">3</p>
                <p className="text-sm text-muted-foreground">Total</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-2 border-danger/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-8 w-8 text-danger" />
              <div>
                <p className="text-2xl font-bold text-danger">1</p>
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
                <p className="text-2xl font-bold text-warning">1</p>
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
                <p className="text-2xl font-bold text-success">1</p>
                <p className="text-sm text-muted-foreground">Resolved</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* New Complaint Form */}
      {showForm && (
        <Card className="border-2 border-secondary/20">
          <CardHeader className="bg-gradient-secondary rounded-t-lg">
            <CardTitle className="text-white">Submit New Complaint</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Complaint Title</Label>
                  <Input
                    id="title"
                    value={complaint.title}
                    onChange={(e) => setComplaint({...complaint, title: e.target.value})}
                    placeholder="Brief description of the issue"
                    required
                    className="border-primary/30"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={complaint.category} onValueChange={(value) => setComplaint({...complaint, category: value})}>
                    <SelectTrigger className="border-secondary/30">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="technical">Technical</SelectItem>
                      <SelectItem value="utilities">Utilities</SelectItem>
                      <SelectItem value="cleanliness">Cleanliness</SelectItem>
                      <SelectItem value="security">Security</SelectItem>
                      <SelectItem value="food">Food</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={complaint.priority} onValueChange={(value) => setComplaint({...complaint, priority: value})}>
                    <SelectTrigger className="border-success/30">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={complaint.description}
                  onChange={(e) => setComplaint({...complaint, description: e.target.value})}
                  placeholder="Provide detailed description of the issue"
                  required
                  className="border-warning/30"
                  rows={4}
                />
              </div>

              <div className="flex space-x-2">
                <Button type="submit" className="rainbow-bg text-white hover:opacity-90">
                  Submit Complaint
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Complaints List */}
      <div className="space-y-4">
        {complaints.map((comp) => (
          <Card key={comp.id} className="border-2 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-primary">
                    <MessageSquare className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{comp.title}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline" className="border-secondary text-secondary">
                        {comp.category}
                      </Badge>
                      <Badge className={getPriorityColor(comp.priority)}>
                        {comp.priority}
                      </Badge>
                      <Badge className={getStatusColor(comp.status)}>
                        {getStatusIcon(comp.status)}
                        <span className="ml-1 capitalize">{comp.status.replace('-', ' ')}</span>
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="text-right text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {comp.date}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-1">Description:</h4>
                  <p className="text-sm">{comp.description}</p>
                </div>
                
                {comp.response && (
                  <div className="bg-success/10 p-3 rounded-lg">
                    <h4 className="font-medium text-sm text-success mb-1">Admin Response:</h4>
                    <p className="text-sm">{comp.response}</p>
                    <p className="text-xs text-muted-foreground mt-1">Response Date: {comp.responseDate}</p>
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

export default StudentComplaints;
