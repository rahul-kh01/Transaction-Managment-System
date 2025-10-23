import React from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FiEdit } from "react-icons/fi";

const InventoryTable = ({ rows, onEdit }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead className="w-[100px]">SKU</TableHead>
        <TableHead>Product Name</TableHead>
        <TableHead>Quantity</TableHead>
        <TableHead>Category</TableHead>
        <TableHead>Action</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {rows.length > 0 ? (
        rows.map((row) => (
          <TableRow key={row?.id}>
            <TableCell className="font-medium">{row.sku}</TableCell>
            <TableCell>{row.name.slice(0,70)}...</TableCell>
            <TableCell>{row.quantity}</TableCell>
            <TableCell>{row.category}</TableCell>
            <TableCell>
              <Button size="sm" variant="outline" onClick={() => onEdit(row)}>
                <FiEdit className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={5} className="text-center py-4 text-gray-500">
            No inventory found matching your criteria
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  </Table>
);

export default InventoryTable; 