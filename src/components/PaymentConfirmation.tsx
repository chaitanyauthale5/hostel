import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Eye, Upload, Check, X, Camera, Trash2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Tesseract from 'tesseract.js';

interface PaymentConfirmationProps {
  open: boolean;
  onClose: () => void;
  payment: any;
  onConfirm: (paymentData: any) => void;
}

const PaymentConfirmation = ({ open, onClose, payment, onConfirm }: PaymentConfirmationProps) => {
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [isExtracting, setIsExtracting] = useState(false);
  const [notes, setNotes] = useState('');

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

  const handleConfirmPayment = () => {
    const confirmationData = {
      ...payment,
      paymentMethod,
      transactionId: paymentMethod === 'cash' ? null : transactionId,
      notes,
      confirmedAt: new Date().toISOString(),
      extractedText: paymentMethod === 'upi' ? extractedText : null
    };

    onConfirm(confirmationData);
    onClose();
    
    // Reset form
    setPaymentMethod('upi');
    setUploadedImage(null);
    setExtractedText('');
    setTransactionId('');
    setNotes('');
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Check className="h-5 w-5 mr-2" />
            Confirm Payment - {payment?.studentName}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Payment Summary */}
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg">Payment Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Student:</span>
                  <p className="font-medium">{payment?.studentName}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Amount:</span>
                  <p className="font-medium text-primary">₹{payment?.amount?.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Month:</span>
                  <p className="font-medium">{payment?.month}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Room:</span>
                  <p className="font-medium">{payment?.roomNumber}</p>
                </div>
              </div>
            </CardContent>
          </Card>

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
                  <div className="flex items-center justify-between">
                    <Label>Uploaded Image</Label>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setUploadedImage(null);
                        setExtractedText('');
                        setTransactionId('');
                      }}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remove
                    </Button>
                  </div>
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
            <Button variant="outline" onClick={onClose}>
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
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentConfirmation;