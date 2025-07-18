import React from "react";
import { Breadcrumb } from "antd";
import type { BreadcrumbProps } from "antd";
import type { SharedBreadcrumbProps } from "../models/sharedComponent";

const SharedBreadcrumb: React.FC<SharedBreadcrumbProps> = ({ items, showHome = true }) => {
    const renderedItems: BreadcrumbProps["items"] = [
        ...(showHome
            ? [{ title: <a href="/">Home</a> }]
            : []),
        ...items.map((item) => ({
            title: item.href ? <a href={item.href}>{item.icon} {item.label}</a> : <span>{item.icon} {item.label}</span>,
        })),
    ];

    return (
        <div className="h3">
            <Breadcrumb items={renderedItems} />

        </div>
    )


};

export default SharedBreadcrumb;
