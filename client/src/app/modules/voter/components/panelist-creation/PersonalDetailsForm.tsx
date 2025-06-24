import React, { useEffect } from 'react'
import { personalDetailsFormFields } from '../../../auth/models/FormFields'
import { renderFormField } from '../../../../core/components/FormTemplate';
import CustomButton from '../../../../core/components/CustomButton';
import type { StepFormProps } from '../../../../core/models/sharedComponent';
import { Form } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../../store';
import { setStepData } from '../../../../core/features/multiStepStateReducer';

const PersonalDetailsForm: React.FC<StepFormProps> = ({ stepKey, onNext }) => {
    const currentItem: string = 'personalDetails'
    const navigate = useNavigate()
    const items = useSelector((state: RootState) => state.multiStepState[currentItem])
    const [form] = Form.useForm()
    const dispatch = useDispatch<AppDispatch>()


    useEffect(() => {
        if (items) {
            form.setFieldsValue(items)
        }
    }, [items, currentItem, form])

    const handleSubmit = async () => {
        try {
            const payload = await form.validateFields()
            dispatch(setStepData({
                stepKey: stepKey || '',
                data: payload,
            }))
            console.log('Payload:', payload)
            onNext() // Proceed to the next step
        } catch (error) {
            console.error('Validation Failed:', error)
        }
    }

    return (
        <>
            <Form layout="vertical" form={form}>
                <div className='grid grid-cols-2 gap-3'>
                    {personalDetailsFormFields.map(renderFormField)}
                </div>

                <div className='flex justify-between mt-6'>
                    <CustomButton label='Cancel' className='w-[30%]' onClick={() => navigate('/admin/manage-users')} />
                    <CustomButton label='Next' className='w-[30%]' type='primary' onClick={handleSubmit} />
                </div>
            </Form>
        </>
    )
}

export default PersonalDetailsForm