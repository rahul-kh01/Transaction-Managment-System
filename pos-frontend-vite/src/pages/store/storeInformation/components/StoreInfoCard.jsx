import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FiEdit } from "react-icons/fi";
import BasicInformation from "./BasicInformation";
import ContactInformation from "./ContactInformation";

const StoreInfoCard = ({ storeData, onEditClick }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Store Information</CardTitle>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onEditClick}
            className="flex items-center gap-2"
          >
            <FiEdit className="h-4 w-4" /> Edit Details
          </Button>
        </div>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid md:grid-cols-2 gap-6">
          <BasicInformation storeData={storeData} />
          <ContactInformation storeData={storeData} />
        </div>
        
        {storeData.createdAt && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-muted-foreground">
              Store created on {new Date(storeData.createdAt).toLocaleDateString()}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StoreInfoCard; 