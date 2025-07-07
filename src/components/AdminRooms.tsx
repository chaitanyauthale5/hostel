
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Home, Search, Plus, Edit, Wrench, Trash2, Users, Bed } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const AdminRooms = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('roomNumber');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [showAddForm, setShowAddForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState<any>(null);
  
  const [rooms, setRooms] = useState([
    {
      id: 1,
      roomNumber: 'A-101',
      floor: '1st Floor',
      capacity: 2,
      occupancy: 2,
      status: 'occupied',
      type: 'Double',
      rent: 8500,
      facilities: ['AC', 'WiFi', 'Attached Bathroom'],
      students: ['John Smith', 'Mike Johnson']
    },
    {
      id: 2,
      roomNumber: 'A-102',
      floor: '1st Floor',
      capacity: 1,
      occupancy: 0,
      status: 'available',
      type: 'Single',
      rent: 12000,
      facilities: ['AC', 'WiFi', 'Attached Bathroom', 'Balcony'],
      students: []
    },
    {
      id: 3,
      roomNumber: 'B-201',
      floor: '2nd Floor',
      capacity: 3,
      occupancy: 1,
      status: 'partially_occupied',
      type: 'Triple',
      rent: 7000,
      facilities: ['Fan', 'WiFi', 'Shared Bathroom'],
      students: ['Priya Sharma']
    },
    {
      id: 4,
      roomNumber: 'C-301',
      floor: '3rd Floor',
      capacity: 2,
      occupancy: 0,
      status: 'maintenance',
      type: 'Double',
      rent: 8500,
      facilities: ['AC', 'WiFi', 'Attached Bathroom'],
      students: []
    }
  ]);

  const [newRoom, setNewRoom] = useState({
    roomNumber: '',
    floor: '',
    capacity: 1,
    type: 'Single',
    rent: 0,
    facilities: [] as string[]
  });

  const filteredRooms = rooms
    .filter(room => {
      const matchesSearch = room.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           room.floor.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || room.status === filterStatus;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const aValue = a[sortBy as keyof typeof a];
      const bValue = b[sortBy as keyof typeof b];
      const comparison = aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-success text-success-foreground';
      case 'occupied': return 'bg-primary text-primary-foreground';
      case 'partially_occupied': return 'bg-warning text-warning-foreground';
      case 'maintenance': return 'bg-danger text-danger-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const handleAddRoom = (e: React.FormEvent) => {
    e.preventDefault();
    const room = {
      id: rooms.length + 1,
      ...newRoom,
      occupancy: 0,
      status: 'available',
      students: []
    };
    setRooms([...rooms, room]);
    setNewRoom({
      roomNumber: '', floor: '', capacity: 1, type: 'Single', rent: 0, facilities: []
    });
    setShowAddForm(false);
    toast({
      title: "Room Added",
      description: "New room has been added successfully.",
    });
  };

  const handleEditRoom = (id: number) => {
    const room = rooms.find(r => r.id === id);
    if (room) {
      setEditingRoom({...room});
      setEditDialogOpen(true);
    }
  };

  const handleSaveEdit = () => {
    setRooms(rooms.map(r => r.id === editingRoom.id ? editingRoom : r));
    setEditDialogOpen(false);
    toast({
      title: "Room Updated",
      description: "Room information has been updated successfully.",
    });
  };

  const handleMaintenance = (id: number) => {
    setRooms(rooms.map(room => 
      room.id === id 
        ? { ...room, status: room.status === 'maintenance' ? 'available' : 'maintenance' }
        : room
    ));
    toast({
      title: "Maintenance Status Updated",
      description: "Room maintenance status has been updated.",
    });
  };

  const handleDeleteRoom = (id: number) => {
    setRooms(rooms.filter(r => r.id !== id));
    toast({
      title: "Room Deleted",
      description: "Room has been removed from the system.",
    });
  };

  const totalRooms = rooms.length;
  const availableRooms = rooms.filter(r => r.status === 'available').length;
  const occupiedRooms = rooms.filter(r => r.status === 'occupied').length;
  const maintenanceRooms = rooms.filter(r => r.status === 'maintenance').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">
            Room Management
          </h1>
          <p className="text-muted-foreground">Manage all hostel rooms and their status</p>
        </div>
        <Button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-primary hover:bg-primary-hover text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Room
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-2 border-primary/20 elegant-hover">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Home className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold text-primary">{totalRooms}</p>
                <p className="text-sm text-muted-foreground">Total Rooms</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-2 border-success/20 elegant-hover">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Home className="h-8 w-8 text-success" />
              <div>
                <p className="text-2xl font-bold text-success">{availableRooms}</p>
                <p className="text-sm text-muted-foreground">Available</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-primary/20 elegant-hover">
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

        <Card className="border-2 border-danger/20 elegant-hover">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Wrench className="h-8 w-8 text-danger" />
              <div>
                <p className="text-2xl font-bold text-danger">{maintenanceRooms}</p>
                <p className="text-sm text-muted-foreground">Maintenance</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search, Filter and Sort */}
      <Card className="border-2 border-secondary/20 elegant-hover">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search rooms by number or floor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-primary/30"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="occupied">Occupied</SelectItem>
                <SelectItem value="partially_occupied">Partially Occupied</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSort('roomNumber')}
                className={sortBy === 'roomNumber' ? 'bg-primary text-white' : ''}
              >
                Room {sortBy === 'roomNumber' && (sortOrder === 'asc' ? '↑' : '↓')}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSort('status')}
                className={sortBy === 'status' ? 'bg-primary text-white' : ''}
              >
                Status {sortBy === 'status' && (sortOrder === 'asc' ? '↑' : '↓')}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add Room Form */}
      {showAddForm && (
        <Card className="border-2 border-secondary/20 elegant-hover">
          <CardHeader className="bg-gradient-secondary rounded-t-lg">
            <CardTitle className="text-white">Add New Room</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleAddRoom} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="roomNumber">Room Number</Label>
                  <Input
                    id="roomNumber"
                    value={newRoom.roomNumber}
                    onChange={(e) => setNewRoom({...newRoom, roomNumber: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="floor">Floor</Label>
                  <Input
                    id="floor"
                    value={newRoom.floor}
                    onChange={(e) => setNewRoom({...newRoom, floor: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="capacity">Capacity</Label>
                  <Input
                    id="capacity"
                    type="number"
                    min="1"
                    max="4"
                    value={newRoom.capacity}
                    onChange={(e) => setNewRoom({...newRoom, capacity: parseInt(e.target.value)})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Room Type</Label>
                  <Select value={newRoom.type} onValueChange={(value) => setNewRoom({...newRoom, type: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Single">Single</SelectItem>
                      <SelectItem value="Double">Double</SelectItem>
                      <SelectItem value="Triple">Triple</SelectItem>
                      <SelectItem value="Quad">Quad</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="rent">Monthly Rent (₹)</Label>
                  <Input
                    id="rent"
                    type="number"
                    value={newRoom.rent}
                    onChange={(e) => setNewRoom({...newRoom, rent: parseInt(e.target.value)})}
                    required
                  />
                </div>
              </div>
              <div className="flex space-x-2">
                <Button type="submit" className="bg-primary hover:bg-primary-hover text-white">
                  Add Room
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredRooms.map((room) => (
          <Card key={room.id} className="border-2 border-primary/20 elegant-hover">
            <CardHeader className="bg-gradient-primary rounded-t-lg">
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">{room.roomNumber}</CardTitle>
                <Badge className={getStatusColor(room.status)}>
                  {room.status.replace('_', ' ')}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Home className="h-4 w-4 text-secondary" />
                    <span>{room.floor}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Bed className="h-4 w-4 text-primary" />
                    <span>{room.type}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Capacity: </span>
                    <span className="font-medium">{room.capacity}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Occupied: </span>
                    <span className="font-medium">{room.occupancy}</span>
                  </div>
                </div>

                <div>
                  <span className="text-muted-foreground">Rent: </span>
                  <span className="font-bold text-primary">₹{room.rent.toLocaleString()}/month</span>
                </div>

                {room.students.length > 0 && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Students:</p>
                    <div className="flex flex-wrap gap-1">
                      {room.students.map((student, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {student}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex space-x-2 pt-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => handleEditRoom(room.id)}
                    className="border-primary text-primary hover:bg-primary/10"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => handleMaintenance(room.id)}
                    className={room.status === 'maintenance' 
                      ? "border-success text-success hover:bg-success/10" 
                      : "border-warning text-warning hover:bg-warning/10"
                    }
                  >
                    <Wrench className="h-4 w-4 mr-1" />
                    {room.status === 'maintenance' ? 'Fixed' : 'Maintain'}
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => handleDeleteRoom(room.id)}
                    className="border-danger text-danger hover:bg-danger/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Edit Room Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Edit className="h-5 w-5 mr-2" />
              Edit Room
            </DialogTitle>
          </DialogHeader>
          {editingRoom && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-roomNumber">Room Number</Label>
                  <Input
                    id="edit-roomNumber"
                    value={editingRoom.roomNumber}
                    onChange={(e) => setEditingRoom({...editingRoom, roomNumber: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-floor">Floor</Label>
                  <Input
                    id="edit-floor"
                    value={editingRoom.floor}
                    onChange={(e) => setEditingRoom({...editingRoom, floor: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-capacity">Capacity</Label>
                  <Input
                    id="edit-capacity"
                    type="number"
                    min="1"
                    max="4"
                    value={editingRoom.capacity}
                    onChange={(e) => setEditingRoom({...editingRoom, capacity: parseInt(e.target.value)})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-type">Room Type</Label>
                  <Select value={editingRoom.type} onValueChange={(value) => setEditingRoom({...editingRoom, type: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Single">Single</SelectItem>
                      <SelectItem value="Double">Double</SelectItem>
                      <SelectItem value="Triple">Triple</SelectItem>
                      <SelectItem value="Quad">Quad</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="edit-rent">Monthly Rent (₹)</Label>
                  <Input
                    id="edit-rent"
                    type="number"
                    value={editingRoom.rent}
                    onChange={(e) => setEditingRoom({...editingRoom, rent: parseInt(e.target.value)})}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select value={editingRoom.status} onValueChange={(value) => setEditingRoom({...editingRoom, status: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="occupied">Occupied</SelectItem>
                      <SelectItem value="partially_occupied">Partially Occupied</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveEdit}>
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminRooms;
