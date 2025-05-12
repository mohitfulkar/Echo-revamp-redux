import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import CoreSideNav from "../components/CoreSideNav";

const { Content } = Layout;

const AppLayout: React.FC = () => {
    console.log('apploayout')
  return (
    <Layout className="min-h-screen">
      <CoreSideNav />
      <Layout className="ml-0 lg:ml-[250px]">
        <Content className="p-6">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
