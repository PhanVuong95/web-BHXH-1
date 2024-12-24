import React, { createContext, useContext, useState } from "react";

const ModalLoginContext = createContext<{
  isShowModalLogin: boolean;
  setIsShowModalLogin: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);

export const ModalLoginProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isShowModalLogin, setIsShowModalLogin] = useState(false);

  return (
    <ModalLoginContext.Provider
      value={{ isShowModalLogin, setIsShowModalLogin }}
    >
      {children}
    </ModalLoginContext.Provider>
  );
};

export const useModalLogin = () => {
  const context = useContext(ModalLoginContext);
  if (!context) {
    throw new Error("useModalLogin must be used within a ModalLoginProvider");
  }
  return context;
};
