import React, { useEffect, useState } from 'react';
import SearchBar from '../../../core/components/SearchBar';
import CustomButton from '../../../core/components/CustomButton';
import { CardComponent } from '../../../core/components/CardComponent';
import type { CardFields } from '../../../core/models/sharedComponent';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../store';
import FormModal from '../../../core/components/FormModal';
import { categoryFormFields } from '../constants/FormFields';
import { showToast } from '../../../core/service/ToastService';
import { PAGINATION } from '../../../core/constants/pagination';
import { Pagination } from 'antd';
import { createExpertise, getExpertise } from '../features/expertiseSlices';

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
    const [currentPage, setCurrentPage] = useState(PAGINATION.pageIndex);

    const { data: expertiseData } = useSelector((state: RootState) => state.expertise);

    const handleSearch = () => {
        dispatch(getExpertise({ page: PAGINATION.pageIndex, limit: PAGINATION.limit }));
    };

    const handleAdd = () => setIsModalOpen(true);
    const handleModalClose = () => setIsModalOpen(false);

    const handleFormSubmit = async (formValues: any) => {
        console.log('formValues', formValues)
        const resultAction = await dispatch(
            createExpertise({ parentKey: '', payload: formValues })
        );
        if (createExpertise.fulfilled.match(resultAction)) {
            showToast.success('Expertise created successfully');
            dispatch(getExpertise({ page: PAGINATION.pageIndex, limit: PAGINATION.limit }));
            setIsModalOpen(false);
        } else {
            showToast.error(resultAction.payload || 'Failed to create expertise');
        }
    };

    useEffect(() => {
        dispatch(getExpertise({ page: currentPage, limit: PAGINATION.limit }));
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
                    placeholder="Search Expertise"
                    handleSearch={handleSearch}
                />
                <CustomButton label="ADD" className="w-[10%]" type="primary" onClick={handleAdd} />
            </div>

            <CardComponent labels={labels} data={expertiseData?.expertises || []} />

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
                    title="Add Expertise"
                    open={isModalOpen}
                    onClose={handleModalClose}
                    onSubmit={handleFormSubmit}
                />
            )}
        </>
    );
};

export default ExpertiseLanding;
