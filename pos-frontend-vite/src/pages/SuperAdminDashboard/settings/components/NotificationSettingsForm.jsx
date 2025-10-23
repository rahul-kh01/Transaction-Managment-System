import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { FiBell } from "react-icons/fi";

const NotificationItem = ({ id, title, description, checked, onToggle }) => (
  <>
    <div className="flex items-center justify-between">
      <div>
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Switch id={id} checked={checked} onCheckedChange={onToggle} />
    </div>
    <Separator />
  </>
);

const NotificationSettingsForm = ({ notifications, onToggle }) => {
  const notificationItems = [
    {
      id: "newStoreRequests",
      title: "New Store Requests",
      description: "Get notified when new stores register",
    },
    {
      id: "storeApprovals",
      title: "Store Approvals",
      description: "Notifications for store approval actions",
    },
    {
      id: "commissionUpdates",
      title: "Commission Updates",
      description: "Alerts for commission rate changes",
    },
    {
      id: "systemAlerts",
      title: "System Alerts",
      description: "Important system notifications",
    },
    {
      id: "emailNotifications",
      title: "Email Notifications",
      description: "Receive notifications via email",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FiBell className="w-5 h-5" />
          Notification Preferences
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {notificationItems.map((item, index) => (
          <React.Fragment key={item.id}>
            <NotificationItem
              id={item.id}
              title={item.title}
              description={item.description}
              checked={notifications[item.id]}
              onToggle={() => onToggle(item.id)}
            />
            {index === notificationItems.length - 2 && <Separator />}
          </React.Fragment>
        ))}
      </CardContent>
    </Card>
  );
};

export default NotificationSettingsForm; 