import React, { useEffect } from 'react';
import { Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { professionFormFields } from '../../../auth/models/FormFields';
import { renderFormField } from '../../../../core/components/FormTemplate';
import CustomButton from '../../../../core/components/CustomButton';

import { setStepData } from '../../../../core/features/multiStepStateReducer';
import { useChoices } from '../../../../core/hooks/useChoices';

import type { StepFormProps } from '../../../../core/models/sharedComponent';
import type { AppDispatch, RootState } from '../../../../store';
import { applyFieldOptions } from '../../../../core/service/FormService';
import { getPanelistById } from '../../../voter/features/userSlices';

const ProfessionForm: React.FC<StepFormProps> = ({ stepKey, onNext, onBack }) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch<AppDispatch>();

    const currentItem = 'profession';
    const savedData = useSelector((state: RootState) => state.multiStepState[currentItem]);
    const { action, panelistId } = useParams<{ action?: string; panelistId?: string }>();
    const { items: expertiseOptions } = useChoices('expertise');
    useEffect(() => {
        if (savedData && Object.keys(savedData).length > 0) {
            form.setFieldsValue(savedData);
        } else if (action === "edit" && panelistId) {
            getOldItems();
        }
    }, [savedData, action, panelistId, form]);

    const getOldItems = async () => {
        if (action === "edit" && panelistId) {
            try {
                const resultAction = await dispatch(getPanelistById({ id: panelistId }));
                if (getPanelistById.fulfilled.match(resultAction)) {
                    const data = resultAction.payload;
                    if (data) {
                        form.setFieldsValue(data);
                    }
                } else {
                    console.error("Failed to fetch panelist details:", resultAction.payload);
                }
            } catch (error) {
                console.error("Failed to fetch panelist details:", error);
            }
        }
    };

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            dispatch(setStepData({ stepKey: stepKey || '', data: values }));
            onNext();
        } catch (error) {
            console.error('Validation Failed:', error);
        }
    };

    const fieldOptionsMap: Record<string, any[]> = {
        expertise: expertiseOptions || [],
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
