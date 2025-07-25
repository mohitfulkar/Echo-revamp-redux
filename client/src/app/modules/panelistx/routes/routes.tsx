import type React from "react";
import Dashboard from "../pages/Dashboard";
import PanelistOnboarding from "../pages/PanelistOnboarding";

export const panelistRoutes: { path: string; element: React.ReactNode }[] =
    [
        { path: "/panelist/dashboard", element: <Dashboard /> },
        { path: "/panelist/onboarding/dashboard", element: <PanelistOnboarding /> },
    ];
