import React from "react";
import { Card, CardContent } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { useDispatch } from "react-redux";
import { useToast } from "../../../components/ui/use-toast";
import { addToCart } from "../../../Redux Toolkit/features/cart/cartSlice";

const ProductCard = ({ product }) => {
    const dispatch=useDispatch();
    const toast = useToast();

     const handleAddToCart = (product) => {
      dispatch(addToCart(product));
      toast({
        title: "Added to cart",
        description: `${product.name} added to cart`,
        duration: 1500,
      });
    };
  return (
    <Card
      key={product.id}
      className="cursor-pointer hover:shadow-md transition-all duration-200 border-2 hover:border-green-800 "
      onClick={() => handleAddToCart(product)}
    >
      <CardContent className="">
        <div className="aspect-square bg-muted rounded-md mb-2 flex items-center justify-center">
         
            <img className="h-30 w-30 object-cover " src={product.image} alt="" />
         
        </div>
        <h3 className="font-medium text-sm truncate">{product.name}</h3>
        <p className="text-xs text-muted-foreground m">{product.sku}</p>
        <div className="flex items-center justify-between">
          <span className="font-bold text-green-600">
            ₹{product.sellingPrice || product.price}
          </span>
          <Badge variant="secondary" className="text-xs">
            {product.category}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
