
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Download, Calendar, Users, IndianRupee, TrendingUp, PieChart, FileText } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const AdminReports = () => {
  const { toast } = useToast();
  const [selectedMonth, setSelectedMonth] = useState('january-2024');
  const [reportType, setReportType] = useState('monthly');

  const handleGenerateReport = (reportName: string) => {
    toast({
      title: "Generating Report",
      description: `${reportName} is being generated...`,
    });
    
    // Simulate report generation and download
    setTimeout(() => {
      // Create Excel-like data
      const reportData = generateReportData(reportName);
      downloadReport(reportData, reportName);
      
      toast({
        title: "Report Downloaded",
        description: `${reportName} has been successfully generated and downloaded.`,
      });
    }, 2000);
  };

  const generateReportData = (reportType: string) => {
    switch (reportType) {
      case 'Revenue Report':
        return {
          title: 'Sunshine Hostel - Revenue Report',
          period: selectedMonth,
          data: revenueData,
          summary: {
            totalRevenue: monthlyStats.totalRevenue,
            averageRevenue: revenueData.reduce((sum, r) => sum + r.revenue, 0) / revenueData.length,
            growth: '8.5%'
          }
        };
      case 'Student Report':
        return {
          title: 'Sunshine Hostel - Student Report',
          period: selectedMonth,
          data: [
            { metric: 'Total Students', value: monthlyStats.totalStudents },
            { metric: 'New Admissions', value: monthlyStats.newAdmissions },
            { metric: 'Occupancy Rate', value: `${monthlyStats.occupancyRate}%` }
          ]
        };
      case 'Occupancy Report':
        return {
          title: 'Sunshine Hostel - Occupancy Report',
          period: selectedMonth,
          data: roomTypeRevenue.map(r => ({
            roomType: r.type,
            count: r.count,
            occupancyRate: '85%'
          }))
        };
      default:
        return {
          title: `Sunshine Hostel - ${reportType}`,
          period: selectedMonth,
          data: []
        };
    }
  };

  const downloadReport = (data: any, reportName: string) => {
    // Create advanced Excel-like CSV content with enhanced formatting
    const csvContent = createAdvancedCSVContent(data, reportName);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    // Enhanced filename with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    link.href = URL.createObjectURL(blob);
    link.download = `Sunshine_Hostel_${reportName.toLowerCase().replace(/\s+/g, '_')}_${timestamp.split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  };

  const createAdvancedCSVContent = (data: any, reportName: string) => {
    let csv = '\uFEFF'; // BOM for proper UTF-8 encoding in Excel
    
    // Enhanced Header section with professional branding
    csv += '=================================================================\n';
    csv += '                    SUNSHINE HOSTEL MANAGEMENT SYSTEM            \n';
    csv += '                         COMPREHENSIVE REPORT                    \n';
    csv += '=================================================================\n';
    csv += `Report Type:, ${reportName}\n`;
    csv += `Generated On:, ${new Date().toLocaleDateString('en-IN')} at ${new Date().toLocaleTimeString('en-IN')}\n`;
    csv += `Report Period:, ${data.period}\n`;
    csv += `Generated By:, Admin Panel\n`;
    csv += `System Version:, v2.1.0\n`;
    csv += `Contact:, admin@sunshinehostel.com\n`;
    csv += '=================================================================\n\n';
    
    // Executive Summary with enhanced formatting
    if (data.summary) {
      csv += 'EXECUTIVE SUMMARY\n';
      csv += '========================================\n';
      Object.entries(data.summary).forEach(([key, value]) => {
        const formattedKey = key.replace(/([A-Z])/g, ' $1').toUpperCase();
        csv += `${formattedKey}:, ${value}\n`;
      });
      csv += '========================================\n\n';
    }
    
    // Main Data Section with enhanced formatting
    csv += 'DETAILED REPORT DATA\n';
    csv += '========================================\n';
    if (Array.isArray(data.data) && data.data.length > 0) {
      const headers = Object.keys(data.data[0]);
      // Format headers for better readability
      const formattedHeaders = headers.map(h => 
        h.replace(/([A-Z])/g, ' $1').toUpperCase().trim()
      );
      csv += formattedHeaders.join(',') + '\n';
      csv += headers.map(() => '========').join(',') + '\n'; // Enhanced separator
      
      data.data.forEach((row: any, index: number) => {
        csv += headers.map(header => {
          const value = row[header] || '';
          // Enhanced formatting for different data types
          if (typeof value === 'number') {
            if (header.toLowerCase().includes('revenue') || header.toLowerCase().includes('amount')) {
              return `"₹${value.toLocaleString('en-IN')}"`;
            }
            if (header.toLowerCase().includes('count') || header.toLowerCase().includes('student')) {
              return value;
            }
            return value.toLocaleString('en-IN');
          }
          if (typeof value === 'string' && value.includes('%')) {
            return `"${value}"`;
          }
          // Escape commas in text values
          return `"${value.toString().replace(/"/g, '""')}"`;
        }).join(',') + '\n';
      });
      
      // Add totals row for revenue data
      if (headers.some(h => h.toLowerCase().includes('revenue'))) {
        csv += headers.map(() => '========').join(',') + '\n';
        const totals = headers.map(header => {
          if (header.toLowerCase().includes('revenue')) {
            const total = data.data.reduce((sum: number, row: any) => sum + (row[header] || 0), 0);
            return `"TOTAL: ₹${total.toLocaleString('en-IN')}"`;
          }
          if (header.toLowerCase().includes('count')) {
            const total = data.data.reduce((sum: number, row: any) => sum + (row[header] || 0), 0);
            return `"TOTAL: ${total}"`;
          }
          return '""';
        });
        csv += totals.join(',') + '\n';
      }
    }
    
    // Enhanced Footer with contact information
    csv += '\n=================================================================\n';
    csv += '                           IMPORTANT NOTES                       \n';
    csv += '=================================================================\n';
    csv += 'This report is confidential and generated for internal use only.\n';
    csv += 'Data accuracy: Real-time as of generation timestamp\n';
    csv += 'For queries or support: admin@sunshinehostel.com\n';
    csv += 'Phone: +91-XXX-XXX-XXXX | Website: www.sunshinehostel.com\n';
    csv += '\n';
    csv += 'Report generated by: Sunshine Hostel Management System v2.1.0\n';
    csv += 'Software by: Hostel Management Solutions Pvt. Ltd.\n';
    csv += '=================================================================\n';
    
    return csv;
  };
  
  const monthlyStats = {
    totalRevenue: 142500,
    totalStudents: 18,
    occupancyRate: 85.7,
    newAdmissions: 3,
    pendingPayments: 17000,
    complaintsResolved: 8,
    maintenanceRequests: 5
  };

  const revenueData = [
    { month: 'Aug 2023', revenue: 125000, students: 15 },
    { month: 'Sep 2023', revenue: 135000, students: 16 },
    { month: 'Oct 2023', revenue: 140000, students: 17 },
    { month: 'Nov 2023', revenue: 138000, students: 17 },
    { month: 'Dec 2023', revenue: 142000, students: 18 },
    { month: 'Jan 2024', revenue: 142500, students: 18 }
  ];

  const roomTypeRevenue = [
    { type: 'Single AC', count: 8, revenue: 68000, rate: 8500 },
    { type: 'Double Sharing', count: 6, revenue: 39000, rate: 6500 },
    { type: 'Triple Sharing', count: 4, revenue: 22000, rate: 5500 }
  ];

  const studentsByDepartment = [
    { department: 'Computer Science', count: 6, percentage: 33.3 },
    { department: 'Mechanical Engineering', count: 4, percentage: 22.2 },
    { department: 'Electrical Engineering', count: 3, percentage: 16.7 },
    { department: 'Civil Engineering', count: 3, percentage: 16.7 },
    { department: 'Chemical Engineering', count: 2, percentage: 11.1 }
  ];

  const feeStatus = [
    { status: 'Paid on Time', count: 14, percentage: 77.8, color: 'text-success' },
    { status: 'Pending', count: 2, percentage: 11.1, color: 'text-warning' },
    { status: 'Overdue', count: 2, percentage: 11.1, color: 'text-danger' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Reports & Analytics
          </h1>
          <p className="text-muted-foreground">Comprehensive hostel management reports</p>
        </div>
        <div className="flex space-x-2">
          <Select value={reportType} onValueChange={setReportType}>
            <SelectTrigger className="w-40 border-primary/30">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            className="rainbow-bg text-white hover:opacity-90"
            onClick={() => {
              handleGenerateReport('Revenue Report');
              handleGenerateReport('Student Report');
              handleGenerateReport('Occupancy Report');
              toast({
                title: "Exporting All Reports",
                description: "All reports are being generated and downloaded.",
              });
            }}
          >
            <Download className="h-4 w-4 mr-2" />
            Export All
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-2 border-success/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <IndianRupee className="h-8 w-8 text-success" />
              <div>
                <p className="text-2xl font-bold text-success">₹{monthlyStats.totalRevenue.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-2 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold text-primary">{monthlyStats.totalStudents}</p>
                <p className="text-sm text-muted-foreground">Total Students</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-secondary/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-8 w-8 text-secondary" />
              <div>
                <p className="text-2xl font-bold text-secondary">{monthlyStats.occupancyRate}%</p>
                <p className="text-sm text-muted-foreground">Occupancy Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-warning/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-8 w-8 text-warning" />
              <div>
                <p className="text-2xl font-bold text-warning">{monthlyStats.newAdmissions}</p>
                <p className="text-sm text-muted-foreground">New Admissions</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Trend */}
      <Card className="border-2 border-primary/20">
        <CardHeader className="bg-gradient-primary rounded-t-lg">
          <CardTitle className="text-white flex items-center">
            <BarChart3 className="h-5 w-5 mr-2" />
            Revenue Trend (Last 6 Months)
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {revenueData.map((data, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg">
                <div>
                  <p className="font-semibold">{data.month}</p>
                  <p className="text-sm text-muted-foreground">{data.students} students</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-success">₹{data.revenue.toLocaleString()}</p>
                  <div className="w-32 bg-muted rounded-full h-2 mt-1">
                    <div 
                      className="bg-gradient-primary h-2 rounded-full" 
                      style={{ width: `${(data.revenue / 150000) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Room Type Revenue */}
        <Card className="border-2 border-secondary/20">
          <CardHeader className="bg-gradient-secondary rounded-t-lg">
            <CardTitle className="text-white flex items-center">
              <PieChart className="h-5 w-5 mr-2" />
              Revenue by Room Type
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {roomTypeRevenue.map((room, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gradient-to-r from-secondary/10 to-primary/10 rounded-lg">
                  <div>
                    <p className="font-semibold">{room.type}</p>
                    <p className="text-sm text-muted-foreground">{room.count} rooms × ₹{room.rate.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-success">₹{room.revenue.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">
                      {((room.revenue / monthlyStats.totalRevenue) * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Fee Collection Breakdown */}
        <Card className="border-2 border-success/20">
          <CardHeader className="bg-gradient-to-r from-success to-success/80 rounded-t-lg">
            <CardTitle className="text-white flex items-center">
              <IndianRupee className="h-5 w-5 mr-2" />
              Monthly Fee Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-3">
              {roomTypeRevenue.map((room, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{room.type}</span>
                      <span className="text-sm text-muted-foreground">₹{room.revenue.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-gradient-primary h-2 rounded-full" 
                        style={{ width: `${(room.revenue / monthlyStats.totalRevenue) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fee Collection Status */}
      <Card className="border-2 border-warning/20">
        <CardHeader className="bg-gradient-to-r from-warning to-warning/80 rounded-t-lg">
          <CardTitle className="text-white flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Fee Collection Status
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {feeStatus.map((status, index) => (
              <div key={index} className="text-center p-4 bg-gradient-to-b from-muted/30 to-transparent rounded-lg">
                <p className={`text-3xl font-bold ${status.color}`}>{status.count}</p>
                <p className="text-sm font-medium mt-1">{status.status}</p>
                <p className="text-xs text-muted-foreground">{status.percentage}% of total</p>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-warning/10 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">Pending Collection</p>
                <p className="text-sm text-muted-foreground">Amount due from students</p>
              </div>
              <p className="text-2xl font-bold text-warning">₹{monthlyStats.pendingPayments.toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="border-2 border-primary/20">
        <CardHeader className="bg-gradient-primary rounded-t-lg">
          <CardTitle className="text-white">Generate Detailed Reports</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="border-success text-success hover:bg-success/10 h-16 flex-col"
              onClick={() => handleGenerateReport('Revenue Report')}
            >
              <IndianRupee className="h-6 w-6 mb-2" />
              Revenue Report
            </Button>
            <Button 
              variant="outline" 
              className="border-primary text-primary hover:bg-primary/10 h-16 flex-col"
              onClick={() => handleGenerateReport('Student Report')}
            >
              <Users className="h-6 w-6 mb-2" />
              Student Report
            </Button>
            <Button 
              variant="outline" 
              className="border-warning text-warning hover:bg-warning/10 h-16 flex-col"
              onClick={() => handleGenerateReport('Occupancy Report')}
            >
              <Calendar className="h-6 w-6 mb-2" />
              Occupancy Report
            </Button>
            <Button 
              variant="outline" 
              className="border-secondary text-secondary hover:bg-secondary/10 h-16 flex-col"
              onClick={() => handleGenerateReport('Custom Report')}
            >
              <FileText className="h-6 w-6 mb-2" />
              Custom Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminReports;
