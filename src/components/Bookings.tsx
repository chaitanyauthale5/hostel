import { useState } from "react";
import { Calendar, Plus, Clock, MapPin, User, Phone, CreditCard, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Booking {
  id: string;
  guestName: string;
  email: string;
  phone: string;
  room: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  totalAmount: number;
  status: 'confirmed' | 'pending' | 'cancelled' | 'checked-in' | 'checked-out';
  paymentStatus: 'paid' | 'partial' | 'pending';
  bookingDate: string;
  specialRequests?: string;
}

const mockBookings: Booking[] = [
  {
    id: 'BK001',
    guestName: 'Alice Johnson',
    email: 'alice.johnson@email.com',
    phone: '+1 555 123 4567',
    room: 'A-105',
    checkIn: '2024-07-08',
    checkOut: '2024-07-15',
    nights: 7,
    guests: 1,
    totalAmount: 175,
    status: 'confirmed',
    paymentStatus: 'paid',
    bookingDate: '2024-06-15',
    specialRequests: 'Quiet room preferred'
  },
  {
    id: 'BK002',
    guestName: 'Bob Wilson',
    email: 'bob.wilson@email.com',
    phone: '+44 789 456 1230',
    room: 'B-203',
    checkIn: '2024-07-10',
    checkOut: '2024-07-20',
    nights: 10,
    guests: 2,
    totalAmount: 400,
    status: 'pending',
    paymentStatus: 'pending',
    bookingDate: '2024-07-01'
  },
  {
    id: 'BK003',
    guestName: 'Carol Martinez',
    email: 'carol.martinez@email.com',
    phone: '+34 612 789 456',
    room: 'C-301',
    checkIn: '2024-07-05',
    checkOut: '2024-07-12',
    nights: 7,
    guests: 1,
    totalAmount: 210,
    status: 'checked-in',
    paymentStatus: 'paid',
    bookingDate: '2024-06-20'
  },
  {
    id: 'BK004',
    guestName: 'David Kim',
    email: 'david.kim@email.com',
    phone: '+82 10 1234 5678',
    room: 'A-202',
    checkIn: '2024-06-28',
    checkOut: '2024-07-05',
    nights: 7,
    guests: 1,
    totalAmount: 175,
    status: 'checked-out',
    paymentStatus: 'paid',
    bookingDate: '2024-06-10'
  },
  {
    id: 'BK005',
    guestName: 'Eva Brown',
    email: 'eva.brown@email.com',
    phone: '+1 333 999 8888',
    room: 'B-401',
    checkIn: '2024-07-12',
    checkOut: '2024-07-18',
    nights: 6,
    guests: 2,
    totalAmount: 240,
    status: 'cancelled',
    paymentStatus: 'pending',
    bookingDate: '2024-06-25'
  }
];

const BookingCard = ({ booking }: { booking: Booking }) => {
  const statusConfig = {
    'confirmed': { color: 'bg-primary text-primary-foreground', icon: CheckCircle },
    'pending': { color: 'bg-warning text-warning-foreground', icon: AlertCircle },
    'cancelled': { color: 'bg-danger text-danger-foreground', icon: XCircle },
    'checked-in': { color: 'bg-success text-success-foreground', icon: CheckCircle },
    'checked-out': { color: 'bg-muted text-muted-foreground', icon: CheckCircle }
  };

  const paymentConfig = {
    'paid': { color: 'bg-success text-success-foreground', text: 'Paid' },
    'partial': { color: 'bg-warning text-warning-foreground', text: 'Partial' },
    'pending': { color: 'bg-danger text-danger-foreground', text: 'Pending' }
  };

  const statusInfo = statusConfig[booking.status];
  const paymentInfo = paymentConfig[booking.paymentStatus];
  const StatusIcon = statusInfo.icon;

  return (
    <Card className="transition-all duration-300 hover:shadow-medium">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <CardTitle className="text-lg">{booking.guestName}</CardTitle>
              <Badge variant="outline" className="text-xs">
                {booking.id}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">Room {booking.room}</p>
          </div>
          <div className="flex flex-col space-y-1">
            <Badge className={statusInfo.color}>
              <StatusIcon className="mr-1 h-3 w-3" />
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1).replace('-', ' ')}
            </Badge>
            <Badge className={paymentInfo.color}>
              <CreditCard className="mr-1 h-3 w-3" />
              {paymentInfo.text}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span>{booking.guests} guest{booking.guests > 1 ? 's' : ''}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span className="truncate">{booking.phone}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{booking.checkIn}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{booking.checkOut}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{booking.nights} nights</span>
          </div>
          <div className="text-right">
            <span className="text-lg font-semibold text-primary">${booking.totalAmount}</span>
          </div>
        </div>

        {booking.specialRequests && (
          <div className="p-2 bg-muted rounded text-xs">
            <strong>Special Requests:</strong> {booking.specialRequests}
          </div>
        )}

        <div className="border-t pt-4 flex space-x-2">
          {booking.status === 'pending' && (
            <>
              <Button size="sm" className="flex-1 bg-gradient-primary">
                Confirm
              </Button>
              <Button size="sm" variant="outline" className="flex-1">
                Cancel
              </Button>
            </>
          )}
          {booking.status === 'confirmed' && (
            <>
              <Button size="sm" className="flex-1 bg-gradient-secondary">
                Check In
              </Button>
              <Button size="sm" variant="outline" className="flex-1">
                Modify
              </Button>
            </>
          )}
          {booking.status === 'checked-in' && (
            <Button size="sm" className="flex-1 bg-gradient-secondary">
              Check Out
            </Button>
          )}
          <Button size="sm" variant="outline">
            Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const Bookings = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'confirmed' | 'pending' | 'cancelled' | 'checked-in' | 'checked-out'>('all');

  const filteredBookings = mockBookings.filter(booking => {
    const matchesSearch = booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.room.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const bookingStats = {
    total: mockBookings.length,
    confirmed: mockBookings.filter(b => b.status === 'confirmed').length,
    pending: mockBookings.filter(b => b.status === 'pending').length,
    checkedIn: mockBookings.filter(b => b.status === 'checked-in').length,
    revenue: mockBookings.filter(b => b.paymentStatus === 'paid').reduce((sum, b) => sum + b.totalAmount, 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Booking Management</h1>
          <p className="text-muted-foreground">Manage reservations and guest bookings</p>
        </div>
        <Button className="bg-gradient-primary hover:bg-primary-hover">
          <Plus className="mr-2 h-4 w-4" />
          New Booking
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Bookings</p>
                <p className="text-2xl font-bold">{bookingStats.total}</p>
              </div>
              <Calendar className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Confirmed</p>
                <p className="text-2xl font-bold text-primary">{bookingStats.confirmed}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-warning">{bookingStats.pending}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Checked In</p>
                <p className="text-2xl font-bold text-success">{bookingStats.checkedIn}</p>
              </div>
              <User className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Revenue</p>
                <p className="text-2xl font-bold text-secondary">${bookingStats.revenue}</p>
              </div>
              <CreditCard className="h-8 w-8 text-secondary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
        <div className="flex-1">
          <Input
            placeholder="Search bookings by guest name, email, room, or booking ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex space-x-2 overflow-x-auto">
          {(['all', 'confirmed', 'pending', 'checked-in', 'checked-out', 'cancelled'] as const).map((status) => (
            <Button
              key={status}
              variant={statusFilter === status ? 'default' : 'outline'}
              onClick={() => setStatusFilter(status)}
              size="sm"
              className="whitespace-nowrap"
            >
              {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
            </Button>
          ))}
        </div>
      </div>

      {/* Bookings Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredBookings.map((booking) => (
          <BookingCard key={booking.id} booking={booking} />
        ))}
      </div>

      {filteredBookings.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="mx-auto h-12 w-12 text-muted-foreground" />  
          <h3 className="mt-2 text-sm font-semibold text-foreground">No bookings found</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default Bookings;