import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, ShoppingBagIcon, CalendarIcon, DollarSignIcon } from 'lucide-react';
import { formatDate, getStatusColor } from '../../order/data';

const PurchaseHistory = ({ orders, loading = false }) => {


  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-4 text-center text-muted-foreground">
        <Loader2 className="animate-spin h-8 w-8 mb-4" />
        <p>Loading purchase history...</p>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-4 text-center text-muted-foreground">
        <ShoppingBagIcon size={48} strokeWidth={1} />
        <p className="mt-4">No purchase history found</p>
        <p className="text-sm">This customer hasn't made any orders yet</p>
      </div>
    );
  }




  return (
    <div className="p-4 border-t ">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingBagIcon className="h-5 w-5" />
            Purchase History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-medium">Order #{order.id}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <CalendarIcon className="h-4 w-4" />
                      {formatDate(order.createdAt)}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-1">
                      <DollarSignIcon className="h-4 w-4" />
                      <span className="font-bold">₹{order.totalAmount?.toFixed(2) || '0.00'}</span>
                    </div>
                    {order.status && (
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    )}
                  </div>
                </div>
                
                {order.paymentMethod && (
                  <div className="text-sm text-muted-foreground mb-2">
                    Payment: {order.paymentMethod}
                  </div>
                )}
                
                {order.items && order.items.length > 0 && (
                  <div className="border-t pt-3">
                    <h4 className="text-sm font-medium mb-2">Items:</h4>
                    <div className="space-y-1">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>{item.product.name || item.productName || 'Unknown Product'}</span>
                          <span className="text-muted-foreground">
                            {item.quantity || 1} × ₹{(item.price || 0).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PurchaseHistory; 