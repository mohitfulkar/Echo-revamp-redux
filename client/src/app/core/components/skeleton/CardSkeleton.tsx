import React from "react";
import { Skeleton } from "antd";

interface CardSkeletonProps {
    count?: number;
    rows?: number;
    avatar?: boolean;
    active?: boolean;
}

const CardSkeleton: React.FC<CardSkeletonProps> = ({
    count = 1,
    rows = 3,
    avatar = false,
    active = true,
}) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: count }).map((_, index) => (
                <div
                    key={index}
                    className="bg-white shadow-md rounded-2xl p-4 border border-gray-100"
                >
                    <Skeleton
                        active={active}
                        avatar={avatar}
                        paragraph={{ rows }}
                        title={{ width: "60%" }}
                    />
                </div>
            ))}
        </div>
    );
};

export default CardSkeleton;
