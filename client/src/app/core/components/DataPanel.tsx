import React from "react";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import type { DataPanelProps } from "../models/sharedComponent";



const DataPanel: React.FC<DataPanelProps> = ({
    title,
    count,
    icon,
    percentage,
}) => {
    const percentageValue = parseFloat(percentage.replace('%', ''));
    const isPositive = percentageValue >= 0;
    const comparisonText = "vs last month";

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 " style={{ padding: "20px" }}
        >
            {/* Title and Icon */}
            <div className="flex justify-between items-start mb-2">
                <h5 className="h6">{title}</h5>
                <span className="text-blue-400 text-lg">{icon}</span>
            </div>

            {/* Count */}
            <div className="mb-2">
                <p className="h4">{count}</p>
            </div>

            {/* Percentage Change */}
            <div className="flex items-center text-xs text-gray-500">
                <span
                    className={`text-[1rem] flex items-center font-medium mr-2 ${isPositive ? "text-green-600" : "text-red-600"
                        }`}
                >
                    {isPositive ? (
                        <ArrowUpOutlined className="mr-1" />
                    ) : (
                        <ArrowDownOutlined className="mr-1" />
                    )}
                    {Math.abs(percentageValue)}%
                </span>
                <span className="label ">{comparisonText}</span>
            </div>
        </div>
    );
};

export default DataPanel;
