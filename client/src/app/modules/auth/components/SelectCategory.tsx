// src/features/panelist/steps/CategoryStep.tsx
import React, { useState } from 'react';
import { Card, Typography } from 'antd';
import { useChoices } from '../../../core/hooks/useChoices';
import { CheckCircleTwoTone } from '@ant-design/icons';
import { setSharedData } from '../../../core/features/sharedStateSlices';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../store';

const { Title } = Typography;

const SelectCategory: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const { items } = useChoices('categories');
    const [selectedItem, setSelectedItem] = useState<string | null>(null);

    const handleCardClick = (value: string) => {

        setSelectedItem(value);
        dispatch(setSharedData({ key: 'category', value: value }));

    };

    return (
        <div>
            <Title level={4} className="mb-6">Choose a Category</Title>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {items.map(({ label, value }) => (
                    <Card
                        key={value}
                        hoverable
                        className={`border rounded-lg transition-all cursor-pointer ${selectedItem === value
                            ? 'border-blue-500 shadow-md'
                            : 'border-gray-200'
                            }`}
                        onClick={() => handleCardClick(value)}
                    >
                        <div className="flex justify-between items-center">
                            <span>{label}</span>
                            {selectedItem === value && (
                                <CheckCircleTwoTone twoToneColor="#52c41a" />
                            )}
                        </div>
                    </Card>
                ))}
            </div>

        </div>
    );
};

export default SelectCategory;
