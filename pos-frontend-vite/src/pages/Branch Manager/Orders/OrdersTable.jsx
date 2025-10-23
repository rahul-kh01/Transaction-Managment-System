import React from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FiSearch, FiFileText, FiChevronUp } from "react-icons/fi";

const OrdersTable = ({ orders, loading, onViewDetails, onPrintInvoice, getStatusColor, getPaymentIcon }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">
            <div className="flex items-center gap-1">
              Order ID
              <FiChevronUp className="h-3 w-3" />
            </div>
          </TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Cashier</TableHead>
          <TableHead>
            <div className="flex items-center gap-1">
              Date
              <FiChevronUp className="h-3 w-3" />
            </div>
          </TableHead>
          <TableHead>
            <div className="flex items-center gap-1">
              Amount
              <FiChevronUp className="h-3 w-3" />
            </div>
          </TableHead>
          <TableHead>Payment Mode</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading ? (
          <TableRow>
            <TableCell colSpan={8} className="text-center py-4 text-gray-400">
              Loading orders...
            </TableCell>
          </TableRow>
        ) : orders.length > 0 ? (
          orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell>{order.customer?.fullName || "-"}</TableCell>
              <TableCell>{order.cashierId || "-"}</TableCell>
              <TableCell>{order.createdAt ? order.createdAt.slice(0, 10) : "-"}</TableCell>
              <TableCell>{order.totalAmount ? `₹${order.totalAmount}` : "-"}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {getPaymentIcon(order.paymentType)} {order.paymentType || "-"}
                </div>
              </TableCell>
              <TableCell>
                <Badge className={getStatusColor(order.status)} variant="secondary">
                  {order.status || "COMPLETE"}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onViewDetails(order.id)}
                    title="View Details"
                  >
                    <FiSearch className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onPrintInvoice(order.id)}
                    title="Print Invoice"
                  >
                    <FiFileText className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={8} className="text-center py-4 text-gray-500">
              No orders found matching your criteria
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default OrdersTable; 