import React, { useEffect } from 'react'
import { socialMediaFormFields } from '../../../auth/models/FormFields'
import { renderFormField } from '../../../../core/components/FormTemplate'
import CustomButton from '../../../../core/components/CustomButton'
import { Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../../store';
import { setStepData } from '../../../../core/features/multiStepStateReducer';
import type { StepFormProps } from '../../../../core/models/sharedComponent';
import { useParams } from 'react-router-dom';
import { getPanelistById } from '../../../voter/features/userSlices';

const SocialMediaForm: React.FC<StepFormProps> = ({ onBack, stepKey, onNext }) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch<AppDispatch>()
    const currentItem: string = 'socialMedia'

    const items = useSelector((state: RootState) => state.multiStepState[currentItem])
    const { action, panelistId } = useParams<{ action?: string; panelistId?: string }>();

    useEffect(() => {
        if (items && Object.keys(items).length > 0) {
            form.setFieldsValue(items);
        } else if (action === "edit" && panelistId) {
            getOldItems();
        }
    }, [items, action, panelistId, form]);

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
            const payload = await form.validateFields();
            dispatch(setStepData({
                stepKey: stepKey || '',
                data: payload,
            }));
            onNext(); // Proceed to the next step
        } catch (error) {
            console.error('Validation Failed:', error);
        }
    }

    return (
        <>
            <Form layout="vertical" form={form} >
                <div className='grid grid-cols-2 gap-3'>
                    {socialMediaFormFields.map((field) => renderFormField(field))}
                </div>
                <div className='flex justify-between mt-6'>
                    <CustomButton label='Cancel' className='w-[30%]' onClick={onBack}></CustomButton>
                    <CustomButton label='Next' className='w-[30%]' type='primary' onClick={handleSubmit}></CustomButton>
                </div>
            </Form>
        </>
    )
}

export default SocialMediaForm