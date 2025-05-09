import React from "react";
import AdminLayout from "./AdminLayout";
import Banner from "../../components/user/Banner";

const AdminLanding = () => {
  return (
    <AdminLayout>
      <Banner
        title="Admin"
        description="An admin is responsible for overseeing and managing various aspects of a system, platform, or organization to ensure smooth operations, security, and efficiency."
      />
    </AdminLayout>
  );
};

export default AdminLanding;
