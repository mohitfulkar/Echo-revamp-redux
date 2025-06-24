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
import AdminLogin from "./app/modules/auth/pages/AdminLogin";
import AdminDashboard from "./app/modules/dashboard/pages/AdminDashboard";
import PollLanding from "./app/modules/polls/pages/PollLanding";
import VoterLanding from "./app/modules/voter/pages/UserLanding";
import SuperPanelistLogin from "./app/modules/auth/pages/SuperPanelistLogin";
import SuperPDashboard from "./app/modules/dashboard/pages/SuperPDashboard";
import PanelistLanding from "./app/modules/voter/pages/PanelistLanding";
import PanelistLogin from "./app/modules/auth/pages/PanelistLogin";
import SuperPanelistCreation from "./app/modules/voter/pages/SuperPanelistCreation";
import PanelistCreation from "./app/modules/voter/pages/PanelistCreation";
import SuperPSettingLanding from './app/modules/settings/pages/SuperPSettingLanding';

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
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/login/super-panelist" element={<SuperPanelistLogin />} />
          <Route path="/login/panelist" element={<PanelistLogin />} />

          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<VoterDashboard />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />

            <Route path="/admin/polls" element={< PollLanding />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/manage-users" element={<VoterLanding />} />
            <Route path="/admin/super-panelist/add" element={<SuperPanelistCreation />} />
            <Route path="/admin/panelist/:step/:action" element={<PanelistCreation />} />
            <Route path="/admin/panelist/:step/:id/:action" element={<PanelistCreation />} />

            {/* panelists url */}
            < Route path="/super-panelist/dashboard" element={<SuperPDashboard />} />
            <Route path="/super-panelist/panelists" element={<PanelistLanding />} />
            <Route path="/super-panelist/settings" element={<SuperPSettingLanding />} />



          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </ConfigProvider>
  );
};

export default App;
