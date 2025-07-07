import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from '../../../core/components/CustomButton';
import SearchBar from '../../../core/components/SearchBar';
import { Select } from "antd";
import { TableComponent } from '../../../core/components/Table';
import type { ActionType, ColumnConfig, DataType } from '../../../core/models/sharedComponent';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { getUsersByTab } from '../../voter/features/userSlices';
import { PAGINATION } from '../../../core/constants/pagination';
import { useChoices } from '../../../core/hooks/useChoices';
import type { AppDispatch, RootState } from '../../../store';
import { useNavigate } from 'react-router-dom';

const PanelistLanding: React.FC = () => {
    const tab = 'panelists';
    const dispatch = useDispatch<AppDispatch>();
    const [searchValue, setSearchValue] = useState('');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(PAGINATION.pageIndex);
    const { items } = useChoices("category");
    const navigate = useNavigate()

    // Get users from Redux
    const itemsByKey = useSelector((state: RootState) => state.users.itemsByKey);
    const tabData = useMemo(() => itemsByKey[tab]?.data[tab] || [], [itemsByKey, tab]);
    const paginationInfo = useMemo(() => itemsByKey[tab]?.data?.pagination || null, [itemsByKey, tab]);

    // Fetch users on mount and when filters change
    useEffect(() => {
        dispatch(getUsersByTab({
            tab,
            params: {
                searchValue,
                page: currentPage,
                limit: PAGINATION.limit,
                status: 'ACTIVE',
                assignedCategory: selectedCategories,
            },
        }));
    }, [dispatch, tab, searchValue, currentPage, selectedCategories]);

    const handleEdit = useCallback((row: DataType) => {
        alert(`Edit clicked for ${row.name || 'Unknown Panelist'}`);
    }, []);

    const handleDelete = useCallback((row: DataType) => {
        alert(`Delete clicked for ${row.name || 'Unknown Panelist'}`);
    }, []);

    const handleCategoryChange = (value: string[]) => {
        setSelectedCategories(value);
        setCurrentPage(1); // Reset to first page on filter
    };

    const handleSearch = () => {
        setCurrentPage(1); // Reset to first page on search
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const actions: ActionType[] = useMemo(() => [
        {
            icon: <EditOutlined />,
            label: 'Edit',
            onClick: handleEdit,
        },
        {
            icon: <DeleteOutlined />,
            label: 'Delete',
            onClick: handleDelete,
        },
    ], [handleEdit, handleDelete]);

    const columnsConfig: ColumnConfig[] = useMemo(() => [
        { title: 'Name', dataIndex: 'name' },
        { title: 'Email', dataIndex: 'email' },
        { title: 'Contact Number', dataIndex: 'contactNumber' },
        { title: 'Occupation', dataIndex: 'occupation' },
        { title: 'Area of Expertise', dataIndex: 'areaOfExpertise' },
        { title: 'Status', dataIndex: 'status', type: 'status' },
    ], []);
    const addItems = () => {
        navigate("/super-panelist/panelist/add")
    }

    return (
        <div>
            <div className="flex justify-between mb-3">
                <h3 className="h3">Panelist Management</h3>
                <CustomButton
                    label="Add Panelist"
                    type="primary"
                    size='large'
                    onClick={addItems}
                    loading={false}
                />
            </div>


            <div className='flex justify-between items-center mt-4'>
                <SearchBar
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    placeholder="Search Panelists"
                    handleSearch={handleSearch}
                />

                <Select
                    allowClear
                    className='w-96'
                    placeholder="Select Categories"
                    options={items}
                    onChange={handleCategoryChange}
                />
            </div>

            <div className='mt-5'>
                <p className='p'>
                    {paginationInfo
                        ? `Showing ${((paginationInfo.page - 1) * paginationInfo.limit) + 1} to ${Math.min(paginationInfo.page * paginationInfo.limit, paginationInfo.total)} of ${paginationInfo.total} panelists`
                        : 'Loading panelists...'}
                </p>

                <TableComponent
                    data={tabData}
                    columnsConfig={columnsConfig}
                    actions={actions}
                    pagination={{
                        current: currentPage,
                        pageSize: PAGINATION.limit,
                        total: paginationInfo?.total || 0,
                        onChange: handlePageChange,
                    }}
                    rowKey="id" // ensure data has unique id
                />
            </div>

        </div>
    );
};

export default PanelistLanding;
