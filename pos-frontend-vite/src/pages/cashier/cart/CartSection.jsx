
import { Button } from "@/components/ui/button";
import { FiShoppingCart, FiPause, FiTrash2 } from "react-icons/fi";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import { useSelector } from "react-redux";
import {
  clearCart,
  removeFromCart,
  selectCartItems,
  selectHeldOrders,
  updateCartItemQuantity,
} from "../../../Redux Toolkit/features/cart/cartSlice";
import { useDispatch } from "react-redux";
import { useToast } from "../../../components/ui/use-toast";

const CartSection = ({setShowHeldOrdersDialog}) => {
  // Global cart state
  const cartItems = useSelector(selectCartItems);

  console.log("Cart items:", cartItems);
  const heldOrders = useSelector(selectHeldOrders);
  const dispatch = useDispatch();
  const toast = useToast();

  const handleUpdateCartItemQuantity = (id, newQuantity) => {
    dispatch(updateCartItemQuantity({ id, quantity: newQuantity }));
  };

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast({
      title: "Cart Cleared",
      description: "All items removed from cart",
    });
  };

  return (
    <div className="w-2/5 flex flex-col bg-card border-r">
      <div className="p-4 border-b bg-muted">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold flex items-center">
            <FiShoppingCart className="w-5 h-5 mr-2" />
            Cart ({cartItems.length} items)
          </h2>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowHeldOrdersDialog(true)}
            >
              <FiPause className="w-4 h-4 mr-1" />
              Held ({heldOrders.length})
            </Button>
            <Button variant="outline" size="sm" onClick={handleClearCart}>
              <FiTrash2 className="w-4 h-4 mr-1" />
              Clear
            </Button>
          </div>
        </div>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto">
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
            <FiShoppingCart className="w-16 h-16 mb-4 opacity-50" />
            <p className="text-lg font-medium">Cart is empty</p>
            <p className="text-sm">Add products to start an order</p>
          </div>
        ) : (
          <div className="p-4 space-y-3">
            {cartItems.map((item) => (
              <CartItem
                item={item}
                key={item.id}
                updateCartItemQuantity={handleUpdateCartItemQuantity}
                removeFromCart={handleRemoveFromCart}
              />
            ))}
          </div>
        )}
      </div>

      {/* Cart Summary */}
      {cartItems.length > 0 && <CartSummary />}
    </div>
  );
};

export default CartSection;
