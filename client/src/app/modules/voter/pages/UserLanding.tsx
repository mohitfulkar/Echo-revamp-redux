import React, { useState } from 'react'
import SearchBar from '../../../core/components/SearchBar'
import SharedTabs from '../../../core/components/TabComponent'
import type { TabConfig } from '../../../core/models/sharedComponent';
import { useNavigate, useSearchParams } from 'react-router-dom';
import UserData from '../components/UserData';
import type { MenuProps } from 'antd';
import DropDownButton from '../../../core/components/DropDownButton';


const VoterLanding: React.FC = () => {
    const navigate = useNavigate()
    const tabItems: TabConfig[] = [
        { label: 'Voters', key: 'voter' },
        { label: 'Panelists', key: 'panelists' },
        { label: 'Admins', key: 'admin' },
    ];
    const menuItems: MenuProps["items"] = [
        {
            key: 1,
            label: "Super Panelist",
            onClick: () => navigate("/admin/super-panelist/add")
        },
        {
            key: 2,
            label: "Panelist",
            onClick: () => navigate("/admin/panelist/social-media/add")
        },

        {
            key: 3,
            label: "Voter",
            onClick: () => navigate("/admin/voter/add")
        },

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

    const handleMainClick = () => {
    };

    return (
        <>
            <div className="space-y-2">
                <div className='flex justify-between'>
                    <div>
                        <h3 className="h3">Manage Users</h3>
                        <p className="p">Add, edit, and manage system users.</p>
                    </div>
                    <DropDownButton
                        label="Add"
                        menuItems={menuItems}
                        onClick={handleMainClick}
                        type="primary"
                    />                </div>
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
            </div></>


    )
}

export default VoterLanding