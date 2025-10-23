import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FiFileText } from "react-icons/fi";
import { useSelector } from "react-redux";
import {
  resetOrder,
  selectPaymentMethod,
  selectTotal,
} from "../../../Redux Toolkit/features/cart/cartSlice";
import { useDispatch } from "react-redux";
import { useToast } from "../../../components/ui/use-toast";

const ReceiptDialog = ({ showReceiptDialog, setShowReceiptDialog }) => {
  const paymentMethod = useSelector(selectPaymentMethod);
  const total = useSelector(selectTotal);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const finishOrder = () => {
    setShowReceiptDialog(false);
    // Reset the order
    dispatch(resetOrder());

    toast({
      title: "Order Completed",
      description: "Receipt printed and order saved successfully",
    });
  };

  return (
    <Dialog open={showReceiptDialog} onOpenChange={setShowReceiptDialog}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Receipt</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="text-center">
            <FiFileText className="w-16 h-16 mx-auto text-green-600 mb-4" />
            <h3 className="text-lg font-semibold">Payment Successful!</h3>
            <p className="text-sm text-gray-600">Receipt has been printed</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Order Total:</span>
                <span className="font-semibold">₹{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Payment Method:</span>
                <span className="font-semibold capitalize">
                  {paymentMethod}
                </span>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={finishOrder} className="w-full">
            Start New Order
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReceiptDialog;
