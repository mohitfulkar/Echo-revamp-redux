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
import { IconCardComponent } from '../../../core/components/IconCardComponent';
import { CalendarOutlined, CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';

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
        dispatch(getExpertise({ parentKey: '', params: { page: currentPage, limit: PAGINATION.limit, searchValue: searchValue } }));
    };


    const handleFormSubmit = async (formValues: any) => {
        const resultAction = await dispatch(
            createExpertise({ parentKey: '', payload: formValues })
        );
        if (createExpertise.fulfilled.match(resultAction)) {
            showToast.success('Expertise created successfully');
            dispatch(getExpertise({ parentKey: '', params: { page: currentPage, limit: PAGINATION.limit, searchValue: searchValue } }));

            setIsModalOpen(false);
        } else {
            showToast.error(resultAction.payload || 'Failed to create expertise');
        }
    };

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
            key: "statusDisplay",
            type: "status",
            icon: <CheckCircleOutlined />, // You can swap with another status-representing icon if desired
        },
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
                <CustomButton label="ADD" className="w-[10%]" type="primary" onClick={() => setIsModalOpen(true)} />
            </div>

            <IconCardComponent labels={labels} data={expertiseData?.expertises || []} />

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
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleFormSubmit}
                />
            )}
        </>
    );
};

export default ExpertiseLanding;
