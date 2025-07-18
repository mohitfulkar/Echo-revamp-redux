import React, { useState } from 'react'
import DataPanel from '../../../core/components/DataPanel'
import { ClockCircleOutlined, LikeOutlined, PieChartOutlined, UserOutlined } from '@ant-design/icons';
import SharedTabs from '../../../core/components/TabComponent';
import type { TabConfig } from '../../../core/models/sharedComponent';
import { useSearchParams } from 'react-router-dom';
import Dashboard from './Dashboard';

const PanelistOnboarding: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const tabFromUrl = searchParams.get('tab') || "category";
    const [activeTab, setActiveTab] = useState<string>(tabFromUrl);

    const handleTabChange = (key: string) => {
        setActiveTab(key);
        setSearchParams({ tab: key });
    };
    const panelConfig = [
        {
            title: "Total Panelists",
            key: "totalUsers",
            growthKey: "monthlyUserGrowth",
            icon: <UserOutlined />,
            staticValue: "3m 45s",
        },
        {
            title: "Pending Requests",
            key: "totalActivePolls",
            growthKey: "monthlyPollGrowth",
            icon: <PieChartOutlined />,
            staticValue: "3m 45s",
        },
        {
            title: "Awaiting Your Vote",
            key: "totalVotes",
            growthKey: "monthlyVoteGrowth",
            icon: <LikeOutlined />,
            staticValue: "3m 45s",
        },
        {
            title: "This Month",
            key: "avgResponseTime",
            growthKey: "responseTimeGrowth", // not provided in API, fallback below
            icon: <ClockCircleOutlined />,
            staticValue: "3m 45s",
            staticGrowth: "-5%",
        },
    ];


    const TabItems: TabConfig[] = [
        { label: 'Dashboard', key: 'dashboard', children: <Dashboard /> },
        { label: 'Voting', key: 'voting', children: "" },
    ];

    return (
        <><h3 className='h3'>Panelist Onboarding System</h3>
            <p className='p'>Streamlined process for managing panelist applications, voting, and approvals</p>
            <div className='grid grid-cols-4 gap-3'>
                {panelConfig.map((panel, index) => {
                    const count = panel.staticValue ?? stats?.[panel.key]?.toLocaleString?.() ?? "0";

                    return (
                        <DataPanel
                            key={index}
                            title={panel.title}
                            count={count}
                            icon={panel.icon}
                        />
                    );
                })}
            </div>

            <div className="mt-3">
                <SharedTabs tabs={TabItems}
                    defaultActiveKey={activeTab}
                    onChange={handleTabChange} />
            </div>
        </>
    )

}

export default PanelistOnboarding