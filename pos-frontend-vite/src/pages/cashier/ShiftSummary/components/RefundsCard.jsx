import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FiCheckCircle } from 'react-icons/fi';

const RefundsCard = ({ shiftData }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">Refunds Processed</h2>
        {shiftData.refunds?.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Refund ID</TableHead>
                <TableHead>Order ID</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shiftData.refunds.map(refund => (
                <TableRow key={refund.id}>
                  <TableCell className="font-medium">RFD-{refund.id}</TableCell>
                  <TableCell>ORD-{refund.orderId}</TableCell>
                  <TableCell>{refund.reason}</TableCell>
                  <TableCell className="text-right text-destructive">₹{refund.amount?.toFixed(2)|| 999}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
            <FiCheckCircle size={48} strokeWidth={1} />
            <p className="mt-4">No refunds processed during this shift</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RefundsCard; 