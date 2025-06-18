// src/core/components/StepperWithContent.tsx
import React, { useState } from 'react';
import { Steps, Button } from 'antd';
import type { StepperProps } from '../models/sharedComponent';

interface StepperWithContentProps extends StepperProps {
    children: React.ReactNode[];
}

const StepperWithContent: React.FC<StepperWithContentProps> = ({
    steps,
    direction = 'horizontal',
    size = 'default',
    responsive = true,
    children,
}) => {
    const [current, setCurrent] = useState(0);

    const next = () => {
        if (current < steps.length - 1) {
            setCurrent(prev => prev + 1);
        }
    };

    const prev = () => {
        if (current > 0) {
            setCurrent(prev => prev - 1);
        }
    };

    return (
        <div>
            <Steps
                current={current}
                direction={direction}
                size={size}
                responsive={responsive}
                items={steps}
            />

            <div className="mt-8 mb-4">
                {children[current]}
            </div>

            <div className="flex justify-end gap-4">
                {current > 0 && <Button onClick={prev}>Previous</Button>}
                {current < steps.length - 1 && <Button type="primary" onClick={next}>Next</Button>}

            </div>
        </div>
    );
};

export default StepperWithContent;
