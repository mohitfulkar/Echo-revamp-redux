import React, { useEffect } from 'react';
import DataPanel from '../../../core/components/DataPanel';
import { SettingOutlined, BarChartOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getCategorySummary, getDesignationSummary, getExpertiseSummary, getRsbSummary } from '../../dashboard/features/dashboardSlices';
import type { RootState, AppDispatch } from '../../../store';
import { getTabFromUrl } from '../../../core/service/urlService';
import CardSkeleton from '../../../core/components/skeleton/CardSkeleton';
interface StatusTitles {
    TOTAL: string;
    ACTIVE: string;
    EXPIRED: string;
    INACTIVE: string;
    PENDING: string;
}

interface TitlesMap {
    category: StatusTitles;
    expertise: StatusTitles;
    rsb: StatusTitles;
    designation: StatusTitles;
}
const DashboardPanel: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { items, loading } = useSelector((state: RootState) => state.dashboard);
    type TabType = keyof TitlesMap;
    const tab = (getTabFromUrl() as TabType) || 'category';
    console.log('tab', tab)
    const data = items || {}

    useEffect(() => {
        if (tab === 'category') {
            dispatch(getCategorySummary());
        }
        else if (tab === 'expertise') {
            dispatch(getExpertiseSummary());
        }
        else if (tab === 'rsb') {
            dispatch(getRsbSummary());
        }
        else if (tab === 'designation') {
            dispatch(getDesignationSummary());
        }
    }, [dispatch, tab]);

    const titles: TitlesMap = {
        category: {
            TOTAL: 'Total Category',
            ACTIVE: 'Active Category',
            EXPIRED: 'Expired Category',
            INACTIVE: 'Inactive Category',
            PENDING: 'Pending Category',
        },
        expertise: {
            TOTAL: 'Total Expertise',
            ACTIVE: 'Active Expertise',
            EXPIRED: 'Expired Expertise',
            INACTIVE: 'Inactive Expertise',
            PENDING: 'Pending Expertise',
        },
        rsb: {
            TOTAL: 'Total Responsibility',
            ACTIVE: 'Active Responsibility',
            EXPIRED: 'Expired Responsibility',
            INACTIVE: 'Inactive Responsibility',
            PENDING: 'Pending Responsibility',
        },
        designation: {
            TOTAL: 'Total Designation',
            ACTIVE: 'Active Designation',
            EXPIRED: 'Expired Designation',
            INACTIVE: 'Inactive Designation',
            PENDING: 'Pending Designation',
        },
    };
    const currentTitles = titles[tab] || titles['category'];

    const panelConfig = [
        {
            title: currentTitles.TOTAL,
            key: 'total',
            icon: <BarChartOutlined />,
        },
        {
            title: currentTitles.ACTIVE,
            key: 'ACTIVE',
            icon: <CheckCircleOutlined />,
        },
        {
            title: currentTitles.EXPIRED,
            key: 'EXPIRED',
            icon: <BarChartOutlined />,
        },
        {
            title: currentTitles.INACTIVE,
            key: 'INACTIVE',
            icon: <SettingOutlined />,
        },
        {
            title: currentTitles.PENDING,
            key: 'PENDING',
            icon: <SettingOutlined />,
        },
    ];


    return (
        loading ? (
            <CardSkeleton count={3} rows={1} avatar />
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
                {panelConfig.map((panel) => {
                    const count = data[panel.key] ?? 0;
                    return (
                        <DataPanel
                            key={panel.title}
                            title={panel.title}
                            count={count}
                            icon={panel.icon}
                        />
                    );
                })}
            </div>
        )
    );
};

export default DashboardPanel;