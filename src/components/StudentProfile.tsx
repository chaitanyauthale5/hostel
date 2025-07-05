
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { User, Phone, Mail, MapPin, Calendar, Edit, Save } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface StudentProfileProps {
  user: any;
}

const StudentProfile = ({ user }: StudentProfileProps) => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: user.name,
    email: user.email,
    phone: '+91 9876543210',
    address: '123 Main Street, Mumbai, Maharashtra',
    guardianName: 'Rajesh Smith',
    guardianPhone: '+91 9876543211',
    course: user.course,
    year: user.year,
    rollNumber: 'CS2021001',
    dateOfBirth: '2002-05-15',
    bloodGroup: 'O+',
    emergencyContact: '+91 9876543212'
  });

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
    console.log('Profile updated:', profile);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">
            My Profile
          </h1>
          <p className="text-muted-foreground">Manage your personal information</p>
        </div>
        <Button
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
          className="bg-primary hover:bg-primary-hover text-white"
        >
          {isEditing ? <Save className="h-4 w-4 mr-2" /> : <Edit className="h-4 w-4 mr-2" />}
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Picture & Basic Info */}
        <Card className="lg:col-span-1 border-2 border-primary/20 elegant-hover">
          <CardHeader className="text-center bg-gradient-primary rounded-t-lg">
            <div className="mx-auto w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-4">
              <User className="h-12 w-12 text-white" />
            </div>
            <CardTitle className="text-white">{profile.name}</CardTitle>
            <Badge className="bg-warning text-warning-foreground">
              Room {user.roomNumber}
            </Badge>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-sm">{profile.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-sm">{profile.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-primary" />
                <span className="text-sm">{profile.course} - {profile.year}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Information */}
        <Card className="lg:col-span-2 border-2 border-secondary/20 elegant-hover">
          <CardHeader className="bg-gradient-secondary rounded-t-lg">
            <CardTitle className="text-white">Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="rollNumber">Roll Number</Label>
                <Input
                  id="rollNumber"
                  value={profile.rollNumber}
                  disabled={!isEditing}
                  onChange={(e) => setProfile({...profile, rollNumber: e.target.value})}
                  className="border-primary/30"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={profile.dateOfBirth}
                  disabled={!isEditing}
                  onChange={(e) => setProfile({...profile, dateOfBirth: e.target.value})}
                  className="border-secondary/30"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bloodGroup">Blood Group</Label>
                <Input
                  id="bloodGroup"
                  value={profile.bloodGroup}
                  disabled={!isEditing}
                  onChange={(e) => setProfile({...profile, bloodGroup: e.target.value})}
                  className="border-success/30"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={profile.phone}
                  disabled={!isEditing}
                  onChange={(e) => setProfile({...profile, phone: e.target.value})}
                  className="border-warning/30"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={profile.address}
                  disabled={!isEditing}
                  onChange={(e) => setProfile({...profile, address: e.target.value})}
                  className="border-danger/30"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Guardian Information */}
        <Card className="lg:col-span-3 border-2 border-success/20 elegant-hover">
          <CardHeader className="bg-gradient-secondary rounded-t-lg">
            <CardTitle className="text-white">Guardian & Emergency Contact</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="guardianName">Guardian Name</Label>
                <Input
                  id="guardianName"
                  value={profile.guardianName}
                  disabled={!isEditing}
                  onChange={(e) => setProfile({...profile, guardianName: e.target.value})}
                  className="border-primary/30"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="guardianPhone">Guardian Phone</Label>
                <Input
                  id="guardianPhone"
                  value={profile.guardianPhone}
                  disabled={!isEditing}
                  onChange={(e) => setProfile({...profile, guardianPhone: e.target.value})}
                  className="border-secondary/30"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="emergencyContact">Emergency Contact</Label>
                <Input
                  id="emergencyContact"
                  value={profile.emergencyContact}
                  disabled={!isEditing}
                  onChange={(e) => setProfile({...profile, emergencyContact: e.target.value})}
                  className="border-danger/30"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentProfile;
