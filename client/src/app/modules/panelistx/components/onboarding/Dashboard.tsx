import React, { useEffect } from 'react'
import { CheckSquareOutlined, BarChartOutlined, } from "@ant-design/icons";
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../../store';
import type { StatCardConfig } from '../../../../core/components/StatsDashboard';
import { getPanelistSummary, updateVoteCountAndCleanup } from '../../../panelistx/features/panelistxSlices';
import { PANELIST_SUMMARY, STATUS } from '../../constants/panelistx.constant';
import StatsDashboard from '../../../../core/components/StatsDashboard';
import { Icons } from '../../../../core/constants/Icon';
import ProgressCard from '../../../../core/components/ProgressCard';
import { useNavigate } from 'react-router-dom';
import { SKT } from '../../constants/socket.constants';
import { useSocketListener } from '../../../../core/hooks/useSocketListener';

const Dashboard: React.FC = () => {
    const navigate = useNavigate()
    useSocketListener({
        event: SKT.VOTE_UPDATE,
        action: updateVoteCountAndCleanup,
        transformPayload: (payload) => ({
            userId: payload.panelistId,
            voteCount: payload.voteCount,
            approvalPercent: payload.approvalPercent,
            key: 'panelist',
        }),
    });

    const { items } = useSelector(
        (state: RootState) => state.panelistx)
    const data = items?.panelist

    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        dispatch(getPanelistSummary({ parentKey: PANELIST_SUMMARY, params: { status: STATUS.PENDING } }))
    }, [dispatch])

    const handleView = (id: string) => {
        navigate(`/panelist/onboarding/dashboard/view/${id}`)
    }

    return (
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
    )
}
export default Dashboard