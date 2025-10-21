import { Card, CardContent } from "../../../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";

const OrderItemTable = ({ selectedOrder }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-16">Image</TableHead>
          <TableHead>Item</TableHead>
          <TableHead className="text-center">Quantity</TableHead>
          <TableHead className="text-right">Price</TableHead>
          <TableHead className="text-right">Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {selectedOrder.items?.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="">
              <div className=" w-10 h-10">
                {item.product?.image ? (
                  <img
                    src={item.product.image}
                    alt={item.productName || item.product?.name || "Product"}
                    className="w-10 h-10 object-cover rounded-md "
                  />
                ) : null}
                {(!item.product?.image || item.product?.image === "") && (
                  <div className="w-12 h-12 bg-gray-100 rounded-md border flex items-center justify-center">
                    <span className="text-xs text-gray-500 font-medium">
                      {item.productName
                        ? item.productName.charAt(0).toUpperCase()
                        : item.product?.name
                        ? item.product.name.charAt(0).toUpperCase()
                        : "P"}
                    </span>
                  </div>
                )}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex flex-col">
                <span className="font-medium">
                  {item.product?.name.slice(0, 20) || "Product"}...
                </span>
                {item.product?.sku && (
                  <span className="text-xs text-gray-500">
                    SKU: {item.product.sku.slice(0, 17)+"."}...
                  </span>
                )}
              </div>
            </TableCell>
            <TableCell className="text-center">{item.quantity}</TableCell>
            <TableCell className="text-right">
              ₹{item.product?.sellingPrice?.toFixed(2) || "0.00"}
            </TableCell>
            <TableCell className="text-right">
              ₹
              {(item.product?.sellingPrice * item.quantity)?.toFixed(2) ||
                "0.00"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default OrderItemTable;
