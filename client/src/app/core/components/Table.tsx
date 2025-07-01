import React from 'react';
import { Table, Button, Space } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import type { DataType, ReusableTableProps, ColumnConfig } from '../models/sharedComponent';
import StatusTag from './StatusTag';

export const TableComponent: React.FC<ReusableTableProps> = ({
    data,
    columnsConfig,
    actions = [],
    pagination,
    rowKey
}) => {
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
            dataSource={data}
            pagination={pagination as TablePaginationConfig}
        />
    );
};

export default TableComponent;
