import { createContext, ReactNode, useContext, useState } from "react";
import React from "react";

export const ProfileContext = createContext<any>({});

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userProfile, setUserProfile] = useState<any>();

  return (
    <ProfileContext.Provider
      value={{
        userProfile,
        setUserProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useModalLogin must be used within a ModalLoginProvider");
  }
  return context;
};
