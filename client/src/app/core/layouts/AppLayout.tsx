// app/core/layouts/AppLayout.tsx
import React from "react";
import { Layout } from "antd";
import SidebarNavigation from "../components/CoreSideNav";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";

const { Content } = Layout;

const AppLayout: React.FC = () => {
  const activeModule = useSelector(
    (state: RootState) => state.navigation?.activeModule
  );

  return (
    <Layout className="min-h-screen">
      {activeModule && <SidebarNavigation />}

      <Layout className="transition-all duration-300">
        <Content className="p-6 bg-gray-50">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
