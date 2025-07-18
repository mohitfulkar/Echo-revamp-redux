import React, { useEffect } from 'react';
import { designationFormFields } from '../../../auth/models/FormFields'
import { renderFormField } from '../../../../core/components/FormTemplate'
import CustomButton from '../../../../core/components/CustomButton'
import type { StepFormProps } from '../../../../core/models/sharedComponent'
import { Form } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../../../store'
import { setStepData } from '../../../../core/features/multiStepStateReducer'
import { useChoices } from '../../../../core/hooks/useChoices'
import { applyFieldOptions } from '../../../../core/service/FormService'
import { useParams } from 'react-router-dom'
import { getPanelistById } from '../../../voter/features/userSlices';

const DesignationForm: React.FC<StepFormProps> = ({ stepKey, onNext, onBack }) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch<AppDispatch>();
    const currentItem: string = 'designation';
    const savedData = useSelector((state: RootState) => state.multiStepState[currentItem]);
    const { items: categoryOptions } = useChoices('category');
    const { items: designationOptions } = useChoices('designation');
    const { items: RsbOptions } = useChoices('rsb');
    const { action, panelistId } = useParams<{ action?: string; panelistId?: string }>();

    const fieldOptionsMap: Record<string, any[]> = {
        category: categoryOptions,
        designation: designationOptions,
        rsb: RsbOptions,
    };
    const dynamicFields = applyFieldOptions(designationFormFields, fieldOptionsMap);

    // Fetch and patch form values
    useEffect(() => {
        if (savedData && Object.keys(savedData).length > 0) {
            form.setFieldsValue(savedData);
        } else if (action === "edit" && panelistId) {
            getOldItems();
        }
        // eslint-disable-next-line
    }, [savedData, action, panelistId, form]);

    const getOldItems = async () => {
        if (action === "edit" && panelistId) {
            try {
                const resultAction = await dispatch(getPanelistById({ id: panelistId }));
                if (getPanelistById.fulfilled.match(resultAction)) {
                    const data = Array.isArray(resultAction.payload) ? resultAction.payload[0] : resultAction.payload;
                    if (data) {
                        form.setFieldsValue({
                            ...data,
                            category: data?.category?._id,
                            responsibility: data?.responsibility
                        })
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
            const payload = await form.validateFields();
            dispatch(setStepData({
                stepKey: stepKey || '',
                data: payload,
            }));
            onNext();
        } catch (error) {
            console.error('Validation Failed:', error);
        }
    };

    return (
        <>
            <Form layout="vertical" form={form}>
                <div className='grid grid-cols-2 gap-3'>
                    {dynamicFields.map((field) => renderFormField(field))}
                </div>
                <div className='flex justify-between mt-6'>
                    <CustomButton label='Cancel' className='w-[30%]' onClick={onBack}></CustomButton>
                    <CustomButton label='Next' className='w-[30%]' type='primary' onClick={handleSubmit}></CustomButton>
                </div>
            </Form>
        </>
    );
};

export default DesignationForm;