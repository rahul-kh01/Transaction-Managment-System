import React from "react";
import { Badge } from "@/components/ui/badge";
import { StarIcon, UserIcon, Loader2 } from "lucide-react";
import CustomerCard from "./CustomerCard";

const CustomerList = ({
  customers,
  selectedCustomer,
  onSelectCustomer,
  loading = false,
}) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-4">
        <Loader2 className="animate-spin h-8 w-8 mb-4" />
        <p>Loading customers...</p>
      </div>
    );
  }

  if (!customers || customers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-4">
        <UserIcon size={48} strokeWidth={1} />
        <p className="mt-4">No customers found</p>
        <p className="text-sm">Try a different search term</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="divide-y">
        {customers.map((customer) => (
          <CustomerCard
            key={customer.id}
            customer={customer}
            onSelectCustomer={onSelectCustomer}
            selectedCustomer={selectedCustomer}
          />
        ))}
      </div>
    </div>
  );
};

export default CustomerList;
