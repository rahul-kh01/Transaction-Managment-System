import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import OrderItemTable from "../../common/Order/OrderItemTable";

const OrderDetailsDialog = ({
  open,
  onOpenChange,
  selectedOrder,
  getStatusColor,
  getPaymentIcon,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
        </DialogHeader>
        {selectedOrder && (
          <div className="space-y-4">
            {/* Order Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div>
                  <strong>Order ID:</strong> {selectedOrder.id}
                </div>
                <div>
                  <strong>Date:</strong>{" "}
                  {selectedOrder.createdAt
                    ? selectedOrder.createdAt.slice(0, 10)
                    : "-"}
                </div>
                <div>
                  <strong>Status:</strong>{" "}
                  <Badge className={getStatusColor(selectedOrder.status)}>
                    {selectedOrder.status}
                  </Badge>
                </div>
                <div>
                  <strong>Payment:</strong>{" "}
                  <span className="inline-flex items-center gap-1">
                    {getPaymentIcon(selectedOrder.paymentType)}{" "}
                    {selectedOrder.paymentType || "-"}
                  </span>
                </div>
                <div>
                  <strong>Amount:</strong>{" "}
                  {selectedOrder.totalAmount
                    ? `₹${selectedOrder.totalAmount}`
                    : "-"}
                </div>
              </div>
              <div>
                <div className="font-semibold mb-1">Customer Details</div>
                <div>
                  <strong>Name:</strong>{" "}
                  {selectedOrder.customer?.name ||
                    selectedOrder.customer?.fullName ||
                    "-"}
                </div>
                <div>
                  <strong>Phone:</strong> {selectedOrder.customer?.phone || "-"}
                </div>
                <div>
                  <strong>Email:</strong> {selectedOrder.customer?.email || "-"}
                </div>
                <div>
                  <strong>Address:</strong>{" "}
                  {selectedOrder.customer?.address || "-"}
                </div>
              </div>
            </div>
            {/* Cashier Details */}
            <div className="font-semibold mt-2 mb-1">Cashier Details</div>
            <div className="mb-2">
              <div>
                <strong>Name:</strong>{" "}
                {selectedOrder.cashier?.name ||
                  selectedOrder.cashier?.fullName ||
                  selectedOrder.cashierId ||
                  "-"}
              </div>
              <div>
                <strong>ID:</strong>{" "}
                {selectedOrder.cashier?.id || selectedOrder.cashierId || "-"}
              </div>
            </div>
            {/* Order Items */}
            <div className="font-semibold mb-1">Order Items</div>
            <div className="overflow-x-auto">
              <OrderItemTable selectedOrder={selectedOrder} />
            </div>
            <DialogClose asChild>
              <Button className="mt-4 w-full" variant="outline">
                Close
              </Button>
            </DialogClose>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsDialog;
