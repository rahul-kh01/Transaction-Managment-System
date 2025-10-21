import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, XCircle, Eye, Clock } from "lucide-react";

import { useToast } from "@/components/ui/use-toast";
import { getAllStores, moderateStore } from "@/Redux Toolkit/features/store/storeThunks";
import { formatDateTime } from "@/utils/formateDate";

export default function PendingRequestsPage() {
  const dispatch = useDispatch();
  const { stores, loading, error } = useSelector((state) => state.store);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [approvalDialogOpen, setApprovalDialogOpen] = useState(false);
  const [rejectionDialogOpen, setRejectionDialogOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [updatingId, setUpdatingId] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    dispatch(getAllStores("PENDING"));
  }, [dispatch]);

  const handleApprove = (store) => {
    setSelectedRequest(store);
    setApprovalDialogOpen(true);
  };

  const handleReject = (store) => {
    setSelectedRequest(store);
    setRejectionDialogOpen(true);
  };

  const confirmApprove = async () => {
    if (selectedRequest) {
      setUpdatingId(selectedRequest.id);
      try {
        await dispatch(moderateStore({ storeId: selectedRequest.id, action: "ACTIVE" })).unwrap();
        toast({
          title: "Store Approved",
          description: `${selectedRequest.brand} has been approved successfully.`,
        });
      } catch (e) {
        toast({
          title: "Approval Failed",
          description: e?.message || "Failed to approve store.",
          variant: "destructive",
        });
      } finally {
        setApprovalDialogOpen(false);
        setSelectedRequest(null);
        setUpdatingId(null);
      }
    }
  };

  const confirmReject = async () => {
    if (selectedRequest && rejectionReason.trim()) {
      setUpdatingId(selectedRequest.id);
      try {
        await dispatch(moderateStore({ storeId: selectedRequest.id, action: "BLOCKED" })).unwrap();
        toast({
          title: "Store Rejected",
          description: `${selectedRequest.brand} has been rejected.`,
        });
      } catch (e) {
        toast({
          title: "Rejection Failed",
          description: e?.message || "Failed to reject store.",
          variant: "destructive",
        });
      } finally {
        setRejectionDialogOpen(false);
        setSelectedRequest(null);
        setRejectionReason("");
        setUpdatingId(null);
      }
    }
  };



  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Pending Requests</h2>
          <p className="text-muted-foreground">
            Review and approve new store registration requests
          </p>
        </div>
        <Badge variant="secondary" className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {stores.length} Pending
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Store Registration Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg">
            {loading ? (
              <div className="text-center py-8">Loading pending requests...</div>
            ) : error ? (
              <div className="text-center py-8 text-red-500">{error}</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Store Name</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Business Type</TableHead>
                    <TableHead>Submitted On</TableHead>
                   
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stores.map((store) => (
                    <TableRow key={store.id}>
                      <TableCell className="font-medium">{store.brand}</TableCell>
                      <TableCell>{store.storeAdmin?.fullName}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{store.contact?.phone}</div>
                          <div className="text-muted-foreground">{store.contact?.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>{store.storeType || "-"}</TableCell>
                      <TableCell>{formatDateTime(store.createdAt)}</TableCell>
                 
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleApprove(store)}
                            className="text-green-600 border-green-200 hover:bg-green-50"
                            disabled={updatingId === store.id}
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            {updatingId === store.id ? "Approving..." : "Approve"}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleReject(store)}
                            className="text-red-600 border-red-200 hover:bg-red-50"
                            disabled={updatingId === store.id}
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            {updatingId === store.id ? "Rejecting..." : "Reject"}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>

          {stores.length === 0 && !loading && !error && (
            <div className="text-center py-8 text-muted-foreground">
              No pending requests at the moment.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Approval Confirmation Dialog */}
      <Dialog open={approvalDialogOpen} onOpenChange={setApprovalDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve Store Registration</DialogTitle>
            <DialogDescription>
              Are you sure you want to approve {selectedRequest?.brand}? This will activate their account and allow them to start using the platform.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setApprovalDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmApprove} className="bg-green-600 hover:bg-green-700">
              <CheckCircle className="w-4 h-4 mr-2" />
              Approve Store
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Rejection Dialog */}
      <Dialog open={rejectionDialogOpen} onOpenChange={setRejectionDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Store Registration</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting {selectedRequest?.brand}. This will be communicated to the store owner.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="Enter rejection reason..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              rows={3}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectionDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={confirmReject}
              className="bg-red-600 hover:bg-red-700"
              disabled={!rejectionReason.trim()}
            >
              <XCircle className="w-4 h-4 mr-2" />
              Reject Store
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 