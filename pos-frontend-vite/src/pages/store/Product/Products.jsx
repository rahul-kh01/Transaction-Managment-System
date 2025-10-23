import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FiPlus, FiRefreshCw } from "react-icons/fi";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getProductsByStore } from "@/Redux Toolkit/features/product/productThunks";
import { toast } from "@/components/ui/use-toast";
import ProductTable from "./ProductTable";
import ProductForm from "./ProductForm";
import ProductSearch from "./ProductSearch";
import ProductDetails from "./ProductDetails";

export default function Products() {
  const dispatch = useDispatch();
  const { products, loading, error, searchResults } = useSelector(
    (state) => state.product
  );
  const { store } = useSelector((state) => state.store);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch products on mount or when store changes
  useEffect(() => {
    if (store?.id) {
      fetchProducts();
    }
  }, [dispatch, store, fetchProducts]);

  // Update displayed products when products or search results change
  useEffect(() => {
    setDisplayedProducts(
      isSearchActive && searchResults.length > 0 ? searchResults : products
    );
  }, [products, searchResults, isSearchActive]);

  const fetchProducts = useCallback(async () => {
    try {
      // const token = localStorage.getItem("jwt");
      await dispatch(getProductsByStore(store.id)).unwrap();
    } catch (err) {
      toast({
        title: "Error",
        description: err || "Failed to fetch products",
        variant: "destructive",
      });
    }
  }, [dispatch, store.id]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchProducts();
    setRefreshing(false);
    setIsSearchActive(false);
  };

  const handleAddProductSuccess = () => {
    setIsAddDialogOpen(false);
  };

  const handleEditProductSuccess = () => {
    setIsEditDialogOpen(false);
    setCurrentProduct(null);
  };

  const openEditDialog = (product) => {
    setCurrentProduct(product);
    setIsEditDialogOpen(true);
  };

  const openViewDialog = (product) => {
    setCurrentProduct(product);
    setIsViewDialogOpen(true);
  };

  const handleSearch = (results) => {
    if (results === null) {
      // Search was cleared
      setIsSearchActive(false);
    } else {
      setIsSearchActive(true);
      setDisplayedProducts(results);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">
          Product Management
        </h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <FiPlus className="mr-2 h-4 w-4" /> Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto p-10">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            <ProductForm
              onSubmit={handleAddProductSuccess}
              onCancel={() => setIsAddDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
        <ProductSearch onSearch={handleSearch} />

        <Button
          variant="outline"
          onClick={handleRefresh}
          disabled={refreshing}
          className="ml-auto"
        >
          <FiRefreshCw
            className={`mr-2 h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
          />
          {refreshing ? "Refreshing..." : "Refresh"}
        </Button>
      </div>

      {isSearchActive && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-2 rounded-md flex justify-between items-center">
          <span>
            Showing search results ({displayedProducts.length}{" "}
            {displayedProducts.length === 1 ? "product" : "products"} found)
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsSearchActive(false)}
            className="text-amber-800 hover:text-amber-900 hover:bg-amber-100"
          >
            Show all products
          </Button>
        </div>
      )}

      {error && (
        <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-md border border-red-200">
          {error}
        </div>
      )}

      <Card>
        <CardContent className="p-0">
          <ProductTable
            products={displayedProducts}
            loading={loading || refreshing}
            onEdit={openEditDialog}
            onView={openViewDialog}
          />
        </CardContent>
      </Card>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          <ProductForm
            initialValues={currentProduct}
            onSubmit={handleEditProductSuccess}
            onCancel={() => setIsEditDialogOpen(false)}
            isEditing={true}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Product Details</DialogTitle>
          </DialogHeader>
          <ProductDetails product={currentProduct} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
