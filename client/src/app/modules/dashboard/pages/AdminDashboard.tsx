import React from "react";
import DataPanel from "../../../core/components/DataPanel";
import {
    UserOutlined,
    PieChartOutlined,
    LikeOutlined,
    ClockCircleOutlined,
} from "@ant-design/icons";
import type { DataPanelProps } from "../../../core/models/sharedComponent";

// Panel data

const panels: DataPanelProps[] = [
    {
        title: "Total Users",
        count: "1,284",
        icon: <UserOutlined />,
        percentage: "12%",
    },
    {
        title: "Active Polls",
        count: "24",
        icon: <PieChartOutlined />,
        percentage: "8%",
    },
    {
        title: "Total Votes",
        count: "24,521",
        icon: <LikeOutlined />,
        percentage: "23%",
    },
    {
        title: "Avg. Response Time",
        count: "3m 45s",
        icon: <ClockCircleOutlined />,
        percentage: "-5%",
    },
];

const AdminDashboard: React.FC = () => {



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
                {panels.map((panel, index) => (
                    <DataPanel
                        key={index}
                        title={panel.title}
                        count={panel.count}
                        icon={panel.icon}
                        percentage={panel.percentage}
                    />
                ))}
            </div>
        </div>
    );
};

export default AdminDashboard;
