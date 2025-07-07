import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { QrCode, Upload, Edit, Download, Copy, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const AdminQRManagement = () => {
  const { toast } = useToast();
  const [qrSettings, setQrSettings] = useState({
    upiId: "hostel@okicici",
    merchantName: "Hostel Management",
    isActive: true,
    qrCodeUrl: "/api/qr-code-image.png"
  });
  
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [tempSettings, setTempSettings] = useState(qrSettings);

  const handleSaveSettings = () => {
    setQrSettings(tempSettings);
    setEditDialogOpen(false);
    toast({
      title: "QR Settings Updated",
      description: "Payment QR code settings have been updated successfully.",
    });
  };

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(qrSettings.upiId);
    toast({
      title: "UPI ID Copied",
      description: "UPI ID has been copied to clipboard",
    });
  };

  const handleGenerateQR = () => {
    toast({
      title: "QR Code Generated",
      description: "New QR code has been generated with current settings.",
    });
  };

  const handleUploadQR = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        toast({
          title: "QR Code Uploaded",
          description: `QR code image "${file.name}" has been uploaded successfully.`,
        });
      }
    };
    input.click();
  };

  const handleToggleStatus = () => {
    setQrSettings(prev => ({ ...prev, isActive: !prev.isActive }));
    toast({
      title: `QR Code ${qrSettings.isActive ? 'Disabled' : 'Enabled'}`,
      description: `Payment QR code has been ${qrSettings.isActive ? 'disabled' : 'enabled'}.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            QR Code Management
          </h1>
          <p className="text-muted-foreground">Manage payment QR codes for student fee collection</p>
        </div>
        <Badge className={qrSettings.isActive ? "bg-success text-success-foreground" : "bg-danger text-danger-foreground"}>
          {qrSettings.isActive ? (
            <>
              <CheckCircle className="h-4 w-4 mr-1" />
              Active
            </>
          ) : (
            <>
              <AlertCircle className="h-4 w-4 mr-1" />
              Inactive
            </>
          )}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current QR Code Display */}
        <Card className="border-2 border-primary/20">
          <CardHeader className="bg-gradient-primary rounded-t-lg">
            <CardTitle className="text-white flex items-center">
              <QrCode className="h-5 w-5 mr-2" />
              Current QR Code
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center space-y-4">
              {/* QR Code Preview */}
              <div className="w-64 h-64 bg-white border-4 border-primary/20 rounded-lg flex items-center justify-center">
                <div className="w-56 h-56 bg-gradient-to-br from-primary/10 to-secondary/10 rounded flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-black/80 rounded-lg mb-4 mx-auto flex items-center justify-center">
                      <QrCode className="h-16 w-16 text-white" />
                    </div>
                    <p className="text-sm text-muted-foreground">Active QR Code</p>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleGenerateQR}
                  className="border-primary text-primary hover:bg-primary/10"
                >
                  <QrCode className="h-4 w-4 mr-2" />
                  Generate New
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleUploadQR}
                  className="border-secondary text-secondary hover:bg-secondary/10"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Custom
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-success text-success hover:bg-success/10"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* QR Settings */}
        <Card className="border-2 border-secondary/20">
          <CardHeader className="bg-gradient-secondary rounded-t-lg">
            <CardTitle className="text-white flex items-center justify-between">
              <span className="flex items-center">
                <Edit className="h-5 w-5 mr-2" />
                QR Settings
              </span>
              <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="border-white text-white hover:bg-white/10">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Edit QR Settings</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="upiId">UPI ID</Label>
                      <Input
                        id="upiId"
                        value={tempSettings.upiId}
                        onChange={(e) => setTempSettings(prev => ({ ...prev, upiId: e.target.value }))}
                        placeholder="Enter UPI ID"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="merchantName">Merchant Name</Label>
                      <Input
                        id="merchantName"
                        value={tempSettings.merchantName}
                        onChange={(e) => setTempSettings(prev => ({ ...prev, merchantName: e.target.value }))}
                        placeholder="Enter merchant name"
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleSaveSettings}>
                        Save Changes
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium">UPI ID</p>
                  <p className="text-sm text-muted-foreground">{qrSettings.upiId}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyUPI}
                  className="border-primary text-primary hover:bg-primary/10"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium">Merchant Name</p>
                  <p className="text-sm text-muted-foreground">{qrSettings.merchantName}</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium">Status</p>
                  <p className="text-sm text-muted-foreground">
                    {qrSettings.isActive ? 'Active and accepting payments' : 'Inactive - payments disabled'}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleToggleStatus}
                  className={qrSettings.isActive 
                    ? "border-danger text-danger hover:bg-danger/10" 
                    : "border-success text-success hover:bg-success/10"
                  }
                >
                  {qrSettings.isActive ? 'Disable' : 'Enable'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Usage Instructions */}
      <Card className="border-2 border-warning/20">
        <CardHeader className="bg-gradient-to-r from-warning to-warning/80 rounded-t-lg">
          <CardTitle className="text-white">Usage Instructions</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">For Students:</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Click "Pay Now" from dashboard or payments page</li>
                <li>• Scan QR code with any UPI app</li>
                <li>• Enter payment amount manually if needed</li>
                <li>• Complete payment in their UPI app</li>
                <li>• Payment verification happens within 24 hours</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">For Admin:</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Update UPI ID and merchant name as needed</li>
                <li>• Generate new QR codes when settings change</li>
                <li>• Upload custom QR codes if required</li>
                <li>• Enable/disable payments during maintenance</li>
                <li>• Monitor payment status in payments section</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="border-2 border-primary/20">
        <CardHeader className="bg-gradient-primary rounded-t-lg">
          <CardTitle className="text-white">Recent QR Activity</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-3">
            {[
              { action: "QR Code Generated", time: "2 hours ago", status: "success" },
              { action: "UPI ID Updated", time: "1 day ago", status: "info" },
              { action: "Payment Received", time: "3 hours ago", status: "success" },
              { action: "QR Code Downloaded", time: "5 hours ago", status: "info" }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.status === 'success' ? 'bg-success' : 'bg-primary'
                  }`}></div>
                  <span className="font-medium">{activity.action}</span>
                </div>
                <span className="text-sm text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminQRManagement;