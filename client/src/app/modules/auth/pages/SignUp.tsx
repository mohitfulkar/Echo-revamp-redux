import React from 'react';
import { Form, Input, Button, Card, Typography, Space } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
interface FormValues {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Field configuration interface
interface FieldConfig {
  name: keyof FormValues;
  placeholder: string;
  prefix: React.ReactNode;
  rules: any[];
  type?: 'text' | 'password';
  dependencies?: string[];
}
const { Title } = Typography;
const SignUp: React.FC = () => {
    const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  return (
    <div className="h-screen p-24">
      <div className="flex h-full">
        <div className="w-1/2 bg-gray-100 p-4">
          {/* Left side content */}
        </div>
        <div className="w-1/2 bg-gray-200 p-4">
           <Form
            form={form}
            name="register"
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
            requiredMark={false}
          >
            {formFields.map((field) => (
              <Form.Item
                key={field.name}
                name={field.name}
                dependencies={field.dependencies}
                rules={field.rules}
              >
                {field.type === 'password' ? (
                  <Input.Password
                    prefix={field.prefix}
                    size="large"
                    placeholder={field.placeholder}
                  />
                ) : (
                  <Input
                    prefix={field.prefix}
                    size="large"
                    placeholder={field.placeholder}
                  />
                )}
              </Form.Item>
            ))}

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                size="large" 
                block
                loading={loading}
              >
                Register
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
