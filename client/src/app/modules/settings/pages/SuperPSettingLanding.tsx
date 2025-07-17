import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import SharedBreadcrumb from "../../../core/components/SharedBreadCrumb";
import SharedTabs from "../../../core/components/TabComponent";
import DashboardPanel from "../components/DashboardPanel";

import CategoryLanding from "./CategoryLanding";
import ExpertiseLanding from "./ExpertiseLanding";
import RsbLanding from "./RsbLanding";
import DesignationLanding from "./DesignationLanding";

import type { CrumbItem, TabConfig } from "../../../core/models/sharedComponent";

const SuperPSettingLanding: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabFromUrl = searchParams.get('tab') || "category";
  const [activeTab, setActiveTab] = useState<string>(tabFromUrl);

  const handleTabChange = (key: string) => {
    setActiveTab(key);
    setSearchParams({ tab: key });
  };

  const TabItems: TabConfig[] = [
    { label: 'Category', key: 'category', children: <CategoryLanding /> },
    { label: 'Expertise', key: 'expertise', children: <ExpertiseLanding /> },
    { label: 'Responsibility', key: 'rsb', children: <RsbLanding /> },
    { label: 'Designation', key: 'designation', children: <DesignationLanding /> },
  ];

  const breadcrumbItems: CrumbItem[] = [{ label: "Configuration" }];

  return (
    <>
      <SharedBreadcrumb items={breadcrumbItems} />
      <h4 className="h3">Configuration</h4>
      <DashboardPanel />
      <div className="mt-4">
        <SharedTabs
          tabs={TabItems}
          defaultActiveKey={activeTab}
          onChange={handleTabChange}
        />
      </div>
    </>
  );
};

export default SuperPSettingLanding;
