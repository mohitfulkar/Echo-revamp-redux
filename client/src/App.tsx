import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import SignUp from "./app/modules/auth/pages/SignUp";
import "antd/dist/reset.css";
import Login from "./app/modules/auth/pages/Login";
import AppLayout from "./app/core/layouts/AppLayout";
import { useAuth } from "./app/core/hooks/useAuth";
import UserDashboard from "./app/modules/auth/pages/UserDashboard";

const App: React.FC = () => {
  const { isAuthenticated } = useAuth(); // Custom hook to check auth status
  console.log("isAuthenticated", isAuthenticated);
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected routes with layout */}
        <Route
          path="/"
          element={
            isAuthenticated ? <AppLayout /> : <Navigate to="/login" replace />
          }
        >
          <Route index element={<UserDashboard />} />
          {/* Add other protected routes here */}
        </Route>

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
