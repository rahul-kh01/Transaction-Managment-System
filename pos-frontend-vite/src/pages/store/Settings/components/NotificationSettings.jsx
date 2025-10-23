import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FiBell } from "react-icons/fi";
import ToggleSwitch from "./ToggleSwitch";

const NotificationSettings = ({ settings, onChange }) => {
  const notificationOptions = [
    {
      name: "emailNotifications",
      title: "Email Notifications",
      description: "Receive notifications via email"
    },
    {
      name: "smsNotifications",
      title: "SMS Notifications",
      description: "Receive notifications via SMS"
    },
    {
      name: "lowStockAlerts",
      title: "Low Stock Alerts",
      description: "Get notified when inventory is low"
    },
    {
      name: "salesReports",
      title: "Sales Reports",
      description: "Receive periodic sales reports"
    },
    {
      name: "employeeActivity",
      title: "Employee Activity",
      description: "Get notified about employee activities"
    }
  ];

  const handleToggleChange = (e) => {
    const { name, checked } = e.target;
    onChange(name, checked);
  };

  return (
    <Card id="notification-settings">
      <CardHeader>
        <CardTitle className="flex items-center">
          <FiBell className="mr-2 h-5 w-5 text-emerald-500" />
          Notification Settings
        </CardTitle>
        <CardDescription>
          Configure how you receive alerts and notifications
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {notificationOptions.map((option) => (
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

export default NotificationSettings; 