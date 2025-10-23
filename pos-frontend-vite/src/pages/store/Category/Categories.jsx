import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FiPlus } from "react-icons/fi";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { getCategoriesByStore } from "@/Redux Toolkit/features/category/categoryThunks";
// import { toast } from "@/components/ui/use-toast";
import CategoryTable from "./CategoryTable";
import CategoryForm from "./CategoryForm";

export default function Categories() {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.category);
  const { store } = useSelector((state) => state.store);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);


  // Fetch categories on mount or when store changes
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (store?.id && token) {
      dispatch(getCategoriesByStore({ storeId: store.id, token }));
    }
  }, [dispatch, store]);

  const handleAddCategorySuccess = () => {
    setIsAddDialogOpen(false);
  };

  const handleEditCategorySuccess = () => {
    setIsEditDialogOpen(false);
    setCurrentCategory(null);
  };

  const openEditDialog = (category) => {
    setCurrentCategory(category);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Category Management</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <FiPlus className="mr-2 h-4 w-4" /> Add Category
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Category</DialogTitle>
            </DialogHeader>
            <CategoryForm 
              onSubmit={handleAddCategorySuccess} 
              onCancel={() => setIsAddDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Category</DialogTitle>
            </DialogHeader>
            <CategoryForm 
              initialValues={currentCategory} 
              onSubmit={handleEditCategorySuccess} 
              onCancel={() => setIsEditDialogOpen(false)}
              isEditing={true}
            />
          </DialogContent>
        </Dialog>
      </div>

      {error && (
        <div className="mb-4 text-red-600">{error}</div>
      )}

      <Card>
        <CardContent className="p-0">
          <CategoryTable 
            categories={categories} 
            loading={loading} 
            onEdit={openEditDialog}
          />
        </CardContent>
      </Card>
    </div>
  );
}