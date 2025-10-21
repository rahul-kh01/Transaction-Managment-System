import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const LoadingState = () => {
  return (
    <Card>
      <CardContent className="flex justify-center items-center h-64 p-6">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
        <span className="ml-2 text-lg">Loading store information...</span>
      </CardContent>
    </Card>
  );
};

export default LoadingState; 