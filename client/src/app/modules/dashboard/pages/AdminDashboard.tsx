import React, { useEffect } from "react";
import DataPanel from "../../../core/components/DataPanel";
import {
    UserOutlined,
    PieChartOutlined,
    LikeOutlined,
    ClockCircleOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getAdminDashboard } from "../features/dashboardSlices";
import type { AppDispatch, RootState } from "../../../store";

// Panel configuration
const panelConfig = [
    {
        title: "Total Users",
        key: "totalUsers",
        growthKey: "monthlyUserGrowth",
        icon: <UserOutlined />,
    },
    {
        title: "Active Polls",
        key: "totalActivePolls",
        growthKey: "monthlyPollGrowth",
        icon: <PieChartOutlined />,
    },
    {
        title: "Total Votes",
        key: "totalVotes",
        growthKey: "voteGrowth",
        icon: <LikeOutlined />,
    },
    {
        title: "Avg. Response Time",
        key: "avgResponseTime",
        growthKey: "responseTimeGrowth", // not provided in API, fallback below
        icon: <ClockCircleOutlined />,
        staticValue: "3m 45s",
        staticGrowth: "-5%",
    },
];

const AdminDashboard: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const stats = useSelector((state: RootState) => state.dashboard.items);
    console.log('stats', stats

    );

    useEffect(() => {
        if (!stats || Object.keys(stats).length === 0) {
            dispatch(getAdminDashboard());
        }
    }, [dispatch, stats]);


    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h3 className="h3">Dashboard</h3>
                <p className="p">
                    Welcome back, Administrator. Here's what's happening in your system.
                </p>
            </div>

            {/* Data Panels */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {panelConfig.map((panel, index) => {
                    const count = panel.staticValue ?? stats?.[panel.key]?.toLocaleString?.() ?? "0";
                    const percentage = panel.staticGrowth ?? `${stats?.[panel.growthKey] ?? 0}%`;

                    return (
                        <DataPanel
                            key={index}
                            title={panel.title}
                            count={count}
                            icon={panel.icon}
                            percentage={percentage}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default AdminDashboard;
