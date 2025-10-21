import React from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Pause, Play } from 'lucide-react';
import { useSelector } from 'react-redux';
import { resumeOrder, selectHeldOrders } from '../../../Redux Toolkit/features/cart/cartSlice';
import { useDispatch } from 'react-redux';
import { useToast } from '../../../components/ui/use-toast';

const HeldOrdersDialog = ({
  showHeldOrdersDialog,
  setShowHeldOrdersDialog,
}) => {
  const dispatch = useDispatch();
  const {toast} = useToast();
  
  const heldOrders = useSelector(selectHeldOrders);
    const handleResumeOrder = (order) => {
    dispatch(resumeOrder(order));
    setShowHeldOrdersDialog(false);

    toast({
      title: "Order Resumed",
      description: `Order #${order.id} has been resumed`,
    });
  };
  return (
    <Dialog open={showHeldOrdersDialog} onOpenChange={setShowHeldOrdersDialog}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Held Orders</DialogTitle>
        </DialogHeader>
        
        <div className="max-h-96 overflow-y-auto">
          {heldOrders.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Pause className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>No held orders</p>
            </div>
          ) : (
            <div className="space-y-3">
              {heldOrders.map((order) => (
                <Card key={order.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Order #{order.id}</h3>
                        <p className="text-sm text-gray-600">
                          {order.items.length} items • {new Date(order.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleResumeOrder(order)}
                      >
                        <Play className="w-4 h-4 mr-1" />
                        Resume
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowHeldOrdersDialog(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default HeldOrdersDialog;