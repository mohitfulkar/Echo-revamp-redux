import React, { useEffect, useMemo, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import type { AppDispatch, RootState } from '../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { TableComponent } from '../../../core/components/Table';
import type { ActionType, ColumnConfig, DataType } from '../../../core/models/sharedComponent';
import { getUsersByTab } from '../features/userSlices';

interface UserProps {
    searchValue: string;
}

const UserData: React.FC<UserProps> = ({ searchValue }) => {
    const location = useLocation();
    const dispatch = useDispatch<AppDispatch>();
    const { itemsByKey } = useSelector((state: RootState) => state.users);

    const tab = useMemo(() =>
        new URLSearchParams(location.search).get('tab') || 'voter',
        [location.search]
    );

    const columnsConfig: ColumnConfig[] = useMemo(() => [
        { title: 'Full Name', dataIndex: 'fullName' },
        { title: 'Email', dataIndex: 'email' },
        { title: 'Role', dataIndex: 'role' },
    ], []);

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

    const tabData = useMemo(() => itemsByKey[tab], [itemsByKey, tab]);
    const hasFetchedTabData = tabData && Array.isArray(tabData.data) && tabData.data.length > 0;

    useEffect(() => {
        if (!hasFetchedTabData) {
            const role = tab
            const params = {
                ...(role && { role }),
                ...(searchValue && { searchValue })
            };

            dispatch(getUsersByTab({ tab, params }));
        }
    }, [tab, dispatch, searchValue, hasFetchedTabData]);

    return (
        <TableComponent
            data={hasFetchedTabData ? tabData?.data : []}
            columnsConfig={columnsConfig}
            actions={actions}
        />
    );
};

export default UserData;
