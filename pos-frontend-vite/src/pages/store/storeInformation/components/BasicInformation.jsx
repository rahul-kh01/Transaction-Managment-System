import React from "react";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

const BasicInformation = ({ storeData }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
      <div className="space-y-4">
        <div>
          <Label className="text-sm text-muted-foreground">Store Name</Label>
          <p className="text-base font-medium">{storeData.brand}</p>
        </div>
        <div>
          <Label className="text-sm text-muted-foreground">Store Type</Label>
          <Badge variant="secondary" className="mt-1">
            {storeData.storeType}
          </Badge>
        </div>
        <div>
          <Label className="text-sm text-muted-foreground">Description</Label>
          <p className="text-base">{storeData.description || "No description provided"}</p>
        </div>
      </div>
    </div>
  );
};

export default BasicInformation; 