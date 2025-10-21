import React from 'react';
import { Button } from '@/components/ui/button';
import { PrinterIcon, ArrowRightIcon } from 'lucide-react';

const ShiftHeader = ({ onPrintClick, onEndShiftClick }) => {

  
  return (
    <div className="p-4 bg-card border-b">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Shift Summary</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onPrintClick}>
            <PrinterIcon className="h-4 w-4 mr-2" />
            Print Summary
          </Button>
          <Button variant="destructive" onClick={onEndShiftClick}>
            <ArrowRightIcon className="h-4 w-4 mr-2" />
            End Shift & Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShiftHeader; 