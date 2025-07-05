
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { BedDouble, Search, Plus, Edit, Settings, Users, Wrench } from "lucide-react";
import { useState } from "react";

const AdminRooms = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const rooms = [
    {
      id: 1,
      number: 'A-101',
      type: 'Single',
      capacity: 1,
      occupied: 1,
      status: 'occupied',
      rent: 8500,
      floor: 1,
      block: 'A',
      facilities: ['AC', 'Attached Bathroom', 'Balcony'],
      student: 'John Smith',
      lastMaintenance: '2024-01-15'
    },
    {
      id: 2,
      number: 'A-102',
      type: 'Single',
      capacity: 1,
      occupied: 1,
      status: 'occupied',
      rent: 8500,
      floor: 1,
      block: 'A',
      facilities: ['AC', 'Attached Bathroom'],
      student: 'Sneha Patel',
      lastMaintenance: '2024-01-10'
    },
    {
      id: 3,
      number: 'B-201',
      type: 'Double',
      capacity: 2,
      occupied: 0,
      status: 'available',
      rent: 6500,
      floor: 2,
      block: 'B',
      facilities: ['Fan', 'Attached Bathroom', 'Study Table'],
      student: null,
      lastMaintenance: '2024-01-20'
    },
    {
      id: 4,
      number: 'B-205',
      type: 'Double',
      capacity: 2,
      occupied: 1,
      status: 'occupied',
      rent: 6500,
      floor: 2,
      block: 'B',
      facilities: ['Fan', 'Attached Bathroom', 'Study Table'],
      student: 'Priya Sharma',
      lastMaintenance: '2024-01-05'
    },
    {
      id: 5,
      number: 'C-301',
      type: 'Triple',
      capacity: 3,
      occupied: 0,
      status: 'maintenance',
      rent: 5500,
      floor: 3,
      block: 'C',
      facilities: ['Fan', 'Common Bathroom', 'Study Table'],
      student: null,
      lastMaintenance: '2024-01-25'
    },
    {
      id: 6,
      number: 'C-304',
      type: 'Triple',
      capacity: 3,
      occupied: 1,
      status: 'occupied',
      rent: 5500,
      floor: 3,
      block: 'C',
      facilities: ['Fan', 'Common Bathroom', 'Study Table'],
      student: 'Ahmed Khan',
      lastMaintenance: '2023-12-15'
    }
  ];

  const filteredRooms = rooms.filter(room =>
    room.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.block.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-success text-success-foreground';
      case 'occupied': return 'bg-primary text-primary-foreground';
      case 'maintenance': return 'bg-warning text-warning-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available': return <BedDouble className="h-4 w-4" />;
      case 'occupied': return <Users className="h-4 w-4" />;
      case 'maintenance': return <Wrench className="h-4 w-4" />;
      default: return <BedDouble className="h-4 w-4" />;
    }
  };

  const totalRooms = rooms.length;
  const availableRooms = rooms.filter(r => r.status === 'available').length;
  const occupiedRooms = rooms.filter(r => r.status === 'occupied').length;
  const maintenanceRooms = rooms.filter(r => r.status === 'maintenance').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Room Management
          </h1>
          <p className="text-muted-foreground">Manage hostel rooms and allocations</p>
        </div>
        <Button className="rainbow-bg text-white hover:opacity-90">
          <Plus className="h-4 w-4 mr-2" />
          Add Room
        </Button>
      </div>

      {/* Room Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-2 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <BedDouble className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold text-primary">{totalRooms}</p>
                <p className="text-sm text-muted-foreground">Total Rooms</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-2 border-success/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <BedDouble className="h-8 w-8 text-success" />
              <div>
                <p className="text-2xl font-bold text-success">{availableRooms}</p>
                <p className="text-sm text-muted-foreground">Available</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold text-primary">{occupiedRooms}</p>
                <p className="text-sm text-muted-foreground">Occupied</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-warning/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Wrench className="h-8 w-8 text-warning" />
              <div>
                <p className="text-2xl font-bold text-warning">{maintenanceRooms}</p>
                <p className="text-sm text-muted-foreground">Maintenance</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="border-2 border-secondary/20">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search rooms by number, type, or block..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-primary/30"
            />
          </div>
        </CardContent>
      </Card>

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRooms.map((room) => (
          <Card key={room.id} className="border-2 border-primary/20">
            <CardHeader className="bg-gradient-primary rounded-t-lg">
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">{room.number}</CardTitle>
                <Badge className={getStatusColor(room.status)}>
                  {getStatusIcon(room.status)}
                  <span className="ml-1 capitalize">{room.status}</span>
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Type:</span>
                    <p className="font-medium">{room.type}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Rent:</span>
                    <p className="font-medium text-success">₹{room.rent.toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Capacity:</span>
                    <p className="font-medium">{room.capacity} bed(s)</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Occupied:</span>
                    <p className="font-medium">{room.occupied}/{room.capacity}</p>
                  </div>
                </div>

                <div className="text-sm">
                  <span className="text-muted-foreground">Block:</span>
                  <p className="font-medium">{room.block} - Floor {room.floor}</p>
                </div>

                {room.student && (
                  <div className="text-sm">
                    <span className="text-muted-foreground">Current Student:</span>
                    <p className="font-medium text-primary">{room.student}</p>
                  </div>
                )}

                <div className="text-sm">
                  <span className="text-muted-foreground">Facilities:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {room.facilities.map((facility, index) => (
                      <Badge key={index} variant="outline" className="text-xs border-secondary text-secondary">
                        {facility}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="text-xs text-muted-foreground">
                  Last Maintenance: {room.lastMaintenance}
                </div>

                <div className="flex space-x-2 pt-2">
                  <Button size="sm" variant="outline" className="border-primary text-primary hover:bg-primary/10 flex-1">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline" className="border-warning text-warning hover:bg-warning/10 flex-1">
                    <Settings className="h-4 w-4 mr-1" />
                    Maintain
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminRooms;
