import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { formatDateTime } from '../../../../utils/formateDate';

const ShiftInformationCard = ({ shiftData }) => {
  

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">Shift Information</h2>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Cashier:</span>
            <span className="font-medium">{shiftData.cashier.fullName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Shift Start:</span>
            <span>{formatDateTime(shiftData.shiftStart)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Shift End:</span>
            <span>{shiftData.shiftEnd?(shiftData.shiftEnd):"ongoing"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Duration:</span>
            <span>8 hours</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShiftInformationCard; 