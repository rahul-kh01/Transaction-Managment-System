import React from "react";
import { formatDate, getStatusBadgeVariant } from "./data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { FiEye } from "react-icons/fi";
import { FiPrinter } from "react-icons/fi";
import { FiRotateCcw } from "react-icons/fi";

const OrderTable = ({
  orders,
  handleViewOrder,
  handlePrintInvoice,
  handleInitiateReturn,
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Date/Time</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Payment Mode</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="font-medium">{order.id}</TableCell>
            <TableCell>{formatDate(order.createdAt)}</TableCell>
            <TableCell>
              {order.customer?.fullName || "Walk-in Customer"}
            </TableCell>
            <TableCell>₹{order.totalAmount?.toFixed(2) || "0.00"}</TableCell>
            <TableCell>{(order.paymentType)}</TableCell>
            <TableCell>
              <Badge
                variant={getStatusBadgeVariant(order.status)}
                className="capitalize"
              >
                {order.status || "COMPLETE"}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleViewOrder(order)}
                >
                  <FiEye className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handlePrintInvoice(order)}
                >
                  <FiPrinter className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleInitiateReturn(order)}
                >
                  <FiRotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default OrderTable;
