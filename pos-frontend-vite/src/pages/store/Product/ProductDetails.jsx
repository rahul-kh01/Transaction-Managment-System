import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tag, DollarSign, Package, Calendar, Barcode, Palette, Image as ImageIcon } from "lucide-react";

const ProductDetails = ({ product }) => {
  if (!product) return null;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-emerald-50 to-emerald-100 pb-4">
        <CardTitle className="text-2xl font-bold">{product.name}</CardTitle>
        {product.brand && (
          <CardDescription className="text-sm font-medium text-emerald-700">
            {product.brand}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Product Image */}
        {product.image && (
          <div className="mb-6 flex justify-center">
            <div className="relative w-full max-w-md h-64 rounded-lg overflow-hidden border border-gray-200">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://placehold.co/400x300?text=No+Image';
                }}
              />
            </div>
          </div>
        )}

        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Barcode className="h-5 w-5 text-gray-500" />
              <div>
                <div className="text-sm text-gray-500">SKU</div>
                <div className="font-medium">{product.sku || 'N/A'}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Tag className="h-5 w-5 text-gray-500" />
              <div>
                <div className="text-sm text-gray-500">Category</div>
                <div className="font-medium">{product.category || 'Uncategorized'}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-gray-500" />
              <div>
                <div className="text-sm text-gray-500">Color</div>
                <div className="font-medium">{product.color || 'N/A'}</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-gray-500" />
              <div>
                <div className="text-sm text-gray-500">Price</div>
                <div className="font-medium">
                  <span className="text-lg font-bold text-emerald-700">
                    ${product.sellingPrice?.toFixed(2) || product.price?.toFixed(2) || '0.00'}
                  </span>
                  {product.mrp && product.mrp > (product.sellingPrice || product.price) && (
                    <span className="ml-2 text-sm line-through text-gray-500">
                      ${product.mrp.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-gray-500" />
              <div>
                <div className="text-sm text-gray-500">Stock</div>
                <div className="font-medium">
                  {product.stock !== undefined ? (
                    <Badge className={product.stock > 10 ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}>
                      {product.stock} in stock
                    </Badge>
                  ) : 'N/A'}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-gray-500" />
              <div>
                <div className="text-sm text-gray-500">Last Updated</div>
                <div className="font-medium">
                  {product.updatedAt ? new Date(product.updatedAt).toLocaleDateString() : 'N/A'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        {product.description && (
          <div className="mt-6 pt-6 border-t border-gray-100">
            <h3 className="text-lg font-medium mb-2">Description</h3>
            <p className="text-gray-700 whitespace-pre-line">{product.description}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductDetails;