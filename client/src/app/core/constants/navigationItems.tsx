// src/constants/navigationItems.tsx
import type { ReactNode } from "react";
import { Icons } from "./Icon";

export interface NavigationItem {
  key: string;
  icon?: ReactNode;
  label: string;
  children?: NavigationItem[]; // 👈 Add this line
}
export interface ModuleItem {
  key: string;
  label: string;
  icon: ReactNode;
}

export type ModuleNavigationMap = Record<string, NavigationItem[]>;

export const NAVIGATION_ITEMS: ModuleNavigationMap = {
  admin: [
    { key: "/admin/dashboard", icon: Icons.dashboard, label: "Dashboard" },
    { key: "/admin/manage-users", icon: Icons.user, label: "Manage Users" },
    { key: "/admin/polls", icon: Icons.form, label: "Polls" },
    { key: "/admin/audit-logs", icon: Icons.audit, label: "Audit Logs" },
    { key: "/admin/analytics", icon: Icons.barChart, label: "Analytics" },
    { key: "/admin/settings", icon: Icons.setting, label: "Settings" },
    { key: "/notifications", icon: Icons.notification, label: "Notifications" },
  ],
  panelist: [
    { key: "/panelist/dashboard", icon: Icons.dashboard, label: "Dashboard" },
    {
      key: "/panelist/panelist-onboarding",
      icon: Icons.dashboard,
      label: "Panelist Onboarding",
      children: [
        { key: "/panelist/onboarding/dashboard?tab=dashboard", icon: Icons.dashboard, label: "Dashboard" },
        { key: "/panelist/onboarding/voting", icon: Icons.tickCircle, label: "Voting" },
      ],
    },
    { key: "/my-polls", icon: Icons.form, label: "My Polls" },
    {
      key: "/panelist/poll-responses",
      icon: Icons.checkCircle,
      label: "Poll Responses",
    },
    { key: "/panelist/analytics", icon: Icons.pieChart, label: "Analytics" },
    {
      key: "/panelist/notifications",s
      icon: Icons.notification,
      label: "Notifications",
    },
  ],
  voter: [
    { key: "/user", icon: Icons.dashboard, label: "Dashboard" },
    {
      key: "/user/available-polls",
      icon: Icons.form,
      label: "Available Polls",
    },
    { key: "/user/my-votes", icon: Icons.checkCircle, label: "My Votes" },
    { key: "/user/results", icon: Icons.barChart, label: "Results" },
    { key: "/user/profile", icon: Icons.user, label: "Profile" },
    { key: "/user/help", icon: Icons.questionCircle, label: "Help / FAQ" },
  ],
  superP: [
    {
      key: "/super-panelist/dashboard",
      icon: Icons.dashboard,
      label: "Dashboard",
    },
    {
      key: "/super-panelist/panelists",
      icon: Icons.user,
      label: "Category Panelist",
    },
    {
      key: "/super-panelist/settings?tab=category",
      icon: Icons.setting,
      label: "Configuration",
    },
  ],
};

export const AVAILABLE_MODULES: ModuleItem[] = [
  { key: "administrator", label: "Administrator", icon: Icons.user },
  { key: "panelist", label: "Panelist", icon: Icons.form },
  { key: "voter", label: "Voter", icon: Icons.checkCircle },
];

export const DEFAULT_MODULE: string = "voter";
