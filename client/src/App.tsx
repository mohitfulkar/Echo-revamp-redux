// App.tsx
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ConfigProvider } from "antd";
import Login from "./app/modules/auth/pages/Login";
import SignUp from "./app/modules/auth/pages/SignUp";
import VoterDashboard from "./app/modules/dashboard/pages/VoterDashboard";
import AppLayout from "./app/core/layouts/AppLayout";
import { useDispatch } from "react-redux";
import { setActiveModule } from "./app/core/features/navigationSlices";

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const savedModule = localStorage.getItem("activeModule");
    if (savedModule) {
      dispatch(setActiveModule(savedModule));
    }
  }, [dispatch]);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1890ff",
        },
      }}
    >
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />

          {/* All protected or main app routes go inside AppLayout */}
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<VoterDashboard />} />
            {/* More role/feature-based routes can go here */}
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </ConfigProvider>
  );
};

export default App;
