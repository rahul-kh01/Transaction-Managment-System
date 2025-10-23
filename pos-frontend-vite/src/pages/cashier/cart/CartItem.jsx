import { Card, CardContent } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";

const CartItem = ({item,updateCartItemQuantity,removeFromCart}) => {
  return (
      <Card key={item.id} className="border-l-4 border-l-green-700">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.sku}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center border rounded">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                        >
                          <FiMinus className="w-4 h-4" />
                        </Button>
                        <span className="px-3 py-1 text-sm font-medium min-w-[3rem] text-center">
                          {item.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                        >
                          <FiPlus className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">₹{item.sellingPrice}</p>
                        <p className="text-sm font-bold text-green-600">
                          ₹{(item.sellingPrice * item.quantity).toFixed(2)}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
  )
}

export default CartItem