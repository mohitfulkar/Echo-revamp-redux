// components/ToastProvider.tsx
import React from "react";
import { message } from "antd";
import { setMessageApi } from "./ToastService";

const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [messageApi, contextHolder] = message.useMessage();

  // Set the reference once
  React.useEffect(() => {
    setMessageApi(messageApi);
  }, [messageApi]);

  return (
    <>
      {contextHolder}
      {children}
    </>
  );
};

export default ToastProvider;
