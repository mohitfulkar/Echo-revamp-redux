import React, { useEffect } from 'react'
import { contributionFormFields } from '../../../auth/models/FormFields'
import { renderFormField } from '../../../../core/components/FormTemplate'
import CustomButton from '../../../../core/components/CustomButton'
import type { StepFormProps } from '../../../../core/models/sharedComponent'
import { Form } from 'antd'
import type { AppDispatch, RootState } from '../../../../store'
import { useDispatch, useSelector } from 'react-redux'
import { setStepData } from '../../../../core/features/multiStepStateReducer'

const ContributionForm: React.FC<StepFormProps> = ({ stepKey, onBack, onNext }) => {
    const [form] = Form.useForm()
    const dispatch = useDispatch<AppDispatch>()
    const currentItem: string = 'contribution'

    // Get saved data for this step from redux
    const items = useSelector((state: RootState) => state.multiStepState[currentItem])
    console.log('items', items)
    useEffect(() => {
        if (items) {
            form.setFieldsValue(items)
        }
    }, [items, currentItem, form])

    const handleSubmit = async () => {
        try {
            const payload = await form.validateFields()
            dispatch(
                setStepData({
                    stepKey: stepKey || '',
                    data: payload,
                })
            )
            console.log('Payload:', payload)
            onNext() // Proceed to next step
        } catch (error) {
            console.error('Validation Failed:', error)
        }
    }

    return (
        <>
            <Form layout="vertical" form={form}>
                <div className="grid grid-cols-2 gap-3">{contributionFormFields.map((field) => renderFormField(field))}</div>

                <div className="flex justify-between mt-6">
                    <CustomButton label="Cancel" className="w-[30%]" onClick={onBack} />
                    <CustomButton label="Next" className="w-[30%]" type="primary" onClick={handleSubmit} />
                </div>
            </Form>
        </>
    )
}

export default ContributionForm
