import React from "react";
import { FiMapPin, FiPhone, FiMail } from "react-icons/fi";
import { Label } from "@/components/ui/label";

const ContactInformation = ({ storeData }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <FiMapPin className="h-4 w-4 text-gray-400" />
          <div>
            <Label className="text-sm text-muted-foreground">Address</Label>
            <p className="text-base">{storeData.contact?.address || "No address provided"}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <FiPhone className="h-4 w-4 text-gray-400" />
          <div>
            <Label className="text-sm text-muted-foreground">Phone</Label>
            <p className="text-base">{storeData.contact?.phone || "No phone provided"}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <FiMail className="h-4 w-4 text-gray-400" />
          <div>
            <Label className="text-sm text-muted-foreground">Email</Label>
            <p className="text-base">{storeData.contact?.email || "No email provided"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInformation; 