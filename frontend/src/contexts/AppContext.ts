import React from "react";

export type ToastMessage = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

export type AppContextType = {
  showToast: (toastMessage: ToastMessage) => void;
  // Add other context values here
  isLoggedIn: boolean;
};

export const AppContext = React.createContext<AppContextType | undefined>(
  undefined
);

export const useAppContext = () => {
  const context = React.useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within a AppContextProvider");
  }
  return context as AppContextType;
};
