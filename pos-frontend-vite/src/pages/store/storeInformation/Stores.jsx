import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "@/components/ui/use-toast";
import { getStoreByAdmin, updateStore } from "@/Redux Toolkit/features/store/storeThunks";
import {
  StoreHeader,
  StoreInfoCard,
  EditStoreDialog,
  LoadingState,
  EmptyState,
  getInitialValues
} from "./components";

export default function Stores() {
  const dispatch = useDispatch();
  const { store, loading, error } = useSelector((state) => state.store);
  const { user } = useSelector((state) => state.user);

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [storeData, setStoreData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (store?.id) {
      fetchStoreData();
    }
  }, [dispatch, user, fetchStoreData, store?.id]);
  
  useEffect(() => {
    if (store) {
      setStoreData(store);
    }
  }, [store, store?.id]);
  
  const fetchStoreData = useCallback(async () => {
    setRefreshing(true);
    try {
      await dispatch(getStoreByAdmin()).unwrap();
    } catch (err) {
      toast({
        title: "Error",
        description: err || "Failed to fetch store data",
        variant: "destructive",
      });
    } finally {
      setRefreshing(false);
    }
  }, [dispatch]);

  const handleEditStore = async (values, { setSubmitting, resetForm }) => {
    try {
      await dispatch(updateStore({ 
        id: storeData.id, 
        storeData: values
      })).unwrap();
      
      setEditDialogOpen(false);
      toast({
        title: "Success",
        description: "Store updated successfully",
      });
      fetchStoreData();
      resetForm({ values });
    } catch (err) {
      toast({
        title: "Error",
        description: err || "Failed to update store",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditClick = () => {
    setEditDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <StoreHeader 
        onRefresh={fetchStoreData}
        refreshing={refreshing}
        loading={loading}
      />

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {loading ? (
        <LoadingState />
      ) : !storeData ? (
        <EmptyState />
      ) : (
        <div className="grid gap-6">
          <StoreInfoCard 
            storeData={storeData}
            onEditClick={handleEditClick}
          />
        </div>
      )}

      <EditStoreDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        initialValues={getInitialValues(storeData)}
        onSubmit={handleEditStore}
        isSubmitting={false}
      />
    </div>
  );
}