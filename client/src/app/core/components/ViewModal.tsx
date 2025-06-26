// components/ViewModal.tsx
import React from "react";
import { Modal, Descriptions } from "antd";
import type { CardFields } from "../models/sharedComponent";
import StatusTag from "./StatusTag";



interface ViewModalProps {
    open: boolean;
    onClose: () => void;
    fields: CardFields[];
    data: Record<string, any>;
    title?: string;
}

const ViewModal: React.FC<ViewModalProps> = ({ open, onClose, fields, data, title = "Details" }) => {
    return (
        <Modal open={open} onCancel={onClose} footer={null} title={title}>
            <Descriptions column={1} bordered>
                {fields.map((field) => (
                    <Descriptions.Item key={field.key} label={
                        <span className="flex items-center gap-2">
                            {field.icon}
                            {field.label}
                        </span>
                    }>
                        {field.type === 'status' ? (
                            <StatusTag status={data[field.key]} />
                        ) : (
                            data[field.key] ?? "-"
                        )}
                    </Descriptions.Item>
                ))}
            </Descriptions>
        </Modal>
    );
};

export default ViewModal;
