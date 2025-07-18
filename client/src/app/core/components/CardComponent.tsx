import React from "react";
import StatusTag from "./StatusTag";
import type { CardComponentProps } from "../models/sharedComponent";


export const CardComponent: React.FC<CardComponentProps> = ({ labels, data }) => {
    if (!Array.isArray(data) || data.length === 0) {
        return <p className="text-center text-gray-500 mt-4">No data found.</p>;
    }
    return (
        <div className="grid grid-cols-4 gap-4 mt-4">
            {data.map((item, index) => {
                return (
                    <div key={index} className="bg-white rounded-md shadow p-4">
                        <p className="text-center text-lg font-semibold">{item.name || "Untitled"}</p>

                        <div className="grid grid-cols-3 gap-2 mt-2">
                            {labels.map((field) => (
                                <span key={field.key}>
                                    <p className="label">{field.label}</p>
                                    <p className="value">
                                        {field.type === "status" ? (
                                            <StatusTag status={item[field.key]} />
                                        ) : (
                                            item[field.key] !== undefined ? item[field.key] : "-"
                                        )}
                                    </p>
                                </span>
                            ))}
                        </div>


                    </div>
                );
            })}
        </div>
    );
};
