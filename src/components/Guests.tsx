import { useState } from "react";
import { Users, Plus, Search, Filter, Mail, Phone, Calendar, MapPin, Edit, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  room: string;
  checkIn: string;
  checkOut: string;
  status: 'checked-in' | 'checked-out' | 'reserved';
  nationality: string;
  idNumber: string;
  totalStay: number;
}

const mockGuests: Guest[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1 234 567 8900',
    room: 'A-102',
    checkIn: '2024-07-01',
    checkOut: '2024-07-10',
    status: 'checked-in',
    nationality: 'USA',
    idNumber: 'P123456789',
    totalStay: 9
  },
  {
    id: '2',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@email.com',
    phone: '+44 789 123 4567',
    room: 'C-301',
    checkIn: '2024-06-28',
    checkOut: '2024-07-08',
    status: 'checked-in',
    nationality: 'UK',
    idNumber: 'GB987654321',
    totalStay: 10
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.johnson@email.com',
    phone: '+1 555 987 6543',
    room: 'B-205',
    checkIn: '2024-07-05',
    checkOut: '2024-07-12',
    status: 'reserved',
    nationality: 'Canada',
    idNumber: 'CA456789123',
    totalStay: 7
  },
  {
    id: '4',
    name: 'Emma Davis',
    email: 'emma.davis@email.com',
    phone: '+33 612 345 678',
    room: 'A-201',
    checkIn: '2024-06-20',
    checkOut: '2024-07-02',
    status: 'checked-out',
    nationality: 'France',
    idNumber: 'FR789123456',
    totalStay: 12
  },
  {
    id: '5',
    name: 'David Chen',
    email: 'david.chen@email.com',
    phone: '+86 138 0013 8000',
    room: 'C-405',
    checkIn: '2024-07-03',
    checkOut: '2024-07-15',
    status: 'checked-in',
    nationality: 'China',
    idNumber: 'CN321654987',
    totalStay: 12
  }
];

const GuestCard = ({ guest }: { guest: Guest }) => {
  const statusConfig = {
    'checked-in': { color: 'bg-success text-success-foreground', text: 'Checked In' },
    'checked-out': { color: 'bg-muted text-muted-foreground', text: 'Checked Out' },
    'reserved': { color: 'bg-warning text-warning-foreground', text: 'Reserved' }
  };

  const config = statusConfig[guest.status];
  const initials = guest.name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <Card className="transition-all duration-300 hover:shadow-medium">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-gradient-primary text-white font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{guest.name}</CardTitle>
              <p className="text-sm text-muted-foreground">Room {guest.room}</p>
            </div>
          </div>
          <Badge className={config.color}>
            {config.text}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span className="truncate">{guest.email}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span>{guest.phone}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{guest.checkIn}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{guest.checkOut}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{guest.nationality}</span>
          </div>
          <div className="text-sm">
            <span className="font-medium">{guest.totalStay} nights</span>
          </div>
        </div>

        <div className="border-t pt-4 flex space-x-2">
          <Button size="sm" variant="outline" className="flex-1">
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button size="sm" variant="outline" className="flex-1">
            View Details
          </Button>
          {guest.status === 'reserved' && (
            <Button size="sm" className="flex-1 bg-gradient-primary">
              Check In
            </Button>
          )}
          {guest.status === 'checked-in' && (
            <Button size="sm" className="flex-1 bg-gradient-secondary">
              Check Out
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const Guests = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'checked-in' | 'checked-out' | 'reserved'>('all');

  const filteredGuests = mockGuests.filter(guest => {
    const matchesSearch = guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guest.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guest.room.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || guest.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const guestStats = {
    total: mockGuests.length,
    checkedIn: mockGuests.filter(g => g.status === 'checked-in').length,
    reserved: mockGuests.filter(g => g.status === 'reserved').length,
    checkedOut: mockGuests.filter(g => g.status === 'checked-out').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Guest Management</h1>
          <p className="text-muted-foreground">Manage all guests and their stay information</p>
        </div>
        <Button className="bg-gradient-primary hover:bg-primary-hover">
          <Plus className="mr-2 h-4 w-4" />
          Add New Guest
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Guests</p>
                <p className="text-2xl font-bold">{guestStats.total}</p>
              </div>
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Checked In</p>
                <p className="text-2xl font-bold text-success">{guestStats.checkedIn}</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-success/20 flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-success"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Reserved</p>
                <p className="text-2xl font-bold text-warning">{guestStats.reserved}</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-warning/20 flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-warning"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Checked Out</p>
                <p className="text-2xl font-bold text-muted-foreground">{guestStats.checkedOut}</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-muted/20 flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-muted-foreground"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search guests by name, email, or room..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex space-x-2">
          {(['all', 'checked-in', 'reserved', 'checked-out'] as const).map((status) => (
            <Button
              key={status}
              variant={statusFilter === status ? 'default' : 'outline'}
              onClick={() => setStatusFilter(status)}
              size="sm"
            >
              {status === 'all' ? 'All' : status.split('-').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
              ).join(' ')}
            </Button>
          ))}
        </div>
      </div>

      {/* Guests Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredGuests.map((guest) => (
          <GuestCard key={guest.id} guest={guest} />
        ))}
      </div>

      {filteredGuests.length === 0 && (
        <div className="text-center py-12">
          <Users className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-2 text-sm font-semibold text-foreground">No guests found</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default Guests;