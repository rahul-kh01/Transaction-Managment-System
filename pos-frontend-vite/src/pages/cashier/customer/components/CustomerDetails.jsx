import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {FiStar, FiPlus, FiLoader, FiUser} from 'react-icons/fi';

const CustomerDetails = ({ customer, onAddPoints, loading = false }) => {
  if (!customer) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-4">
        <FiUser size={48} strokeWidth={1} />
        <p className="mt-4">Select a customer to view details</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-4">
        <FiLoader  className="animate-spin h-8 w-8 mb-4" />
        <p>Loading customer details...</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold">{customer.fullName || 'Unknown Customer'}</h2>
          <p className="text-muted-foreground">{customer.phone || 'N/A'}</p>
          <p className="text-muted-foreground">{customer.email || 'N/A'}</p>
        </div>
        <Button onClick={onAddPoints} className="flex items-center gap-2">
          <FiPlus  className="h-4 w-4" />
          Add Points
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Loyalty Points
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <FiStar className="h-5 w-5 text-yellow-500" />
              <span className="text-2xl font-bold">{customer.loyaltyPoints || 0}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-bold">{customer.totalOrders || 0}</span>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Spent
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-bold">₹{(customer.totalSpent || 0).toFixed(2)}</span>
          </CardContent>
        </Card>
      </div>

      {customer.averageOrderValue && (
        <Card>
          <CardHeader>
            <CardTitle>Average Order Value</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-bold">₹{customer.averageOrderValue.toFixed(2)}</span>
          </CardContent>
        </Card>
      )}

      {customer.lastVisit && (
        <div className="mt-4">
          <p className="text-sm text-muted-foreground">
            Last Visit: {new Date(customer.lastVisit).toLocaleDateString()}
          </p>
        </div>
      )}
    </div>
  );
};

export default CustomerDetails; 