import React from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { logout } from "../../../Redux Toolkit/features/user/userThunks";
import { FiLayout, FiHome, FiDownload, FiSettings, FiFileText, FiDollarSign, FiClock,  } from "react-icons/fi";
import { Button } from "../../../components/ui/button";

const navLinks = [
  {
    name: "Dashboard",
    path: "/super-admin/dashboard",
    icon: <FiLayout className="w-5 h-5" />,
  },
  {
    name: "Stores",
    path: "/super-admin/stores",
    icon: <FiHome className="w-5 h-5" />,
  },
  {
    name: "Subscription Plans",
    path: "/super-admin/subscriptions",
    icon: <FiFileText className="w-5 h-5" />,
  },
  {
    name: "Pending Requests",
    path: "/super-admin/requests",
    icon: <FiClock className="w-5 h-5" />,
  },
 

  {
    name: "Settings",
    path: "/super-admin/settings",
    icon: <FiSettings className="w-5 h-5" />,
  },
];

export default function SuperAdminSidebar() {
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
        Super Admin
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
          className="flex items-center gap-3 rounded-lg transition-colors text-base font-medium w-full text-left "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-log-out w-5 h-5"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="17 16 22 12 17 8" />
            <line x1="22" x2="10" y1="12" y2="12" />
          </svg>
          Logout
        </Button>
      </div>
    </aside>
  );
} 