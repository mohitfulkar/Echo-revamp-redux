import React from 'react';
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
}) => {
    const [form] = Form.useForm();

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
                {formFields.map(renderFormField)}
            </Form>
        </Modal>
    );
};

export default FormModal;
