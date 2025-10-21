import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Shield, Bell, Settings as SettingsIcon } from "lucide-react";
import ProfileSettingsForm from "./components/ProfileSettingsForm";
import SecuritySettingsForm from "./components/SecuritySettingsForm";
import NotificationSettingsForm from "./components/NotificationSettingsForm";
import SystemSettingsForm from "./components/SystemSettingsForm";
import { useSettingsState } from "./components/useSettingsState";

const SettingsTabTrigger = ({ value, children }) => (
  <TabsTrigger value={value} className="flex items-center gap-2">
    {children}
  </TabsTrigger>
);

export default function SettingsPage() {
  const {
    profileData,
    loading,
    passwordData,
    showPasswords,
    notifications,
    systemSettings,
    handleProfileUpdate,
    handlePasswordChange,
    handleNotificationToggle,
    handleSystemSettingToggle,
    handleProfileFieldChange,
    handlePasswordFieldChange,
    handleShowPasswordToggle,
  } = useSettingsState();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account and system preferences
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <SettingsTabTrigger value="profile">
            <User className="w-4 h-4" />
            Profile
          </SettingsTabTrigger>
          <SettingsTabTrigger value="security">
            <Shield className="w-4 h-4" />
            Security
          </SettingsTabTrigger>
          <SettingsTabTrigger value="notifications">
            <Bell className="w-4 h-4" />
            Notifications
          </SettingsTabTrigger>
          <SettingsTabTrigger value="system">
            <SettingsIcon className="w-4 h-4" />
            System
          </SettingsTabTrigger>
        </TabsList>

        <TabsContent value="profile">
          <ProfileSettingsForm
            profileData={profileData}
            onUpdate={handleProfileUpdate}
            onFieldChange={handleProfileFieldChange}
            loading={loading}
          />
        </TabsContent>

        <TabsContent value="security">
          <SecuritySettingsForm
            passwordData={passwordData}
            showPasswords={showPasswords}
            onPasswordChange={handlePasswordFieldChange}
            onShowPasswordToggle={handleShowPasswordToggle}
            onUpdate={handlePasswordChange}
          />
        </TabsContent>

        <TabsContent value="notifications">
          <NotificationSettingsForm
            notifications={notifications}
            onToggle={handleNotificationToggle}
          />
        </TabsContent>

        <TabsContent value="system">
          <SystemSettingsForm
            systemSettings={systemSettings}
            onToggle={handleSystemSettingToggle}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
} 