import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../../store';
import { getPanelistSummary, updateVoteCountAndCleanup, voteToPanelist } from '../../features/panelistxSlices';
import { PANELIST_SUMMARY, STATUS } from '../../constants/panelistx.constant';
import ProgressCard from '../../../../core/components/ProgressCard';
import { Icons } from '../../../../core/constants/Icon';
import { useNavigate } from 'react-router-dom';
import { getUserId } from '../../../../core/service/localStorageService';
import { showToast } from '../../../../core/service/ToastService';
import { useSocketListener } from '../../../../core/hooks/useSocketListener';
import { SKT } from '../../constants/socket.constants';

type VoteType = 'approve' | 'reject' | null;

const Voting: React.FC = () => {
    const navigate = useNavigate()
    const [votes, setVotes] = useState<Record<string, VoteType>>({});

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(
            getPanelistSummary({
                parentKey: PANELIST_SUMMARY,
                params: { status: STATUS.PENDING },
            })
        );
    }, [dispatch]);

    const handleView = (id: string) => {
        navigate(`/panelist/onboarding/dashboard/view/${id}`)
    }

    const { items } = useSelector((state: RootState) => state.panelistx);
    const data = items?.panelist || [];

    const handleVote = async (panelistId: string, voteType: VoteType) => {
        setVotes((prevVotes) => ({
            ...prevVotes,
            [panelistId]: voteType,
        }));
        try {
            const response = await dispatch(
                voteToPanelist({
                    id: panelistId,
                    payload: {
                        voterId: getUserId(),
                        voteType,
                    },
                })
            )
            if (voteToPanelist.fulfilled.match(response)) {
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
                showToast.success(response.payload.message);
            } else {
                showToast.error(response.payload || "")
            }
        } catch (error: any) {
            showToast.error(error || "Failed to submit vote");
        }
    };


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.map((panelist: any) => (
                <ProgressCard
                    key={panelist.id}
                    item={panelist}
                    title={panelist.name}
                    mainTag={panelist?.category?.name}
                    displayFields={[
                    ]}
                    percentage={panelist?.approvalPercent}
                    showPercentage
                    customContent={[
                        {
                            key: "approve",
                            icon: Icons.like,
                            onClick: () => handleVote(panelist.id, 'approve'),
                            active: votes[panelist.id] === 'approve',
                        },
                        {
                            key: "reject",
                            icon: Icons.dislike,
                            onClick: () => handleVote(panelist.id, 'reject'),
                            active: votes[panelist.id] === 'reject',
                        }
                    ]}
                    onView={() => handleView(panelist?.id)}
                    voteCount={panelist?.voteCount}

                />

            ))}
        </div>
    );
};

export default Voting;
