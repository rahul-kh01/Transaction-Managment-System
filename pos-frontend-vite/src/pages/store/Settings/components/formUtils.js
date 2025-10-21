// Transform settings data to API format
export const transformSettingsToApiFormat = (settings) => {
  return {
    brand: settings.storeName,
    description: settings.storeDescription,
    storeType: "Retail Store", // Default value since we don't have this in settings
    contact: {
      address: settings.storeAddress,
      phone: settings.storePhone,
      email: settings.storeEmail,
    },
    // Additional fields that might be needed by the API
    currency: settings.currency,
    taxRate: parseFloat(settings.taxRate),
    timezone: settings.timezone,
    dateFormat: settings.dateFormat,
    receiptFooter: settings.receiptFooter,
  };
};

// Transform API data to settings format
export const transformApiToSettingsFormat = (apiData) => {
  return {
    storeName: apiData.brand || "",
    storeEmail: apiData.contact?.email || "",
    storePhone: apiData.contact?.phone || "",
    storeAddress: apiData.contact?.address || "",
    storeDescription: apiData.description || "",
    currency: apiData.currency || "USD",
    taxRate: apiData.taxRate?.toString() || "0",
    timezone: apiData.timezone || "America/New_York",
    dateFormat: apiData.dateFormat || "MM/DD/YYYY",
    receiptFooter: apiData.receiptFooter || "",
  };
};

// Get initial values for the form
export const getInitialValues = (storeData) => {
  if (!storeData) {
    return {
      storeName: "",
      storeEmail: "",
      storePhone: "",
      storeAddress: "",
      storeDescription: "",
      currency: "USD",
      taxRate: "0",
      timezone: "America/New_York",
      dateFormat: "MM/DD/YYYY",
      receiptFooter: "",
    };
  }

  return transformApiToSettingsFormat(storeData);
}; 