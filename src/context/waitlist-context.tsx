"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type WaitlistType = "brand" | "fleet" | "choose";

interface WaitlistContextType {
  isOpen: boolean;
  waitlistType: WaitlistType;
  openWaitlist: (type?: WaitlistType) => void;
  closeWaitlist: () => void;
}

const WaitlistContext = createContext<WaitlistContextType | undefined>(undefined);

export function WaitlistProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [waitlistType, setWaitlistType] = useState<WaitlistType>("choose");

  const openWaitlist = (type: WaitlistType = "choose") => {
    setWaitlistType(type);
    setIsOpen(true);
  };

  const closeWaitlist = () => setIsOpen(false);

  return (
    <WaitlistContext.Provider value={{ isOpen, waitlistType, openWaitlist, closeWaitlist }}>
      {children}
    </WaitlistContext.Provider>
  );
}

export function useWaitlist() {
  const context = useContext(WaitlistContext);
  if (context === undefined) {
    throw new Error("useWaitlist must be used within a WaitlistProvider");
  }
  return context;
}
