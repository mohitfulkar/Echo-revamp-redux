import React, { useEffect, useState } from 'react';
import SearchBar from '../../../core/components/SearchBar';
import CustomButton from '../../../core/components/CustomButton';
import { CardComponent } from '../../../core/components/CardComponent';
import type { CardFields } from '../../../core/models/sharedComponent';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../store';
import { createCategory, getCategory } from '../features/categorySlices';
import FormModal from '../../../core/components/FormModal';
import { categoryFormFields } from '../constants/FormFields';
import { showToast } from '../../../core/service/ToastService';
import { PAGINATION } from '../../../core/constants/pagination';
import { Pagination } from 'antd';

export interface CardDataItem {
    name: string;
    description: string;
    image?: string;
    createdDate?: string;
    createdTime?: string;
    isActive?: boolean;
    statusDisplay?: string;
}

const CategoryLanding: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [searchValue, setSearchValue] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(PAGINATION.pageIndex);

    const { data: categoryData } = useSelector((state: RootState) => state.category);

    const handleSearch = () => {
        dispatch(getCategory({ page: PAGINATION.pageIndex, limit: PAGINATION.limit }));
    };

    const handleAdd = () => setIsModalOpen(true);
    const handleModalClose = () => setIsModalOpen(false);

    const handleFormSubmit = async (formValues: any) => {
        const resultAction = await dispatch(
            createCategory({ parentKey: 'category', payload: formValues })
        );
        if (createCategory.fulfilled.match(resultAction)) {
            showToast.success('Category created successfully');
            dispatch(getCategory({ page: PAGINATION.pageIndex, limit: PAGINATION.limit }));
            setIsModalOpen(false);
        } else {
            showToast.error(resultAction.payload || 'Failed to create category');
        }
    };

    useEffect(() => {
        dispatch(getCategory({ page: currentPage, limit: PAGINATION.limit }));
    }, [dispatch, currentPage]);

    const labels: CardFields[] = [
        { label: 'Name', key: 'name' },
        { label: 'Created Date', key: 'createdDate' },
        { label: 'Created Time', key: 'createdTime' },
        { label: 'Status', key: 'statusDisplay', type: 'status' },
    ];

    return (
        <>
            <div className="flex justify-between mb-4">
                <SearchBar
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    placeholder="Search Category"
                    handleSearch={handleSearch}
                />
                <CustomButton label="ADD" className="w-[10%]" type="primary" onClick={handleAdd} />
            </div>

            <CardComponent labels={labels} data={categoryData?.categories || []} />

            <div className="mt-4 flex justify-end">
                <Pagination
                    current={currentPage}
                    pageSize={PAGINATION.limit}
                    total={categoryData?.pagination?.total || 0}
                    onChange={(page) => setCurrentPage(page)}
                />
            </div>

            {isModalOpen && (
                <FormModal
                    formFields={categoryFormFields}
                    title="Add Category"
                    open={isModalOpen}
                    onClose={handleModalClose}
                    onSubmit={handleFormSubmit}
                />
            )}
        </>
    );
};

export default CategoryLanding;
