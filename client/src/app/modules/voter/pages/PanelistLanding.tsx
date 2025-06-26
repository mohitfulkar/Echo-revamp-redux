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
    const { items } = useChoices("category");

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
        },
        {
            title: 'Status',
            dataIndex: 'status',
            type: 'status'

        },

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


    const { tabData, paginationInfo } = useUsers(tab, { searchValue: searchValue, page: PAGINATION.pageIndex, limit: PAGINATION.limit, status: 'ACTIVE' });

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