import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Phone, Mail, CreditCard, MapPin, X } from "lucide-react";

interface Student {
  id: number;
  name: string;
  email: string;
  phone: string;
  course: string;
  year: string;
  feeStatus: 'paid' | 'pending' | 'overdue';
  photo?: string;
  permanentAddress?: string;
}

interface RoomDetailsModalProps {
  open: boolean;
  onClose: () => void;
  roomNumber: string;
  students: Student[];
}

const RoomDetailsModal = ({ open, onClose, roomNumber, students }: RoomDetailsModalProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-success text-success-foreground';
      case 'pending': return 'bg-warning text-warning-foreground';
      case 'overdue': return 'bg-danger text-danger-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              Room {roomNumber} - Student Details
            </span>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">
              {students.length} {students.length === 1 ? 'student' : 'students'} in this room
            </p>
            <Badge variant="outline" className="text-primary">
              Occupancy: {students.length}/4
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {students.map((student) => (
              <Card key={student.id} className="border-2 border-primary/20">
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={student.photo} alt={student.name} />
                      <AvatarFallback className="bg-gradient-primary text-white">
                        {student.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{student.name}</CardTitle>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(student.feeStatus)}>
                          {student.feeStatus}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <Mail className="h-4 w-4 text-primary" />
                      <span>{student.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Phone className="h-4 w-4 text-success" />
                      <span>{student.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <User className="h-4 w-4 text-secondary" />
                      <span>{student.course} - {student.year}</span>
                    </div>
                  </div>

                  {student.permanentAddress && (
                    <div className="pt-2 border-t">
                      <p className="text-xs text-muted-foreground mb-1">Permanent Address:</p>
                      <p className="text-sm">{student.permanentAddress}</p>
                    </div>
                  )}

                  <div className="pt-2 border-t">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Payment Status:</span>
                      <div className="flex items-center space-x-1">
                        <CreditCard className="h-4 w-4" />
                        <Badge className={getStatusColor(student.feeStatus)} variant="outline">
                          {student.feeStatus.charAt(0).toUpperCase() + student.feeStatus.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {students.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No students assigned to this room</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RoomDetailsModal;