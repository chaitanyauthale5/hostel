import { useState } from "react";
import { BedDouble, Users, Wifi, Car, Coffee, CheckCircle, XCircle, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Room {
  id: string;
  number: string;
  type: string;
  capacity: number;
  status: 'available' | 'occupied' | 'maintenance';
  price: number;
  amenities: string[];
  currentGuest?: string;
  checkOut?: string;
}

const mockRooms: Room[] = [
  {
    id: '1',
    number: 'A-101',
    type: 'Single',
    capacity: 1,
    status: 'available',
    price: 25,
    amenities: ['wifi', 'ac', 'desk']
  },
  {
    id: '2',
    number: 'A-102',
    type: 'Double',
    capacity: 2,
    status: 'occupied',
    price: 40,
    amenities: ['wifi', 'ac', 'balcony'],
    currentGuest: 'John Smith',
    checkOut: '2024-07-10'
  },
  {
    id: '3',
    number: 'B-201',
    type: 'Dorm',
    capacity: 6,
    status: 'available',
    price: 15,
    amenities: ['wifi', 'lockers', 'shared_bath']
  },
  {
    id: '4',
    number: 'B-202',
    type: 'Suite',
    capacity: 4,
    status: 'maintenance',
    price: 80,
    amenities: ['wifi', 'ac', 'kitchen', 'private_bath']
  },
  {
    id: '5',
    number: 'C-301',
    type: 'Double',
    capacity: 2,
    status: 'occupied',
    price: 45,
    amenities: ['wifi', 'ac', 'balcony'],
    currentGuest: 'Sarah Wilson',
    checkOut: '2024-07-08'
  },
  {
    id: '6',
    number: 'C-302',
    type: 'Single',
    capacity: 1,
    status: 'available',
    price: 30,
    amenities: ['wifi', 'ac', 'desk', 'mini_fridge']
  }
];

const amenityIcons: Record<string, React.ComponentType<any>> = {
  wifi: Wifi,
  ac: Car,
  kitchen: Coffee,
  desk: BedDouble,
  balcony: BedDouble,
  lockers: BedDouble,
  shared_bath: BedDouble,
  private_bath: BedDouble,
  mini_fridge: Coffee
};

const RoomCard = ({ room }: { room: Room }) => {
  const statusConfig = {
    available: { color: 'bg-success', icon: CheckCircle, text: 'Available' },
    occupied: { color: 'bg-danger', icon: XCircle, text: 'Occupied' },
    maintenance: { color: 'bg-warning', icon: Clock, text: 'Maintenance' }
  };

  const config = statusConfig[room.status];
  const StatusIcon = config.icon;

  return (
    <Card className="transition-all duration-300 hover:shadow-medium">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">{room.number}</CardTitle>
          <Badge className={`${config.color} text-white`}>
            <StatusIcon className="mr-1 h-3 w-3" />
            {config.text}
          </Badge>
        </div>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{room.type}</span>
          <div className="flex items-center">
            <Users className="mr-1 h-3 w-3" />
            {room.capacity} guests
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">${room.price}</span>
          <span className="text-sm text-muted-foreground">per night</span>
        </div>

        {room.currentGuest && (
          <div className="p-3 bg-muted rounded-lg">
            <p className="text-sm font-medium">Current Guest: {room.currentGuest}</p>
            <p className="text-xs text-muted-foreground">Check-out: {room.checkOut}</p>
          </div>
        )}

        <div className="flex flex-wrap gap-1">
          {room.amenities.slice(0, 4).map((amenity) => {
            const Icon = amenityIcons[amenity] || Coffee;
            return (
              <Badge key={amenity} variant="outline" className="text-xs">
                <Icon className="mr-1 h-3 w-3" />
                {amenity.replace('_', ' ')}
              </Badge>
            );
          })}
        </div>

        <div className="flex space-x-2 pt-2">
          {room.status === 'available' && (
            <Button size="sm" className="flex-1">Book Room</Button>
          )}
          {room.status === 'occupied' && (
            <Button size="sm" variant="outline" className="flex-1">Check Out</Button>
          )}
          {room.status === 'maintenance' && (
            <Button size="sm" variant="outline" className="flex-1">Mark Fixed</Button>
          )}
          <Button size="sm" variant="outline">Details</Button>
        </div>
      </CardContent>
    </Card>
  );
};

const Rooms = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'available' | 'occupied' | 'maintenance'>('all');

  const filteredRooms = mockRooms.filter(room => {
    const matchesSearch = room.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         room.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || room.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const roomStats = {
    total: mockRooms.length,
    available: mockRooms.filter(r => r.status === 'available').length,
    occupied: mockRooms.filter(r => r.status === 'occupied').length,
    maintenance: mockRooms.filter(r => r.status === 'maintenance').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Room Management</h1>
          <p className="text-muted-foreground">Manage all rooms and their availability status</p>
        </div>
        <Button className="bg-gradient-primary hover:bg-primary-hover">
          Add New Room
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Rooms</p>
                <p className="text-2xl font-bold">{roomStats.total}</p>
              </div>
              <BedDouble className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Available</p>
                <p className="text-2xl font-bold text-success">{roomStats.available}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Occupied</p>
                <p className="text-2xl font-bold text-danger">{roomStats.occupied}</p>
              </div>
              <XCircle className="h-8 w-8 text-danger" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Maintenance</p>
                <p className="text-2xl font-bold text-warning">{roomStats.maintenance}</p>
              </div>
              <Clock className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
        <div className="flex-1">
          <Input
            placeholder="Search rooms by number or type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex space-x-2">
          {(['all', 'available', 'occupied', 'maintenance'] as const).map((status) => (
            <Button
              key={status}
              variant={statusFilter === status ? 'default' : 'outline'}
              onClick={() => setStatusFilter(status)}
              size="sm"
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* Rooms Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredRooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>

      {filteredRooms.length === 0 && (
        <div className="text-center py-12">
          <BedDouble className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-2 text-sm font-semibold text-foreground">No rooms found</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default Rooms;