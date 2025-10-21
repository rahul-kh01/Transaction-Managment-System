import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../../../components/ui/sheet";
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Separator } from "../../../components/ui/separator";
import { 
  Store, 
  User, 
  Phone, 
  Mail, 
  Calendar, 
  FileText, 
  MapPin,
  Building,
  X,
  Edit,
  Ban,
  CheckCircle
} from "lucide-react";
import StoreStatusBadge from "./StoreStatusBadge";
import { formatDateTime } from "../../../utils/formateDate";

export default function StoreDetailDrawer({ 
  store, 
  open, 
  onOpenChange, 
  onBlockStore, 
  onActivateStore,
  onEditStore 
}) {
  if (!store) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
        <SheetHeader>
          
            <div>
              <SheetTitle className="text-xl font-bold">{store.brand}</SheetTitle>
              <SheetDescription>
                Store ID: {store.id}
              </SheetDescription>
            </div>
           
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Status Section */}
          <div className="flex items-center justify-between">
            <StoreStatusBadge status={store.status} />
            <div className="flex gap-2">
              {store.status === "active" && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onBlockStore?.(store.id)}
                  className="text-red-600 border-red-200 hover:bg-red-50"
                >
                  <Ban className="w-4 h-4 mr-1" />
                  Block
                </Button>
              )}
              {store.status === "blocked" && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onActivateStore?.(store.id)}
                  className="text-green-600 border-green-200 hover:bg-green-50"
                >
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Activate
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEditStore?.(store)}
              >
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
            </div>
          </div>

          <Separator />

          {/* Owner Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <User className="w-5 h-5" />
                Owner Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <User className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium">{store.storeAdmin?.fullName}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span>{store.contact?.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span>{store.contact?.email}</span>
              </div>
            </CardContent>
          </Card>

          {/* Store Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Store className="w-5 h-5" />
                Store Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <Building className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium">{store.brand}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span>{store.address || "Address not provided"}</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span>Registered on {formatDateTime(store.createdAt)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Business Documents */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <FileText className="w-5 h-5" />
                Business Documents
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">GST Number</label>
                  <p className="text-sm">{store.gstNumber || "Not provided"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">PAN Number</label>
                  <p className="text-sm">{store.panNumber || "Not provided"}</p>
                </div>
              </div>
              
              {/* Document Previews */}
              {store.documents && store.documents.length > 0 && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">
                    Uploaded Documents
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {store.documents.map((doc, index) => (
                      <div
                        key={index}
                        className="border rounded-lg p-2 text-center cursor-pointer hover:bg-muted/50"
                      >
                        <FileText className="w-8 h-8 mx-auto mb-1 text-muted-foreground" />
                        <p className="text-xs">{doc.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Additional Information */}
          {store.additionalInfo && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Additional Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {store.additionalInfo}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
} 