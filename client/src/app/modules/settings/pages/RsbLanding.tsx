import React, { useEffect, useState } from 'react';
import SearchBar from '../../../core/components/SearchBar';
import CustomButton from '../../../core/components/CustomButton';
import type { CardFields } from '../../../core/models/sharedComponent';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../store';
import FormModal from '../../../core/components/FormModal';
import { categoryFormFields } from '../constants/FormFields';
import { showToast } from '../../../core/service/ToastService';
import { PAGINATION } from '../../../core/constants/pagination';
import { Pagination } from 'antd';
import { createRsb, getRsb, updateRsb } from '../features/rsbSlices';
import { IconCardComponent } from '../../../core/components/IconCardComponent';
import { CalendarOutlined, CheckCircleOutlined, ClockCircleOutlined, EyeOutlined } from '@ant-design/icons';
import ViewModal from '../../../core/components/ViewModal';
import { incrementConfigsByStatus, updateConfigsByStatus } from '../../dashboard/features/dashboardSlices';

export interface CardDataItem {
    name: string;
    description: string;
    isActive?: boolean;
    statusDisplay?: string;
    createdDate?: string;
    createdTime?: string;
}

const RsbLanding: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [searchValue, setSearchValue] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(PAGINATION.pageIndex);
    const [oldItem, setOldItem] = useState<any>(null);

    const { data: rsbData } = useSelector((state: RootState) => state.rsb);

    const handleSearch = () => {
        dispatch(getRsb({ parentKey: '', params: { page: currentPage, limit: PAGINATION.limit, searchValue: searchValue } }));
    };

    const handleFormSubmit = async (formValues: any) => {
        if (oldItem) {
            // TODO: Implement updateRsb dispatch here if you have an updateRsb thunk
            // Example:
            const resultAction = await dispatch(updateRsb({ id: oldItem.id, payload: formValues }));
            if (updateRsb.fulfilled.match(resultAction)) {
                showToast.success('Responsibility updated successfully');
                onModalClose()
                dispatch(updateConfigsByStatus({ oldStatus: oldItem?.status, newStatus: formValues?.status }));
                dispatch(getRsb({ parentKey: '', params: { page: currentPage, limit: PAGINATION.limit } }));
            } else {
                showToast.error(resultAction.payload || 'Failed to update Responsibility');
            }
        } else {
            const resultAction = await dispatch(
                createRsb({ parentKey: '', payload: formValues })
            );
            if (createRsb.fulfilled.match(resultAction)) {
                showToast.success('Responsibility created successfully');
                onModalClose()
                dispatch(incrementConfigsByStatus(formValues?.status))
                dispatch(getRsb({ parentKey: '', params: { page: currentPage, limit: PAGINATION.limit } }));
            } else {
                showToast.error(resultAction.payload || 'Failed to create Responsibility');
            }
        }
    };

    useEffect(() => {
        dispatch(getRsb({ parentKey: '', params: { page: currentPage, limit: PAGINATION.limit } }));
    }, [dispatch, currentPage]);

    const labels: CardFields[] = [
        {
            key: "name",
            type: "title", // This will be rendered as the card title
        },
        {
            label: "Created Date",
            key: "createdDate",
            icon: <CalendarOutlined />,
        },
        {
            label: "Created Time",
            key: "createdTime",
            icon: <ClockCircleOutlined />,
        },
        {
            label: "Status",
            key: "status",
            type: "status",
            icon: <CheckCircleOutlined />, // You can swap with another status-representing icon if desired
        },
    ];

    const viewFields: CardFields[] = [
        { key: 'name', label: 'Responsibility Name', icon: <CheckCircleOutlined /> },
        { label: 'Description', key: 'description', icon: <EyeOutlined /> },
        { label: 'Status', key: 'status', type: 'status', icon: <CheckCircleOutlined /> },
        { label: 'Created Date', key: 'createdDate', icon: <CalendarOutlined /> },
        { label: 'Created Time', key: 'createdTime', icon: <ClockCircleOutlined /> },
        { label: 'Last Updated Date', key: 'updatedDate', icon: <CalendarOutlined /> },
        { label: 'Last Updated Time', key: 'updatedTime', icon: <ClockCircleOutlined /> },
    ];

    const onView = (item: any) => {
        setIsViewModalOpen(true);
        setOldItem(item);
    };

    const onEdit = (item: any) => {
        setIsModalOpen(true);
        setOldItem(item);
    };

    const handleAction = (action: string, item: any) => {
        switch (action) {
            case 'edit':
                onEdit(item);
                break;
            case 'view':
                onView(item);
                break;
            // Add delete if needed
        }
    };

    const onModalClose = () => {
        setIsModalOpen(false)
        setIsViewModalOpen(false)
        setOldItem(null);
    }

    return (
        <>
            <div className="flex justify-between mb-4">
                <SearchBar
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    placeholder="Search Responsibility"
                    handleSearch={handleSearch}
                />
                <CustomButton label="ADD" className="w-[10%]" type="primary" onClick={() => setIsModalOpen(true)} />
            </div>


            <IconCardComponent
                labels={labels}
                data={rsbData?.rsb}
                handleAction={handleAction}
            />

            <div className="mt-4 flex justify-end">
                <Pagination
                    current={currentPage}
                    pageSize={PAGINATION.limit}
                    total={rsbData?.pagination?.total || 0}
                    onChange={(page) => setCurrentPage(page)}
                />
            </div>

            {isModalOpen && (
                <FormModal
                    formFields={categoryFormFields}
                    title={oldItem ? 'Edit Responsibility' : 'Add Responsibility'}
                    open={isModalOpen}
                    onClose={onModalClose}
                    onSubmit={handleFormSubmit}
                    initialValues={oldItem}
                    disabledFields={oldItem ? ['name'] : []}
                />
            )}

            {isViewModalOpen && (
                <ViewModal
                    open={isViewModalOpen}
                    onClose={onModalClose}
                    fields={viewFields}
                    data={oldItem}
                    title="View Responsibility"
                />
            )}
        </>
    );
};

export default RsbLanding;
