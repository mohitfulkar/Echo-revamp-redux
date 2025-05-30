import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../../../core/components/SearchBar';
import SharedTabs from '../../../core/components/TabComponent';
import Poll from '../components/Poll';
import type { TabConfig } from '../../../core/models/sharedComponent';

const PollLanding: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchValue, setSearchValue] = useState<string>('');

    const tabFromUrl = searchParams.get('tab') || 'polls';
    const [activeTab, setActiveTab] = useState<string>(tabFromUrl);

    const handleTabChange = (key: string) => {
        setActiveTab(key);
        setSearchParams({ tab: key });
    };

    const handleSearch = (value: string) => {
        setSearchValue(value);
    };

    const pollTabItems: TabConfig[] = [
        { label: 'All Polls', key: 'polls' },
        { label: 'Active Polls', key: 'active' },
        { label: 'Completed Polls', key: 'completed' },
        { label: 'Draft Polls', key: 'draft' },
        { label: 'Expired Polls', key: 'expired' },
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

                {/* ✅ Render only the active tab's content */}
                <div className="mt-6">
                    <Poll searchValue={searchValue} />
                </div>
            </div>
        </div>
    );
};

export default PollLanding;
