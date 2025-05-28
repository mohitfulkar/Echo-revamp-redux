// app/core/components/CoreNavbar.tsx
import React from "react";
import { Layout, Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";

const { Header } = Layout;

const CoreNavbar: React.FC = () => {
  const handleLogout = () => {
    // Add logout logic here
  };

  return (
    <Header
      style={{
        backgroundColor: "#89CFF0", // Soft blue
        height: "2.5rem", // More usable height
        padding: "0 1.5rem", // Horizontal padding
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div className="text-xl font-bold text-blue-600">Echo</div>
      <Button
        icon={<LogoutOutlined />}
        onClick={handleLogout}
        type="text"
        className="text-red-500 hover:text-red-700"
      >
        Logout
      </Button>
    </Header>
  );
};

export default CoreNavbar;
