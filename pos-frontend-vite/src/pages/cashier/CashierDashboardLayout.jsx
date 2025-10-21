import { Outlet, useNavigate } from "react-router";

import { useToast } from "@/components/ui/use-toast";
import {
 
  ShoppingCartIcon,
  ClockIcon,
  RotateCcwIcon,
  UsersIcon,
  ReceiptIcon,
} from "lucide-react";
import CashierSideBar from "./Sidebar/CashierSideBar";
import { SidebarProvider } from "../../context/SidebarProvider";
import { useSidebar } from "../../context/hooks/useSidebar";

const navItems = [
  {
    path: "/cashier",
    icon: <ShoppingCartIcon size={20} />,
    label: "POS Terminal",
  },
  {
    path: "/cashier/orders",
    icon: <ClockIcon size={20} />,
    label: "Order History",
  },
  {
    path: "/cashier/returns",
    icon: <RotateCcwIcon size={20} />,
    label: "Returns/Refunds",
  },
  {
    path: "/cashier/customers",
    icon: <UsersIcon size={20} />,
    label: "Customers",
  },
  {
    path: "/cashier/shift-summary",
    icon: <ReceiptIcon size={20} />,
    label: "Shift Summary",
  },
];

const LayoutContent  = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const {sidebarOpen, setSidebarOpen}=useSidebar();


  const handleLogout = () => {
    toast({
      title: "Preparing Shift Summary",
      description: "Redirecting to shift summary page...",
    });
    navigate("/cashier/shift-summary");
  };



  return (
    <div className="flex h-screen bg-background">
      {/* Hamburger for all screen sizes */}

      {/* Sidebar overlay for all screen sizes */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      {/* Sidebar */}
      <div
        className={`fixed z-30 h-full transition-transform duration-200 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <CashierSideBar
          navItems={navItems}
          handleLogout={handleLogout}
          onClose={() => setSidebarOpen(false)}
        />
      </div>
      {/* Main Content */}
    
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      
    </div>
  );
};

const CashierDashboardLayout = () => {
  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  );
};

export default CashierDashboardLayout;
