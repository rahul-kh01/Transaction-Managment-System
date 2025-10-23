import React from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { logout } from "../../../Redux Toolkit/features/user/userThunks";
import {
  FiGrid,
  FiHome,
  FiUsers,
  FiShoppingCart,
  FiBarChart2,
  FiSettings,
  FiFileText,
  FiTag,
  FiTruck,
  FiCreditCard,
} from "react-icons/fi";
import { Button } from "../../../components/ui/button";

const navLinks = [
  {
    name: "Dashboard",
    path: "/store/dashboard",
    icon: <FiGrid className="w-5 h-5" />,
  },
  {
    name: "Stores",
    path: "/store/stores",
    icon: <FiHome className="w-5 h-5" />,
  },
  {
    name: "Branches",
    path: "/store/branches",
    icon: <FiHome className="w-5 h-5" />,
  },
  {
    name: "Products",
    path: "/store/products",
    icon: <FiShoppingCart className="w-5 h-5" />,
  },
  {
    name: "Categories",
    path: "/store/categories",
    icon: <FiTag className="w-5 h-5" />,
  },
  {
    name: "Employees",
    path: "/store/employees",
    icon: <FiUsers className="w-5 h-5" />,
  },
  {
    name: "Alerts",
    path: "/store/alerts",
    icon: <FiTruck className="w-5 h-5" />,
  },
  {
    name: "Sales",
    path: "/store/sales",
    icon: <FiBarChart2 className="w-5 h-5" />,
  },

  {
    name: "Reports",
    path: "/store/reports",
    icon: <FiFileText className="w-5 h-5" />,
  },
  {
    name: "Upgrade Plan",
    path: "/store/upgrade",
    icon: <FiCreditCard className="w-5 h-5" />,
  },
  {
    name: "Settings",
    path: "/store/settings",
    icon: <FiSettings className="w-5 h-5" />,
  },
];

export default function StoreSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth/login");
  };

  return (
    <aside className="h-screen w-64 bg-sidebar border-r border-sidebar-border flex flex-col py-6 px-4 shadow-lg">
      <div className="mb-8 text-2xl font-extrabold text-primary tracking-tight flex items-center gap-2">
        <FiHome className="w-7 h-7 text-primary" />
        POS Admin
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-2">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.path}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-base font-medium group ${
                  location.pathname.startsWith(link.path)
                    ? "bg-sidebar-accent text-sidebar-accent-foreground shadow"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`}
              >
                <span
                  className={`transition-colors ${
                    location.pathname.startsWith(link.path)
                      ? "text-sidebar-primary"
                      : "text-sidebar-foreground/60 group-hover:text-sidebar-primary"
                  }`}
                >
                  {link.icon}
                </span>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto">
        <Button
          onClick={handleLogout}
          variant=""
          className="w-full"
        >
          Logout
        </Button>
      </div>
    </aside>
  );
}
