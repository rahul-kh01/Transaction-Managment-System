import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FiPlus,
} from "react-icons/fi";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
// import { toast } from "@/components/ui/use-toast";
import {
  getAllBranchesByStore,
} from "@/Redux Toolkit/features/branch/branchThunks";
import { Alert, AlertDescription } from "@/components/ui/alert";
import BranchTable from "./BranchTable";
import BranchForm from "./BranchForm";

export default function Branches() {
  const dispatch = useDispatch();
  const { branches, loading, error } = useSelector((state) => state.branch);
  const { store } = useSelector((state) => state.store);
  const { user } = useSelector((state) => state.user);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentBranch, setCurrentBranch] = useState(null);



  // Fetch branches when component mounts
  useEffect(() => {
    if (store?.id) {
      dispatch(
        getAllBranchesByStore({
          storeId: store.id,
          jwt: localStorage.getItem("jwt"),
        })
      );
    }
  }, [dispatch, store, user]);

  console.log("store ", store);

  const handleAddBranchSuccess = () => {
    setIsAddDialogOpen(false);
  };

  const handleEditBranchSuccess = () => {
    setIsEditDialogOpen(false);
    setCurrentBranch(null);
  };

  const openEditDialog = (branch) => {
    setCurrentBranch(branch);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Branch Management</h1>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <FiPlus className="mr-2 h-4 w-4" /> Add Branch
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Branch</DialogTitle>
            </DialogHeader>
            <BranchForm 
              onSubmit={handleAddBranchSuccess} 
              onCancel={() => setIsAddDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Branch</DialogTitle>
            </DialogHeader>
            <BranchForm 
              initialValues={currentBranch} 
              onSubmit={handleEditBranchSuccess} 
              onCancel={() => setIsEditDialogOpen(false)}
              isEditing={true}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0">
          <BranchTable 
            branches={branches} 
            loading={loading} 
            onEdit={openEditDialog}
          />
        </CardContent>
      </Card>
    </div>
  );
}
