import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import type { SharedTabsProps } from '../models/sharedComponent';



const SharedTabs: React.FC<SharedTabsProps> = ({ tabs, defaultActiveKey, className, onChange, }) => {
    const items: TabsProps['items'] = tabs.map((tab) => ({
        key: tab.key,
        label: tab.label,
        children: tab.content,
    }));

    return (
        <div className={`bg-white p-4 rounded-lg shadow ${className}`}>
            <Tabs defaultActiveKey={defaultActiveKey || tabs[0]?.key} items={items} onChange={onChange} />
        </div>
    );
};

export default SharedTabs;
