// utils/toast.tsx
import { message } from "antd";

let messageApiRef: ReturnType<typeof message.useMessage>[0];

export const setMessageApi = (api: typeof messageApiRef) => {
  messageApiRef = api;
};

export const showToast = {
  success: (msg: string) => messageApiRef?.success(msg),
  error: (msg: string) => messageApiRef?.error(msg),
  info: (msg: string) => messageApiRef?.info(msg),
  warning: (msg: string) => messageApiRef?.warning(msg),
};
