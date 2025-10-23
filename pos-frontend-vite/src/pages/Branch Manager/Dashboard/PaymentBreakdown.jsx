import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSelector } from 'react-redux';
import {FiCreditCard} from 'react-icons/fi';
import { getPaymentIcon } from '../../../utils/getPaymentIcon';


const PaymentBreakdown = () => {
      const { paymentBreakdown, loading } = useSelector((state) => state.branchAnalytics);

  return (
   <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Payment Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {paymentBreakdown && paymentBreakdown.length > 0 ? paymentBreakdown.map((payment, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    {getPaymentIcon(payment.type)}
                  {/* <FiCreditCard  className="w-5 h-5 text-primary" /> */}
                  <span>{payment.type}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary"
                      style={{ width: `${payment.percentage ?? 0}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">₹{payment.totalAmount?.toLocaleString() ?? "-"}</span>
                  <span className="text-xs text-gray-500">{payment.percentage ? `${payment.percentage}%` : ""}</span>
                  <span className="text-xs text-gray-500">{payment.transactionCount ? `(${payment.transactionCount} txns)` : ""}</span>
                </div>
              </div>
            )) : (
              <div className="text-center text-gray-400">{loading ? "Loading payment breakdown..." : "No data available"}</div>
            )}
          </div>
        </CardContent>
      </Card>
  )
}

export default PaymentBreakdown