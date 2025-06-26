import React, { useEffect } from 'react';
import { Modal, Form } from 'antd';
import { renderFormField } from './FormTemplate';
import type { FormModalProps } from '../models/sharedComponent';



const FormModal: React.FC<FormModalProps> = ({
    open,
    onClose,
    onSubmit,
    title = "Form",
    formFields,
    initialValues = {},
    loading = false,
    disabledFields = []
}) => {
    const [form] = Form.useForm();

    // Populate form when initialValues change
    useEffect(() => {
        if (open) {
            form.setFieldsValue(initialValues);
        }
    }, [initialValues, open, form]);

    const handleFinish = (values: any) => {
        onSubmit(values);
    };

    return (
        <Modal
            open={open}
            onCancel={onClose}
            onOk={() => form.submit()}
            title={title}
            okText="Submit"
            cancelText="Cancel"
            confirmLoading={loading}
            destroyOnClose
        >
            <Form
                form={form}
                layout="vertical"
                initialValues={initialValues}
                onFinish={handleFinish}
            >
                {formFields.map((field) =>
                    renderFormField(field, disabledFields?.includes(field.name))
                )}
            </Form>
        </Modal>
    );
};


export default FormModal;
