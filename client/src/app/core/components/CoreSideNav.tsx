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
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath: string = location.pathname;
  const activeModule: string | null = useSelector(
    (state: RootState) => state.navigation?.activeModule
  );
  // 👇 Return null if activeModule is null or undefined
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
      className="h-screen fixed left-0 top-0 bg-white border-r border-gray-200"
      trigger={null}
      collapsible
      collapsed={collapsed}
      breakpoint="lg"
      collapsedWidth={60}
      width={200}
    >
      <div
        className="p-4 flex justify-end cursor-pointer text-blue-600 hover:text-blue-800 transition-colors"
        onClick={toggleCollapsed}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </div>

      {/* Submenu Items for Module */}
      {currentNavItems.length > 0 && (
        <>
          <Menu
            mode="inline"
            selectedKeys={[currentPath]}
            className="border-0 shadow-none"
            onClick={handleNavClick}
            items={currentNavItems.map((item: NavigationItem) => ({
              key: item.key,
              icon: item.icon,
              label: item.label,
            }))}
          />
        </>
      )}
    </Sider>
  );
};

export default SidebarNavigation;
