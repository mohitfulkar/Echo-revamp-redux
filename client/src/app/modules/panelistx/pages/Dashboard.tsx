import React from 'react'
import StatsDashboard, { type StatCardConfig } from '../../../core/components/StatsDashboard'
import { CheckSquareOutlined, BarChartOutlined } from "@ant-design/icons";
const Dashboard: React.FC = () => {
    const statsConfig: StatCardConfig[] = [
        {
            label: "Pending Requests",
            key: "pendingRequests",
            icon: CheckSquareOutlined,
            iconColor: "#0246d7ff",
            iconBgColor: "#a1bcf7ff", // Tailwind blue-600
        },
        {
            label: "Approved This Month",
            key: "approved",
            icon: BarChartOutlined,
            iconColor: "#03a43eff",
            iconBgColor: "#97f7baff", // Tailwind green-600
        },
        {
            label: "Average Approval Rate",
            key: "approvalRate",
            icon: BarChartOutlined,
            iconBgColor: "#FEF2F2", // red-100
            iconColor: "#EF4444", // red-500
        },
    ];

    const statsData =
    {
        pendingRequests: 2,
        approved: 8,
        approvalRate: "78%",
    }



    return (
        <div><StatsDashboard config={statsConfig} data={statsData} /></div>
    )
}

export default Dashboard