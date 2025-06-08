import React, { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import type { RootState, AppDispatch } from '../../../store';
import { getPolls } from '../features/pollSlices';
import StatusTag from '../../../core/components/StatusTag';

interface PollProps {
    searchValue: string;
}

const Poll: React.FC<PollProps> = ({ searchValue }) => {
    const location = useLocation();
    const dispatch = useDispatch<AppDispatch>();
    const { itemsByKey, loading } = useSelector((state: RootState) => state.poll);
    const tab = useMemo(() => new URLSearchParams(location.search).get('tab') || 'polls', [location.search]);

    const items = itemsByKey[tab] || [];

    useEffect(() => {
        const tabData = itemsByKey[tab];
        if (!tabData && !loading) {
            const status = tab === 'polls' ? undefined : tab;
            const params = {
                ...(status && { status }),
                ...(searchValue && { searchValue })
            };
            dispatch(getPolls(params));
        }
    }, [tab, itemsByKey, dispatch, searchValue, loading]);


    useEffect(() => {
        if (searchValue.length >= 0) {
            const status = tab === 'polls' ? undefined : tab;
            const params = {
                ...(status && { status }),
                searchValue
            };
            dispatch(getPolls(params));
        }
    }, [searchValue, tab, dispatch]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {items?.polls?.map((poll: any) => (
                <div
                    key={poll._id}
                    className="w-full p-4 rounded-xl shadow border border-gray-200 bg-white"
                >
                    <p className="text-lg font-semibold text-gray-800 mb-3">
                        {poll.title}
                    </p>

                    <div className="grid grid-cols-3 gap-2 text-sm text-gray-700">
                        <PollField label="Status">
                            <StatusTag status={poll.status} />
                        </PollField>
                        <PollField label="Expiry Date">
                            {dayjs(poll.expiryDate).format('DD MMM YYYY')}
                        </PollField>
                        <PollField label="Visibility">
                            {poll.isPublic ? 'Public' : 'Private'}
                        </PollField>
                        <PollField label="Questions">
                            {poll.questions.length}
                        </PollField>
                        <PollField label="Created At">
                            {dayjs(poll.createdAt).format('DD MMM YYYY')}
                        </PollField>
                    </div>
                </div>
            ))}
        </div>
    );
};

const PollField: React.FC<{ label: string; children: React.ReactNode }> = React.memo(({ label, children }) => (
    <span>
        <label className="label">{label}</label>
        <p className="value">{children}</p>
    </span>
));

export default React.memo(Poll);