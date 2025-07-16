import type React from "react";
import SuperPDashboard from "../../dashboard/pages/SuperPDashboard";
import PanelistLanding from "../../panelistx/pages/PanelistLanding";
import SuperPSettingLanding from "../../settings/pages/SuperPSettingLanding";
import AddPanelist from "../pages/AddPanelist";

export const superPanelistRoutes: { path: string; element: React.ReactNode }[] =
  [
    { path: "/super-panelist/dashboard", element: <SuperPDashboard /> },
    { path: "/super-panelist/:moduleName", element: <PanelistLanding /> },
    { path: "/super-panelist/settings", element: <SuperPSettingLanding /> },
    { path: "/super-panelist/:moduleName/:action", element: <AddPanelist /> },
    { path: "/super-panelist/:moduleName/:action/:panelistId", element: <AddPanelist /> },
  ];
