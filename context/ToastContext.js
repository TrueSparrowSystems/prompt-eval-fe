import React, { createContext, useContext, useState } from "react";

export const ToastContext = createContext({
  showToast: {},
  setShowToast: () => {},
  toastMessage: {},
  setToastMessage: () => {},
  toastType: {},
  setToastType: () => {},
});

export function useToastContext() {
  const {
    showToast,
    setShowToast,
    toastMessage,
    setToastMessage,
    toastType,
    setToastType,
  } = useContext(ToastContext);

  return {
    showToast,
    setShowToast,
    toastMessage,
    setToastMessage,
    toastType,
    setToastType,
  };
}

export const ToastProvider = ({ children }) => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");

  return (
    <ToastContext.Provider
      value={{
        showToast,
        setShowToast,
        toastMessage,
        setToastMessage,
        toastType,
        setToastType,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};
