import { Form } from 'antd'
import React from 'react'
import { superPanelistFields } from '../../auth/models/FormFields'
import { renderFormField } from '../../../core/components/FormTemplate'
import CustomButton from '../../../core/components/CustomButton'
import { createSuperPanelists } from '../../voter/features/userSlices'
import { showToast } from '../../../core/service/ToastService'
import type { AppDispatch } from '../../../store'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const SuperPanelistForm: React.FC = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            const formData = new FormData();

            // Append all fields except image, converting to string
            Object.entries(values).forEach(([key, value]) => {
                if (key !== 'image') {
                    formData.append(key, value !== undefined && value !== null ? String(value) : '');
                }
            });

            // Handle image field if present
            if (values.image && values.image[0]?.originFileObj) {
                formData.append('image', values.image[0].originFileObj);
            }

            const response = await dispatch(createSuperPanelists(formData));

            if (createSuperPanelists.fulfilled.match(response)) {
                showToast.success("Super Panelist created successfully");
                // Optional: redirect to list page
                navigate("/admin/manage-users?tab=voter");
            } else {
                showToast.error(response.payload || "Failed to create super panelist");
            }
        } catch (error) {
            showToast.error("Form validation failed");
        }
    };
    return (
        <>
            <Form layout="vertical" form={form} >
                <div className='grid grid-cols-3 gap-3'>
                    {superPanelistFields.map((field) => renderFormField(field))}

                </div>

                <div className='flex justify-between mt-3'>
                    <CustomButton type='default' label='Cancel' className="p"></CustomButton>
                    <CustomButton type='primary' label='Create' className="btn" onClick={handleSubmit}></CustomButton>
                </div>
            </Form></>
    )
}

export default SuperPanelistForm