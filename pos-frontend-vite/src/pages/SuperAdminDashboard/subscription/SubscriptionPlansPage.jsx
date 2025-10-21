import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Button } from '@/src/components/ui/button';
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tooltip } from "@/components/ui/tooltip";
import {
  getAllSubscriptionPlans,
  deleteSubscriptionPlan,
} from "@/Redux Toolkit/features/subscriptionPlan/subscriptionPlanThunks";

import { toast} from "../../../components/ui/use-toast";
import { Button } from "../../../components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../../../components/ui/table";
import AddPlanDialog from "./AddPlanDialog";
import { Switch } from "../../../components/ui/switch";
import { updateSubscriptionPlan } from '@/Redux Toolkit/features/subscriptionPlan/subscriptionPlanThunks';
import EditPlanDialog from "./EditPlanDialog";

const BILLING_CYCLES = [
  { label: "All", value: "" },
  { label: "Monthly", value: "MONTHLY" },
  { label: "Yearly", value: "YEARLY" },
];

const FEATURE_FLAGS = [
  { key: "advancedReports", label: "Advanced Reports", icon: "✅" },
  { key: "inventory", label: "Inventory System", icon: "📦" },
  { key: "integrations", label: "Integrations", icon: "🔗" },
  { key: "ecommerce", label: "eCommerce", icon: "🛒" },
  { key: "invoiceBranding", label: "Invoice Branding", icon: "🧾" },
  { key: "prioritySupport", label: "Priority Support", icon: "🛠️" },
  { key: "multiLocation", label: "Multi-location", icon: "📍" },
];

function getFeatureBadges(plan) {
  return FEATURE_FLAGS.filter((f) => plan[f.key]).map((f) => (
    <Tooltip key={f.key} content={f.label}>
      <span style={{ marginRight: 4, fontSize: 18 }}>{f.icon}</span>
    </Tooltip>
  ));
}

const columns = [
  { key: "name", label: "Name" },
  { key: "price", label: "Price" },
  { key: "billingCycle", label: "Billing Cycle" },
  { key: "maxBranches", label: "Branches" },
  { key: "maxUsers", label: "Users" },
  { key: "maxProducts", label: "Products" },
  { key: "status", label: "Status" },
  { key: "features", label: "Features" },
  { key: "actions", label: "Actions" },
];

const SubscriptionPlansPage = () => {
  const dispatch = useDispatch();
  
  const { plans, error } = useSelector(
    (state) => state.subscriptionPlan
  );

  const [search, setSearch] = useState("");
  

  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [statusLoadingId, setStatusLoadingId] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    dispatch(getAllSubscriptionPlans());
  }, [dispatch]);

  const filteredPlans = useMemo(() => {
    let filtered = plans;
    if (search) {
      filtered = filtered.filter((plan) =>
        plan.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    return filtered;
  }, [plans, search]);

  const handleDelete = async (id) => {
    if (
      window.confirm("Are you sure you want to delete this subscription plan?")
    ) {
      const res = await dispatch(deleteSubscriptionPlan(id));
      if (res.meta.requestStatus === "fulfilled") {
        toast({
          title: "Deleted",
          description: "Subscription plan deleted successfully",
          variant: "success",
        });
      } else {
        toast({
          title: "Error",
          description: res.payload || "Failed to delete plan",
          variant: "destructive",
        });
      }
    }
  };

  const handleStatusToggle = async (plan) => {
    setStatusLoadingId(plan.id);
    const updated = { ...plan, active: !plan.active };
    // Remove fields not needed for update (like Redux entity fields)
    delete updated.createdAt;
    delete updated.updatedAt;
    const res = await dispatch(updateSubscriptionPlan({ id: plan.id, plan: updated }));
    setStatusLoadingId(null);
    if (res.meta.requestStatus === 'fulfilled') {
      toast({ title: 'Status Updated', description: `Plan is now ${updated.active ? 'Active' : 'Inactive'}`, variant: 'success' });
      dispatch(getAllSubscriptionPlans());
    } else {
      toast({ title: 'Error', description: res.payload || 'Failed to update status', variant: 'destructive' });
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <AddPlanDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        onSuccess={() => dispatch(getAllSubscriptionPlans())}
      />
      <EditPlanDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        plan={selectedPlan}
        onSuccess={() => {
          setEditDialogOpen(false);
          setSelectedPlan(null);
          dispatch(getAllSubscriptionPlans());
        }}
      />
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Subscription Plans</h1>
        <Button onClick={() => setAddDialogOpen(true)}>
          ➕ Add New Plan
        </Button>
      </div>
      <div className="flex flex-wrap gap-4 mb-4 items-center">
        <Input
          placeholder="Search plans..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-64"
        />
       
      
      </div>
      <div className="overflow-x-auto bg-white rounded shadow" style={{ maxHeight: 500, overflowY: 'auto' }}>
        <Table className="min-w-full text-sm">
          <TableHeader>
            <TableRow className="bg-gray-100">
              {columns.map((col) => (
                <TableHead
                  key={col.key}
                  className="px-4 py-2 text-left font-semibold"
                >
                  {col.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPlans.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center py-8 text-gray-400"
                >
                  No plans found.
                </TableCell>
              </TableRow>
            )}
            {filteredPlans.map((plan) => (
              <TableRow key={plan.id} className="border-b hover:bg-gray-50">
                <TableCell className="px-4 py-2 font-medium">
                  {plan.name}
                </TableCell>
                <TableCell className="px-4 py-2">₹{plan.price}</TableCell>
                <TableCell className="px-4 py-2">{plan.billingCycle}</TableCell>
                <TableCell className="px-4 py-2">
                  {plan.maxBranches ?? "-"}
                </TableCell>
                <TableCell className="px-4 py-2">
                  {plan.maxUsers ?? "-"}
                </TableCell>
                <TableCell className="px-4 py-2">
                  {plan.maxProducts ?? "-"}
                </TableCell>
                <TableCell className="px-4 py-2">
                  
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={!!plan.active}
                      onCheckedChange={() => handleStatusToggle(plan)}
                      disabled={statusLoadingId === plan.id}
                    />
                    <span className={plan.active ? 'text-green-600' : 'text-red-500'}>
                      {plan.active ? 'Active' : 'Inactive'}
                    </span>
                    {statusLoadingId === plan.id && <span className="text-xs text-gray-400">Updating...</span>}
                  </div>
                </TableCell>
                <TableCell className="px-4 py-2  ">
                
                  {getFeatureBadges(plan)}
                </TableCell>
                <TableCell className="px-4 py-2 flex gap-2">
                  
                  <Tooltip content="Edit">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => {
                        setSelectedPlan(plan);
                        setEditDialogOpen(true);
                      }}
                    >
                      <span role="img" aria-label="edit">
                        ✏️
                      </span>
                    </Button>
                  </Tooltip>
                  <Tooltip content="Delete">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleDelete(plan.id)}
                    >
                      <span role="img" aria-label="delete">
                        🗑️
                      </span>
                    </Button>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {error && <div className="text-red-500 mt-4">{error}</div>}
    </div>
  );
};

export default SubscriptionPlansPage;
