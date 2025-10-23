import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { Label } from "../../components/ui/label";
import { FiDollarSign, FiEdit, FiTrendingUp, FiTrendingDown } from "react-icons/fi";
import { useToast } from "../../components/ui/use-toast";
// import { useToast } from "../../hooks/use-toast";

// Mock commission data
const mockCommissions = [
  {
    id: 1,
    storeName: "Zosh Mart",
    currentRate: 2.5,
    previousRate: 2.0,
    totalEarnings: 12500,
    lastUpdated: "2025-01-10",
    status: "active",
  },
  {
    id: 2,
    storeName: "ABC Supermarket",
    currentRate: 3.0,
    previousRate: 3.0,
    totalEarnings: 8900,
    lastUpdated: "2025-01-08",
    status: "active",
  },
  {
    id: 3,
    storeName: "Fresh Groceries",
    currentRate: 2.0,
    previousRate: 2.5,
    totalEarnings: 15600,
    lastUpdated: "2025-01-12",
    status: "active",
  },
];

export default function CommissionsPage() {
  const [commissions, setCommissions] = useState(mockCommissions);
  const [selectedCommission, setSelectedCommission] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [newRate, setNewRate] = useState("");
  const { toast } = useToast();

  const handleEditCommission = (commission) => {
    setSelectedCommission(commission);
    setNewRate(commission.currentRate.toString());
    setEditDialogOpen(true);
  };

  const confirmEditCommission = () => {
    if (selectedCommission && newRate) {
      const rate = parseFloat(newRate);
      if (isNaN(rate) || rate < 0 || rate > 10) {
        toast({
          title: "Invalid Rate",
          description: "Commission rate must be between 0% and 10%",
          variant: "destructive",
        });
        return;
      }

      setCommissions(prev => prev.map(comm => 
        comm.id === selectedCommission.id 
          ? { ...comm, currentRate: rate, lastUpdated: new Date().toISOString().split('T')[0] }
          : comm
      ));

      toast({
        title: "Commission Updated",
        description: `Commission rate for ${selectedCommission.storeName} has been updated to ${rate}%`,
      });

      setEditDialogOpen(false);
      setSelectedCommission(null);
      setNewRate("");
    }
  };

  const getRateChange = (current, previous) => {
    const change = current - previous;
    if (change > 0) {
      return { value: `+${change}%`, className: "text-green-600", icon: <FiTrendingUp className="w-3 h-3" /> };
    } else if (change < 0) {
      return { value: `${change}%`, className: "text-red-600", icon: <FiTrendingDown className="w-3 h-3" /> };
    } else {
      return { value: "0%", className: "text-gray-600", icon: null };
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Commissions</h2>
        <p className="text-muted-foreground">
          Manage commission rates for all stores
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <FiDollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹37,000</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rate</CardTitle>
            <FiTrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.5%</div>
            <p className="text-xs text-muted-foreground">
              +0.2% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Stores</CardTitle>
            <FiDollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{commissions.length}</div>
            <p className="text-xs text-muted-foreground">
              All stores have commission rates set
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Commission Table */}
      <Card>
        <CardHeader>
          <CardTitle>Store Commission Rates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Store Name</TableHead>
                  <TableHead>Current Rate</TableHead>
                  <TableHead>Rate Change</TableHead>
                  <TableHead>Total Earnings</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {commissions.map((commission) => {
                  const rateChange = getRateChange(commission.currentRate, commission.previousRate);
                  return (
                    <TableRow key={commission.id}>
                      <TableCell className="font-medium">{commission.storeName}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-sm">
                          {commission.currentRate}%
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className={`flex items-center gap-1 ${rateChange.className}`}>
                          {rateChange.icon}
                          <span className="text-sm">{rateChange.value}</span>
                        </div>
                      </TableCell>
                      <TableCell>₹{commission.totalEarnings.toLocaleString()}</TableCell>
                      <TableCell>{commission.lastUpdated}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditCommission(commission)}
                        >
                          <FiEdit className="w-4 h-4 mr-1" />
                          Edit Rate
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Commission Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Commission Rate</DialogTitle>
            <DialogDescription>
              Update the commission rate for {selectedCommission?.storeName}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-rate">Current Rate</Label>
              <div className="text-sm text-muted-foreground">
                {selectedCommission?.currentRate}%
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-rate">New Rate (%)</Label>
              <Input
                id="new-rate"
                type="number"
                step="0.1"
                min="0"
                max="10"
                value={newRate}
                onChange={(e) => setNewRate(e.target.value)}
                placeholder="Enter new commission rate"
              />
              <p className="text-xs text-muted-foreground">
                Rate must be between 0% and 10%
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmEditCommission}>
              <FiEdit className="w-4 h-4 mr-2" />
              Update Rate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 