import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useSelector } from "react-redux";
import { createRefund } from "../../../../Redux Toolkit/features/refund/refundThunks";
import { useDispatch } from "react-redux";
import { useState } from "react";

const returnReasons = [
  "Damaged product",
  "Wrong product",
  "Customer changed mind",
  "Product quality issue",
  "Pricing error",
  "Other",
];

const ReturnItemsSection = ({ selectedOrder, setShowReceiptDialog }) => {
  const { toast } = useToast();
  const { userProfile } = useSelector((state) => state.user);
  const { branch } = useSelector((state) => state.branch);
  const dispatch = useDispatch();

  const [returnReason, setReturnReason] = useState("");
  const [otherReason, setOtherReason] = useState("");
  const [refundMethod, setRefundMethod] = useState("");

  const processRefund = async () => {
    // setShowRefundDialog(false);
    setShowReceiptDialog(true);

    // Prepare refundDTO for API
    const refundDTO = {
      orderId: selectedOrder.id,
      branchId: branch?.id,
      cashierId: userProfile?.id,

      reason: returnReason === "Other" ? otherReason : returnReason,
      refundMethod:
        refundMethod === "original" ? selectedOrder.paymentType : refundMethod,
    };
    try {
      await dispatch(createRefund(refundDTO)).unwrap();
      toast({
        title: "Refund Processed",
        description: `Refund of ₹${selectedOrder.totalAmount} processed via ${refundDTO.refundMethod}`,
      });
    } catch (error) {
      toast({
        title: "Refund Failed",
        description: error || "Failed to process refund. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-1/2 p-4 flex flex-col">
      <Card className="mt-4">
        <CardContent className="p-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="return-reason" className="mb-2 block">
                Return Reason
              </Label>
              <Select
                value={returnReason}
                onValueChange={(value) => setReturnReason(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a reason..." />
                </SelectTrigger>
                <SelectContent>
                  {returnReasons.map((reason) => (
                    <SelectItem key={reason} value={reason}>
                      {reason}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {returnReason === "Other" && (
              <div>
                <Label htmlFor="other-reason" className="mb-2 block">
                  Specify Reason
                </Label>
                <Textarea
                  id="other-reason"
                  placeholder="Please specify the return reason"
                  value={otherReason}
                  onChange={(e) => setOtherReason(e.target.value)}
                />
              </div>
            )}
            <div>
              <Label htmlFor="refund-method" className="mb-2 block">
                Refund Method
              </Label>
              <Select value={refundMethod} onValueChange={setRefundMethod}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select refund method..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="original">
                    Original Payment Method ({selectedOrder.paymentMode})
                  </SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                  {selectedOrder.paymentMode !== "card" && (
                    <SelectItem value="card">Card</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="pt-4 border-t">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total Refund Amount:</span>
                <span>₹{selectedOrder.totalAmount}</span>
              </div>
            </div>
            <Button className="w-full" onClick={processRefund}>
              Process Refund
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReturnItemsSection;
