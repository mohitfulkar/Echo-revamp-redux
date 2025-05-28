// app/core/layouts/AppLayout.tsx
import React from "react";
import { Layout } from "antd";
import SidebarNavigation from "../components/CoreSideNav";
import CoreNavbar from "../components/CoreNavbar";
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
      <CoreNavbar />

      <Layout className="transition-all duration-300">
        {activeModule && <SidebarNavigation />}

        <Content className="bg-gray-50 w-full">
          <div className="p-12">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
