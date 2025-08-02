import React from 'react';
import { Card, Typography, Button } from 'antd';
import {
    CalendarOutlined,
    ClockCircleOutlined,
    LikeOutlined,
    DislikeOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

type VoteType = 'approve' | 'reject' | null;

interface PanelistData {
    name: string;
    createdAt: string;
    expiredAt: string;
    voteCount: {
        approve: number;
        reject: number;
    };
}

interface Props {
    data: PanelistData;
    vote: VoteType;
    setVote: (vote: VoteType) => void;
}

const ThumbsVotingCard: React.FC<Props> = ({ data, vote, setVote }) => {
    return (
        <Card className="w-full max-w-md border border-gray-200 shadow-sm">
            {/* Header */}
            <div className="mb-4">


                {/* Panelist Info */}
                <div className="space-y-2">
                    <Text strong className="block h5">
                        {data.name}
                    </Text>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CalendarOutlined className="text-base" />
                        <span className='label'>Created:</span>
                        <span className='value'> {data.createdAt}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <ClockCircleOutlined className="text-base" />
                        <span className='label'>Expired:</span>
                        <span className='value'> {data.expiredAt}</span>
                    </div>
                </div>
            </div>

            {/* Vote Buttons */}
            <div className="flex justify-center gap-8 my-4">
                <Button
                    shape="circle"
                    size="large"
                    icon={<LikeOutlined className="text-xl" />}
                    onClick={() => setVote('approve')}
                    className={`transition-transform duration-300 ${vote === 'approve'
                        ? 'bg-green-500 text-white shadow-lg scale-110'
                        : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                    disabled={vote !== null}
                />

                <Button
                    shape="circle"
                    size="large"
                    icon={<DislikeOutlined className="text-xl" />}
                    onClick={() => setVote('reject')}
                    className={`transition-transform duration-300 ${vote === 'reject'
                        ? 'bg-red-500 text-white shadow-lg scale-110'
                        : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                    disabled={vote !== null}
                />
            </div>

            {/* Vote Stats */}
            <div className="text-center text-sm">
                <span className="text-muted-foreground">Votes: </span>
                <span className="text-green-600 font-medium">
                    {data.voteCount.approve} 👍
                </span>
                <span className="mx-2">•</span>
                <span className="text-red-500 font-medium">
                    {data.voteCount.reject} 👎
                </span>
            </div>
        </Card>
    );
};

export default ThumbsVotingCard;
