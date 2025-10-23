import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStoreByAdmin } from "@/Redux Toolkit/features/store/storeThunks";
import { toast } from "@/components/ui/use-toast";
import {
  SettingsHeader,
  SettingsNavigation,
  SettingsContent
} from "./components";

export default function Settings() {
  const dispatch = useDispatch();
  const { store} = useSelector((state) => state.store);
  // Sample store settings data - in a real app, this would come from Redux
  const [storeSettings, setStoreSettings] = useState({
    storeName: "My POS Store",
    storeEmail: "contact@myposstore.com",
    storePhone: "(555) 123-4567",
    storeAddress: "123 Main St, Anytown, USA 12345",
    storeLogo: "/logo.png",
    storeDescription: "A modern point of sale system for retail businesses.",
    currency: "USD",
    taxRate: "7.5",
    timezone: "America/New_York",
    dateFormat: "MM/DD/YYYY",
    receiptFooter: "Thank you for shopping with us!",
  });

  // Sample notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    lowStockAlerts: true,
    salesReports: true,
    employeeActivity: true,
  });

  // Sample security settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    passwordExpiry: "90",
    sessionTimeout: "30",
    ipRestriction: false,
  });

  // Sample payment settings
  const [paymentSettings, setPaymentSettings] = useState({
    acceptCash: true,
    acceptCredit: true,
    acceptDebit: true,
    acceptMobile: true,
    stripeEnabled: false,
    paypalEnabled: false,
  });

  const [activeSection] = useState("store-settings");

  // Fetch store data on component mount
  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        await dispatch(getStoreByAdmin()).unwrap();
      } catch (err) {
        toast({
          title: "Error",
          description: err || "Failed to fetch store data",
          variant: "destructive",
        });
      }
    };

    fetchStoreData();
  }, [dispatch]);

  // Update store settings when store data is loaded
  useEffect(() => {
    if (store) {
      setStoreSettings({
        storeName: store.brand || "",
        storeEmail: store.contact?.email || "",
        storePhone: store.contact?.phone || "",
        storeAddress: store.contact?.address || "",
        storeDescription: store.description || "",
        currency: store.currency || "USD",
        taxRate: store.taxRate?.toString() || "0",
        timezone: store.timezone || "America/New_York",
        dateFormat: store.dateFormat || "MM/DD/YYYY",
        receiptFooter: store.receiptFooter || "",
      });
    }
  }, [store]);

  const handleStoreSettingsChange = (name, value) => {
    setStoreSettings({
      ...storeSettings,
      [name]: value,
    });
  };

  const handleNotificationSettingsChange = (name, value) => {
    setNotificationSettings({
      ...notificationSettings,
      [name]: value,
    });
  };

  const handleSecuritySettingsChange = (name, value) => {
    setSecuritySettings({
      ...securitySettings,
      [name]: value,
    });
  };

  const handlePaymentSettingsChange = (name, value) => {
    setPaymentSettings({
      ...paymentSettings,
      [name]: value,
    });
  };

  

  return (
    <div className="space-y-6">
      <SettingsHeader />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <SettingsNavigation activeSection={activeSection} />
        </div>

        <div className="md:col-span-2">
          <SettingsContent
            storeSettings={storeSettings}
            notificationSettings={notificationSettings}
            securitySettings={securitySettings}
            paymentSettings={paymentSettings}
            onStoreSettingsChange={handleStoreSettingsChange}
            onNotificationSettingsChange={handleNotificationSettingsChange}
            onSecuritySettingsChange={handleSecuritySettingsChange}
            onPaymentSettingsChange={handlePaymentSettingsChange}
          />
        </div>
      </div>
    </div>
  );
}