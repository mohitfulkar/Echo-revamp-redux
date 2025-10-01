import React from "react";
import { Card, Progress, Tag, Tooltip } from "antd";
import {

    EyeOutlined,
} from "@ant-design/icons";

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

type CustomActionConfig = {
    key: string; // 🔧 Make this required
    icon: React.ReactNode;
    onClick: () => void;
    active?: boolean;
};

type ProgressCardProps = {
    item: Record<string, any>;
    title: string;
    mainTag?: string;
    tags?: [string];
    displayFields?: DisplayConfig[];
    progressConfig?: ProgressConfig;
    percentage?: number;
    showPercentage?: boolean;
    onView?: () => void;
    customContent?: CustomActionConfig[];
    voteCount?: Record<string, number>;

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
    customContent,
    voteCount
}) => {
    const tagsArray: string[] = tags && Array.isArray(tags) ? tags : [];

    const currentVotes = progressConfig?.current;
    const totalVotes = progressConfig?.total;

    return (
        <Card className="rounded-xl shadow-md border border-gray-100">
            <div className="flex justify-between items-start">
                <div>
                    <p className="h5">{title}</p>
                    {mainTag && <Tag color="blue">{mainTag}</Tag>}
                </div>

                <div className="flex items-center gap-2">
                    {showPercentage && percentage !== null && (
                        <Tag
                            color="purple"
                            className="rounded-full border-none"
                        >
                            {percentage && percentage.toFixed(0)}% APPROVE
                        </Tag>
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

            <div className="flex gap-4 text-sm text-gray-500 mt-2 flex-wrap">
                {displayFields &&
                    displayFields.map(({ key, label, icon }) => {
                        let value = item[key];

                        if (key === "voteCount" && value) {
                            value = `${value.approve}/${value.approve + value.reject}`;
                        } else if (key === "category" && value) {
                            value = value.name;
                        }

                        return (
                            <span key={key} className="flex items-center gap-1">
                                {icon}
                                <span>
                                    {label}: {value}
                                </span>
                            </span>
                        );
                    })}
            </div>

            {progressConfig && percentage !== null && (
                <div className="mt-5">
                    <div className="font-medium text-gray-700 mb-1">
                        {progressConfig.label || "Progress"}
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                        <Progress
                            percent={percentage}
                            showInfo={false}
                            strokeColor="#1F2937"
                        />
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

            {customContent && customContent.length > 0 && (
                <div className="mt-4 flex justify-center gap-4">
                    {customContent.map((action, index) => {
                        const IconComponent = action.icon;
                        return (
                            <div key={index} className="flex flex-col items-center">
                                <button
                                    onClick={action.onClick}
                                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-300
            ${action.active
                                            ? "bg-blue-600 text-white shadow-lg scale-110"
                                            : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                                        }`}
                                >
                                    {IconComponent}
                                </button>
                                <span className="p mt-1">
                                    {action.key ? voteCount?.[action.key] ?? 0 : 0}
                                </span>
                            </div>
                        );
                    })}
                </div>

            )}

        </Card>
    );
};

export default ProgressCard;
