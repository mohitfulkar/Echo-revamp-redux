import React, { useMemo, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import type { AppDispatch, RootState } from '../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { TableComponent } from '../../../core/components/Table';
import type { ActionType, ColumnConfig, DataType } from '../../../core/models/sharedComponent';
import { useUsers } from '../../../core/hooks/useUsers';
import { PAGINATION } from '../../../core/constants/pagination';
import { columnConfigMap } from '../constants/userTable';

interface UserProps {
    searchValue: string;
}

const UserData: React.FC<UserProps> = ({ searchValue }) => {
    const location = useLocation();

    const tab = useMemo(() =>
        new URLSearchParams(location.search).get('tab') || 'voter',
        [location.search]
    );

    const columnsConfig = useMemo(() => columnConfigMap[tab] || [], [tab]);

    const handleEdit = useCallback((row: DataType) => {
        const name = row.fullName || row.firstName || 'Unknown User';
        alert(`Edit clicked for ${name}`);
    }, []);

    const handleDelete = useCallback((row: DataType) => {
        const name = row.fullName || row.firstName || 'Unknown User';
        alert(`Delete clicked for ${name}`);
    }, []);

    const actions: ActionType[] = useMemo(() => [
        {
            name: 'edit',
            label: 'Edit',
            onClick: handleEdit,
        },
        {
            name: 'delete',
            label: 'Delete',
            onClick: handleDelete,
        },
    ], [handleEdit, handleDelete]);

    const { tabData } = useUsers(tab, searchValue, PAGINATION.pageIndex, PAGINATION.limit);
  
    return (
        <TableComponent
            data={tabData}
            columnsConfig={columnsConfig}
            actions={actions}
        />
    );
};

export default UserData;
