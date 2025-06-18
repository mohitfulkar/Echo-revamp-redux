import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../store';
import { getPanelists, resetUsers } from '../../voter/features/userSlices';
import { Card, Skeleton, Input, Button } from 'antd';
import { loginPanelist } from '../features/authSlices';
import type { Panelist, PanelistLogin } from '../models/auth.interface';
import { showToast } from '../../../core/service/ToastService';
import { useNavigate } from 'react-router-dom';

const SelectPanelist: React.FC = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>();
    const categoryId = useSelector((state: RootState) => state.shared['category']);
    const { itemsByKey, loading } = useSelector((state: RootState) => state.users);
    const [selectedPanelist, setSelectedPanelist] = useState<Panelist>();
    const [secretKey, setSecretKey] = useState('');
    const { user } = useSelector((state: RootState) => state.auth);

    console.log('secretKey', secretKey)
    useEffect(() => {
        if (categoryId) {
            dispatch(resetUsers()); // Clear stale users
            dispatch(getPanelists({ parentKey: 'panelists/categories', id: categoryId }));
        }
    }, [categoryId, dispatch]);

    const handleCardClick = (item: Panelist) => {
        setSelectedPanelist(item);
    };

    const handleSubmit = async () => {
        if (!selectedPanelist) {
            showToast.warning('Please select a panelist');
            return;
        }

        if (!secretKey.trim()) {
            showToast.warning('Please enter your secret key');
            return;
        }

        if (!categoryId) {
            showToast.error('Category ID is missing');
            return;
        }
        const payload: PanelistLogin = {
            categoryId: categoryId,
            email: selectedPanelist?.email || '',
            password: secretKey.trim()
        }
        console.log('payload', payload)
        const resultAction = await dispatch(loginPanelist(payload));
        if (loginPanelist.fulfilled.match(resultAction)) {
            console.log('user', user)
            showToast.success(`Welcome ${selectedPanelist.name}`)
            localStorage.setItem('user', JSON.stringify(user.data.user))
            localStorage.setItem("activeModule", 'panelist')
            localStorage.setItem("token", user.data.token)
        }
    }

    return (
        <div>
            <h3 className="h6 text-center">Verify Your Details</h3>
        
            {loading ? (
                <Skeleton active paragraph={{ rows: 3 }} />
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-12 text-center">
                        {itemsByKey?.users?.map((panelist: any) => (
                            <Card
                                key={panelist._id}
                                hoverable
                                className={`flex items-center mb-4 space-x-3 p-3 cursor-pointer transition-all ${selectedPanelist === panelist ? 'border-blue-500 shadow-md' : 'border-gray-200'
                                    }`}
                                onClick={() => handleCardClick(panelist)}
                            >
                                <div>
                                    <p className="value">{panelist.name}</p>
                                    <p className="text-xs">{panelist.occupation}</p>
                                </div>
                            </Card>
                        ))}
                    </div>

                    {selectedPanelist && (
                        <div className="mt-6 max-w-md mx-auto mb-4">
                            <label className="block mb-2 font-medium">Enter Secret Key</label>
                            <Input.Password
                                value={secretKey}
                                onChange={(e) => setSecretKey(e.target.value)}
                                placeholder="Type your secret key"
                            />
                        </div>
                    )}

                    <Button className='w-full' type="primary" onClick={handleSubmit}>Login</Button>
                </>
            )}
        </div>
    );
};

export default SelectPanelist;
