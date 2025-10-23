import React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FiSearch, FiFilter } from "react-icons/fi";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useState } from "react";
import { paymentModeMap, statusMap } from "./data";
import { getOrdersByBranch } from "../../../Redux Toolkit/features/order/orderThunks";

const OrdersFilters = () => {

    const dispatch = useDispatch();
  const branchId = useSelector((state) => state.branch.branch?.id);
  const { employees } = useSelector((state) => state.employee);

  const [filters, setFilters] = useState({
    cashierId: "all",
    paymentMode: "all",
    status: "all",
  });

    useEffect(() => {
      if (branchId) {
        const data = {
          branchId,
          cashierId: filters.cashierId !== "all" ? filters.cashierId : undefined,
          paymentType: paymentModeMap[filters.paymentMode],
          status: statusMap[filters.status],
        };
        console.log("filters data ", data);
        dispatch(getOrdersByBranch(data));
      }
    }, [branchId, filters, dispatch]);



  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {/* Payment Mode Filter */}
      <div>
        <Select
          value={filters.paymentMode}
          onValueChange={(value) =>
            setFilters({ ...filters, paymentMode: value })
          }
        >
          <SelectTrigger
            startIcon={<FiFilter className="h-4 w-4 text-gray-500" />}
            className="w-full"
          >
            <SelectValue placeholder="All Payment Modes" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Payment Modes</SelectItem>
            <SelectItem value="Cash">Cash</SelectItem>
            <SelectItem value="UPI">UPI</SelectItem>
            <SelectItem value="Card">Card</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {/* Cashier Filter */}
      <div>
        <Select
          value={filters.cashierId}
          onValueChange={(value) =>
            setFilters({ ...filters, cashierId: value })
          }
        >
          <SelectTrigger
            startIcon={<FiFilter className="h-4 w-4 text-gray-500" />}
            className="w-full"
          >
            <SelectValue placeholder="All Cashiers" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Cashiers</SelectItem>
            {employees &&
              employees.map((emp) => (
                <SelectItem key={emp.id} value={emp.id}>
                  {emp.fullName}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>
      {/* Status Filter */}
      <div>
        <Select
          value={filters.status}
          onValueChange={(value) => setFilters({ ...filters, status: value })}
        >
          <SelectTrigger
            startIcon={<FiFilter className="h-4 w-4 text-gray-500" />}
            className="w-full"
          >
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Cancelled">Cancelled</SelectItem>
            <SelectItem value="Refunded">Refunded</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default OrdersFilters;
