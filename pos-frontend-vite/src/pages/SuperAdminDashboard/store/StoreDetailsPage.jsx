import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router";

export default function StoreDetailsPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={() => navigate("/super-admin/stores")}
          className="flex items-center gap-2"
        >
          <FiArrowLeft className="w-4 h-4" />
          Back to Stores
        </Button>
      </div>

      <div>
        <h2 className="text-3xl font-bold tracking-tight">Store Details</h2>
        <p className="text-muted-foreground">
          Detailed view of store information and statistics
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Store Information</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This page will show detailed store information, statistics, and management options.
          </p>
        </CardContent>
      </Card>
    </div>
  );
} 