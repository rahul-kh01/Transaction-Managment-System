import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FiHome } from "react-icons/fi";
import { toast } from "@/components/ui/use-toast";
import { updateStore } from "@/Redux Toolkit/features/store/storeThunks";
import StoreSettingsForm from "./StoreSettingsForm";
import { getInitialValues } from "./formUtils";

const StoreSettings = ({ settings, onChange }) => {
  const dispatch = useDispatch();
  const { store, loading } = useSelector((state) => state.store);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (apiData, { setSubmitting, resetForm }) => {
    if (!store?.id) {
      toast({
        title: "Error",
        description: "Store information not found",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await dispatch(updateStore({ 
        id: store.id, 
        storeData: apiData
      })).unwrap();
      
      toast({
        title: "Success",
        description: "Store settings updated successfully",
      });
      
      // Update local settings state
      Object.keys(settings).forEach(key => {
        onChange(key, settings[key]);
      });
      
      resetForm({ values: getInitialValues(store) });
    } catch (err) {
      toast({
        title: "Error",
        description: err || "Failed to update store settings",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      setSubmitting(false);
    }
  };

  return (
    <Card id="store-settings">
      <CardHeader>
        <CardTitle className="flex items-center">
          <FiHome className="mr-2 h-5 w-5 text-emerald-500" />
          Store Settings
        </CardTitle>
        <CardDescription>
          Configure your store's basic information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <StoreSettingsForm
          initialValues={settings}
          onSubmit={handleFormSubmit}
          isSubmitting={isSubmitting || loading}
          storeId={store?.id}
        />
      </CardContent>
    </Card>
  );
};

export default StoreSettings; 