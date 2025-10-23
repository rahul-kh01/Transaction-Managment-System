import React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FiSearch, FiFilter } from "react-icons/fi";
import { Card, CardContent } from "@/components/ui/card";

const InventoryFilters = ({
  searchTerm,
  onSearch,
  category,
  onCategoryChange,
  products,
  inventoryRows,
}) => (
  <Card>
    <CardContent className="p-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 items-center">
        <div className="relative">
          <Input
            type="search"
            placeholder="Search by name..."
            className=""
            value={searchTerm}
            onChange={onSearch}
           
          />
        </div>
        <div className="relative">
          <Select value={category} onValueChange={onCategoryChange}>
            <SelectTrigger
              startIcon={<FiFilter className="h-4 w-4 text-gray-500" />}
              className="w-full"
            >
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {[
                ...new Set(products.map((p) => p.category).filter(Boolean)),
              ].map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-5 items-center border p-3 rounded-md">
          <h3 className="text-lg font-medium text-gray-500">
            Total Quantity :{" "}
          </h3>
          <p className="text-xl font-bold  text-green-600">
            {inventoryRows.reduce((sum, row) => sum + (row.quantity || 0), 0)}
          </p>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default InventoryFilters;
