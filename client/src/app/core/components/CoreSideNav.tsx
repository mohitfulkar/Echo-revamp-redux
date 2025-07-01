import React, { useState } from "react";
import { Layout, Menu, type MenuProps } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  NAVIGATION_ITEMS,
  type NavigationItem,
} from "../constants/navigationItems";
import type { RootState } from "../../store";

const { Sider } = Layout;

const SidebarNavigation: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath: string = location.pathname;
  const activeModule: string | null = useSelector(
    (state: RootState) => state.navigation?.activeModule
  );

  if (!activeModule || !NAVIGATION_ITEMS[activeModule]) {
    return null;
  }

  const currentNavItems: NavigationItem[] = NAVIGATION_ITEMS[activeModule];
  const toggleCollapsed = (): void => {
    setCollapsed(!collapsed);
  };

  const handleNavClick: MenuProps["onClick"] = (e) => {
    navigate(e.key);
  };

  return (
    <Sider
      theme="light"
      className="fixed left-0 top-0 z-50 border-r border-gray-200 bg-white shadow-md transition-all duration-300 ease-in-out"
      trigger={null}
      collapsible
      collapsed={collapsed}
      breakpoint="lg"
      collapsedWidth={60}
      width={240}
    >
      <div
        className="p-4 flex justify-end items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
        onClick={toggleCollapsed}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </div>

      <Menu
        mode="inline"
        selectedKeys={[currentPath]}
        onClick={handleNavClick}
        className="border-none"
        items={currentNavItems.map((item: NavigationItem) => ({
          key: item.key,
          icon: item.icon,
          label: (
            <span className="font-medium text-gray-700 group-hover:text-blue-600 transition-all">
              {item.label}
            </span>
          ),
          className:
            "group px-4 py-2 rounded-md m-1 hover:bg-blue-50 hover:!text-blue-600 transition-all duration-150",
        }))}
      />
    </Sider>
  );
};

export default SidebarNavigation;
