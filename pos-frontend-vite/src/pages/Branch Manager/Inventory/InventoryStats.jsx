import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const InventoryStats = ({ inventoryRows }) => (
  <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col items-center justify-center">
          <h3 className="text-lg font-medium text-gray-500">Total Products</h3>
          <p className="text-3xl font-bold mt-2">{inventoryRows.length}</p>
        </div>
      </CardContent>
    </Card>
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col items-center justify-center">
          <h3 className="text-lg font-medium text-gray-500">Total Quantity</h3>
          <p className="text-3xl font-bold mt-2 text-green-600">
            {inventoryRows.reduce((sum, row) => sum + (row.quantity || 0), 0)}
          </p>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default InventoryStats; 