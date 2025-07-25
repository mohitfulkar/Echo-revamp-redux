import type React from "react";
import Dashboard from "../pages/Dashboard";
import PanelistOnboarding from "../pages/PanelistOnboarding";
import ViewPanelist from "../pages/ViewPanelist";

export const panelistRoutes: { path: string; element: React.ReactNode }[] =
    [
        { path: "/panelist/dashboard", element: <Dashboard /> },
        { path: "/panelist/onboarding/dashboard", element: <PanelistOnboarding /> },
        { path: "/panelist/onboarding/dashboard/:action/:panelistId", element: <ViewPanelist /> },
    ];
