import React, { useEffect } from 'react'
import { uploadFormFields } from '../../../auth/models/FormFields'
import { renderFormField } from '../../../../core/components/FormTemplate'
import CustomButton from '../../../../core/components/CustomButton'
import type { StepFormProps } from '../../../../core/models/sharedComponent'
import { Form } from 'antd'
import { resetAllFormData, setStepData } from '../../../../core/features/multiStepStateReducer'
import { store, type AppDispatch, type RootState } from '../../../../store'
import { useDispatch, useSelector } from 'react-redux'
import { prepareFormDataPayload } from '../../../../core/service/FormService'
import { useNavigate } from 'react-router-dom'
import { createPanelists } from '../../../voter/features/userSlices'

const UploadForm: React.FC<StepFormProps> = ({ stepKey, onBack }) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const currentItem: string = 'upload'
    const items = useSelector((state: RootState) => state.multiStepState[currentItem])
    useEffect(() => {
        if (items) {
            form.setFieldsValue(items)
        }
    }, [items, currentItem, form])

    const handleSubmit = async () => {
        try {
            const currentStepPayload = await form.validateFields();
            dispatch(
                setStepData({
                    stepKey: stepKey || '',
                    data: currentStepPayload,
                })
            );
            const latestSteps = Object.values(
                (await (store.getState() as RootState)).multiStepState
            );
            const mergedValues = latestSteps.reduce((acc, obj) => {
                return { ...acc, ...obj };
            }, {});
            const payload = prepareFormDataPayload(mergedValues)

            const response = await dispatch(createPanelists(payload));
            if (createPanelists.fulfilled.match(response)) {
                dispatch(resetAllFormData());
                navigate('/admin/manage-users?tab=panelist')
            }
        } catch (error) {
            console.error('Validation or submission failed:', error);
        }
    };

    return (
        <>
            <Form layout="vertical" form={form} > <div className='grid grid-cols-2 gap-3'>
                {uploadFormFields.map((field) => renderFormField(field))}
            </div>
                <div className='flex justify-between mt-6'>
                    <CustomButton label='Cancel' className='w-[30%]' onClick={onBack}></CustomButton>
                    <CustomButton label='Create Panelist' className='w-[30%]' type='primary' onClick={handleSubmit}></CustomButton>
                </div></Form>


        </>
    )
}

export default UploadForm