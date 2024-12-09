"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface User {
  id: number;
  email: string;
  about_me: string | null;
  street_address: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  birthdate: string | null;
  created_at: string;
  updated_at: string;
}

interface UserContextType {
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
