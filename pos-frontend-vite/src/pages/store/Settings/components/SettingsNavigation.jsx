import React from "react";
import { FiHome, FiBell, FiShield, FiCreditCard, FiDatabase, FiHelpCircle } from "react-icons/fi";

const SettingsNavigation = ({ activeSection }) => {
  const navItems = [
    {
      id: "store-settings",
      label: "Store Settings",
      icon: FiHome,
      href: "#store-settings"
    },
    {
      id: "notification-settings",
      label: "Notification Settings",
      icon: FiBell,
      href: "#notification-settings"
    },
    {
      id: "security-settings",
      label: "Security Settings",
      icon: FiShield,
      href: "#security-settings"
    },
    {
      id: "payment-settings",
      label: "Payment Settings",
      icon: FiCreditCard,
      href: "#payment-settings"
    },
    {
      id: "system-settings",
      label: "System Settings",
      icon: FiDatabase,
      href: "#system-settings"
    },
    {
      id: "help",
      label: "Help & Support",
      icon: FiHelpCircle,
      href: "#help"
    }
  ];

  return (
    <nav className="space-y-1">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeSection === item.id;
        
        return (
          <a
            key={item.id}
            href={item.href}
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
              isActive
                ? "bg-emerald-100 text-emerald-700"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <Icon className={`mr-3 h-5 w-5 ${
              isActive ? "text-emerald-500" : "text-gray-400"
            }`} />
            {item.label}
          </a>
        );
      })}
    </nav>
  );
};

export default SettingsNavigation; 