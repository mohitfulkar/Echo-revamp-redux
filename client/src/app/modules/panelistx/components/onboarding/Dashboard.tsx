import React, { useEffect } from 'react'
import { CheckSquareOutlined, BarChartOutlined, } from "@ant-design/icons";
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../../store';
import type { StatCardConfig } from '../../../../core/components/StatsDashboard';
import { getPanelistSummary, updateVoteCountAndCleanup } from '../../../panelistx/features/panelistxSlices';
import { PANELIST_SUMMARY, PENDING } from '../../constants/panelistx.constant';
import StatsDashboard from '../../../../core/components/StatsDashboard';
import io from "socket.io-client";
import { baseUrl } from '../../../../core/environment/environment.local';
import { Icons } from '../../../../core/constants/Icon';
import ProgressCard from '../../../../core/components/ProgressCard';
import { useNavigate } from 'react-router-dom';
import { VOTE_UPDATE } from '../../constants/socket.constants';
const socket = io(baseUrl);


const Dashboard: React.FC = () => {
    const navigate = useNavigate()
    useEffect(() => {
        // Listen for vote updates
        socket.on(VOTE_UPDATE, (payload) => {
            dispatch(updateVoteCountAndCleanup({
                userId: payload.panelistId, // Make sure your socket payload has userId
                voteCount: payload.voteCount, // Make sure your socket payload has voteCount
                approvalPercent: payload.approvalPercent,
                key: 'panelist'
            }));

        });
        // Clean up the listener when component unmounts
        return () => {
            socket.off(VOTE_UPDATE);
        };
    }, []);

    const { items } = useSelector(
        (state: RootState) => state.panelistx)
    const data = items?.panelist

    const dispatch = useDispatch<AppDispatch>()
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

    useEffect(() => {
        dispatch(getPanelistSummary({ parentKey: PANELIST_SUMMARY, params: { status: PENDING } }))
    }, [dispatch])


    const handleView = (id: string) => {
        navigate(`/panelist/onboarding/dashboard/view/${id}`)
    }

    return (
        <div><StatsDashboard config={statsConfig} data={statsData} />
            <div className='shadow-md rounded-lg mt-3 p-3'>
                <h1 className='h4'>Active Requests({data?.length})</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {data && data.map((item: any, idx: any) => (
                        <ProgressCard
                            key={idx}
                            item={item}
                            title={item?.name}
                            mainTag={item?.category?.name}
                            tags={item?.expertise.map((item: any) => item.name)}
                            displayFields={[
                                { label: "Date", key: "createdAt", icon: Icons.calendar },
                                { label: "Created By", key: "assignedBy", icon: Icons.user },
                            ]}
                            progressConfig={{
                                current: item?.voteCount?.approve,
                                total: items?.maximumVotes,
                                label: "Vote Progress"
                            }}
                            percentage={item?.approvalPercent}
                            showPercentage
                            onView={() => handleView(item?.id)}
                        />
                    ))}
                </div>
            </div>

        </div>
    )
}




export default Dashboard