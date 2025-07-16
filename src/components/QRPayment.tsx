import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Download, Copy, CheckCircle, Upload, Camera, Check } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import Tesseract from 'tesseract.js';

interface QRPaymentProps {
  user?: any;
}

const QRPayment = ({ user }: QRPaymentProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [isExtracting, setIsExtracting] = useState(false);
  const [notes, setNotes] = useState('');

  const paymentData = location.state || { amount: 8500, month: "January 2024", studentName: "Sneha Patel", roomNumber: "A-102" };
  
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

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setUploadedImage(imageUrl);

    if (paymentMethod === 'upi') {
      setIsExtracting(true);
      toast({
        title: "Processing Image",
        description: "Extracting transaction details from the image...",
      });

      try {
        const { data: { text } } = await Tesseract.recognize(file, 'eng', {
          logger: m => console.log(m)
        });
        
        setExtractedText(text);
        
        // Extract transaction ID using regex patterns
        const transactionPatterns = [
          /UPI.*?(\d{12,})/i,
          /transaction.*?id.*?[:\s]([a-zA-Z0-9]{10,})/i,
          /ref.*?no.*?[:\s]([a-zA-Z0-9]{10,})/i,
          /txn.*?[:\s]([a-zA-Z0-9]{10,})/i
        ];

        let extractedId = '';
        for (const pattern of transactionPatterns) {
          const match = text.match(pattern);
          if (match && match[1]) {
            extractedId = match[1];
            break;
          }
        }

        if (extractedId) {
          setTransactionId(extractedId);
          toast({
            title: "Transaction ID Extracted",
            description: `Found transaction ID: ${extractedId}`,
          });
        } else {
          toast({
            title: "Manual Entry Required",
            description: "Could not automatically extract transaction ID. Please enter manually.",
            variant: "destructive"
          });
        }
      } catch (error) {
        toast({
          title: "Extraction Failed",
          description: "Failed to extract text from image. Please enter transaction ID manually.",
          variant: "destructive"
        });
      } finally {
        setIsExtracting(false);
        // Clear the image after extraction to save space
        setTimeout(() => {
          setUploadedImage(null);
          URL.revokeObjectURL(imageUrl);
        }, 3000);
      }
    }
  };

  const handleConfirmPayment = async () => {
    try {
      // Insert payment record into Supabase
      const { error } = await supabase
        .from('payments')
        .insert({
          student_id: user?.id, // Assuming user object has student id
          room_number: paymentData.roomNumber,
          amount: paymentData.amount,
          month: paymentData.month,
          due_date: new Date().toISOString().split('T')[0],
          payment_date: new Date().toISOString().split('T')[0],
          status: 'pending_confirmation',
          payment_method: paymentMethod,
          transaction_id: paymentMethod === 'cash' ? null : transactionId,
          notes,
          extracted_text: paymentMethod === 'upi' ? extractedText : null
        });

      if (error) {
        toast({
          title: "Error",
          description: "Failed to submit payment. Please try again.",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Payment Submitted",
        description: "Your payment has been submitted for admin confirmation.",
      });
      
      navigate("/student/payments");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit payment. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handlePaymentSuccess = () => {
    setShowConfirmation(true);
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

      {/* Payment Confirmation Section */}
      {showConfirmation && (
        <Card className="border-2 border-primary/20 mt-6">
          <CardHeader className="bg-gradient-to-r from-primary to-primary/80 rounded-t-lg">
            <CardTitle className="text-white flex items-center">
              <Check className="h-5 w-5 mr-2" />
              Confirm Payment - {paymentData.studentName}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            {/* Payment Summary */}
            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Payment Summary</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Student:</span>
                  <p className="font-medium">{paymentData.studentName}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Amount:</span>
                  <p className="font-medium text-primary">₹{paymentData.amount?.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Month:</span>
                  <p className="font-medium">{paymentData.month}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Room:</span>
                  <p className="font-medium">{paymentData.roomNumber}</p>
                </div>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="space-y-2">
              <Label>Payment Method</Label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="upi">UPI Payment</SelectItem>
                  <SelectItem value="cash">Cash Payment</SelectItem>
                  <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* UPI Payment - Image Upload and OCR */}
            {paymentMethod === 'upi' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Upload Payment Screenshot</Label>
                  <div className="border-2 border-dashed border-primary/30 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="payment-screenshot"
                    />
                    <label 
                      htmlFor="payment-screenshot" 
                      className="cursor-pointer flex flex-col items-center space-y-2"
                    >
                      <Camera className="h-8 w-8 text-primary" />
                      <span className="text-sm font-medium">Upload Payment Screenshot</span>
                      <span className="text-xs text-muted-foreground">
                        JPG, PNG, or other image formats
                      </span>
                    </label>
                  </div>
                </div>

                {uploadedImage && (
                  <div className="space-y-2">
                    <Label>Uploaded Image</Label>
                    <img 
                      src={uploadedImage} 
                      alt="Payment screenshot" 
                      className="max-w-full h-32 object-contain border rounded"
                    />
                    {isExtracting && (
                      <p className="text-sm text-primary">Extracting transaction details...</p>
                    )}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="transaction-id">Transaction ID</Label>
                  <Input
                    id="transaction-id"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    placeholder="Enter or auto-extracted transaction ID"
                    required
                  />
                  {extractedText && (
                    <details className="text-xs">
                      <summary className="cursor-pointer text-muted-foreground">
                        View extracted text
                      </summary>
                      <div className="mt-2 p-2 bg-muted rounded text-muted-foreground">
                        {extractedText}
                      </div>
                    </details>
                  )}
                </div>
              </div>
            )}

            {/* Cash Payment */}
            {paymentMethod === 'cash' && (
              <div className="p-4 bg-warning/10 rounded-lg">
                <p className="text-sm">
                  <strong>Cash Payment:</strong> No additional verification required. 
                  Please ensure the cash amount has been received.
                </p>
              </div>
            )}

            {/* Bank Transfer */}
            {paymentMethod === 'bank_transfer' && (
              <div className="space-y-2">
                <Label htmlFor="bank-transaction-id">Bank Transaction ID</Label>
                <Input
                  id="bank-transaction-id"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  placeholder="Enter bank transaction/reference number"
                  required
                />
              </div>
            )}

            {/* Additional Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes (Optional)</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any additional notes about this payment..."
                rows={2}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-2 pt-4 border-t">
              <Button 
                variant="outline" 
                onClick={() => setShowConfirmation(false)}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleConfirmPayment}
                disabled={paymentMethod !== 'cash' && !transactionId}
                className="bg-success text-success-foreground hover:bg-success/90"
              >
                <Check className="h-4 w-4 mr-2" />
                Confirm Payment
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default QRPayment;