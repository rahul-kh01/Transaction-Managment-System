import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Shield } from "lucide-react";
import ToggleSwitch from "./ToggleSwitch";

const SecuritySettings = ({ settings, onChange }) => {
  const securityOptions = [
    {
      name: "twoFactorAuth",
      title: "Two-Factor Authentication",
      description: "Add an extra layer of security"
    },
    {
      name: "ipRestriction",
      title: "IP Restriction",
      description: "Limit access to specific IP addresses"
    }
  ];

  const handleToggleChange = (e) => {
    const { name, checked } = e.target;
    onChange(name, checked);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  return (
    <Card id="security-settings">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Shield className="mr-2 h-5 w-5 text-emerald-500" />
          Security Settings
        </CardTitle>
        <CardDescription>
          Configure security options for your store
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {securityOptions.map((option) => (
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="passwordExpiry" className="text-sm font-medium">
                Password Expiry (days)
              </label>
              <Input
                id="passwordExpiry"
                name="passwordExpiry"
                type="number"
                value={settings.passwordExpiry}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="sessionTimeout" className="text-sm font-medium">
                Session Timeout (minutes)
              </label>
              <Input
                id="sessionTimeout"
                name="sessionTimeout"
                type="number"
                value={settings.sessionTimeout}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecuritySettings; 