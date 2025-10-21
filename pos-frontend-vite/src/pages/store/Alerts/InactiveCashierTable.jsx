
import { useSelector } from "react-redux";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Tag } from "lucide-react";
import { Package } from "lucide-react";
import { formatDateTime } from "../../../utils/formateDate";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const InactiveCashierTable = () => {
  const {storeAlerts} = useSelector((state) => state.storeAnalytics);

  const dispatch=useDispatch()

  // useEffect(()=>{
  //   dispatch()
  // },[])
  return (
    <>
      <Table >
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>FullName</TableHead>
         
          <TableHead>Branch Name</TableHead>
          <TableHead className="text-right">Last Login</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {storeAlerts?.inactiveCashiers.map((cashier) => (
          <TableRow key={cashier.id}>
                    <TableCell>
              <div className="flex items-center gap-1">
                <Package className="h-4 w-4 text-gray-400" />
                {cashier.id}
              </div>
            </TableCell>
        
            <TableCell>
              <div className="space-y-1">
               
               <div className="font-medium ">
                  {cashier.fullName}
               </div>
                <div className="text-sm text-muted-foreground">
                    
                    {cashier.email}</div>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                <Tag className="h-4 w-4 text-gray-400" />
                {cashier.branchName}
              </div>
            </TableCell>
           
    
            <TableCell className="text-right">
             {formatDateTime(cashier.lastLogin)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </>
  );
};

export default InactiveCashierTable;
