import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const TopSellingItemsCard = ({ shiftData }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">Top Selling Items</h2>
        <div className="space-y-3">
          {shiftData.topSellingProducts?.map((item, index) => (
            <div key={item.id} className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 text-xs font-medium">
                {index + 1}
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <span className="font-medium">{item.name}</span>
                  <span className="font-bold">₹{item.sellingPrice?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{item.quantity} units sold</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopSellingItemsCard; 