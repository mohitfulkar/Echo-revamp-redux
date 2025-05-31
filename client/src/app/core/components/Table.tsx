import React from 'react';
import { Table, Button, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { DataType, ReusableTableProps } from '../models/sharedComponent';

export const TableComponent: React.FC<ReusableTableProps> = ({ data, columnsConfig, actions = [] }) => {
    // map columnsConfig to AntD ColumnsType<DataType>
    const columns: ColumnsType<DataType> = [
        ...columnsConfig.map(({ title, dataIndex }) => ({
            title,
            dataIndex,
            key: dataIndex,

        })),
        ...(actions.length > 0
            ? [
                {
                    title: 'Actions',
                    key: 'actions',
                    render: (_: any, record: any) => (
                        <Space size="middle">
                            {actions.map(({ name, label, onClick }) => (
                                <Button key={name} type="link" onClick={() => onClick(record)}>
                                    {label}
                                </Button>
                            ))}
                        </Space>
                    ),
                },
            ]
            : []),
    ];

    return <Table<DataType> rowKey={(record) => record.id || record.key} columns={columns} dataSource={data} />;
};

export default Table;
