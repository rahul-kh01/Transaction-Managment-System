import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const EmployeeStats = ({ employees }) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-lg font-medium text-gray-500">
              Total Employees
            </h3>
            <p className="text-3xl font-bold mt-2">{employees.length}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-lg font-medium text-gray-500">
              Active Employees
            </h3>
            <p className="text-3xl font-bold mt-2 text-green-600">
              {employees.length}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-lg font-medium text-gray-500">Cashiers</h3>
            <p className="text-3xl font-bold mt-2 text-primary">
              {
                employees.filter(
                  (e) => e.role === "ROLE_BRANCH_CASHIER"
                ).length
              }
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeStats;