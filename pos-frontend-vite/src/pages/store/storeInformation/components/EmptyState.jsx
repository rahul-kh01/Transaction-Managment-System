import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { FiHome } from "react-icons/fi";

const EmptyState = () => {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center h-64 p-6 text-center">
        <FiHome className="h-12 w-12 text-gray-300 mb-4" />
        <h3 className="text-xl font-medium text-gray-600 mb-2">No store information found</h3>
        <p className="text-gray-500 mb-4">Your store information will appear here</p>
      </CardContent>
    </Card>
  );
};

export default EmptyState; 