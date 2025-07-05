
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Settings, Save, Bell, Shield, Database, Mail, IndianRupee, Building2 } from "lucide-react";
import { useState } from "react";

const AdminSettings = () => {
  const [hostelInfo, setHostelInfo] = useState({
    name: 'Green Valley Student Hostel',
    address: '123 University Road, Mumbai, Maharashtra 400001',
    phone: '+91 22 1234 5678',
    email: 'admin@greenvalleyhostel.com',
    capacity: 50,
    establishedYear: 2015
  });

  const [feeSettings, setFeeSettings] = useState({
    singleRoom: 8500,
    doubleRoom: 6500,
    tripleRoom: 5500,
    lateFee: 200,
    securityDeposit: 5000,
    dueDateDay: 5
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    paymentReminders: true,
    maintenanceAlerts: true,
    admissionNotifications: true
  });

  const [policies, setPolicies] = useState({
    checkInTime: '10:00',
    checkOutTime: '11:00',
    visitorHours: '09:00 - 18:00',
    noisePolicy: 'Quiet hours from 22:00 to 06:00',
    guestPolicy: 'Guests allowed with prior approval',
    smokingPolicy: 'Strictly prohibited'
  });

  const [system, setSystem] = useState({
    autoBackup: true,
    maintenanceMode: false,
    debugMode: false,
    logRetention: 30
  });

  const handleSave = (section: string) => {
    console.log(`Saving ${section} settings`);
    // Here you would typically save to backend
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          System Settings
        </h1>
        <p className="text-muted-foreground">Configure hostel management system settings</p>
      </div>

      {/* Hostel Information */}
      <Card className="border-2 border-primary/20">
        <CardHeader className="bg-gradient-primary rounded-t-lg">
          <CardTitle className="text-white flex items-center">
            <Building2 className="h-5 w-5 mr-2" />
            Hostel Information
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="hostelName">Hostel Name</Label>
              <Input
                id="hostelName"
                value={hostelInfo.name}
                onChange={(e) => setHostelInfo({...hostelInfo, name: e.target.value})}
                className="border-primary/30"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="capacity">Total Capacity</Label>
              <Input
                id="capacity"
                type="number"
                value={hostelInfo.capacity}
                onChange={(e) => setHostelInfo({...hostelInfo, capacity: parseInt(e.target.value)})}
                className="border-secondary/30"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={hostelInfo.phone}
                onChange={(e) => setHostelInfo({...hostelInfo, phone: e.target.value})}
                className="border-success/30"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={hostelInfo.email}
                onChange={(e) => setHostelInfo({...hostelInfo, email: e.target.value})}
                className="border-warning/30"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                value={hostelInfo.address}
                onChange={(e) => setHostelInfo({...hostelInfo, address: e.target.value})}
                className="border-danger/30"
                rows={3}
              />
            </div>
          </div>
          
          <Button 
            onClick={() => handleSave('hostel-info')} 
            className="mt-4 rainbow-bg text-white hover:opacity-90"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Hostel Information
          </Button>
        </CardContent>
      </Card>

      {/* Fee Settings */}
      <Card className="border-2 border-success/20">
        <CardHeader className="bg-gradient-to-r from-success to-success/80 rounded-t-lg">
          <CardTitle className="text-white flex items-center">
            <IndianRupee className="h-5 w-5 mr-2" />
            Fee Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="singleRoom">Single Room (Monthly)</Label>
              <Input
                id="singleRoom"
                type="number"
                value={feeSettings.singleRoom}
                onChange={(e) => setFeeSettings({...feeSettings, singleRoom: parseInt(e.target.value)})}
                className="border-primary/30"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="doubleRoom">Double Room (Monthly)</Label>
              <Input
                id="doubleRoom"
                type="number"
                value={feeSettings.doubleRoom}
                onChange={(e) => setFeeSettings({...feeSettings, doubleRoom: parseInt(e.target.value)})}
                className="border-secondary/30"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tripleRoom">Triple Room (Monthly)</Label>
              <Input
                id="tripleRoom"
                type="number"
                value={feeSettings.tripleRoom}
                onChange={(e) => setFeeSettings({...feeSettings, tripleRoom: parseInt(e.target.value)})}
                className="border-success/30"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lateFee">Late Fee Amount</Label>
              <Input
                id="lateFee"
                type="number"
                value={feeSettings.lateFee}
                onChange={(e) => setFeeSettings({...feeSettings, lateFee: parseInt(e.target.value)})}
                className="border-warning/30"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="securityDeposit">Security Deposit</Label>
              <Input
                id="securityDeposit"
                type="number"
                value={feeSettings.securityDeposit}
                onChange={(e) => setFeeSettings({...feeSettings, securityDeposit: parseInt(e.target.value)})}
                className="border-danger/30"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dueDateDay">Due Date (Day of Month)</Label>
              <Input
                id="dueDateDay"
                type="number"
                min="1"
                max="31"
                value={feeSettings.dueDateDay}
                onChange={(e) => setFeeSettings({...feeSettings, dueDateDay: parseInt(e.target.value)})}
                className="border-primary/30"
              />
            </div>
          </div>
          
          <Button 
            onClick={() => handleSave('fee-settings')} 
            className="mt-4 bg-success text-success-foreground hover:bg-success/90"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Fee Settings
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notification Settings */}
        <Card className="border-2 border-warning/20">
          <CardHeader className="bg-gradient-to-r from-warning to-warning/80 rounded-t-lg">
            <CardTitle className="text-white flex items-center">
              <Bell className="h-5 w-5 mr-2" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="emailNotifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Send notifications via email</p>
                </div>
                <Switch
                  id="emailNotifications"
                  checked={notifications.emailNotifications}
                  onCheckedChange={(checked) => setNotifications({...notifications, emailNotifications: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="smsNotifications">SMS Notifications</Label>
                  <p className="text-sm text-muted-foreground">Send notifications via SMS</p>
                </div>
                <Switch
                  id="smsNotifications"
                  checked={notifications.smsNotifications}
                  onCheckedChange={(checked) => setNotifications({...notifications, smsNotifications: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="paymentReminders">Payment Reminders</Label>
                  <p className="text-sm text-muted-foreground">Automatic payment reminders</p>
                </div>
                <Switch
                  id="paymentReminders"
                  checked={notifications.paymentReminders}
                  onCheckedChange={(checked) => setNotifications({...notifications, paymentReminders: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="maintenanceAlerts">Maintenance Alerts</Label>
                  <p className="text-sm text-muted-foreground">Maintenance request notifications</p>
                </div>
                <Switch
                  id="maintenanceAlerts"
                  checked={notifications.maintenanceAlerts}
                  onCheckedChange={(checked) => setNotifications({...notifications, maintenanceAlerts: checked})}
                />
              </div>
            </div>
            
            <Button 
              onClick={() => handleSave('notifications')} 
              className="mt-4 bg-warning text-warning-foreground hover:bg-warning/90"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Notification Settings
            </Button>
          </CardContent>
        </Card>

        {/* System Settings */}
        <Card className="border-2 border-secondary/20">
          <CardHeader className="bg-gradient-secondary rounded-t-lg">
            <CardTitle className="text-white flex items-center">
              <Database className="h-5 w-5 mr-2" />
              System Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="autoBackup">Automatic Backup</Label>
                  <p className="text-sm text-muted-foreground">Daily automatic data backup</p>
                </div>
                <Switch
                  id="autoBackup"
                  checked={system.autoBackup}
                  onCheckedChange={(checked) => setSystem({...system, autoBackup: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                  <p className="text-sm text-muted-foreground">Enable system maintenance mode</p>
                </div>
                <Switch
                  id="maintenanceMode"
                  checked={system.maintenanceMode}
                  onCheckedChange={(checked) => setSystem({...system, maintenanceMode: checked})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="logRetention">Log Retention (Days)</Label>
                <Input
                  id="logRetention"
                  type="number"
                  value={system.logRetention}
                  onChange={(e) => setSystem({...system, logRetention: parseInt(e.target.value)})}
                  className="border-primary/30"
                />
              </div>
            </div>
            
            <Button 
              onClick={() => handleSave('system')} 
              className="mt-4 bg-secondary text-secondary-foreground hover:bg-secondary/90"
            >
              <Save className="h-4 w-4 mr-2" />
              Save System Settings
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Hostel Policies */}
      <Card className="border-2 border-danger/20">
        <CardHeader className="bg-gradient-to-r from-danger to-danger/80 rounded-t-lg">
          <CardTitle className="text-white flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            Hostel Policies
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="checkInTime">Check-in Time</Label>
              <Input
                id="checkInTime"
                type="time"
                value={policies.checkInTime}
                onChange={(e) => setPolicies({...policies, checkInTime: e.target.value})}
                className="border-primary/30"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="checkOutTime">Check-out Time</Label>
              <Input
                id="checkOutTime"
                type="time"
                value={policies.checkOutTime}
                onChange={(e) => setPolicies({...policies, checkOutTime: e.target.value})}
                className="border-secondary/30"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="visitorHours">Visitor Hours</Label>
              <Input
                id="visitorHours"
                value={policies.visitorHours}
                onChange={(e) => setPolicies({...policies, visitorHours: e.target.value})}
                className="border-success/30"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="noisePolicy">Noise Policy</Label>
              <Input
                id="noisePolicy"
                value={policies.noisePolicy}
                onChange={(e) => setPolicies({...policies, noisePolicy: e.target.value})}
                className="border-warning/30"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="guestPolicy">Guest Policy</Label>
              <Input
                id="guestPolicy"
                value={policies.guestPolicy}
                onChange={(e) => setPolicies({...policies, guestPolicy: e.target.value})}
                className="border-danger/30"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="smokingPolicy">Smoking Policy</Label>
              <Input
                id="smokingPolicy"
                value={policies.smokingPolicy}
                onChange={(e) => setPolicies({...policies, smokingPolicy: e.target.value})}
                className="border-primary/30"
              />
            </div>
          </div>
          
          <Button 
            onClick={() => handleSave('policies')} 
            className="mt-4 bg-danger text-danger-foreground hover:bg-danger/90"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Policies
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSettings;
