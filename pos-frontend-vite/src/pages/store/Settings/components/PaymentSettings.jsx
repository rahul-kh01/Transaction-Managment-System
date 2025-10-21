import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CreditCard } from "lucide-react";
import ToggleSwitch from "./ToggleSwitch";

const PaymentSettings = ({ settings, onChange }) => {
  const paymentOptions = [
    {
      name: "acceptCash",
      title: "Accept Cash",
      description: "Allow cash payments"
    },
    {
      name: "acceptCredit",
      title: "Accept Credit Cards",
      description: "Allow credit card payments"
    },
    {
      name: "acceptDebit",
      title: "Accept Debit Cards",
      description: "Allow debit card payments"
    },
    {
      name: "acceptMobile",
      title: "Accept Mobile Payments",
      description: "Allow mobile payment methods"
    },
    {
      name: "stripeEnabled",
      title: "Stripe Integration",
      description: "Enable Stripe payment gateway"
    },
    {
      name: "paypalEnabled",
      title: "PayPal Integration",
      description: "Enable PayPal payment gateway"
    }
  ];

  const handleToggleChange = (e) => {
    const { name, checked } = e.target;
    onChange(name, checked);
  };

  return (
    <Card id="payment-settings">
      <CardHeader>
        <CardTitle className="flex items-center">
          <CreditCard className="mr-2 h-5 w-5 text-emerald-500" />
          Payment Settings
        </CardTitle>
        <CardDescription>
          Configure payment methods and options
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {paymentOptions.map((option) => (
            <div key={option.name} className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium">{option.title}</h4>
                <p className="text-sm text-gray-500">{option.description}</p>
              </div>
              <ToggleSwitch
                name={option.name}
                checked={settings[option.name]}
                onChange={handleToggleChange}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentSettings; 