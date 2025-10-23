import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Button } from "../../../components/ui/button";
import { FiEdit } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  // getAllRefunds,
  getRefundsByBranch,
} from "../../../Redux Toolkit/features/refund/refundThunks";


const Refunds = () => {
  const dispatch = useDispatch();
  const { branch } = useSelector((store) => store.branch);
  const  refunds  = useSelector((store) => store.refund.refundsByBranch);

  useEffect(() => {
    if (branch) dispatch(getRefundsByBranch(branch?.id));
  }, [branch, dispatch]);

  console.log("refund s", refunds)
  return (
    <>
     <h1 className='font-bold text-2xl pb-5'>Refund Spike</h1>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Order Id</TableHead>
         
          <TableHead>Amount</TableHead>
          <TableHead className="text-right">Reason</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {refunds?.length > 0 ? (
          refunds?.map((refund) => (
            <TableRow key={refund?.id}>
              <TableCell className="font-medium">#{refund.id}</TableCell>
              <TableCell className="font-medium">#ORD-{refund.orderId}</TableCell>
            
              <TableCell>₹{refund.amount || 499}</TableCell>
              <TableCell className="text-right">{refund.reason}</TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={5} className="text-center py-4 text-gray-500">
              No inventory found matching your criteria
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table></>
  );
};

export default Refunds;
