import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FiEdit, FiTrash2, FiMapPin, FiPhone, FiUsers } from "react-icons/fi";
import { FiLoader } from "react-icons/fi"; // ✅ Replaces invalid LuLoader2
import { useToast } from "@/components/ui/use-toast"; // ✅ Correct import
import { deleteBranch, getAllBranchesByStore } from "@/Redux Toolkit/features/branch/branchThunks";

const BranchTable = ({ branches, loading, onEdit }) => {
  const dispatch = useDispatch();
  const { store } = useSelector((state) => state.store);
  const { toast } = useToast();

  const handleDeleteBranch = async (id) => {
    try {
      const jwt = localStorage.getItem("jwt");
      if (!id || !jwt) {
        toast({
          title: "Error",
          description: "Branch ID or authentication JWT missing",
          variant: "destructive",
        });
        return;
      }

      await dispatch(deleteBranch({ id, jwt })).unwrap();

      toast({
        title: "Success",
        description: "Branch deleted successfully",
      });

      // Refresh branches list
      dispatch(getAllBranchesByStore({ storeId: store.id, jwt }));
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete branch",
        variant: "destructive",
      });
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Branch Name</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>Manager</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center py-8">
              <FiLoader className="h-6 w-6 animate-spin inline-block mr-2" />
              Loading branches...
            </TableCell>
          </TableRow>
        ) : branches.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center py-8">
              No branches found.
            </TableCell>
          </TableRow>
        ) : (
          branches.map((branch) => (
            <TableRow key={branch.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  {branch.name}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <FiMapPin className="h-4 w-4 text-gray-500" />
                  {branch.address}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <FiUsers className="h-4 w-4 text-gray-500" />
                  {branch.manager || "Not Assigned"}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <FiPhone className="h-4 w-4 text-gray-500" />
                  {branch.phone}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(branch)}
                  >
                    <FiEdit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                    onClick={() => handleDeleteBranch(branch.id)}
                    disabled={loading}
                  >
                    <FiTrash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default BranchTable;