import React, { useState, useEffect } from "react";
import { Layout, Menu, Button, theme } from "antd";
import {
  UserOutlined,
  DashboardOutlined,
  SettingOutlined,
  TeamOutlined,
  FileTextOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

type MenuItem = {
  key: string;
  icon: React.ReactNode;
  label: string;
  path: string;
};

type Role = "user" | "admin" | "panelist";

const CoreSideNav: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [role, setRole] = useState<Role>("user");
  const [selectedKey, setSelectedKey] = useState("1");

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    // Get user data from local storage
    const userString = localStorage.getItem("user");

    if (userString) {
      try {
        const userData = JSON.parse(userString);

        // Check if userData exists and has a valid role
        if (
          userData?.role &&
          ["user", "admin", "panelist"].includes(userData.role)
        ) {
          setRole(userData.role);
        }
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
      }
    }

    // Set selected key based on current path
    const path = window.location.pathname;
    const matchingItem = menuItems[role].find((item) => item.path === path);
    if (matchingItem) {
      setSelectedKey(matchingItem.key);
    }
  }, [role]);

  // Menu items configuration based on role
  const menuItems: Record<Role, MenuItem[]> = {
    user: [
      {
        key: "1",
        icon: <DashboardOutlined />,
        label: "Dashboard",
        path: "/dashboard",
      },
      {
        key: "2",
        icon: <FileTextOutlined />,
        label: "My Documents",
        path: "/documents",
      },
      {
        key: "3",
        icon: <UserOutlined />,
        label: "Profile",
        path: "/profile",
      },
    ],
    admin: [
      {
        key: "1",
        icon: <DashboardOutlined />,
        label: "Dashboard",
        path: "/dashboard",
      },
      {
        key: "2",
        icon: <TeamOutlined />,
        label: "User Management",
        path: "/users",
      },
      {
        key: "3",
        icon: <FileTextOutlined />,
        label: "Content Management",
        path: "/content",
      },
      {
        key: "4",
        icon: <SettingOutlined />,
        label: "Settings",
        path: "/settings",
      },
    ],
    panelist: [
      {
        key: "1",
        icon: <DashboardOutlined />,
        label: "Overview",
        path: "/overview",
      },
      {
        key: "2",
        icon: <FileTextOutlined />,
        label: "Reviews",
        path: "/reviews",
      },
      {
        key: "3",
        icon: <UserOutlined />,
        label: "Profile",
        path: "/profile",
      },
    ],
  };

  const handleMenuClick = (item: MenuItem) => {
    setSelectedKey(item.key);
    // In a real app, you would use react-router or similar to navigate
    window.location.href = item.path;
  };

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={250}
      breakpoint="lg"
      collapsedWidth="80"
      onBreakpoint={(broken) => {
        if (broken) {
          setCollapsed(true);
        } else {
          setCollapsed(false);
        }
      }}
      className="h-screen fixed left-0 top-0 shadow-lg"
      style={{
        background: colorBgContainer,
        borderRight: "1px solid #f0f0f0",
      }}
    >
      <div className="flex flex-col h-full">
        {/* Logo or App Name */}
        <div className="flex items-center justify-center h-16 p-4 bg-blue-600 text-white">
          {!collapsed ? (
            <h1 className="text-xl font-bold">MyApp</h1>
          ) : (
            <h1 className="text-xl font-bold">MA</h1>
          )}
        </div>

        {/* Collapse Button */}
        <div className="flex justify-end p-2 border-b">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="w-full flex items-center justify-start"
          />
        </div>

        {/* Navigation Menu */}
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          className="flex-1 border-r-0"
        >
          {menuItems[role].map((item) => (
            <Menu.Item
              key={item.key}
              icon={item.icon}
              onClick={() => handleMenuClick(item)}
              className={`hover:bg-blue-50 ${
                selectedKey === item.key ? "bg-blue-50 text-blue-600" : ""
              }`}
            >
              {item.label}
            </Menu.Item>
          ))}
        </Menu>

        {/* User Profile Section */}
        <div className="p-4 border-t flex items-center">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
            <UserOutlined />
          </div>
          {!collapsed && (
            <div className="ml-2 overflow-hidden">
              <div className="font-medium truncate">
                {localStorage.getItem("userName") || "User"}
              </div>
              <div className="text-xs text-gray-500 capitalize">{role}</div>
            </div>
          )}
        </div>
      </div>
    </Sider>
  );
};

export default CoreSideNav;
