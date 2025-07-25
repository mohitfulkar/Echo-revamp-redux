import React from "react";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import StatusTag from "./StatusTag";
import type { CardComponentProps } from "../models/sharedComponent";

export const IconCardComponent: React.FC<CardComponentProps> = ({ labels, data, handleAction }) => {
    if (!Array.isArray(data) || data.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-5.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.586.293H9.707a1 1 0 01-.707-.293L6.586 13H2" />
                    </svg>
                </div>
                <p className="text-gray-500 text-lg font-medium">No data found</p>
                <p className="text-gray-400 text-sm mt-1">Add some items to get started</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-3 p-3">
            {data.map((item, index) => {
                const titleField = labels.find((label) => label.type === "title");
                const otherFields = labels.filter((label) => label.type !== "title");

                return (
                    <div
                        key={index}
                        className="group bg-white rounded-xl shadow-sm border border-gray-100 p-4 relative 
                                 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1 
                                 transition-all duration-300 ease-out hover:border-blue-200"
                    >
                        {/* Gradient Background Accent */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-t-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                        {/* Title + Actions */}
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex-1 pr-3">
                                <h3 className="h5 font-bold text-gray-800 leading-tight">
                                    {titleField ? item[titleField.key] || "Untitled" : "Untitled"}
                                </h3>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex opacity-0 group-hover:opacity-100 transition-all duration-200 ease-in-out">
                                <button
                                    className="p-1 rounded-lg hover:bg-blue-50 transition-colors duration-200 group/btn"
                                    onClick={() => handleAction?.("view", item)}
                                    title="View Details"
                                >
                                    <EyeOutlined className="text-blue-500 text-base group-hover/btn:text-blue-600 group-hover/btn:scale-110 transition-all duration-200" />
                                </button>
                                <button
                                    className="p-1 rounded-lg hover:bg-green-50 transition-colors duration-200 group/btn"
                                    onClick={() => handleAction?.("edit", item)}
                                    title="Edit Item"
                                >
                                    <EditOutlined className="text-green-500 text-base group-hover/btn:text-green-600 group-hover/btn:scale-110 transition-all duration-200" />
                                </button>
                                <button
                                    className="p-1 rounded-lg hover:bg-red-50 transition-colors duration-200 group/btn"
                                    onClick={() => handleAction?.("delete", item)}
                                    title="Delete Item"
                                >
                                    <DeleteOutlined className="text-red-500 text-base group-hover/btn:text-red-600 group-hover/btn:scale-110 transition-all duration-200" />
                                </button>
                            </div>
                        </div>

                        {/* Other Fields */}
                        <div className="space-y-2">
                            {otherFields.map((field) => (
                                <div
                                    key={field.key}
                                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                                >
                                    {/* Icon Container */}
                                    {field.icon && (
                                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                                            <span className="text-blue-600 text-sm">
                                                {field.icon}
                                            </span>
                                        </div>
                                    )}

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        {field.label && (
                                            <p className="label uppercase tracking-wider mb-1">
                                                {field.label}
                                            </p>
                                        )}
                                        <div className="flex items-center">
                                            {field.type === "status" ? (
                                                <StatusTag status={item[field.key]} />
                                            ) : (
                                                <span className="value truncate">
                                                    {item[field.key] || (
                                                        <span className="text-gray-400 italic">Not specified</span>
                                                    )}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Bottom Accent Line */}
                        <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

                    </div>
                );
            })}
        </div>
    );
};