import React from 'react'
import { Card, CardContent } from '../../../../components/ui/card'
import { formatDate, getPaymentModeLabel, getStatusBadgeVariant } from '../data'
import { Badge } from '../../../../components/ui/badge'

const OrderInformation = ({selectedOrder}) => {
  return (
     <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">Order Information</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date:</span>
                <span>{formatDate(selectedOrder.createdAt)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment Method:</span>
                <span>{getPaymentModeLabel(selectedOrder.paymentType)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Amount:</span>
                <span className="font-semibold">
                  ₹{selectedOrder.totalAmount?.toFixed(2) || "0.00"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
  )
}

export default OrderInformation