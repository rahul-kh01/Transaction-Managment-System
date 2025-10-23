
import { useSelector } from 'react-redux';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

import { FiTag, FiDollarSign, FiPackage, FiMapPin} from "react-icons/fi";

const NoSaleTodayBranchTable = () => {

  const {storeAlerts,loading} = useSelector((state) => state.storeAnalytics);

  if (loading) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell colSpan={6} className="text-center py-8">
              <div className="flex justify-center items-center">
                <svg className="animate-spin h-6 w-6 text-emerald-600 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading products...
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }



  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Branch Name</TableHead>
          <TableHead>Address</TableHead>
         
         
        </TableRow>
      </TableHeader>
      <TableBody>
        {storeAlerts?.noSalesToday?.map((branch) => (
          <TableRow key={branch.id}>
            <TableCell>
             {branch.id}
            </TableCell>
            <TableCell>
              
                <div className="font-medium">{branch.name}</div>
                
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                <FiMapPin className="h-4 w-4 text-gray-400" />
                {branch.address}
              </div>
            </TableCell>
         
         
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};


export default NoSaleTodayBranchTable