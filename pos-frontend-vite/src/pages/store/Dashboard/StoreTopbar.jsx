
import { FiBell, FiUser, FiSearch } from "react-icons/fi";
import { ThemeToggle } from "../../../components/theme-toggle";



import { Input } from "../../../components/ui/input";

export default function StoreTopbar() {
 
  return (
    <header className="w-full h-16 bg-background border-b flex items-center px-6 justify-between shadow-sm">
      {/* Search */}
      <div className="flex-1 max-w-md relative">
       {/* <h1 className="storeName text-primary text-3xl">{store.store?.brand}</h1> */}
       <Input placeholder="Search..." className="w-full"/>
      </div>
      
      {/* Right side: Notifications & Profile */}
      <div className="flex items-center gap-6">
        {/* Theme Toggle */}
        <ThemeToggle />
        
        {/* Notifications */}
        <button className="relative">
          <FiBell className="text-muted-foreground w-6 h-6" />
          <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full px-1">3</span>
        </button>
        
        {/* Profile Dropdown */}
        <div className="flex items-center gap-2 cursor-pointer">
          <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center font-bold text-primary">
            <FiUser className="w-6 h-6" />
          </span>
          <span className="font-medium text-foreground">Store Admin</span>
        </div>
      </div>
    </header>
  );
}