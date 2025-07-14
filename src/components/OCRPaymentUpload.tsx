import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Loader2, CheckCircle, AlertCircle, X } from "lucide-react";
import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import Tesseract from 'tesseract.js';

interface OCRPaymentUploadProps {
  onPaymentSubmit: (paymentData: any) => void;
  onClose: () => void;
}

const OCRPaymentUpload = ({ onPaymentSubmit, onClose }: OCRPaymentUploadProps) => {
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [extractedTransactionId, setExtractedTransactionId] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [manualTransactionId, setManualTransactionId] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid File",
        description: "Please upload an image file.",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "Please upload an image smaller than 5MB.",
        variant: "destructive",
      });
      return;
    }

    setUploadedImage(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Start OCR processing if UPI payment
    if (paymentMethod === 'upi') {
      processImageWithOCR(file);
    }
  };

  const processImageWithOCR = async (imageFile: File) => {
    setIsProcessing(true);
    
    try {
      toast({
        title: "Processing Image",
        description: "Extracting transaction ID from your payment screenshot...",
      });

      const result = await Tesseract.recognize(imageFile, 'eng', {
        logger: m => console.log(m)
      });

      const text = result.data.text;
      console.log('OCR Result:', text);

      // Extract transaction ID patterns
      const transactionPatterns = [
        /UTR[:\s]*([A-Z0-9]{12,})/i,
        /Transaction[:\s]*ID[:\s]*([A-Z0-9]{12,})/i,
        /TXN[:\s]*([A-Z0-9]{12,})/i,
        /REF[:\s]*([A-Z0-9]{12,})/i,
        /UPI[:\s]*REF[:\s]*([A-Z0-9]{12,})/i,
        /([0-9]{12,})/g
      ];

      let extractedId = '';
      
      for (const pattern of transactionPatterns) {
        const match = text.match(pattern);
        if (match) {
          extractedId = match[1] || match[0];
          break;
        }
      }

      if (extractedId) {
        setExtractedTransactionId(extractedId);
        toast({
          title: "Transaction ID Extracted",
          description: `Found transaction ID: ${extractedId}`,
        });
      } else {
        toast({
          title: "No Transaction ID Found",
          description: "Could not extract transaction ID from the image. Please enter it manually.",
          variant: "destructive",
        });
      }
      
      // Clear the uploaded image after processing to save space
      setTimeout(() => {
        setUploadedImage(null);
        setImagePreview('');
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }, 2000);

    } catch (error) {
      console.error('OCR Error:', error);
      toast({
        title: "OCR Processing Failed",
        description: "Could not process the image. Please enter transaction ID manually.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSubmit = () => {
    if (!paymentMethod) {
      toast({
        title: "Payment Method Required",
        description: "Please select a payment method.",
        variant: "destructive",
      });
      return;
    }

    if (!amount) {
      toast({
        title: "Amount Required",
        description: "Please enter the payment amount.",
        variant: "destructive",
      });
      return;
    }

    if (paymentMethod === 'upi' && !extractedTransactionId && !manualTransactionId) {
      toast({
        title: "Transaction ID Required",
        description: "Please provide a transaction ID for UPI payments.",
        variant: "destructive",
      });
      return;
    }

    const paymentData = {
      method: paymentMethod,
      amount: parseFloat(amount),
      transactionId: paymentMethod === 'upi' ? (extractedTransactionId || manualTransactionId) : null,
      timestamp: new Date().toISOString(),
      status: 'pending_confirmation'
    };

    onPaymentSubmit(paymentData);
    toast({
      title: "Payment Submitted",
      description: "Your payment has been submitted for admin confirmation.",
    });
  };

  return (
    <div className="space-y-6">
      <Card className="border-2 border-primary/20">
        <CardHeader className="bg-gradient-primary rounded-t-lg">
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">Submit Payment</CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/10">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
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

          {/* Amount Input */}
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (₹)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter payment amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          {/* UPI Payment Section */}
          {paymentMethod === 'upi' && (
            <div className="space-y-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
              <h3 className="font-semibold text-primary">UPI Payment Verification</h3>
              
              {/* Image Upload */}
              <div className="space-y-2">
                <Label>Upload Payment Screenshot</Label>
                <div className="border-2 border-dashed border-primary/30 rounded-lg p-4 text-center">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <Upload className="h-8 w-8 mx-auto text-primary mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Click to upload payment screenshot
                    </p>
                  </label>
                </div>
              </div>

              {/* Image Preview */}
              {imagePreview && (
                <div className="space-y-2">
                  <Label>Image Preview</Label>
                  <div className="relative">
                    <img 
                      src={imagePreview} 
                      alt="Payment Screenshot" 
                      className="max-w-full h-32 object-contain rounded border"
                    />
                    {isProcessing && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded">
                        <div className="text-white text-center">
                          <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
                          <p className="text-sm">Processing...</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* OCR Result */}
              {extractedTransactionId && (
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-success">
                    <CheckCircle className="h-4 w-4" />
                    <Label>Extracted Transaction ID</Label>
                  </div>
                  <Input
                    value={extractedTransactionId}
                    readOnly
                    className="bg-success/10 border-success/30"
                  />
                </div>
              )}

              {/* Manual Transaction ID Input */}
              <div className="space-y-2">
                <Label htmlFor="manual-txn">Manual Transaction ID (if OCR failed)</Label>
                <Input
                  id="manual-txn"
                  placeholder="Enter transaction ID manually"
                  value={manualTransactionId}
                  onChange={(e) => setManualTransactionId(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Cash Payment Section */}
          {paymentMethod === 'cash' && (
            <div className="p-4 bg-warning/10 rounded-lg border border-warning/20">
              <div className="flex items-center space-x-2 text-warning mb-2">
                <AlertCircle className="h-4 w-4" />
                <h3 className="font-semibold">Cash Payment</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                For cash payments, please visit the admin office and submit your payment directly. 
                The admin will verify and confirm your payment.
              </p>
            </div>
          )}

          {/* Bank Transfer Section */}
          {paymentMethod === 'bank_transfer' && (
            <div className="space-y-2">
              <Label htmlFor="bank-ref">Bank Reference Number</Label>
              <Input
                id="bank-ref"
                placeholder="Enter bank reference number"
                value={manualTransactionId}
                onChange={(e) => setManualTransactionId(e.target.value)}
              />
            </div>
          )}

          {/* Submit Button */}
          <div className="flex space-x-2 pt-4">
            <Button 
              onClick={handleSubmit} 
              className="flex-1 bg-primary hover:bg-primary-hover text-white"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                'Submit Payment'
              )}
            </Button>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OCRPaymentUpload;