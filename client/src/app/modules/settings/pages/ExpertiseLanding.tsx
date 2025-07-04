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
import { createExpertise, getExpertise, updateExpertise } from '../features/expertiseSlices';
import { IconCardComponent } from '../../../core/components/IconCardComponent';
import { CalendarOutlined, CheckCircleOutlined, ClockCircleOutlined, FileOutlined, TagsOutlined } from '@ant-design/icons';
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

const ExpertiseLanding: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [searchValue, setSearchValue] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(PAGINATION.pageIndex);
    const [oldItem, setOldItem] = useState<any>(null);

    const { data: expertiseData } = useSelector((state: RootState) => state.expertise);

    const handleSearch = () => {
        dispatch(getExpertise({ parentKey: '', params: { page: currentPage, limit: PAGINATION.limit, searchValue: searchValue } }));
    };

    const handleFormSubmit = async (formValues: any) => {
        if (oldItem) {
            // Update
            const resultAction = await dispatch(
                updateExpertise({ id: oldItem.id, payload: formValues })
            );
            if (updateExpertise.fulfilled.match(resultAction)) {
                showToast.success('Expertise updated successfully');
                onModalClose()
                dispatch(updateConfigsByStatus({ oldStatus: oldItem?.status, newStatus: formValues?.status }));

                dispatch(getExpertise({ parentKey: '', params: { page: currentPage, limit: PAGINATION.limit } }));
            } else {
                showToast.error(resultAction.payload || 'Failed to update category');
            }
        } else {
            // Create
            const resultAction = await dispatch(
                createExpertise({ parentKey: '', payload: formValues })
            );
            if (createExpertise.fulfilled.match(resultAction)) {
                showToast.success('Expertise created successfully');
                setIsModalOpen(false);
                dispatch(incrementConfigsByStatus(formValues?.status))
                dispatch(getExpertise({ parentKey: '', params: { page: currentPage, limit: PAGINATION.limit } }));
            } else {
                showToast.error(resultAction.payload || 'Failed to create category');
            }
        }
    };

    const updateDashboardState = () => {

    }
    useEffect(() => {
        dispatch(getExpertise({ parentKey: '', params: { page: currentPage, limit: PAGINATION.limit } }));
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
        { key: 'name', label: 'Category Name', icon: <TagsOutlined /> },
        { label: 'Description', key: 'description', icon: <FileOutlined /> },
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
        setOldItem(item);
        setIsModalOpen(true);
    };

    const handleAction = (action: string, item: any) => {
        switch (action) {
            case 'edit':
                onEdit(item);
                break;
            case 'view':
                onView(item);
                break;
        }
    };
    const onModalClose = () => {
        setIsModalOpen(false);
        setIsViewModalOpen(false);
        setOldItem(null);
    };

    return (
        <>
            <div className="flex justify-between mb-4">
                <SearchBar
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    placeholder="Search Expertise"
                    handleSearch={handleSearch}
                />
                <CustomButton label="ADD" className="w-[10%]" type="primary" onClick={() => setIsModalOpen(true)} />
            </div>

            <IconCardComponent labels={labels} data={expertiseData?.expertises || []} handleAction={handleAction} />

            <div className="mt-4 flex justify-end">
                <Pagination
                    current={currentPage}
                    pageSize={PAGINATION.limit}
                    total={expertiseData?.pagination?.total || 0}
                    onChange={(page) => setCurrentPage(page)}
                />
            </div>

            {isModalOpen && (
                <FormModal
                    formFields={categoryFormFields}
                    title={oldItem ? 'Edit Expertise' : 'Add Expertise'}
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
                    title="View Expertise"
                />
            )}
        </>
    );
};

export default ExpertiseLanding;
