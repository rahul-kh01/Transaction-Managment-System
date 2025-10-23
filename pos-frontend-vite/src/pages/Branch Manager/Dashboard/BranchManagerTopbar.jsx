import React from "react";
import { useSelector } from "react-redux";
import {
  FiLayout,
  FiShoppingBag,
  FiCreditCard,
  FiPackage,
  FiUsers,
  FiUser,
  FiFileText,
  FiSettings,
  FiLogOut,
  FiRefreshCw,
  FiBell
} from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";

export default function BranchManagerTopbar() {
  const { userProfile } = useSelector((state) => state.user);
  const { branch } = useSelector((state) => state.branch);

  return (
    <header className="bg-background border-b px-6 py-4 flex items-center justify-between">
      <div>
        <h1 className="text-xl font-semibold text-foreground">
          {branch ? branch.name : "Branch Dashboard"}
        </h1>
        <p className="text-sm text-muted-foreground">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        
        <Button variant="ghost" size="icon" className="relative">
          <FiBell className="h-5 w-5" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
            3
          </Badge>
        </Button>

        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
            <FiUser className="h-5 w-5 text-primary" />
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-foreground">{userProfile?.name || "Branch Manager"}</p>
            <p className="text-xs text-muted-foreground">{userProfile?.email || "manager@example.com"}</p>
          </div>
        </div>
      </div>
    </header>
  );
}