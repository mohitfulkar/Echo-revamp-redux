import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from '../../../core/components/CustomButton';
import SearchBar from '../../../core/components/SearchBar';
import { Select } from "antd";
import { TableComponent } from '../../../core/components/Table';
import type { ActionType, ColumnConfig, CrumbItem, DataType } from '../../../core/models/sharedComponent';
import { EditOutlined, DeleteOutlined, BarChartOutlined } from '@ant-design/icons';
import { getUsersByTab } from '../../voter/features/userSlices';
import { PAGINATION } from '../../../core/constants/pagination';
import { useChoices } from '../../../core/hooks/useChoices';
import type { AppDispatch, RootState } from '../../../store';
import { useNavigate } from 'react-router-dom';
import DataPanel from '../../../core/components/DataPanel';
import { getPanelistStatusSummary } from '../../dashboard/features/dashboardSlices';
import SharedBreadcrumb from '../../../core/components/SharedBreadCrumb';

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
    const { items: dataPanelItems } = useSelector((state: RootState) => state.dashboard)
    const tabData = useMemo(() => {
        const rawData = itemsByKey[tab]?.data[tab] || [];

        return rawData.map((item: any) => ({
            ...item,
            expertise: item?.expertise.map((item: any) => item.name), // Example: add a custom key,
            category: item?.category?.name,

            // add more keys if needed
        }));
    }, [itemsByKey, tab]); const paginationInfo = useMemo(() => itemsByKey[tab]?.data?.pagination || null, [itemsByKey, tab]);

    // Fetch users on mount and when filters change
    useEffect(() => {
        dispatch(getUsersByTab({
            tab,
            params: {
                searchValue,
                page: currentPage,
                limit: PAGINATION.limit,
                category: selectedCategories,
            },
        }));
        dispatch(getPanelistStatusSummary()); // <-- 
    }, [dispatch, tab, searchValue, currentPage, selectedCategories]);

    const handleEdit = useCallback((row: DataType) => {
        navigate(`/super-panelist/panelists/edit/${row?._id}`)
    }, []);

    const handleDelete = useCallback((row: DataType) => {
        alert(`Delete clicked for ${row.name || 'Unknown Panelist'}`);
    }, []);

    const handleCategoryChange = (value: string[]) => {
        setSelectedCategories(value);
        setCurrentPage(PAGINATION.pageIndex); // Reset to first page on filter
    };

    const handleSearch = () => {
        setCurrentPage(PAGINATION.pageIndex); // Reset to first page on search
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
    const breadcrumbItems: CrumbItem[] = [
        { label: "Panelists" },
    ];
    const columnsConfig: ColumnConfig[] = useMemo(() => [
        { title: 'Name', dataIndex: 'name' },
        { title: 'Email', dataIndex: 'email' },
        { title: 'Contact Number', dataIndex: 'contactNumber' },
        { title: 'Occupation', dataIndex: 'occupation' },
        { title: 'Category', dataIndex: 'category' },
        { title: 'Area of Expertise', dataIndex: 'expertise' },
        { title: 'Status', dataIndex: 'status', type: 'status' },
    ], []);
    const addItems = () => {
        navigate("/super-panelist/panelists/add")
    }

    const panelConfig = [
        {
            title: "Total",
            key: 'total',
            icon: <BarChartOutlined />,

        },
        {
            title: 'Pending',
            key: 'PENDING',
            icon: <BarChartOutlined />,

        },
        {
            title: 'Approved',
            key: 'APPROVED',
            icon: <BarChartOutlined />,

        },
        {
            title: 'Rejected',
            key: 'REJECTED',
            icon: <BarChartOutlined />,

        },
        {
            title: 'Suspended',
            key: 'SUSPENDED',
            icon: <BarChartOutlined />,

        },
    ];


    return (
        <div>
            <div className="flex justify-between mb-3">
                <div>
                    <SharedBreadcrumb items={breadcrumbItems} />
                    <h3 className="h3">Panelist Management</h3>
                    <p className='p'>Manage and organize panelists efficiently. Add, update, and monitor panelist profiles and their activity from a single place.</p>

                </div>
                <CustomButton
                    label="Add Panelist"
                    type="primary"
                    size='large'
                    onClick={addItems}
                    loading={false}
                />
            </div>
            <div className='grid grid-cols-5 gap-3'>
                {panelConfig.map((panel) => {
                    const count = dataPanelItems[panel.key] ?? 0;
                    return (
                        <DataPanel
                            key={panel.key}
                            title={panel.title}
                            count={count ?? 0}
                            icon={panel.icon}
                        />
                    );
                })}
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
