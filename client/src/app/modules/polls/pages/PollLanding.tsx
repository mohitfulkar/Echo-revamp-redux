import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../../../core/components/SearchBar';
import SharedTabs from '../../../core/components/TabComponent';
import Poll from '../components/Poll';
import type { TabConfig } from '../../../core/models/sharedComponent';

const PollLanding: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchValue, setSearchValue] = useState<string>('');

    // Read active tab from URL
    const tabFromUrl = searchParams.get('tab') || 'polls';
    const [activeTab, setActiveTab] = useState<string>(tabFromUrl);

    // Update URL when tab changes
    const handleTabChange = (key: string) => {
        setActiveTab(key);
        setSearchParams({ tab: key });
    };

    const handleSearch = (value: string) => {
        console.log('Search triggered with:', value);
        setSearchValue(value);
        // The Poll component will automatically re-fetch data with the new searchValue
    };

    const pollTabItems: TabConfig[] = [
        {
            label: 'All Polls',
            key: 'polls',
            content: <Poll searchValue={searchValue} />,
        },
        {
            label: 'Active Polls',
            key: 'active',
            content: <Poll searchValue={searchValue} />,
        },
        {
            label: 'Completed Polls',
            key: 'completed',
            content: <Poll searchValue={searchValue} />,
        },
        {
            label: 'Draft Polls',
            key: 'draft',
            content: <Poll searchValue={searchValue} />,
        },
        {
            label: 'Expired Polls',
            key: 'expired',
            content: <Poll searchValue={searchValue} />,
        },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h3 className="h3">Polls Management</h3>
                <p className="p">Create, edit, and manage all system polls.</p>
            </div>

            <div className="rounded-lg bg-white p-5">
                <div className="flex justify-between items-center">
                    <h3 className="h4">All Polls</h3>
                    <div className="p-4 bg-white rounded-lg">
                        <SearchBar
                            searchValue={searchValue}
                            setSearchValue={setSearchValue}
                            placeholder="Search polls"
                            handleSearch={handleSearch}
                        />
                    </div>
                </div>
                <SharedTabs
                    tabs={pollTabItems}
                    defaultActiveKey={activeTab}
                    onChange={handleTabChange}
                />
            </div>
        </div>
    );
};

export default PollLanding;