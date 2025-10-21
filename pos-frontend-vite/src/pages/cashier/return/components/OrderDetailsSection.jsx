import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatDate } from '../../order/data';

const OrderDetailsSection = ({ selectedOrder, setSelectedOrder }) => (
  <div className="w-1/2 border-r p-4 flex flex-col">
    <div className="mb-4">
      <Button variant="outline" size="sm" onClick={() => setSelectedOrder(null)}>
        ← Back to Order Search
      </Button>
    </div>
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="font-semibold text-lg">Order {selectedOrder.id}</h2>
            <p className="text-sm text-muted-foreground">{formatDate(selectedOrder.createdAt)}</p>
          </div>
          <Badge variant="outline">
            {(selectedOrder.paymentType)}
          </Badge>
        </div>
        <div className="mb-4">
          <h3 className="font-medium text-sm text-muted-foreground mb-2">Customer</h3>
          <p>{selectedOrder?.customer?.fullName}</p>
          <p className="text-sm">{selectedOrder.customer?.phone}</p>
        </div>
        <div>
          <h3 className="font-medium text-sm text-muted-foreground mb-2">Order Summary</h3>
          <div className="text-sm">
            <div className="flex justify-between">
              <span>Total Items:</span>
              <span>{selectedOrder.items.reduce((sum, item) => sum + item.quantity, 0)}</span>
            </div>
            <div className="flex justify-between font-medium">
              <span>Order Total:</span>
              <span>₹{selectedOrder.totalAmount?.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
    <div className="flex-1 overflow-auto">
      <h3 className="font-semibold mb-2">Order Items</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Item</TableHead>
            <TableHead className="text-center">Qty</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {selectedOrder.items.map(item => (
            <TableRow key={item.id}>
              <TableCell>{item.product?.name}</TableCell>
              <TableCell className="text-center">{item.quantity}</TableCell>
              <TableCell className="text-right">₹{(item.product?.sellingPrice)?.toFixed(2)}</TableCell>
              <TableCell className="text-right">₹{(item.product?.sellingPrice * item.quantity).toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </div>
);

export default OrderDetailsSection; 