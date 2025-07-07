import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Copy, CheckCircle } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface QRPaymentProps {
  user?: any;
}

const QRPayment = ({ user }: QRPaymentProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const paymentData = location.state || { amount: 8500, month: "Current Month" };
  
  // Admin provided QR code and UPI details
  const upiId = "hostel@okicici";
  const merchantName = "Hostel Management";

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    toast({
      title: "UPI ID Copied",
      description: "UPI ID has been copied to clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePaymentSuccess = () => {
    toast({
      title: "Payment Initiated",
      description: "Please complete the payment using your UPI app",
    });
    navigate("/student/payments");
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center space-x-4">
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">QR Payment</h1>
          <p className="text-muted-foreground">Scan QR code to pay hostel fees</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* QR Code Section */}
        <Card className="border-2 border-primary/20">
          <CardHeader className="bg-gradient-to-r from-primary to-primary/80 rounded-t-lg">
            <CardTitle className="text-white text-center">Scan QR Code</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center space-y-4">
              {/* QR Code Placeholder - In real implementation, this would be generated */}
              <div className="w-64 h-64 bg-white border-4 border-primary/20 rounded-lg flex items-center justify-center">
                <div className="w-56 h-56 bg-gradient-to-br from-primary/10 to-secondary/10 rounded flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-black/80 rounded-lg mb-4 mx-auto"></div>
                    <p className="text-sm text-muted-foreground">QR Code</p>
                    <p className="text-xs text-muted-foreground">Scan with any UPI app</p>
                  </div>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                size="sm"
                className="border-primary text-primary hover:bg-primary/10"
              >
                <Download className="h-4 w-4 mr-2" />
                Download QR
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Payment Details */}
        <Card className="border-2 border-secondary/20">
          <CardHeader className="bg-gradient-to-r from-secondary to-secondary/80 rounded-t-lg">
            <CardTitle className="text-white">Payment Details</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Amount:</span>
                <span className="font-bold text-lg">₹{paymentData.amount?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">For Month:</span>
                <span className="font-medium">{paymentData.month}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Student:</span>
                <span className="font-medium">{user?.name || "Student"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Room:</span>
                <span className="font-medium">{user?.roomNumber || "N/A"}</span>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">UPI Details:</p>
                <div className="flex items-center justify-between bg-muted/50 p-3 rounded-lg">
                  <div>
                    <p className="font-medium">{merchantName}</p>
                    <p className="text-sm text-muted-foreground">{upiId}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyUPI}
                    className={copied ? "border-success text-success" : ""}
                  >
                    {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-4">
              <Button 
                onClick={handlePaymentSuccess}
                className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
              >
                I have completed the payment
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate(-1)}
                className="w-full"
              >
                Cancel Payment
              </Button>
            </div>

            <div className="text-xs text-muted-foreground pt-2">
              <p>• Scan QR code with any UPI app (GPay, PhonePe, Paytm, etc.)</p>
              <p>• Payment will be verified within 24 hours</p>
              <p>• Keep screenshot of successful transaction</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QRPayment;