// formService.ts

import { Form } from "antd";
import type { FormInstance } from "antd"; // type-only importimport type { FormInstance } from 'antd';  // type-only import "antd";

export const useFormInstance = () => {
  const [form] = Form.useForm();
  return form;
};

export const collectData = (form: FormInstance) => {
  return form.getFieldsValue();
};

export const onSubmit = async (
  form: FormInstance,
  onSubmit: (data: Record<string, any>) => void,
  setLoading?: (loading: boolean) => void
) => {
  try {
    setLoading?.(true);
    const values = await form.validateFields();
    onSubmit(values);
  } catch (err) {
    console.error("Validation failed:", err);
  } finally {
    setLoading?.(false);
  }
};

export const resetFields = (form: FormInstance) => {
  form.resetFields();
};

export const patchValues = (
  form: FormInstance,
  values: Record<string, any>
) => {
  form.setFieldsValue(values);
};
