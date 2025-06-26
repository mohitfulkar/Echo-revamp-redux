import React, { useEffect } from 'react'
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

const DesignationForm: React.FC<StepFormProps> = ({ stepKey, onNext, onBack }) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch<AppDispatch>()
    const currentItem: string = 'designation'
    const savedData = useSelector((state: RootState) => state.multiStepState[currentItem])
    const { items: categoryOptions } = useChoices('category'); // ✅ Hook used correctly
    const { items: designationOptions } = useChoices('designation');
    const { items: RsbOptions } = useChoices('rsb');

    const fieldOptionsMap: Record<string, any[]> = {
        assignedCategory: categoryOptions || [],
        designationTitle: designationOptions || [],
        areaOfResponsibility: RsbOptions || [],
    };
    const dynamicFields = applyFieldOptions(designationFormFields, fieldOptionsMap);
    useEffect(() => {
        if (savedData) {
            form.setFieldsValue(savedData)
        }
    }, [savedData, currentItem, form])

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
    }

    return (
        <>
            <Form layout="vertical" form={form} >
                <div className='grid grid-cols-2 gap-3'>
                    {dynamicFields.map((field) => renderFormField(field))}
                </div>
                <div className='flex justify-between mt-6'>
                    <CustomButton label='Cancel' className='w-[30%]' onClick={onBack}></CustomButton>
                    <CustomButton label='Next' className='w-[30%]' type='primary' onClick={handleSubmit}></CustomButton>
                </div>

            </Form>


        </>
    )
}
export default DesignationForm