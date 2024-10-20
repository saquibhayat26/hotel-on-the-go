import React, { useMemo, useState } from "react";
import { AppContext, AppContextType, ToastMessage } from "./AppContext";
import Toast from "../components/Toast";
import { useQuery } from "@tanstack/react-query";

import * as authService from "../api/authService";

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [toast, setToast] = useState<ToastMessage | undefined>(undefined);

  // validate the token
  const { isError, isLoading } = useQuery({
    queryKey: ["validateToken"],
    queryFn: authService.validateToken,
    retry: false,
  });

  const contextValue = useMemo<AppContextType>(() => {
    return {
      showToast: (toastMessage) => setToast(toastMessage),
      // Add other context values here
      isLoggedIn: !isError && !isLoading,
    };
  }, [isError, isLoading]);

  return (
    <AppContext.Provider value={contextValue}>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(undefined)}
        />
      )}
      {children}
    </AppContext.Provider>
  );
};
