import { FiDollarSign, FiCreditCard, FiSmartphone } from "react-icons/fi";

export const getPaymentIcon = (method) => {
  switch (method) {
    case "CASH":
      return <FiDollarSign className="h-4 w-4 text-green-600" />; // Green for cash
    case "CARD":
      return <FiCreditCard className="h-4 w-4 text-blue-600" />; // Blue for card
    case "UPI":
      return <FiSmartphone className="h-4 w-4 text-purple-600" />; // Purple for UPI
    default:
      return null;
  }
};
