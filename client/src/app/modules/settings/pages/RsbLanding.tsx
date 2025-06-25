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
import { createRsb, getRsb } from '../features/rsbSlices';
import { IconCardComponent } from '../../../core/components/IconCardComponent';
import { CalendarOutlined, CheckCircleOutlined, ClockCircleOutlined, EyeOutlined } from '@ant-design/icons';

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
    const [currentPage, setCurrentPage] = useState(PAGINATION.pageIndex);

    const { data: rsbData } = useSelector((state: RootState) => state.rsb);

    const handleSearch = () => {
        dispatch(getRsb({ parentKey: '', params: { page: currentPage, limit: PAGINATION.limit, searchValue: searchValue } }));
    };


    const handleFormSubmit = async (formValues: any) => {

        const resultAction = await dispatch(
            createRsb({ parentKey: '', payload: formValues })
        );
        if (createRsb.fulfilled.match(resultAction)) {
            showToast.success('Responsibility created successfully');
            dispatch(getRsb({ parentKey: '', params: { page: currentPage, limit: PAGINATION.limit } }));
            setIsModalOpen(false);
        } else {
            showToast.error(resultAction.payload || 'Failed to create Responsibility');
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
            key: "statusDisplay",
            type: "status",
            icon: <CheckCircleOutlined />, // You can swap with another status-representing icon if desired
        },
    ];

    const handleAction = () => (action: string, record: any) => {
        if (action === "view") {
            console.log("Viewing", record);
        } else if (action === "edit") {
            console.log("Editing", record);
        } else if (action === "delete") {
            console.log("Deleting", record);
        }
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
                    title="Add Responsibility"
                    open={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleFormSubmit}
                />
            )}
        </>
    );
};

export default RsbLanding;
