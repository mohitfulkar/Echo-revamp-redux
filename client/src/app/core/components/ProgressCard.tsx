import React from "react";
import { Card, Progress, Tag, Tooltip } from "antd";
import { EyeOutlined } from "@ant-design/icons";

type DisplayConfig = {
    label: string;
    key: string;
    icon?: React.ReactNode;
};

type ProgressConfig = {
    current: string;
    total: string;
    label?: string;
};

type ProgressCardProps = {
    item: Record<string, any>;
    title: string;
    mainTag?: string;
    tags?: [string];
    displayFields: DisplayConfig[];
    progressConfig?: ProgressConfig;
    percentage: number
    showPercentage?: boolean;
    onView?: () => void;
};

const ProgressCard: React.FC<ProgressCardProps> = ({
    item,
    title,
    mainTag,
    tags,
    displayFields,
    progressConfig,
    percentage,
    showPercentage = false,
    onView,
}) => {
    const tagsArray: string[] = tags && Array.isArray(tags) ? tags : [];

    const currentVotes = progressConfig?.current
    const totalVotes = progressConfig?.total


    return (
        <Card className="rounded-xl shadow-md border border-gray-100">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="h4 text-gray-800">{title}</h3>
                    {mainTag && <Tag color="blue">{mainTag}</Tag>}
                </div>

                <div className="flex items-center gap-2">
                    {showPercentage && percentage !== null && (
                        <div className="bg-gray-900 text-white text-sm px-3 py-1 rounded-full">
                            {percentage.toFixed(0)}% approval
                        </div>
                    )}
                    {onView && (
                        <Tooltip title="View">
                            <EyeOutlined
                                onClick={onView}
                                className="cursor-pointer text-gray-700 hover:text-black text-lg"
                            />
                        </Tooltip>
                    )}
                </div>
            </div>

            <div className="flex gap-4 text-sm text-gray-500 mt-3 flex-wrap">
                {displayFields.map(({ key, label, icon }) => (
                    <span key={key} className="flex items-center gap-1">
                        {icon}
                        <span>
                            {label}: {item[key]}
                        </span>
                    </span>
                ))}
            </div>

            {progressConfig && percentage !== null && (
                <div className="mt-5">
                    <div className="font-medium text-gray-700 mb-1">{progressConfig.label || "Progress"}</div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                        <Progress percent={percentage} showInfo={false} strokeColor="#1F2937" />
                        <span className="ml-2 whitespace-nowrap">
                            {currentVotes}/{totalVotes} votes
                        </span>
                    </div>
                </div>
            )}

            {!!tagsArray.length && (
                <div className="flex flex-wrap gap-2 mt-4">
                    {tagsArray.map((tag, idx) => (
                        <Tag key={idx} className="rounded-lg px-3 py-1" color="purple">
                            {tag}
                        </Tag>
                    ))}
                </div>
            )}
        </Card>
    );
};

export default ProgressCard;
