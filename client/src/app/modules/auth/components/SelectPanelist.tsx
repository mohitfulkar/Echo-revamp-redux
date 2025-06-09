// src/features/panelist/steps/VerificationStep.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../store';


const SelectPanelist: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const selectedCategory = useSelector((state: RootState) => state.shared['category']);
    const [panelists, setPanelists] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchPanelists = async () => {
            if (!selectedCategory) return;

        };

        fetchPanelists();
    }, [selectedCategory]);

    return (
        <div>
            <h3 className="text-xl mb-4">Verify Your Details</h3>

            {loading ? (
                <p>Loading panelists...</p>
            ) : (
                <ul className="list-disc ml-5">
                    {panelists.map((panelist) => (
                        <li key={panelist._id}>{panelist.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SelectPanelist;
