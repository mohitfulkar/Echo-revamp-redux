import React, { useEffect, useMemo, useState } from "react";

import SharedSelect from "../../../core/components/SharedSelect";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../store";
import { useChoices } from "../../../core/hooks/useChoices";
import { getPanelists } from "../../voter/features/userSlices";

const PanelistLogin: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>();
    const [selectedPanelist, setSelectedPanelist] = useState<string>();
    const dispatch = useDispatch<AppDispatch>();

    const { itemsByKey } = useSelector((state: RootState) => state.users);
    const { items } = useChoices('categories');

    useEffect(() => {
        if (selectedCategory) {
            dispatch(getPanelists({ parentKey: 'panelists/categories', id: selectedCategory }));
        }
    }, [selectedCategory, dispatch]);

    // 🔄 Format users for SharedSelect
    const panelistOptions = useMemo(() => {
        return (itemsByKey?.users || []).map((user: any) => ({
            label: `${user.name} - ${user.occupation}`,
            value: user._id,
        }));
    }, [itemsByKey]);

    return (
        <div className="h-screen bg-white px-6 md:px-24 py-12">
            <div className="flex flex-col md:flex-row h-full shadow-lg rounded-2xl overflow-hidden">
                {/* Left Side */}
                <div className="md:w-1/2 hidden md:flex bg-gradient-to-br from-blue-100 to-blue-300 justify-center items-center">
                    <h2 className="text-3xl font-semibold text-blue-900">
                        Welcome Back!
                    </h2>
                </div>

                {/* Right Side */}
                <div className="p-12 w-full md:w-1/2">
                    <p className="h4 text-center">Panelist Login</p>
                    <div className="text-center">
                        <SharedSelect
                            label="Select Your Category"
                            options={items}
                            value={selectedCategory}
                            onChange={setSelectedCategory}
                        />
                        <SharedSelect
                            label="Select Your Name"
                            options={panelistOptions}
                            value={selectedPanelist}
                            onChange={setSelectedPanelist}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PanelistLogin;
