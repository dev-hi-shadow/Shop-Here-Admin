/* eslint-disable react/prop-types */
import { IconAlertCircleFilled, IconChecks, IconLoader3 } from "@tabler/icons-react";
import { createContext, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastContext = createContext();

export const useAlert = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useAlert must be used within a ToastProvider");
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const showAlert = (message, type, ...rest) => {
    toast(message, {
      type: type || "success",
      icon : (type==="info") ? <IconLoader3 />  : type==="error" ? <IconAlertCircleFilled />  :  <IconChecks />,
      ...rest,
    });
  };

  return (
    <ToastContext.Provider value={{ showAlert }}>
      {children}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        pauseOnHover={false}
        closeOnClick
        theme="dark"
      />
    </ToastContext.Provider>
  );
};
