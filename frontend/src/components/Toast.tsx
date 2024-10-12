import { useEffect } from "react";

type ToastProps = {
  message: string;
  type: "SUCCESS" | "ERROR";
  onClose: () => void;
};

const Toast = ({ message, type, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  return (
    <div
      className={`fixed top-4 right-4 z-50 p-4 rounded-md max-w-md text-white
        ${type === "SUCCESS" ? "bg-green-500" : "bg-red-500"}`}
    >
      <div>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Toast;
