import React, { useState } from 'react'
import StepperWithContent from '../../../../core/components/Stepper'
import type { StepItem } from '../../../../core/models/sharedComponent'
import { BarChartOutlined, IdcardOutlined, ShareAltOutlined, UploadOutlined, UserOutlined } from '@ant-design/icons';
import PersonalDetailsForm from './PersonalDetailsForm'
import SocialMediaForm from './SocialMediaForm'
import UploadForm from './UploadForm';
import { useParams } from 'react-router-dom';
import ProfessionForm from './ProfessionForm';
import ContributionForm from './ContributionForm';
import DesignationForm from './DesignationForm';

const PanelistForm: React.FC = () => {
    const params = useParams();
    const action: "create" | "edit" = params.action === "edit" ? "edit" : "create";
    const id = params.id;
    const [currentStep, setCurrentStep] = useState(0);

    const handleNext = () => {
        if (currentStep < steps.length - 1) setCurrentStep(prev => prev + 1);
    };

    const handleBack = () => {
        if (currentStep > 0) setCurrentStep(prev => prev - 1);
    };

    const formStepProps = { action, id, onNext: handleNext, onBack: handleBack };

    const steps: StepItem[] = [
        { title: 'Personal Details', icon: <UserOutlined /> },
        { title: 'Profession', icon: <IdcardOutlined /> },
        { title: 'Contribution', icon: <IdcardOutlined /> },
        { title: 'Social Media', icon: <ShareAltOutlined /> },
        { title: 'Category Designation', icon: <BarChartOutlined /> },
        { title: 'Upload Photo', icon: <UploadOutlined /> },
    ];
    return (
        <>
            <StepperWithContent steps={steps} showNavigationButtons={false} currentStep={currentStep} setCurrentStep={setCurrentStep} // optional, but ideal for click-to-step
            >
                {[
                    <PersonalDetailsForm key="personal" stepKey="personalDetails" {...formStepProps} />,
                    <ProfessionForm key="profession" stepKey="profession"{...formStepProps} />,
                    <ContributionForm key="contribution" stepKey="contribution" {...formStepProps} />,
                    <SocialMediaForm key="socialMedia" stepKey="socialMedia" {...formStepProps} />,
                    <DesignationForm key="designation" stepKey="designation" {...formStepProps} />,
                    <UploadForm key="upload" stepKey="upload" {...formStepProps} />,
                ]}
            </StepperWithContent>
        </>
    )
}

export default PanelistForm