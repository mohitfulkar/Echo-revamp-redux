import React from 'react';
import { Table, Button, Space } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import type { DataType, ReusableTableProps, ColumnConfig } from '../models/sharedComponent';
import StatusTag from './StatusTag';

// Helper to flatten array fields to comma-separated strings
const flattenArrayFields = (data: DataType[]): DataType[] => {
    return data.map((row) => {
        const newRow: DataType = { ...row };
        Object.keys(newRow).forEach((key) => {
            if (Array.isArray(newRow[key])) {
                newRow[key] = newRow[key].join(', ');
            }
        });
        return newRow;
    });
};

export const TableComponent: React.FC<ReusableTableProps> = ({
    data,
    columnsConfig,
    actions = [],
    pagination,
    rowKey
}) => {
    // Flatten array fields in data
    const processedData = flattenArrayFields(data);

    // Map columnsConfig to Ant Design columns
    const columns: ColumnsType<DataType> = [
        ...columnsConfig.map(({ title, dataIndex, type }: ColumnConfig) => ({
            title,
            dataIndex,
            key: dataIndex,
            render: type === 'status'
                ? (value: string) => <StatusTag status={value} />
                : undefined,
        })),
        ...(actions.length > 0
            ? [
                {
                    title: 'Actions',
                    key: 'actions',
                    render: (_: any, record: any) => (
                        <Space size="middle">
                            {actions.map(({ icon, onClick }, index) => (
                                <Button
                                    key={index}
                                    type="link"
                                    icon={icon}
                                    onClick={() => onClick(record)}
                                />
                            ))}
                        </Space>
                    ),
                },
            ]
            : []),
    ];

    return (
        <Table<DataType>
            rowKey={rowKey}
            columns={columns}
            dataSource={processedData}
            pagination={pagination as TablePaginationConfig}
        />
    );
};

export default TableComponent;
