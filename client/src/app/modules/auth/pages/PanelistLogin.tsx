import React from "react";
import {

    SolutionOutlined,
    UserOutlined,
} from '@ant-design/icons';
import type { StepItem } from "../../../core/models/sharedComponent";
import StepperWithContent from "../../../core/components/Stepper";
import SelectCategory from "../components/SelectCategory";
import SelectPanelist from "../components/SelectPanelist";


const PanelistLogin: React.FC = () => {
    const steps: StepItem[] = [
        {
            title: 'Select Category',
            status: 'finish',
            icon: <UserOutlined />,
        },
        {
            title: 'Login',
            status: 'process',
            icon: <SolutionOutlined />,
        },
    ];

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
                <div className="p-16 w-full md:w-1/2">
                    <StepperWithContent steps={steps}>
                        {[<SelectCategory key="category" />, <SelectPanelist key="verify" />]}
                    </StepperWithContent>
                </div>
            </div>
        </div>
    );
};

export default PanelistLogin;
