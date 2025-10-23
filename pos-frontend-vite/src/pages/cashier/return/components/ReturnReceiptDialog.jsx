import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FiPrinter } from "react-icons/fi";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

const ReturnReceiptDialog = ({
  showReceiptDialog,
  setShowReceiptDialog,
  selectedOrder,
  // returnItems,
  // calculateRefundAmount,
  // refundMethod,

  // returnReason,
  // otherReason,
  // finishReturn,
}) => (
  <Dialog open={showReceiptDialog} onOpenChange={setShowReceiptDialog}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Return Receipt</DialogTitle>
      </DialogHeader>
      <div className="bg-white p-6 max-h-96 overflow-y-auto">
        <div className="text-center mb-4">
          <h3 className="font-bold text-lg">POS SYSTEM</h3>
          <p className="text-sm">123 Main Street, City</p>
          <p className="text-sm">Tel: 123-456-7890</p>
        </div>
        <div className="text-center mb-4">
          <h4 className="font-bold">RETURN RECEIPT</h4>
        </div>
        <div className="mb-4">
          <p className="text-sm">
            <span className="font-medium">Return #:</span> RTN-
            {Date.now().toString().substring(8)}
          </p>
          <p className="text-sm">
            <span className="font-medium">Original Order:</span>{" "}
            {selectedOrder?.id}
          </p>
          <p className="text-sm">
            <span className="font-medium">Date:</span>{" "}
            {new Date().toLocaleString()}
          </p>
          <p className="text-sm">
            <span className="font-medium">Customer:</span>{" "}
            {selectedOrder?.customer.fullName}
          </p>
        </div>
        <Table className="w-full text-sm mb-4">
          <TableHeader>
            <TableRow>
              <TableHead className="text-left py-2">Item</TableHead>
              <TableHead className="text-center py-2">Qty</TableHead>
              <TableHead className="text-right py-2">Price</TableHead>
              <TableHead className="text-right py-2">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {selectedOrder.items
              
              .map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="py-2">{item.product?.name.slice(0, 20)+"..."}</TableCell>
                  <TableCell className="text-center py-2">{item.returnQuantity}</TableCell>
                  <TableCell className="text-right py-2">₹{item.product?.sellingPrice?.toFixed(2)}</TableCell>
                  <TableCell className="text-right py-2">
                    ₹{(item.product.sellingPrice * item.returnQuantity)?.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <div className="space-y-1 text-sm mb-4">
          <div className="flex justify-between font-bold border-t pt-1">
            <span>Total Refund</span>
            <span>₹{selectedOrder.totalAmount}</span>
          </div>
          <div className="flex justify-between pt-1">
            <span>Refund Method</span>
            <span>
              {selectedOrder.paymentType}
            </span>
          </div>
          <div className="flex justify-between pt-1">
            <span>Return Reason</span>
            {/* <span>{returnReason === "Other" ? otherReason : returnReason}</span> */}
          </div>
        </div>
        <div className="text-center text-sm mt-6">
          <p>Thank you for shopping with us!</p>
          <p>
            Return Policy: Items can be returned within 7 days of purchase with
            receipt
          </p>
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" className="gap-2" >
          <FiPrinter className="h-4 w-4" />
          Print & Complete
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default ReturnReceiptDialog;
