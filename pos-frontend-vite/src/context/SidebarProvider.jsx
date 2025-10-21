import { useState } from "react";
import { SidebarContext } from "./SidebarContext";

export const SidebarProvider = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <SidebarContext.Provider value={{ setSidebarOpen, sidebarOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};