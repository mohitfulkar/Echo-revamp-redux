import React from 'react';
import type { CrumbItem } from '../../../core/models/sharedComponent';
import SharedBreadcrumb from '../../../core/components/SharedBreadCrumb';
import { superPanelistFields, type FieldConfig } from '../../auth/models/signupForm.model';
import {

    UploadOutlined,

} from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Upload } from 'antd';
import CustomButton from '../../../core/components/CustomButton';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../store';
import { createSuperPanelists } from '../features/userSlices';
import { showToast } from '../../../core/service/ToastService';
import { useNavigate } from 'react-router-dom';

const SuperPanelistForm: React.FC = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()


    const breadcrumbItems: CrumbItem[] = [
        { label: "Users", href: "/admin/manage-users" },
        { label: "Add Super Panelist" },
    ];

    const renderField = (field: FieldConfig) => {
        const commonProps = {
            name: field.name,
            label: field.label,
            rules: field.rules,
        };

        switch (field.type) {
            case "text":
            case "password":
                return (
                    <Form.Item key={field.name} {...commonProps}>
                        <Input
                            type={field.type}
                            placeholder={field.placeholder}
                            prefix={field.prefix}
                        />
                    </Form.Item>
                );

            case "textarea":
                return (
                    <Form.Item key={field.name} {...commonProps}>
                        <Input.TextArea placeholder={field.placeholder} rows={4} />
                    </Form.Item>
                );

            case "number":
                return (
                    <Form.Item key={field.name} {...commonProps}>
                        <InputNumber
                            placeholder={field.placeholder}
                            min={0}
                            max={10}
                            style={{ width: "100%" }}
                        />
                    </Form.Item>
                );


            case "upload":
                return (
                    <Form.Item
                        key={field.name}
                        name={field.name}
                        label={field.label}
                        valuePropName="fileList"
                        getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
                    >
                        <Upload name="image" listType="picture">
                            <Button icon={<UploadOutlined />}>{field.placeholder}</Button>
                        </Upload>
                    </Form.Item>
                );

            default:
                return null;
        }
    };

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            const formData = { ...values };

            if (formData.image && formData.image[0]?.originFileObj) {
                const imageFile = formData.image[0].originFileObj;
                const uploadData = new FormData();
                uploadData.append("file", imageFile);

                formData.image = "uploaded/image/path.jpg"; // Replace with uploaded URL if implemented
            }

            const response = await dispatch(createSuperPanelists(formData));

            if (createSuperPanelists.fulfilled.match(response)) {
                showToast.success("Super Panelist created successfully");
                // Optional: redirect to list page
                navigate("/admin/manage-users?tab=super-panelist");
            } else {
                showToast.error(response.payload || "Failed to create super panelist");
            }
        } catch (error) {
            showToast.error("Form validation failed");
        }
    };


    return (
        <div>
            <h4 className="h4">Create Super Panelist</h4>
            <SharedBreadcrumb items={breadcrumbItems} />

            <div className="border border-gray-300 p-4 rounded-md mt-4 bg-white mt-8">
                <Form layout="vertical" form={form} >
                    <div className='grid grid-cols-3 gap-3'>
                        {superPanelistFields.map(renderField)}

                    </div>

                    <div className='flex justify-between mt-3'>
                        <CustomButton type='default' label='Cancel'></CustomButton>
                        <CustomButton type='primary' label='Submit' onClick={handleSubmit}></CustomButton>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default SuperPanelistForm;
