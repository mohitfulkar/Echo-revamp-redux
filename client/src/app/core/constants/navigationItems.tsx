// src/constants/navigationItems.tsx
import type { ReactNode } from "react";
import {
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
  BarChartOutlined,
  NotificationOutlined,
  AuditOutlined,
  CheckCircleOutlined,
  FormOutlined,
  PieChartOutlined,
  QuestionCircleOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";

export interface NavigationItem {
  key: string;
  icon: ReactNode;
  label: string;
}
export interface ModuleItem {
  key: string;
  label: string;
  icon: ReactNode;
}

export type ModuleNavigationMap = Record<string, NavigationItem[]>;

export const NAVIGATION_ITEMS: ModuleNavigationMap = {
  admin: [
    { key: "/admin/dashboard", icon: <DashboardOutlined />, label: "Dashboard" },
    { key: "/admin/manage-users", icon: <UserOutlined />, label: "Manage Users" },
    { key: "/admin/polls", icon: <FormOutlined />, label: "Polls" },
    { key: "/admin/audit-logs", icon: <AuditOutlined />, label: "Audit Logs" },
    { key: "/admin/analytics", icon: <BarChartOutlined />, label: "Analytics" },
    { key: "/admin/settings", icon: <SettingOutlined />, label: "Settings" },
    {
      key: "/notifications",
      icon: <NotificationOutlined />,
      label: "Notifications",
    },
  ],
  panelist: [
    { key: "/dashboard", icon: <DashboardOutlined />, label: "Dashboard" },
    { key: "/my-polls", icon: <FormOutlined />, label: "My Polls" },
    {
      key: "/poll-responses",
      icon: <CheckCircleOutlined />,
      label: "Poll Responses",
    },
    { key: "/analytics", icon: <PieChartOutlined />, label: "Analytics" },
    {
      key: "/notifications",
      icon: <NotificationOutlined />,
      label: "Notifications",
    },
  ],
  voter: [
    { key: "/user", icon: <DashboardOutlined />, label: "Dashboard" },
    {
      key: "/user/available-polls",
      icon: <FormOutlined />,
      label: "Available Polls",
    },
    { key: "/user/my-votes", icon: <CheckCircleOutlined />, label: "My Votes" },
    { key: "/user/results", icon: <BarChartOutlined />, label: "Results" },
    { key: "/user/profile", icon: <UserOutlined />, label: "Profile" },
    { key: "/user/help", icon: <QuestionCircleOutlined />, label: "Help / FAQ" },
  ],
  superP: [
    { key: "/super-panelist/dashboard", icon: <DashboardOutlined />, label: "Dashboard" },
    {
      key: "/super-panelist/panelists",
      icon: <UserOutlined />,
      label: "Category Panelist",
    },
    {
      key: "/super-panelist/categories",
      icon: <AppstoreOutlined />,
      label: "Categories",
    },
  ],
};

// Optional if you're using module switching elsewhere
export const AVAILABLE_MODULES: ModuleItem[] = [
  { key: "administrator", label: "Administrator", icon: <UserOutlined /> },
  { key: "panelist", label: "Panelist", icon: <FormOutlined /> },
  { key: "voter", label: "Voter", icon: <CheckCircleOutlined /> },
];

export const DEFAULT_MODULE: string = "voter"; // Or set to "administrator" depending on the default view
