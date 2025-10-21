import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import EditStoreForm from "./EditStoreForm";

const EditStoreDialog = ({ 
  open, 
  onOpenChange, 
  initialValues, 
  onSubmit, 
  isSubmitting 
}) => {
  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Store Details</DialogTitle>
        </DialogHeader>
        
        <EditStoreForm
          initialValues={initialValues}
          onSubmit={onSubmit}
          onCancel={handleCancel}
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditStoreDialog; 