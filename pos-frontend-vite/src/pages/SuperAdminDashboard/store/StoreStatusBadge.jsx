import React from "react";
import { Badge } from "../../../components/ui/badge";
import { FiCheckCircle, FiClock, FiXCircle } from "react-icons/fi";

const statusConfig = {
  active: {
    label: "Active",
    variant: "default",
    className: "bg-green-100 text-green-800 hover:bg-green-100",
    icon: <FiCheckCircle className="w-3 h-3" />,
  },
  pending: {
    label: "Pending",
    variant: "secondary",
    className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
    icon: <FiClock className="w-3 h-3" />,
  },
  blocked: {
    label: "Blocked",
    variant: "destructive",
    className: "bg-red-100 text-red-800 hover:bg-red-100",
    icon: <FiXCircle className="w-3 h-3" />,
  },
};

export default function StoreStatusBadge({ status }) {
  const config = statusConfig[status?.toLowerCase()] || statusConfig.pending;

  return (
    <Badge variant={config.variant} className={config.className}>
      <span className="flex items-center gap-1">
        {config.icon}
        {config.label}
      </span>
    </Badge>
  );
} 