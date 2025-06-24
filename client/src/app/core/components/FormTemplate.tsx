import { Button, Checkbox, Form, Input, InputNumber, Select, Slider, Switch, Upload } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import TextArea from "antd/es/input/TextArea";
import { Option } from "antd/es/mentions";
import type { FieldConfig } from "../models/FormConfigs";

export const renderFormField = (field: FieldConfig) => {
    switch (field.type) {
        case "text":
        case "password":
            return (
                <Form.Item
                    key={String(field.name)}
                    name={field.name}
                    rules={field.rules}
                    label={<span className="p">{field.label}</span>}
                >
                    <Input
                        type={field.type}
                        className="p"
                        placeholder={field.placeholder}
                        prefix={field.prefix}
                    />
                </Form.Item>
            );

        case "textarea":
            return (
                <Form.Item
                    key={String(field.name)}
                    name={field.name}
                    rules={field.rules}
                    label={<span className="p">{field.label}</span>}
                >
                    <TextArea
                        rows={4}
                        className="p"
                        placeholder={field.placeholder}
                    />
                </Form.Item>
            );

        case "number":
            return (
                <Form.Item
                    key={String(field.name)}
                    name={field.name}
                    rules={field.rules}
                    label={<span className="p">{field.label}</span>}
                >
                    <InputNumber
                        min={0}
                        max={10}
                        style={{ width: "100%" }}
                        className="p"
                        placeholder={field.placeholder}
                    />
                </Form.Item>
            );

        case "upload":
            return (
                <Form.Item
                    key={String(field.name)}
                    name={field.name}
                    label={<p className="p">{field.label}</p>}
                    valuePropName="fileList"
                    getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
                    rules={field.rules}
                >
                    <Upload name="image" listType="picture" beforeUpload={() => false}>
                        <Button icon={<UploadOutlined />}>{field.placeholder}</Button>
                    </Upload>
                </Form.Item>
            );

        case "select":
            return (
                <Form.Item
                    key={String(field.name)}
                    name={field.name}
                    rules={field.rules}
                    label={<span className="p">{field.label}</span>}
                >
                    <Select placeholder={field.placeholder}>
                        {field.options?.map((opt) => {
                            const value = typeof opt === "string" ? opt : opt.value;
                            const label = typeof opt === "string" ? opt : opt.label ?? opt.value;
                            return (
                                <Option key={value} value={value}>
                                    {label}
                                </Option>
                            );
                        })}
                    </Select>
                </Form.Item>
            );

        case "multi-select":
            return (
                <Form.Item
                    key={String(field.name)}
                    name={field.name}
                    rules={field.rules}
                    label={<span className="p">{field.label}</span>}
                >
                    <Select
                        mode="multiple"
                        placeholder={field.placeholder}
                        allowClear
                    >
                        {field.options?.map((opt) => {
                            const value = typeof opt === "string" ? opt : opt.value;
                            const label = typeof opt === "string" ? opt : opt.label ?? opt.value;
                            return (
                                <Option key={value} value={value}>
                                    {label}
                                </Option>
                            );
                        })}
                    </Select>
                </Form.Item>
            );

        case "checkbox":
            return (
                <Form.Item
                    key={String(field.name)}
                    name={field.name}
                    valuePropName="checked"
                    rules={field.rules}
                    label={<span className="p">{field.label}</span>}
                >
                    <Checkbox>{field.placeholder}</Checkbox>
                </Form.Item>
            );

        case "switch":
            return (
                <Form.Item
                    key={String(field.name)}
                    name={field.name}
                    valuePropName="checked"
                    label={<span className="p">{field.label}</span>}
                    rules={field.rules}
                >
                    <Switch />
                </Form.Item>
            );

        case "checkbox-group":
            return (
                <Form.Item
                    key={String(field.name)}
                    name={field.name}
                    label={<span className="p">{field.label}</span>}
                    rules={field.rules}
                >
                    <Checkbox.Group options={field.options || []} />
                </Form.Item>
            );

        case "slider":
            return (
                <Form.Item
                    key={String(field.name)}
                    name={field.name}
                    label={<span className="p">{field.label}</span>}
                    rules={field.rules}
                >
                    <Slider
                        tooltip={{ open: true }}
                        defaultValue={field.defaultValue ?? 30}
                        min={field.min ?? 0}
                        max={field.max ?? 100}
                    />
                </Form.Item>
            );

        default:
            return null;
    }
};
