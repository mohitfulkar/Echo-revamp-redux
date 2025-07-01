import type React from "react";
import AdminLogin from "../pages/AdminLogin";
import Login from "../pages/Login";
import PanelistLogin from "../pages/PanelistLogin";
import SignUp from "../pages/SignUp";
import SuperPanelistLogin from "../pages/SuperPanelistLogin";

export const authRoutes: { path: string, element: React.ReactNode }[] = [
    { path: "/login", element: <Login /> },
    { path: "/register", element: <SignUp /> },
    { path: "/admin-login", element: <AdminLogin /> },
    { path: "/login/super-panelist", element: <SuperPanelistLogin /> },
    { path: "/login/panelist", element: <PanelistLogin /> },
];
