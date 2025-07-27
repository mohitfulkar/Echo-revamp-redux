import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store from "./app/store.ts";
import "antd/dist/reset.css"; // ✅ Required for AntD v5
import ToastProvider from "./app/core/service/ToastProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ToastProvider>
        <App />
      </ToastProvider>
    </Provider>
  </StrictMode>
);
