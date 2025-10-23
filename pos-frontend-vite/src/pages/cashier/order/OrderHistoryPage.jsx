import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import {
  FiSearch,
  FiPrinter,
  FiEye,
  FiRotateCcw,
  FiCalendar,
  FiLoader,
  FiRefreshCw,
  FiDownload,
} from "react-icons/fi";
import { getOrdersByCashier } from "@/Redux Toolkit/features/order/orderThunks";
import OrderDetails from "./OrderDetails/OrderDetails";

import OrderTable from "./OrderTable";
import { handleDownloadOrderPDF } from "./pdf/pdfUtils";

const OrderHistoryPage = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { userProfile } = useSelector((state) => state.user);
  const { orders, loading, error } = useSelector((state) => state.order);

  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("today");
  const [customDateRange, setCustomDateRange] = useState({
    start: "",
    end: "",
  });
  const [showOrderDetailsDialog, setShowOrderDetailsDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Fetch orders when component mounts
  useEffect(() => {
    if (userProfile?.id) {
      dispatch(getOrdersByCashier(userProfile.id));
    }
  }, [dispatch, userProfile]);

  // Show error toast if orders fail to load
  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      });
    }
  }, [error, toast]);

  // Get current date for filtering
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay());

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowOrderDetailsDialog(true);
  };

  const handlePrintInvoice = (order) => {
    toast({
      title: "Printing Invoice",
      description: `Printing invoice for order ${order.id}`,
    });
  };

  const handleInitiateReturn = (order) => {
    // In a real app, this would navigate to the return page with the order pre-selected
    toast({
      title: "Initiating Return",
      description: `Navigating to returns page for order ${order.id}`,
    });
  };

  
  const handleDownloadPDF = async () => {
    await handleDownloadOrderPDF(selectedOrder, toast);
  };

  const handleRefreshOrders = () => {
    if (userProfile?.id) {
      dispatch(getOrdersByCashier(userProfile.id));
      toast({
        title: "Refreshing Orders",
        description: "Orders are being refreshed...",
      });
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 bg-card border-b flex justify-between items-center">
        <h1 className="text-2xl font-bold">Order History</h1>
        <Button
          variant="outline"
          onClick={handleRefreshOrders}
          disabled={loading}
        >
          <FiRefreshCw
            className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
      </div>

      <div className="p-4 border-b">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[300px]">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by order ID or customer..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant={dateFilter === "today" ? "default" : "outline"}
              onClick={() => setDateFilter("today")}
            >
              Today
            </Button>
            <Button
              variant={dateFilter === "week" ? "default" : "outline"}
              onClick={() => setDateFilter("week")}
            >
              This Week
            </Button>
            <Button
              variant={dateFilter === "month" ? "default" : "outline"}
              onClick={() => setDateFilter("month")}
            >
              This Month
            </Button>
            <Button
              variant={dateFilter === "custom" ? "default" : "outline"}
              onClick={() => setDateFilter("custom")}
            >
              <FiCalendar className="h-4 w-4 mr-2" />
              Custom
            </Button>
          </div>
        </div>

        {dateFilter === "custom" && (
          <div className="mt-4 flex gap-4 items-end">
            <div className="flex-1">
              <Label htmlFor="start-date">Start Date</Label>
              <Input
                id="start-date"
                type="date"
                value={customDateRange.start}
                onChange={(e) =>
                  setCustomDateRange({
                    ...customDateRange,
                    start: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="end-date">End Date</Label>
              <Input
                id="end-date"
                type="date"
                value={customDateRange.end}
                onChange={(e) =>
                  setCustomDateRange({
                    ...customDateRange,
                    end: e.target.value,
                  })
                }
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setCustomDateRange({ start: "", end: "" })}
            >
              Clear
            </Button>
          </div>
        )}
      </div>

      <div className="flex-1 p-4 overflow-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
            <FiLoader className="animate-spin h-16 w-16 text-primary" />
            <p className="mt-4">Loading orders...</p>
          </div>
        ) : orders.length > 0 ? (
          <OrderTable
            orders={orders}
            handleInitiateReturn={handleInitiateReturn}
            handlePrintInvoice={handlePrintInvoice}
            handleViewOrder={handleViewOrder}
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
            <FiSearch size={48} strokeWidth={1} />
            <p className="mt-4">No orders found</p>
            <p className="text-sm">Try adjusting your search or date filters</p>
          </div>
        )}
      </div>

      {/* Order Details Dialog */}
      <Dialog
        open={showOrderDetailsDialog}
        onOpenChange={setShowOrderDetailsDialog}
      >
        {selectedOrder && (
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Order Details - Invoice</DialogTitle>
            </DialogHeader>
            <OrderDetails selectedOrder={selectedOrder} />

            <DialogFooter className="gap-2 sm:gap-0 space-x-3">
              <Button variant="outline" onClick={handleDownloadPDF}>
                <FiDownload className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
              <Button
                variant=""
                onClick={() => handlePrintInvoice(selectedOrder)}
              >
                <FiPrinter className="h-4 w-4 mr-2" />
                Print Invoice
              </Button>
             
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default OrderHistoryPage;
