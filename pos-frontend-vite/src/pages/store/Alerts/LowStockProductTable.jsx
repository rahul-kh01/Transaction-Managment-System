import React from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Tag, DollarSign, Package, Eye } from "lucide-react";

import { useSelector } from 'react-redux';

const LowStockProductTable = () => {
  
  const { storeAlerts , loading} = useSelector((state) => state.storeAnalytics);



  if (loading) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell colSpan={6} className="text-center py-8">
              <div className="flex justify-center items-center">
                <svg className="animate-spin h-6 w-6 text-emerald-600 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading products...
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }



  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Image</TableHead>
          <TableHead>Product</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Price</TableHead>
          
        </TableRow>
      </TableHeader>
      <TableBody>
        {storeAlerts?.lowStockAlerts?.map((product) => (
          <TableRow key={product.id}>
            <TableCell>
              {product.image && (
                <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-md" />
              )}
            </TableCell>
            <TableCell>
              <div className="space-y-1 ">
                <div className="font-medium ">{product.name.slice(0, 32)}...</div>
                <div className="text-sm text-gray-500 truncate max-w-xs">{product.description.slice(0,30)}...</div>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                <Tag className="h-4 w-4 text-gray-400" />
                {product.category}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                <DollarSign className="h-4 w-4 text-gray-400" />
                {product.price?.toFixed ? product.price.toFixed(2) : product.sellingPrice}
              </div>
            </TableCell>
          
            
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default LowStockProductTable;