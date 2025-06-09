import React, { useCallback, useEffect, useMemo, useState } from 'react'
import CustomButton from '../../../core/components/CustomButton'
import SearchBar from '../../../core/components/SearchBar'
import { Select } from "antd";
import { TableComponent } from '../../../core/components/Table';
import type { ActionType, ColumnConfig, DataType } from '../../../core/models/sharedComponent';

import { useUsers } from '../../../core/hooks/useUsers';
import { PAGINATION } from '../../../core/constants/pagination';
import { useChoices } from '../../../core/hooks/useChoices';

const PanelistLanding: React.FC = () => {
    const tab: string = 'panelists'

    const [searchValue, setSearchValue] = useState<string>('');
    const { items } = useChoices("categories");

    const addItems = () => { }
    const handleSearch = () => { }

    const columnsConfig: ColumnConfig[] = useMemo(() => [
        { title: 'Name', dataIndex: 'name' },
        { title: 'Email', dataIndex: 'email' },
        { title: 'Contact Number', dataIndex: 'contactNumber' },
        { title: 'Occupation', dataIndex: 'occupation' },
        {
            title: 'Area of Expertise',
            dataIndex: 'areaOfExpertise',
            render: (expertise: string[]) => expertise?.join(', ') || '-'
        },
        {
            title: 'Excellence Rating',
            dataIndex: 'excellenceRating',
            render: (rating: number) => rating?.toFixed(1) || '-'
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (status: string) => (
                <span className={`px-2 py-1 rounded text-xs ${status === 'active' ? 'bg-green-100 text-green-800' :
                    status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                    }`}>
                    {status}
                </span>
            )
        },
        {
            title: 'Authorized to Create Polls',
            dataIndex: 'authorizedToCreatePolls',
            render: (authorized: boolean) => authorized ? 'Yes' : 'No'
        }
    ], []);

    const handleEdit = useCallback((row: DataType) => {
        const name = row.name || 'Unknown Panelist';
        alert(`Edit clicked for ${name}`);
    }, []);

    const handleDelete = useCallback((row: DataType) => {
        const name = row.name || 'Unknown Panelist';
        alert(`Delete clicked for ${name}`);
    }, []);

    const actions: ActionType[] = useMemo(() => [
        {
            name: 'edit',
            label: 'Edit',
            onClick: handleEdit,
        },
        {
            name: 'delete',
            label: 'Delete',
            onClick: handleDelete,
        },
    ], [handleEdit, handleDelete]);


    const { tabData, paginationInfo } = useUsers(tab, searchValue, PAGINATION.pageIndex, PAGINATION.limit);

    return (
        <div>
            <div className="flex justify-between">
                <h3 className="h3">Panelist Management</h3>

                <CustomButton
                    label="Add Panelist"
                    type="primary"
                    size='large'
                    onClick={addItems}
                    loading={false}
                />
            </div>
            <div className='flex justify-between'>
                <SearchBar
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    placeholder="Search Panelists"
                    handleSearch={handleSearch}
                />
                <Select
                    mode="multiple"
                    allowClear
                    className='w-96'
                    placeholder="Select Categories"
                    options={items}
                />
            </div>

            <div className='mt-5'>
                <p className='p'>
                    {paginationInfo ?
                        `Showing ${((paginationInfo.page - 1) * paginationInfo.limit) + 1} to ${Math.min(paginationInfo.page * paginationInfo.limit, paginationInfo.total)} of ${paginationInfo.total} panelists` :
                        'Loading panelists...'
                    }
                </p>
                <TableComponent data={tabData} columnsConfig={columnsConfig} actions={actions} />
            </div>
        </div>
    )
}

export default PanelistLanding