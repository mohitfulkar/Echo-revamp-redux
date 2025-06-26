import React, { useEffect, useState } from 'react';
import SearchBar from '../../../core/components/SearchBar';
import CustomButton from '../../../core/components/CustomButton';
import type { CardFields } from '../../../core/models/sharedComponent';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../store';
import { createCategory, getCategory, updateCategory } from '../features/categorySlices';
import FormModal from '../../../core/components/FormModal';
import { categoryFormFields } from '../constants/FormFields';
import { showToast } from '../../../core/service/ToastService';
import { PAGINATION } from '../../../core/constants/pagination';
import { Pagination } from 'antd';
import { IconCardComponent } from '../../../core/components/IconCardComponent';
import { CalendarOutlined, CheckCircleOutlined, ClockCircleOutlined, FileOutlined, TagsOutlined, } from '@ant-design/icons';
import ViewModal from '../../../core/components/ViewModal';

export interface CardDataItem {
    name: string;
    description: string;
    image?: string;
    createdDate?: string;
    createdTime?: string;
    isActive?: boolean;
    status?: string;
}

const CategoryLanding: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [searchValue, setSearchValue] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(PAGINATION.pageIndex);
    const [oldItem, setoldItem] = useState<any>(null);

    const { data: categoryData } = useSelector((state: RootState) => state.category);

    const handleSearch = () => {
        dispatch(getCategory({ parentKey: '', params: { page: PAGINATION.pageIndex, limit: PAGINATION.limit, searchValue: searchValue } }));
    };


    const handleFormSubmit = async (formValues: any) => {
        if (oldItem) {
            // Update
            const resultAction = await dispatch(
                updateCategory({ id: oldItem.id, payload: formValues })
            );
            if (updateCategory.fulfilled.match(resultAction)) {
                showToast.success('Category updated successfully');
                onModalClose()
                dispatch(getCategory({ parentKey: '', params: { page: currentPage, limit: PAGINATION.limit } }));
            } else {
                showToast.error(resultAction.payload || 'Failed to update category');
            }
        } else {
            // Create
            const resultAction = await dispatch(
                createCategory({ parentKey: '', payload: formValues })
            );
            if (createCategory.fulfilled.match(resultAction)) {
                showToast.success('Category created successfully');
                setIsModalOpen(false);
                dispatch(getCategory({ parentKey: '', params: { page: currentPage, limit: PAGINATION.limit } }));
            } else {
                showToast.error(resultAction.payload || 'Failed to create category');
            }
        }
    };
    useEffect(() => {
        dispatch(getCategory({ parentKey: '', params: { page: currentPage, limit: PAGINATION.limit } }));
    }, [dispatch, currentPage]);

    const cardFields: CardFields[] = [
        {
            label: 'Category Name',
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
        setIsViewModalOpen(true)
        setoldItem(item)
    }

    const onEdit = (item: any) => {
        setoldItem(item);
        setIsModalOpen(true);

    }
    const handleAction = (action: string, item: any) => {

        switch (action) {
            case 'edit':
                onEdit(item)
                break
            case 'view':
                onView(item)
                break
        }
    };
    const onModalClose = () => {
        setIsModalOpen(false)
        setIsViewModalOpen(false)
        setoldItem(null);
    }
    return (
        <>
            <div className="flex justify-between mb-4">
                <SearchBar
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    placeholder="Search Category"
                    handleSearch={handleSearch}
                />
                <CustomButton label="ADD" className="w-[10%]" type="primary" onClick={() => setIsModalOpen(true)} />
            </div>

            <IconCardComponent labels={cardFields} data={categoryData?.categories || []} handleAction={handleAction} />

            <div className="mt-4 flex justify-end">
                <Pagination
                    current={currentPage}
                    pageSize={PAGINATION.limit}
                    total={categoryData?.pagination?.total}
                    onChange={(page) => setCurrentPage(page)}
                />
            </div>

            {isModalOpen && (
                <FormModal
                    formFields={categoryFormFields}
                    title={oldItem ? "Edit Category" : "Add Category"}
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
                    title="View Category"
                />
            )}


        </>
    );
};

export default CategoryLanding;
