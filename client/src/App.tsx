// App.tsx
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ConfigProvider } from "antd";
import VoterDashboard from "./app/modules/dashboard/pages/VoterDashboard";
import AppLayout from "./app/core/layouts/AppLayout";
import { useDispatch } from "react-redux";
import { setActiveModule } from "./app/core/features/navigationSlices";
import AdminDashboard from "./app/modules/dashboard/pages/AdminDashboard";
import PollLanding from "./app/modules/polls/pages/PollLanding";
import VoterLanding from "./app/modules/voter/pages/UserLanding";
import SuperPanelistCreation from "./app/modules/super-panelistx/pages/SuperPanelistCreation";
import PanelistCreation from "./app/modules/panelistx/pages/PanelistCreation";
import { authRoutes } from "./app/modules/auth/routes/routes";
import { superPanelistRoutes } from "./app/modules/super-panelistx/routes/routes";
import { panelistRoutes } from "./app/modules/panelistx/routes/routes";

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
          {authRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<VoterDashboard />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/polls" element={< PollLanding />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/manage-users" element={<VoterLanding />} />
            <Route path="/admin/super-panelist/add" element={<SuperPanelistCreation />} />
            <Route path="/admin/panelist/:step/:action" element={<PanelistCreation />} />
            <Route path="/admin/panelist/:step/:id/:action" element={<PanelistCreation />} />


            {panelistRoutes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}

            {superPanelistRoutes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}


          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </ConfigProvider>
  );
};

export default App;
