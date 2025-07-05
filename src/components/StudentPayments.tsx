
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Download, Calendar, IndianRupee, CheckCircle, Clock, AlertCircle } from "lucide-react";

interface StudentPaymentsProps {
  user: any;
}

const StudentPayments = ({ user }: StudentPaymentsProps) => {
  const payments = [
    {
      id: 1,
      month: 'January 2024',
      amount: 8500,
      dueDate: '2024-01-05',
      paidDate: '2024-01-03',
      status: 'paid',
      method: 'UPI',
      transactionId: 'TXN123456789'
    },
    {
      id: 2,
      month: 'February 2024',
      amount: 8500,
      dueDate: '2024-02-05',
      paidDate: '2024-02-01',
      status: 'paid',
      method: 'Bank Transfer',
      transactionId: 'TXN987654321'
    },
    {
      id: 3,
      month: 'March 2024',
      amount: 8500,
      dueDate: '2024-03-05',
      paidDate: null,
      status: 'pending',
      method: null,
      transactionId: null
    },
    {
      id: 4,
      month: 'April 2024',
      amount: 8500,
      dueDate: '2024-04-05',
      paidDate: null,
      status: 'overdue',
      method: null,
      transactionId: null
    }
  ];

  const totalDue = payments.filter(p => p.status !== 'paid').reduce((sum, p) => sum + p.amount, 0);
  const totalPaid = payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-success text-success-foreground';
      case 'pending': return 'bg-warning text-warning-foreground';
      case 'overdue': return 'bg-danger text-danger-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'overdue': return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Payment History
        </h1>
        <p className="text-muted-foreground">Track your hostel fee payments and dues</p>
      </div>

      {/* Payment Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-2 border-success/20">
          <CardHeader className="bg-gradient-to-r from-success to-success/80 rounded-t-lg">
            <CardTitle className="text-white flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              Total Paid
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <IndianRupee className="h-6 w-6 text-success mr-1" />
              <span className="text-2xl font-bold text-success">{totalPaid.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-danger/20">
          <CardHeader className="bg-gradient-to-r from-danger to-danger/80 rounded-t-lg">
            <CardTitle className="text-white flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              Total Due
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <IndianRupee className="h-6 w-6 text-danger mr-1" />
              <span className="text-2xl font-bold text-danger">{totalDue.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-primary/20">
          <CardHeader className="bg-gradient-primary rounded-t-lg">
            <CardTitle className="text-white flex items-center">
              <CreditCard className="h-5 w-5 mr-2" />
              Monthly Fee
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <IndianRupee className="h-6 w-6 text-primary mr-1" />
              <span className="text-2xl font-bold text-primary">8,500</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment History */}
      <Card className="border-2 border-secondary/20">
        <CardHeader className="bg-gradient-secondary rounded-t-lg">
          <CardTitle className="text-white">Payment Records</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {payments.map((payment) => (
              <div key={payment.id} className="border-l-4 border-primary/30 pl-4 py-4 bg-gradient-to-r from-muted/20 to-transparent rounded-r-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-primary">
                      <IndianRupee className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{payment.month}</h3>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Due: {payment.dueDate}</span>
                        {payment.paidDate && (
                          <>
                            <span>•</span>
                            <span>Paid: {payment.paidDate}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right space-y-2">
                    <div className="flex items-center">
                      <IndianRupee className="h-5 w-5 mr-1" />
                      <span className="text-xl font-bold">₹{payment.amount.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(payment.status)}>
                        {getStatusIcon(payment.status)}
                        <span className="ml-1 capitalize">{payment.status}</span>
                      </Badge>
                      {payment.status === 'paid' && (
                        <Button size="sm" variant="outline" className="border-success text-success hover:bg-success/10">
                          <Download className="h-4 w-4 mr-1" />
                          Receipt
                        </Button>
                      )}
                      {payment.status !== 'paid' && (
                        <Button size="sm" className="rainbow-bg text-white hover:opacity-90">
                          Pay Now
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
                
                {payment.transactionId && (
                  <div className="mt-2 text-sm text-muted-foreground">
                    Transaction ID: {payment.transactionId} • Method: {payment.method}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentPayments;
