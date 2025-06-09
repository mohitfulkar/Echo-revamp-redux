import React, { useState } from 'react'
import SearchBar from '../../../core/components/SearchBar'
import SharedTabs from '../../../core/components/TabComponent'
import type { TabConfig } from '../../../core/models/sharedComponent';
import { useSearchParams } from 'react-router-dom';
import UserData from '../components/UserData';


const VoterLanding: React.FC = () => {
    const tabItems: TabConfig[] = [
        { label: 'Voters', key: 'voter' },
        { label: 'Panelists', key: 'panelists' },
        { label: 'Admins', key: 'admin' },
    ];
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchValue, setSearchValue] = useState<string>('');

    const tabFromUrl = searchParams.get('tab') || 'voter';
    const [activeTab, setActiveTab] = useState<string>(tabFromUrl);


    const handleTabChange = (key: string) => {
    
        setActiveTab(key);
        setSearchParams({ tab: key });
    };

    const handleSearch = (value: string) => {
        setSearchValue(value);
    };



    return (
        <div className="space-y-2">
            <div>
                <h3 className="h3">Manage Users</h3>
                <p className="p">Add, edit, and manage system users.</p>
            </div>
            <div className="rounded-lg bg-white p-4">
                <div className="flex justify-between items-center">
                    <h3 className="h4">System Users</h3>
                    <div className="p-4 bg-white rounded-lg">
                        <SearchBar
                            searchValue={searchValue}
                            setSearchValue={setSearchValue}
                            placeholder="Search polls"
                            handleSearch={handleSearch}
                        />
                    </div>
                </div>

            </div>
            <SharedTabs
                tabs={tabItems}
                defaultActiveKey={activeTab}
                onChange={handleTabChange}
            />
            <div className="mt-3">
                <UserData searchValue={searchValue} />

            </div>
        </div>


    )
}

export default VoterLanding