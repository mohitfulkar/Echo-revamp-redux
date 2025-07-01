import React, { useState } from "react";
import SharedBreadcrumb from "../../../core/components/SharedBreadCrumb";
import type { CrumbItem, TabConfig } from "../../../core/models/sharedComponent";
import SharedTabs from "../../../core/components/TabComponent";
import { useSearchParams } from "react-router-dom";
import CategoryLanding from "./CategoryLanding";
import ExpertiseLanding from "./ExpertiseLanding";
import RsbLanding from "./RsbLanding";
import DashboardPanel from "../components/DashboardPanel";
import DesignationLanding from "./DesignationLanding";

const SuperPSettingLanding: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const tabFromUrl = searchParams.get('tab') || "";
  const [activeTab, setActiveTab] = useState<string>(tabFromUrl);

  const handleTabChange = (key: string) => {
    setActiveTab(key);
    setSearchParams({ tab: key });
  };
  const TabItems: TabConfig[] = [
    { label: 'Category', key: 'category' },
    { label: 'Expertise', key: 'expertise' },
    { label: 'Responsibility', key: 'rsb' },
    { label: 'Designation', key: 'designation' },
  ];
  const breadcrumbItems: CrumbItem[] = [
    { label: "Settings" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'category':
        return <CategoryLanding />;
      case 'expertise':
        return <ExpertiseLanding />;
      case 'rsb':
        return <RsbLanding />;
      case 'designation':
        return <DesignationLanding />;
      default:
        return null;
    }
  };

  return (
    <>
      <div>
        <h4 className="h3">Configuration</h4>
        <SharedBreadcrumb items={breadcrumbItems} />
        <DashboardPanel />
        <SharedTabs
          tabs={TabItems}
          defaultActiveKey={activeTab}
          onChange={handleTabChange}
        />
      </div>
      <div className="mt-4">
        {renderTabContent()}
      </div>
    </>
  )
};

export default SuperPSettingLanding;
