import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {FiPrinter} from 'react-icons/fi';

const PrintDialog = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Print Shift Summary</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <p>Do you want to print your shift summary report?</p>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={onConfirm}>
            <FiPrinter  className="h-4 w-4 mr-2" />
            Print Summary
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PrintDialog; 