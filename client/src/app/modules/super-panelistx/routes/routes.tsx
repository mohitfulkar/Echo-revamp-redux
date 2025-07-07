import type React from "react";
import SuperPDashboard from "../../dashboard/pages/SuperPDashboard";
import PanelistLanding from "../../panelistx/pages/PanelistLanding";
import SuperPSettingLanding from "../../settings/pages/SuperPSettingLanding";
import PanelistForm from "../../panelistx/components/panelist-creation/PanelistForm";

export const superPanelistRoutes: { path: string; element: React.ReactNode }[] =
  [
    { path: "/super-panelist/dashboard", element: <SuperPDashboard /> },
    { path: "/super-panelist/panelists", element: <PanelistLanding /> },
    { path: "/super-panelist/settings", element: <SuperPSettingLanding /> },
    { path: "/super-panelist/panelists/add", element: <PanelistForm /> },
  ];
