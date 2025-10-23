import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {FiSearch, FiPlus} from 'react-icons/fi';

const CustomerSearch = ({ 
  searchTerm, 
  onSearchChange, 
  onAddCustomer 
}) => {
  return (
    <div className="p-4 border-b">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <FiSearch  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search customers..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <Button onClick={onAddCustomer}>
          <FiPlus  className="h-4 w-4 mr-2" />
          Add New
        </Button>
      </div>
    </div>
  );
};

export default CustomerSearch; 