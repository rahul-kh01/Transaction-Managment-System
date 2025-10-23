import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FiPlus, FiDownload, FiFilter } from "react-icons/fi";
import StoreTable from "./StoreTable";
import StoreDetailDrawer from "./StoreDetailDrawer";
import { useToast } from "@/components/ui/use-toast";
// import { useToast } from "../../hooks/use-toast";

export default function StoreListPage() {
  const [selectedStore, setSelectedStore] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { toast } = useToast();

  const handleViewDetails = (store) => {
    setSelectedStore(store);
    setDrawerOpen(true);
  };

  const handleBlockStore = (storeId) => {
    console.log("Store blocked:", storeId);
    toast({
      title: "Store Blocked",
      description: "The store has been successfully blocked.",
    });
  };

  const handleActivateStore = (storeId) => {
    console.log("Store activated:", storeId);
    toast({
      title: "Store Activated",
      description: "The store has been successfully activated.",
    });
  };

  const handleEditStore = (store) => {
    toast({
      title: "Edit Store",
      description: `Editing store: ${store.name}`,
    });
  };



  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Stores</h2>
          <p className="text-muted-foreground">
            Manage all registered stores and their status
          </p>
        </div>
       
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Stores</CardTitle>
        </CardHeader>
        <CardContent>
          <StoreTable
            onViewDetails={handleViewDetails}
            onBlockStore={handleBlockStore}
            onActivateStore={handleActivateStore}
          />
        </CardContent>
      </Card>

      <StoreDetailDrawer
        store={selectedStore}
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        onBlockStore={handleBlockStore}
        onActivateStore={handleActivateStore}
        onEditStore={handleEditStore}
      />
    </div>
  );
} 