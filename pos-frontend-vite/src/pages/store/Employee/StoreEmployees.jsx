import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EmployeeForm, EmployeeTable } from ".";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  createStoreEmployee,
  findStoreEmployees,
  updateEmployee,
  deleteEmployee,
} from "@/Redux Toolkit/features/employee/employeeThunks";
import { storeAdminRole } from "../../../utils/userRole";

export default function StoreEmployees() {
  const dispatch = useDispatch();
  const { employees, loading, error } = useSelector((state) => state.employee);
  const { store } = useSelector((state) => state.store);

  useEffect(() => {
    if (store?.id) {
      dispatch(
        findStoreEmployees({
          storeId: store?.id,
          token: localStorage.getItem("jwt"),
        })
      );
    }
  }, [dispatch, store?.id]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);

  const handleAddEmployee = (newEmployeeData) => {
    if (store?.id && localStorage.getItem("jwt")) {
      dispatch(
        createStoreEmployee({
          employee: {
            ...newEmployeeData,
            storeId: store?.id,
            username: newEmployeeData.email.split("@")[0],
          },
          storeId: store?.id,
          token: localStorage.getItem("jwt"),
        })
      );
      setIsAddDialogOpen(false);
    }
  };

  const handleEditEmployee = (updatedEmployeeData) => {
    if (currentEmployee?.id && localStorage.getItem("jwt")) {
      dispatch(
        updateEmployee({
          employeeId: currentEmployee.id,
          employeeDetails: updatedEmployeeData,
          token: localStorage.getItem("jwt"),
        })
      );
      setIsEditDialogOpen(false);
    }
  };

  const handleDeleteEmployee = (id) => {
    if (localStorage.getItem("jwt")) {
      dispatch(deleteEmployee({ employeeId: id, token: localStorage.getItem("jwt") }));
    }
  };

  const openEditDialog = (employee) => {
    setCurrentEmployee(employee);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">
          Employee Management
        </h1>
        {error && (
          <div className="text-red-500 text-sm">
            Error: {error}
          </div>
        )}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="mr-2 h-4 w-4" /> Add Employee
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Employee</DialogTitle>
            </DialogHeader>
            <EmployeeForm
              onSubmit={handleAddEmployee}
              initialData={{
                fullName: "",
                email: "",
                password: "",
                phone: "",
                role: "",
                branchId: "",
              }}
              roles={storeAdminRole}
            />
          </DialogContent>
        </Dialog>

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Employee</DialogTitle>
            </DialogHeader>
            <EmployeeForm
              onSubmit={handleEditEmployee}
              roles={storeAdminRole}
              initialData={
                currentEmployee
                  ? {
                      ...currentEmployee,
                      branchId: currentEmployee.branchId || "",
                    }
                  : null
              }
            />
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-500">Loading employees...</p>
          </div>
        </div>
      ) : (
        <EmployeeTable
          employees={employees}
          onEdit={openEditDialog}
          onDelete={handleDeleteEmployee}
        />
      )}
    </div>
  );
}
