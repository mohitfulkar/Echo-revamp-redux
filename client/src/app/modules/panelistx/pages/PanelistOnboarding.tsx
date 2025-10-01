import React, { useEffect, useState } from 'react'
import DataPanel from '../../../core/components/DataPanel'
import SharedTabs from '../../../core/components/TabComponent';
import type { TabConfig } from '../../../core/models/sharedComponent';
import { useSearchParams } from 'react-router-dom';
import Dashboard from '../components/onboarding/Dashboard'
import { Icons } from '../../../core/constants/Icon';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../store';
import { onboardingPanelistSummary } from '../../dashboard/features/dashboardSlices';
import Voting from '../components/onboarding/Voting';

const PanelistOnboarding: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch<AppDispatch>()
    const tabFromUrl = searchParams.get('tab') || "category";
    const [activeTab, setActiveTab] = useState<string>(tabFromUrl);
    const { items } = useSelector((state: RootState) => state.dashboard)

    useEffect(() => {
        dispatch(onboardingPanelistSummary())
    }, [dispatch])

    const handleTabChange = (key: string) => {
        setActiveTab(key);
        setSearchParams({ tab: key });
    };
    const panelConfig = [
        {
            title: "Total Panelists",
            key: "total",
            icon: Icons.team,
            iconBgColor: "bg-sky-100",
            iconTextColor: "text-sky-600",
        },
        {
            title: "Pending Requests",
            key: "PENDING",
            icon: Icons.clock,
            iconBgColor: "bg-yellow-100",
            iconTextColor: "text-yellow-600",
        },
        {
            title: "Approved Requests",
            key: "APPROVED",
            icon: Icons.checkCircle,
            iconBgColor: "bg-green-100",
            iconTextColor: "text-green-600",
        },
        {
            title: "Total Votes",
            key: "totalVotes",
            icon: Icons.barChart,
            iconBgColor: "bg-purple-100",
            iconTextColor: "text-purple-600",
        },
    ];

    const getCountForKey = (key: string): number => {
        switch (key) {
            case "total":
                return items?.total ?? 0;
            case "PENDING":
                return items?.PENDING ?? 0;
            case "APPROVED":
                return items?.APPROVED ?? 0;
            case "totalVotes":
                return items?.voteSummary?.total ?? 0;
            default:
                return 0;
        }
    };

    const TabItems: TabConfig[] = [
        { label: 'Dashboard', key: 'dashboard', children: <Dashboard /> },
        { label: 'Voting', key: 'voting', children: <Voting /> },
    ];

    return (
        <>
            <h3 className='h3'>Panelist Onboarding System</h3>
            <p className='p'>Streamlined process for managing panelist applications, voting, and approvals</p>
            <div className='grid grid-cols-4 gap-3'>
                {panelConfig.map((panel, index) => (
                    <DataPanel
                        key={index}
                        title={panel.title}
                        count={getCountForKey(panel.key)}
                        icon={panel.icon}
                        iconBgColor={panel.iconBgColor}
                        iconTextColor={panel.iconTextColor}

                    />
                ))}
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