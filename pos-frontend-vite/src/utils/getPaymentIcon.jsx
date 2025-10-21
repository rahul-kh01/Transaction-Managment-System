import { BanknoteIcon, CreditCardIcon, SmartphoneIcon } from "lucide-react";

export const getPaymentIcon = (method) => {
  switch (method) {
    case "CASH":
      return <BanknoteIcon className="h-4 w-4 text-green-600" />; // Green for cash
    case "CARD":
      return <CreditCardIcon className="h-4 w-4 text-blue-600" />; // Blue for card
    case "UPI":
      return <SmartphoneIcon className="h-4 w-4 text-purple-600" />; // Purple for UPI
    default:
      return null;
  }
};
