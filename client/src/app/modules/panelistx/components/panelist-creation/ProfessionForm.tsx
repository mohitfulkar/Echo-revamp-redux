import React, { useEffect } from 'react';
import { Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { professionFormFields } from '../../../auth/models/FormFields';
import { renderFormField } from '../../../../core/components/FormTemplate';
import CustomButton from '../../../../core/components/CustomButton';

import { setStepData } from '../../../../core/features/multiStepStateReducer';
import { useChoices } from '../../../../core/hooks/useChoices';

import type { StepFormProps } from '../../../../core/models/sharedComponent';
import type { AppDispatch, RootState } from '../../../../store';
import { applyFieldOptions } from '../../../../core/service/FormService';

const ProfessionForm: React.FC<StepFormProps> = ({ stepKey, onNext, onBack }) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch<AppDispatch>();

    const currentItem = 'profession';
    const savedData = useSelector((state: RootState) => state.multiStepState[currentItem]);

    const { items: expertiseOptions } = useChoices('expertise'); // ✅ Hook used correctly

    useEffect(() => {
        if (savedData) {
            form.setFieldsValue(savedData);
        }
    }, [savedData, form]);

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            dispatch(setStepData({ stepKey: stepKey || '', data: values }));
            onNext(); // Proceed to next step
        } catch (error) {
            console.error('Validation Failed:', error);
        }
    };
    const fieldOptionsMap: Record<string, any[]> = {
        areaOfExpertise: expertiseOptions || [],
    };
    const dynamicFields = applyFieldOptions(professionFormFields, fieldOptionsMap);

    return (
        <Form layout="vertical" form={form}>
            <div className="grid grid-cols-2 gap-3">
                {dynamicFields.map((field) => renderFormField(field))}
            </div>

            <div className="flex justify-between mt-6">
                <CustomButton label="Cancel" className="w-[30%]" onClick={onBack} />
                <CustomButton label="Next" className="w-[30%]" type="primary" onClick={handleSubmit} />
            </div>
        </Form>
    );
};

export default ProfessionForm;
