import React, { useState } from 'react';
import { Steps, Button } from 'antd';
import type { StepperProps } from '../models/sharedComponent';

interface StepperWithContentProps extends StepperProps {
    children: React.ReactNode | React.ReactNode[];
    showNavigationButtons?: boolean;
    currentStep?: number;
    setCurrentStep?: (step: number) => void;
}

const StepperWithContent: React.FC<StepperWithContentProps> = ({
    steps,
    direction = 'horizontal',
    size = 'default',
    responsive = true,
    children,
    showNavigationButtons = true,
    currentStep,
    setCurrentStep,

}) => {
    const childrenArray = React.Children.toArray(children);
    const isControlled = currentStep !== undefined && setCurrentStep !== undefined;
    const [internalCurrent, setInternalCurrent] = useState(0);

    const current = isControlled ? currentStep : internalCurrent;
    const setCurrent = isControlled ? setCurrentStep : setInternalCurrent;

    const next = () => {
        if (current < steps.length - 1) setCurrent(current + 1);
    };

    const prev = () => {
        if (current > 0) setCurrent(current - 1);
    };

    return (
        <div>
            <Steps
                current={current}
                direction={direction}
                size={size}
                responsive={responsive}
                items={steps}
                onChange={(val) => setCurrent(val)}
            />

            <div className="mt-8 mb-4">
                {childrenArray[current] || null}
            </div>

            {showNavigationButtons && (
                <div className="flex justify-end gap-4">
                    {current > 0 && <Button onClick={prev}>Previous</Button>}
                    {current < steps.length - 1 && <Button type="primary" onClick={next}>Next</Button>}
                </div>
            )}
        </div>
    );
};

export default StepperWithContent;
