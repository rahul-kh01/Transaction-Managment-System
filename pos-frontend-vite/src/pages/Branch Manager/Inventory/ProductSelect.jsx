import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";
import { useSelector } from "react-redux";

const ProductSelect = () => {
  const [selectedProductId, setSelectedProductId] = useState("");
  const products = useSelector((state) => state.product.products);

//   const products = [
//     { id: "101", name: "Headphones" },
//     { id: "102", name: "Laptop" },
//     { id: "103", name: "Mobile" },
//     { id: "104", name: "Smartwatch" },
//   ];

  return (
    <Select
      value={selectedProductId}
      onValueChange={(value) => setSelectedProductId(value)}
    >
      <SelectTrigger
        startIcon={<Filter className="h-4 w-4 text-gray-500" />}
        className="w-full"
      >
        <SelectValue placeholder="Select a Product" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Products</SelectItem>
        {products.map((product) => (
          <SelectItem key={product.id} value={product.id}>
            {product.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default ProductSelect;
