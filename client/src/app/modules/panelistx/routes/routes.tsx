import type React from "react";
import PanelistForm from "../components/panelist-creation/PanelistForm";

export const panelistRoutes: { path: string; element: React.ReactNode }[] =
    [

        { path: "/super-panelist/panelist/add", element: <PanelistForm /> },
    ];
