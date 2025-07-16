import React, { useEffect } from 'react'
import { personalDetailsFormFields } from '../../../auth/models/FormFields'
import { renderFormField } from '../../../../core/components/FormTemplate';
import CustomButton from '../../../../core/components/CustomButton';
import type { StepFormProps } from '../../../../core/models/sharedComponent';
import { Form } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../../store';
import { setStepData } from '../../../../core/features/multiStepStateReducer';
import { getUserRole } from '../../../../core/service/localStorageService';
import { getPanelistById } from '../../../voter/features/userSlices';

const PersonalDetailsForm: React.FC<StepFormProps> = ({ stepKey, onNext }) => {
    const currentItem: string = 'personalDetails'
    const navigate = useNavigate()
    const items = useSelector((state: RootState) => state.multiStepState[currentItem])
    const [form] = Form.useForm()
    const dispatch = useDispatch<AppDispatch>()
    const { action, panelistId } = useParams<{ action?: string; panelistId?: string }>();

    useEffect(() => {
        if (items && Object.keys(items).length > 0) {
            form.setFieldsValue(items)
        } else if (action === "edit" && panelistId) {
            getOldItems()
        }
    }, [items, action, panelistId, form])


    const getOldItems = async () => {
        if (action === "edit" && panelistId) {
            try {
                // Dispatch the thunk to fetch panelist details by ID
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


    const handleNavigation = () => {
        const role = getUserRole()
        if (role === 'super-panelist') {
            navigate("")
        } else if (role === 'admin') {
            navigate('/admin/manage-users')
        }
    }
    return (
        <>
            <Form layout="vertical" form={form}>
                <div className='grid grid-cols-2 gap-3'>
                    {personalDetailsFormFields.map((field) => renderFormField(field))}
                </div>

                <div className='flex justify-between mt-6'>
                    <CustomButton label='Cancel' className='w-[30%]' onClick={handleNavigation} />
                    <CustomButton label='Next' className='w-[30%]' type='primary' onClick={handleSubmit} />
                </div>
            </Form>
        </>
    )
}

export default PersonalDetailsForm