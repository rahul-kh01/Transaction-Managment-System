import React from 'react'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Card, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import {FiEye} from 'react-icons/fi';

const TransactionTable = ({filteredTransactions,handleViewTransaction}) => {
  return (
     <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date & Time</TableHead>
                 
                    <TableHead>Cashier</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{transaction.createdAt}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${transaction.type === 'Sale' ? 'bg-green-100 text-green-800' : transaction.type === 'Refund' ? 'bg-amber-100 text-amber-800' : transaction.type === 'Purchase' || transaction.type === 'Expense' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
                          #{transaction.cashierId}
                        </span>
                      </TableCell>
                      <TableCell>{transaction.customer?.fullName}</TableCell>
                      <TableCell className={transaction.totalAmount > 0 ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                        {transaction.totalAmount > 0 ? `+$${transaction.totalAmount.toFixed(2)}` : `-$${Math.abs(transaction.totalAmount).toFixed(2)}`}
                      </TableCell>
                      <TableCell>{transaction.paymentType}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {transaction.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewTransaction(transaction)}
                        >
                          <FiEye  className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
  )
}

export default TransactionTable