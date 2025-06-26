import React, { useEffect } from 'react'
import { socialMediaFormFields } from '../../../auth/models/FormFields'
import { renderFormField } from '../../../../core/components/FormTemplate'
import CustomButton from '../../../../core/components/CustomButton'
import { Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../../store';
import { setStepData } from '../../../../core/features/multiStepStateReducer';
import type { StepFormProps } from '../../../../core/models/sharedComponent';

const SocialMediaForm: React.FC<StepFormProps> = ({ onBack, stepKey, onNext }) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch<AppDispatch>()
    const currentItem: string = 'socialMedia'



    const items = useSelector((state: RootState) => state.multiStepState[currentItem])

    useEffect(() => {
        if (items) {
            form.setFieldsValue(items)
        }
    }, [items, currentItem, form])
    const handleSubmit = async () => {
        try {
            const payload = await form.validateFields();
            dispatch(setStepData({
                stepKey: stepKey || '',
                data: payload,
            }));
            console.log('Payload:', payload);
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