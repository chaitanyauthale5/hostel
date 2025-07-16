
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { IndianRupee, Search, Download, Eye, Calendar, TrendingUp, Users, CreditCard, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import PaymentConfirmation from "./PaymentConfirmation";

const AdminPayments = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [monthFilter, setMonthFilter] = useState('all');
  
  const payments = [
    {
      id: 1,
      studentName: 'John Smith',
      roomNumber: 'A-101',
      month: 'January 2024',
      amount: 8500,
      status: 'paid',
      paymentDate: '2024-01-03',
      dueDate: '2024-01-05',
      method: 'UPI',
      transactionId: 'TXN123456789',
      lateFee: 0
    },
    {
      id: 2,
      studentName: 'Priya Sharma',
      roomNumber: 'B-205',
      month: 'January 2024',
      amount: 6500,
      status: 'paid',
      paymentDate: '2024-01-04',
      dueDate: '2024-01-05',
      method: 'Bank Transfer',
      transactionId: 'TXN987654321',
      lateFee: 0
    },
    {
      id: 3,
      studentName: 'Ahmed Khan',
      roomNumber: 'C-304',
      month: 'January 2024',
      amount: 5500,
      status: 'overdue',
      paymentDate: null,
      dueDate: '2024-01-05',
      method: null,
      transactionId: null,
      lateFee: 200
    },
    {
      id: 4,
      studentName: 'Sneha Patel',
      roomNumber: 'A-102',
      month: 'January 2024',
      amount: 8500,
      status: 'pending_confirmation',
      paymentDate: '2024-01-04',
      dueDate: '2024-01-05',
      method: 'UPI',
      transactionId: 'UPI240104567890',
      lateFee: 0,
      submittedFor: 'admin_confirmation'
    },
    {
      id: 5,
      studentName: 'Rahul Verma',
      roomNumber: 'B-203',
      month: 'February 2024',
      amount: 6500,
      status: 'pending_confirmation',
      paymentDate: '2024-02-02',
      dueDate: '2024-02-05',
      method: 'UPI',
      transactionId: 'UPI240202345678',
      lateFee: 0,
      submittedFor: 'admin_confirmation'
    }
  ];

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.month.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMonth = monthFilter === 'all' || payment.month.toLowerCase().includes(monthFilter);
    return matchesSearch && matchesMonth;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-success text-success-foreground';
      case 'pending': return 'bg-warning text-warning-foreground';
      case 'pending_confirmation': return 'bg-primary text-primary-foreground';
      case 'overdue': return 'bg-danger text-danger-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const totalRevenue = payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0);
  const pendingAmount = payments.filter(p => p.status !== 'paid').reduce((sum, p) => sum + p.amount + p.lateFee, 0);
  const totalStudents = payments.length;
  const paidCount = payments.filter(p => p.status === 'paid').length;
  
  const handleViewDetails = (payment: any) => {
    setSelectedPayment(payment);
    setDetailsDialogOpen(true);
  };
  
  const handleDownloadReceipt = (payment: any) => {
    toast({
      title: "Receipt Downloaded",
      description: `Receipt for ${payment.studentName} has been downloaded.`,
    });
  };

  const handleConfirmPayment = async (payment: any) => {
    try {
      // Update payment status in Supabase
      const { error } = await supabase
        .from('payments')
        .update({ 
          status: 'paid',
          payment_date: new Date().toISOString().split('T')[0]
        })
        .eq('id', payment.id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to confirm payment. Please try again.",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Payment Confirmed",
        description: `Payment for ${payment.studentName} has been confirmed and marked as paid.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to confirm payment. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handlePaymentConfirmed = (paymentData: any) => {
    toast({
      title: "Payment Confirmed",
      description: `Payment for ${paymentData.studentName} has been confirmed and marked as paid.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Payment Management
          </h1>
          <p className="text-muted-foreground">Track and manage hostel fee payments</p>
        </div>
        <Button className="rainbow-bg text-white hover:opacity-90">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Payment Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-2 border-success/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-8 w-8 text-success" />
              <div>
                <p className="text-2xl font-bold text-success">₹{totalRevenue.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-2 border-danger/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <IndianRupee className="h-8 w-8 text-danger" />
              <div>
                <p className="text-2xl font-bold text-danger">₹{pendingAmount.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Pending Amount</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold text-primary">{paidCount}/{totalStudents}</p>
                <p className="text-sm text-muted-foreground">Payments Received</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-warning/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CreditCard className="h-8 w-8 text-warning" />
              <div>
                <p className="text-2xl font-bold text-warning">{((paidCount/totalStudents) * 100).toFixed(1)}%</p>
                <p className="text-sm text-muted-foreground">Collection Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="border-2 border-secondary/20">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search payments by student name, room number, or month..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-primary/30"
              />
            </div>
            <Select value={monthFilter} onValueChange={setMonthFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Months</SelectItem>
                <SelectItem value="january">January 2024</SelectItem>
                <SelectItem value="february">February 2024</SelectItem>
                <SelectItem value="march">March 2024</SelectItem>
                <SelectItem value="december">December 2023</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Payments List */}
      <div className="space-y-4">
        {filteredPayments.map((payment) => (
          <Card key={payment.id} className="border-2 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-primary">
                    <IndianRupee className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{payment.studentName}</h3>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>Room {payment.roomNumber}</span>
                      <span>•</span>
                      <span>{payment.month}</span>
                      <span>•</span>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>Due: {payment.dueDate}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-right space-y-2">
                  <div className="flex items-center justify-end">
                    <IndianRupee className="h-5 w-5 mr-1" />
                    <span className="text-xl font-bold">₹{payment.amount.toLocaleString()}</span>
                    {payment.lateFee > 0 && (
                      <span className="text-sm text-danger ml-2">+₹{payment.lateFee} late fee</span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(payment.status)}>
                      {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                    </Badge>
                    {payment.status === 'paid' && (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-success text-success hover:bg-success/10"
                        onClick={() => handleDownloadReceipt(payment)}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Receipt
                      </Button>
                    )}
                    {(payment.status === 'pending' || payment.status === 'overdue' || payment.status === 'pending_confirmation') && (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-success text-success hover:bg-success/10"
                        onClick={() => handleConfirmPayment(payment)}
                      >
                        <Check className="h-4 w-4 mr-1" />
                        Confirm
                      </Button>
                    )}
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="border-primary text-primary hover:bg-primary/10"
                      onClick={() => handleViewDetails(payment)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Details
                    </Button>
                  </div>
                </div>
              </div>
              
              {(payment.status === 'paid' || payment.status === 'pending_confirmation') && (
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Payment Date:</span>
                      <p className="font-medium">{payment.paymentDate}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Method:</span>
                      <p className="font-medium">{payment.method}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Transaction ID:</span>
                      <p className="font-medium">{payment.transactionId}</p>
                    </div>
                  </div>
                  {payment.status === 'pending_confirmation' && (
                    <div className="mt-2 p-2 bg-primary/10 rounded">
                      <p className="text-sm text-primary font-medium">
                        ⏳ Payment submitted by student - Awaiting admin confirmation
                      </p>
                    </div>
                  )}
                </div>
              )}
              
              {payment.status === 'overdue' && (
                <div className="mt-4 p-3 bg-danger/10 rounded-lg">
                  <p className="text-sm text-danger font-medium">
                    Payment is overdue! Late fee of ₹{payment.lateFee} has been added.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Payment Details Dialog */}
      <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Eye className="h-5 w-5 mr-2" />
              Payment Details
            </DialogTitle>
          </DialogHeader>
          {selectedPayment && (
            <div className="space-y-6">
              {/* Student Information */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Student Information</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Name:</span>
                      <p className="font-medium">{selectedPayment.studentName}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Room Number:</span>
                      <p className="font-medium">{selectedPayment.roomNumber}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Payment Information</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Month:</span>
                      <p className="font-medium">{selectedPayment.month}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Amount:</span>
                      <p className="font-medium text-primary">₹{selectedPayment.amount.toLocaleString()}</p>
                    </div>
                    {selectedPayment.lateFee > 0 && (
                      <div>
                        <span className="text-muted-foreground">Late Fee:</span>
                        <p className="font-medium text-danger">₹{selectedPayment.lateFee}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Payment Status and Timeline */}
              <div>
                <h3 className="font-semibold text-lg mb-2">Status & Timeline</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Status:</span>
                    <Badge className={`ml-2 ${getStatusColor(selectedPayment.status)}`}>
                      {selectedPayment.status.charAt(0).toUpperCase() + selectedPayment.status.slice(1)}
                    </Badge>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Due Date:</span>
                    <p className="font-medium">{selectedPayment.dueDate}</p>
                  </div>
                  {selectedPayment.paymentDate && (
                    <div>
                      <span className="text-muted-foreground">Payment Date:</span>
                      <p className="font-medium">{selectedPayment.paymentDate}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Transaction Details (for paid payments) */}
              {selectedPayment.status === 'paid' && (
                <div>
                  <h3 className="font-semibold text-lg mb-2">Transaction Details</h3>
                  <div className="bg-success/10 p-4 rounded-lg space-y-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Payment Method:</span>
                      <p className="font-medium">{selectedPayment.method}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Transaction ID:</span>
                      <p className="font-medium font-mono">{selectedPayment.transactionId}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Total Amount Paid:</span>
                      <p className="font-bold text-success">₹{(selectedPayment.amount + selectedPayment.lateFee).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-end space-x-2 pt-4 border-t">
                {selectedPayment.status === 'paid' && (
                  <Button 
                    variant="outline" 
                    className="border-success text-success hover:bg-success/10"
                    onClick={() => handleDownloadReceipt(selectedPayment)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Receipt
                  </Button>
                )}
                <Button variant="outline" onClick={() => setDetailsDialogOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Payment Confirmation Dialog */}
      <PaymentConfirmation 
        open={confirmationOpen}
        onClose={() => setConfirmationOpen(false)}
        payment={selectedPayment}
        onConfirm={handlePaymentConfirmed}
      />
    </div>
  );
};

export default AdminPayments;
