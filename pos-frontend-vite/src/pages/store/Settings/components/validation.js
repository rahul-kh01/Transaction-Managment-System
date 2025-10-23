import * as Yup from "yup";

// Validation schema for store settings
export const StoreSettingsValidationSchema = Yup.object().shape({
  storeName: Yup.string()
    .min(2, "Store name must be at least 2 characters")
    .max(100, "Store name must be less than 100 characters")
    .required("Store name is required"),
  storeEmail: Yup.string()
    .email("Please enter a valid email address")
    .required("Store email is required"),
  storePhone: Yup.string()
    .matches(/^[+]?[1-9][\d]{0,15}$/, "Please enter a valid phone number")
    .required("Store phone is required"),
  storeAddress: Yup.string()
    .min(10, "Address must be at least 10 characters")
    .max(200, "Address must be less than 200 characters")
    .required("Store address is required"),
  storeDescription: Yup.string()
    .max(500, "Description must be less than 500 characters"),
  currency: Yup.string()
    .required("Currency is required"),
  taxRate: Yup.number()
    .min(0, "Tax rate must be 0 or greater")
    .max(100, "Tax rate cannot exceed 100%")
    .required("Tax rate is required"),
  timezone: Yup.string()
    .required("Timezone is required"),
  dateFormat: Yup.string()
    .required("Date format is required"),
  receiptFooter: Yup.string()
    .max(200, "Receipt footer must be less than 200 characters"),
});

// Currency options
export const CURRENCY_OPTIONS = [
  { value: "USD", label: "USD - US Dollar" },
  { value: "EUR", label: "EUR - Euro" },
  { value: "GBP", label: "GBP - British Pound" },
  { value: "CAD", label: "CAD - Canadian Dollar" },
  { value: "AUD", label: "AUD - Australian Dollar" },
  { value: "INR", label: "INR - Indian Rupee" },
];

// Timezone options
export const TIMEZONE_OPTIONS = [
  { value: "America/New_York", label: "Eastern Time (ET)" },
  { value: "America/Chicago", label: "Central Time (CT)" },
  { value: "America/Denver", label: "Mountain Time (MT)" },
  { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
  { value: "Europe/London", label: "London (GMT)" },
  { value: "Asia/Tokyo", label: "Tokyo (JST)" },
];

// Date format options
export const DATE_FORMAT_OPTIONS = [
  { value: "MM/DD/YYYY", label: "MM/DD/YYYY" },
  { value: "DD/MM/YYYY", label: "DD/MM/YYYY" },
  { value: "YYYY-MM-DD", label: "YYYY-MM-DD" },
  { value: "DD-MM-YYYY", label: "DD-MM-YYYY" },
]; 